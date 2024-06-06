const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { email, password, repeatedPassword } = req.body;

    if (password !== repeatedPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60*60*1000,
        });
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60*60*1000,
        });
        res.status(200).json({ message: 'Login successful' });
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.logoutUser = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        maxAge: 0,
    });
    res.status(200).send();
}

exports.getUser = async (req, res) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: { uid: decoded.uid }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({ error: "Access denied" });
    }
}

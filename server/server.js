require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { sequelize, User, Conversation, Message } = require('./models');

const userRoutes = require('./routes/userRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(cors({ 
    origin:"http://localhost:5173", 
    credentials: true,  
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', conversationRoutes);
app.use('/api', messageRoutes);

const PORT = process.env.PORT || 3000;

async function syncDatabase() {
    try {
        await sequelize.authenticate(); 

        await sequelize.sync({ force: true });

        // await User.sync({ force: true });
        // await Conversation.sync({ force: true });
        // await Message.sync({ force: true });

        console.log('Database connection has been established successfully.');

    
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
  
syncDatabase();


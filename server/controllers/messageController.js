const { Message, Conversation } = require('../models');
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

exports.sendMessage = async (req, res) => {
    const { conversation_id, content } = req.body;
    let conversation = null;

    
    try {
        
        if (conversation_id === null) {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/google/flan-t5-base",
                {
                    headers: { Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}` },
                    method: "POST",
                    body: JSON.stringify({
                        inputs: `Generate a title (short but informative expression) for the following user query, limit it to the fewest amount of words you possibly can by only pointing out the most important aspects of the query. QUERY: ${content}`
                    }),
                }
            );
            const result = await response.json();
            conversation = await Conversation.create({ user_id:req.user.uid, title:capitalizeFirstLetter(result[0].generated_text) });

        } else {
            conversation = await Conversation.findOne({
                where: { uid: conversation_id }
            })
        }

        const highestIndexMessage = await Message.findOne({
            where: { conversation_id: conversation.uid },
            order: [['index', 'DESC']],
        });

        const nextIndex = highestIndexMessage ? highestIndexMessage.index + 1 : 1;

        await Message.create({
            conversation_id: conversation.uid,
            index: nextIndex,
            content,
        });

        const allMessages = await Message.findAll({
            where: { conversation_id: conversation.uid },
            order: [['index', 'ASC']],
        })

        const messages = [
            {
                "role": "system", 
                "content": "You are a helpful assistant. You need to give answers and explanations to users queries and questions."
            }, 
            ...allMessages.map((message) => {
            return {
                "role": (message.index % 2 === 0 ? "assistant" : "user"),
                "content": message.content,
            }
        })];

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 4096,
            top_p: 1
        })

        const responseMessage = await Message.create({
            conversation_id: conversation.uid,
            index: nextIndex + 1,
            content: response.choices[0].message.content,
        });

        res.status(201).json({
            message: responseMessage,
            conversation: conversation,
        });
    } catch (error) {
        res.status(400).json({ error:error });
    }
};

exports.getMessages = async (req, res) => {
    let { conversation_id } = req.params;

    try {
        const messages = await Message.findAll({
            where: { conversation_id }
        })

        res.status(200).json({ messages: messages });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

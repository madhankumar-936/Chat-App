import Conversation from "../models/conversational.js";
import Message from "../models/messagemodel.js";
import {getReceiverSocketId,io} from "../socket/socket.js"
export const sendMessage=async (req,res) => {
    try {
        const{message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;


        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            });
        }
        const newMessage =new Message({
            senderId,
            receiverId,
            message,
        });
        if(newMessage){
            conversation.message.push(newMessage._id)
        }
        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(),newMessage.save()]);

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json(newMessage);

        

    } catch (error) {
        console.log("error in sendingmessage controller",error.message)
        res.status(500).json({error:"internal server error"});
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("message");

        // Ensure the response is always an array
        if (!conversation) return res.status(200).json([]); // Return an empty array if no conversation
        const messages = conversation.message || []; // Fallback to empty array if no messages
        res.status(200).json(messages);
    } catch (error) {
        console.log("error in sendingmessage controller", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

import mongoose from "mongoose";

const conversatinSchema=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        },
    ],
},
{timestamps:true}
);

const Conversation=mongoose.model("Conversation",conversatinSchema);
export default Conversation;
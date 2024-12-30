import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                
                // Log the response data to check its structure
                console.log("Fetched messages data:", data);
                
                // Ensure messages is an array
                if (Array.isArray(data)) {
                    setMessages(data); // If data is an array, set it
                } else {
                    setMessages([]); // If not, set messages to an empty array
                }
            } catch (error) {
                toast.error(error.message);
                setMessages([]); // In case of error, ensure messages is empty
            } finally {
                setLoading(false);
            }
        };

        // Fetch messages only if a conversation is selected
        if (selectedConversation?._id) {
            getMessages();
        } else {
            setMessages([]); // Clear messages if no conversation is selected
        }
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;

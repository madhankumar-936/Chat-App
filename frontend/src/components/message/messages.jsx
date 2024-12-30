import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeltons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);



    return (
        <div className="px-4 flex-1 overflow-auto">
            {/* Check if messages is an array and has data */}
            {!loading && Array.isArray(messages) && messages.length > 0 ? (
                messages.map((message, index) => (
                    <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                        <Message message={message} />
                    </div>
                ))
            ) : (
                <p className="text-center">
                    {loading ? "Loading messages..." : "Send a message to start the conversation"}
                </p>
            )}

            {/* Show loading skeleton if loading is true */}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        </div>
    );
};

export default Messages;

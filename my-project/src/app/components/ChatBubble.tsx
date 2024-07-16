import React from "react";

interface ChatBubbleProps {
  color?: string;
  text?: string;
}

const ChatBubble = ({ text }: ChatBubbleProps) => {
  return (
    <div className="mt-2 flex">
      <span className="ml-2 mt-2 border-2 p-1 rounded-2xl flex bg-blue-400">
        {text}
      </span>
    </div>
  );
};

export default ChatBubble;

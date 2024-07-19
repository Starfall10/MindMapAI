import React from "react";

interface ChatBubbleProps {
  color?: string;
  text?: string;
}

const ChatBubble = ({ text }: ChatBubbleProps) => {
  return (
    <div className="mt-2 flex ">
      <span className="ml-2 mt-2 p-2 rounded-2xl flex bg-gradient-to-r from-cyan-500 to-blue-500 z-30 ">
        {text}
      </span>
    </div>
  );
};

export default ChatBubble;

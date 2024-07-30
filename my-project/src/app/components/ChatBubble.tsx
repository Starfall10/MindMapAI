import React from "react";

interface ChatBubbleProps {
  color?: string;
  isDisplay?: boolean;
  text?: string;
}

const ChatBubble = ({ text, isDisplay }: ChatBubbleProps) => {
  return (
    <div>
      {isDisplay && (
        <div className="mt-2 flex ">
          <span className="ml-2 mt-2 p-2 rounded-2xl flex bg-gradient-to-r from-cyan-500 to-blue-500 z-30 ">
            {text}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;

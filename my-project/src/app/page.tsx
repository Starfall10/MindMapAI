import Image from "next/image";
import { IoSendSharp } from "react-icons/io5";

export default async function Home() {
  return (
    <div>
      <div className="fixed bottom-0 w-full border-2 flex justify-between">
        <form action="">
          <input
            required
            type="text"
            placeholder="Enter a mindmap topic"
            className="focus:outline-none my-2 ml-2"
          />
        </form>
        <div
          className="border-2 items-center justify-center w-7 h-7 mt-2 mb-2 pl-1 pt-1 bg-gray-800 
                text-blue-500 hover:bg-green-600 hover:text-white
                rounded-3xl hover:rounded-xl transition-all duration-300 ease-in-out"
        >
          <IoSendSharp />
        </div>
      </div>
      <ChatBubble text="Hello World" />
    </div>
  );
}

interface ChatBubbleProps {
  color?: string;
  text?: string;
}

const ChatBubble = ({ text }: ChatBubbleProps) => {
  return (
    <div className="mt-2">
      <span className="ml-2 mt-2 border-2 p-1 rounded-2xl flex bg-blue-400">
        {text}
      </span>
    </div>
  );
};

"use client";
import { useForm } from "react-hook-form";
import { IoSendSharp } from "react-icons/io5";
import { useState } from "react";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home() {
  const [formData, setFormData] = useState({
    chatText: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function saveChat(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(formData.chatText);
    const body = { chatText: formData.chatText };
    const response = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log(response);

    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    return await response.json();
  }

  return (
    <div>
      <div className="fixed bottom-0 w-full border-2 flex justify-between">
        <form onSubmit={saveChat}>
          <input
            required
            type="text"
            name="chatText"
            value={formData.chatText}
            placeholder="Enter a mindmap topic"
            className="focus:outline-none my-2 ml-2"
            onChange={handleChange}
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
      <h2>Chat</h2>
    </div>
  );
}

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

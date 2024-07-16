"use client";
import { set, useForm } from "react-hook-form";
import { IoSendSharp } from "react-icons/io5";
import { createRef, useRef, useState } from "react";

import useSWR from "swr";
import React from "react";
import axios from "axios";
import ChatBubble from "./components/ChatBubble";
import { useRouter } from "next/router";

// ----------------- Fetch Chat ------------------------/

const fetcher = (url: string) =>
  axios
    .get(url, {})
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

export function ChatWindow() {
  //   const data = useSWR("../api/chats", fetcher);
  const { data, error } = useSWR("../api/chats", fetcher);
  console.log("Data:", data);
  console.log("Error:", error);

  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <div className="">
      {data.data.map((chat: any) => (
        <ChatBubble text={chat.chat} />
      ))}
    </div>
  );
}

// ----------------- Contact API STUFF ------------------------/

export default function Home() {
  const [chats, setChats] = useState<string[]>([]);
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

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Refresh chat and clear input field
    chats.push(formData.chatText);

    setChats([...chats]);
    setFormData({ chatText: "" });

    return await response.json();
  }

  // ----------------- Home Page ------------------------/

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
            className="focus:outline-none my-2 ml-2 w-80"
            onChange={handleChange}
          />
        </form>
        <button
          type="submit"
          className="border-2 items-center justify-center w-7 h-7 mt-2 mb-2 pl-1 pt-1 bg-gray-800 
                text-blue-500 hover:bg-green-600 hover:text-white
                rounded-3xl hover:rounded-xl transition-all duration-300 ease-in-out"
        >
          <IoSendSharp />
        </button>
      </div>
      <div>
        <ChatWindow />
        {chats.map((chat) => (
          <div>
            <ChatBubble text={chat} />
          </div>
        ))}
      </div>
    </div>
  );
}

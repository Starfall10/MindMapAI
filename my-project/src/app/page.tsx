"use client";
import { useForm } from "react-hook-form";
import { IoSendSharp } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";

import useSWR from "swr";
import React from "react";
import axios from "axios";
import ChatBubble from "./components/ChatBubble";

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
  // console.log("Data:", data);
  // console.log("Error:", error);

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
  const [imgURL, setImgURL] = useState("");

  const mindmapstring = `\n* mindmap`;
  const startstring = "@startmindmap";
  const endstring = "\n@endmindmap";
  const mindmapstring2 = "";

  const [chats, setChats] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    chatText: "",
  });
  const [promptLoading, setPromptLoading] = useState(false);
  const [promptLoadingError, setPromptLoadingError] = useState(false);

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

  async function generateMindmap(e: String) {
    const mindmapstring = e;

    const res = await fetch("/api/puppeteer", {
      method: "POST",
      body: JSON.stringify({ mindmapstring }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await res.json();
    setImgURL(results.imgURL);
  }

  async function processPrompt(e: String) {
    // console.log(e);

    const prompt = e.trim();

    if (prompt) {
      try {
        setPromptLoadingError(false);
        setPromptLoading(true);

        // const response = await fetch(
        //   "/api/openai?prompt=" + encodeURIComponent(prompt)
        // );
        // const body = await response.json();
        // console.log(body);

        // chats.push(body.mindmap);

        const mindmap = startstring + mindmapstring + endstring;

        generateMindmap(mindmap);
        chats.push(mindmap);
        setChats([...chats]);
      } catch (error) {
        console.error("An error occured", error);
        setPromptLoadingError(true);
      } finally {
        setPromptLoading(false);
      }
    }
  }

  async function saveChat(e: React.SyntheticEvent) {
    e.preventDefault();
    // console.log(formData.chatText);
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

    const prompt = JSON.stringify(formData.chatText);
    processPrompt(prompt);

    setFormData({ chatText: "" });

    return await response.json();
  }

  // ----------------- Home Page ------------------------/

  return (
    <>
      <div>
        <div className="fixed bottom-0 w-full border-2 flex justify-between">
          <form onSubmit={saveChat}>
            <input
              required
              type="text"
              name="chatText"
              value={formData.chatText}
              placeholder="Enter a mindmap topic"
              className="focus:outline-none my-2 ml-2 w-80 "
              onChange={handleChange}
            />
          </form>
          <button
            type="submit"
            className="border-2 items-center justify-center w-7 h-7 mt-2 mb-2 pl-1 pt-1 bg-gray-800 
                  text-blue-500 hover:bg-blue-600 hover:text-white
                  rounded-3xl hover:rounded-xl transition-all duration-300 ease-in-out"
          >
            <div>
              <IoSendSharp />
            </div>
          </button>
        </div>
        <div>
          <ChatWindow />
          {chats.map((chat) => (
            <div>
              <ChatBubble text={chat} />
            </div>
          ))}
          {promptLoading && <div>Loading ...</div>}
          {promptLoadingError && <div>An error occured.</div>}
          {imgURL && (
            <div>
              <Image
                loader={({ src }) => src}
                alt="Mindmap"
                width={500}
                height={500}
                src={imgURL}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

"use client";
import { useForm } from "react-hook-form";
import { IoSendSharp } from "react-icons/io5";
import { useRef, useState } from "react";
import Image from "next/image";

import useSWR from "swr";
import React from "react";
import axios from "axios";
import ChatBubble from "./components/ChatBubble";
import TsParticles from "./components/TsParticles";

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

// ----------------- tsParticles ------------------------/

// ----------------- Home Page ------------------------/

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imgURL, setImgURL] = useState("");

  const mindmapstring = `\n* mindmap \n** Key Messages \n  *** Connect with Friends and Family \n *** Unique Filipino Cultural Themes \n *** Available on Android and iOS \n  ** Success Metrics \n   *** Number of Downloads \n   *** User Retention Rate \n   *** Average Session Duration \n   *** User Ratings and Reviews \n   *** Social Media Engagement \n   ** Possible Channels \n   ** Social Media \n  *** Facebook Ads \n *** Instagram Stories and Posts \n *** TikTok Challenges \n ** YouTube Influencer Partnerships \n   ** Online Communities \n *** Reddit \n *** Local Gaming Forums \n *** Facebook Groups`;

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

    setIsGenerating(true);

    const res = await fetch("/api/puppeteer", {
      method: "POST",
      body: JSON.stringify({ mindmapstring }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await res.json();
    setImgURL(results.imgURL);
    setIsGenerating(false);
    scrollToElement();
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
        // chats.push(mindmap);
        // setChats([...chats]);
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

    scrollToElement();

    return await response.json();
  }
  const bottomAnchor = useRef<HTMLHeadingElement>(null);

  const scrollToElement = () => {
    if (bottomAnchor.current) {
      bottomAnchor.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log("Scrolling");
  };

  // ----------------- Home Page ------------------------/
  return (
    <div className="bg-black">
      <div className="fixed z-0">
        <TsParticles />
      </div>
      <div className="bg-black z-40">
        <div className="fixed bottom-0 w-full border-2  bg-black z-40">
          <form onSubmit={saveChat} className="flex justify-between">
            <input
              required
              type="text"
              name="chatText"
              value={formData.chatText}
              placeholder="Enter a mindmap topic"
              className="focus:outline-none my-2 ml-2 w-full bg-transparent text-white z-40"
              onChange={handleChange}
            />
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
          </form>
        </div>
        <div className=" pb-32 z-30">
          <ChatWindow />
          {chats.map((chat) => (
            <div className="z-20">
              <ChatBubble text={chat} />
            </div>
          ))}
          {promptLoading && <div className="text-white">Loading ...</div>}
          {promptLoadingError && (
            <div className="text-white">An error occured.</div>
          )}
          {isGenerating && <div className="text-white">Generating...</div>}

          {imgURL && (
            <div className="bg-black content-center z-40">
              <Image
                loader={({ src }) => src}
                alt="Mindmap"
                width={500}
                height={500}
                src={imgURL}
              />
            </div>
          )}

          <h1 ref={bottomAnchor} className="bg-black"></h1>
        </div>
      </div>
    </div>
  );
}

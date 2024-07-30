"use client";
import { set, useForm } from "react-hook-form";
import { IoSendSharp } from "react-icons/io5";
import { useRef, useState } from "react";
import Image from "next/image";

import useSWR from "swr";
import React from "react";
import axios from "axios";
import ChatBubble from "./components/ChatBubble";
import TsParticles from "./components/TsParticles";
import Link from "next/link";
import NavBar from "./components/NavBar";
import { Button, Divider } from "@chakra-ui/react";
import { TbTopologyComplex } from "react-icons/tb";

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
    <div className="h-full">
      {data.data.map((chat: any) => (
        <ChatBubble text={chat.chat} isDisplay={chat.isDisplay} />
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
  const [generatedText, setGeneratedText] = useState("");

  const mindmapstring = `\n* mindmap \n** Key Messages \n  *** Connect with Friends and Family \n *** Unique Filipino Cultural Themes \n *** Available on Android and iOS \n  ** Success Metrics \n   *** Number of Downloads \n   *** User Retention Rate \n   *** Average Session Duration \n   *** User Ratings and Reviews \n   *** Social Media Engagement \n   ** Possible Channels \n   ** Social Media \n  *** Facebook Ads \n *** Instagram Stories and Posts \n *** TikTok Challenges \n ** YouTube Influencer Partnerships \n   ** Online Communities \n *** Reddit \n *** Local Gaming Forums \n *** Facebook Groups`;

  const startstring = "@startmindmap \n ";
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

        const response = await fetch(
          "/api/openai?prompt=" + encodeURIComponent(prompt)
        );
        const body = await response.json();
        console.log("BODY: " + body);

        // chats.push(body.mindmap);
        console.log("Chats: " + body.mindmap);
        const mindmap = startstring + body.mindmap + endstring;
        setGeneratedText(mindmap);
        saveResponse(mindmap);

        generateMindmap(mindmap);
      } catch (error) {
        console.error("An error occured", error);
        setPromptLoadingError(true);
      } finally {
        setPromptLoading(false);
      }
    }
  }

  async function saveResponse(generatedResponse: string) {
    const body = { chatText: generatedResponse, isDisplay: false };
    const response = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  const [isRevealChat, setIsRevealChat] = useState(false);

  async function saveChat(e: React.SyntheticEvent) {
    e.preventDefault();
    // console.log(formData.chatText);
    setPromptLoading(true);
    const body = { chatText: formData.chatText, isDisplay: true };
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
    console.log("formData.chatText: " + formData.chatText);
    setChats([...chats]);
    console.log("Chats: " + chats);

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

  function isRevealChatHandler() {
    setIsRevealChat(!isRevealChat);
  }
  // ----------------- Home Page ------------------------/
  return (
    <div className="bg-black">
      <div className="fixed z-0 top-0  w-full">
        <TsParticles />
      </div>
      <div className=" w-full bg-black absolute bg-transparent">
        <div className="z-30">
          <NavBar />
        </div>

        {!isRevealChat && (
          <div className="text-white item-center z-40 w-full  flex flex-col items-center justify-center pt-32">
            <div className="text-white text-9xl my-4">
              <TbTopologyComplex />
            </div>
            <div>
              <h1 className="text-3xl my-2">
                Unlock Your Creativity: Mind Map Generator for Innovative Ideas
              </h1>
            </div>
            <div>
              <h2 className="text-xl my-2">
                Transform Your Thoughts into Visual Journeys and Ignite Your
                Imagination!
              </h2>
            </div>
            <div className="my-3">
              <Button onClick={isRevealChatHandler}>Get started</Button>
            </div>
          </div>
        )}

        {isRevealChat && (
          <div className=" z-40">
            <div className="fixed bottom-0 w-full border-2 z-40">
              <form
                onSubmit={saveChat}
                className="flex justify-between bg-black"
              >
                <input
                  required
                  type="text"
                  name="chatText"
                  value={formData.chatText}
                  autoComplete="off"
                  placeholder={
                    isGenerating || promptLoading
                      ? "Generating..."
                      : "Enter mindmap topic"
                  }
                  className="focus:outline-none my-2 ml-2 w-full bg-transparent text-white z-40 "
                  onChange={handleChange}
                  disabled={isGenerating || promptLoading}
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
            <div className=" pb-32 z-30 h-full">
              <ChatWindow />
              {chats.map((chat) => (
                <div className="z-20">
                  <ChatBubble text={chat} isDisplay={true} />
                </div>
              ))}
              {promptLoading && <div className="text-white">Loading ...</div>}
              {promptLoadingError && (
                <div className="text-white">An error occured.</div>
              )}
              {isGenerating && <div className="text-white">Generating...</div>}

              {imgURL && (
                <div>
                  <div className="z-50 p-5">
                    <Image
                      loader={({ src }) => src}
                      alt="Mindmap"
                      width={500}
                      height={500}
                      src={imgURL}
                    />
                  </div>
                  <Button>
                    <Link
                      href={{
                        pathname: "/editorPage",
                        query: { passingText: generatedText },
                      }}
                    >
                      Edit
                    </Link>
                  </Button>
                </div>
              )}

              <h1 ref={bottomAnchor} className=""></h1>
            </div>
          </div>
        )}
      </div>
      <div className="p-52 z-0 top-0 right-0  ">
        <p></p>
      </div>
    </div>
  );
}

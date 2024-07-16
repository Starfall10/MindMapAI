import React from "react";
import useSWR from "swr"; // ✅ Available in server components
import ChatBubble from "./ChatBubble";
import axios from "axios";

const fetcher = (url: string) =>
  axios
    .get(url, {})
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

export default function ChatWindow() {
  //   const data = useSWR("../api/chats", fetcher);
  const { data, error } = useSWR("../api/chats", fetcher);
  console.log("Data:", data);
  console.log("Error:", error);

  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <div className="mb-14">
      {data.data.map((chat: any) => (
        <ChatBubble text={chat.chat} />
      ))}
    </div>
  );
}

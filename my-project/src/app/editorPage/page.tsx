"use client";
import React from "react";
import { Tldraw, useEditor } from "tldraw";
import "../index.css";
import TldrawCompo from "../components/TldrawCompo";
import { Excalidraw } from "@excalidraw/excalidraw";
import ExcalidrawCompo from "../components/ExcalidrawCompo";
import TsParticles from "../components/TsParticles";
import NavBar from "../components/NavBar";
import { useSearchParams } from "next/navigation";
const mindmapstring = `\n* mindmap \n** Key Messages \n*** Connect with Friends and Family \n*** Unique Filipino Cultural Themes \n*** Available on Android and iOS \n** Success Metrics \n*** Number of Downloads \n*** User Retention Rate \n*** Average Session Duration \n   *** User Ratings and Reviews \n   *** Social Media Engagement \n   ** Possible Channels \n   ** Social Media \n  *** Facebook Ads \n *** Instagram Stories and Posts \n *** TikTok Challenges \n ** YouTube Influencer Partnerships \n   ** Online Communities \n *** Reddit \n *** Local Gaming Forums \n *** Facebook Groups`;

export default function TldrawPage() {
  const searchParams = useSearchParams();
  let passingText = "placeholder";
  passingText = searchParams.get("passingText") ?? "";
  console.log("PassingText: " + passingText); // good
  return (
    <div className="flex flex-col bg-black ">
      <div className=" w-full z-10 bg-black absolute bg-transparent">
        <NavBar />
      </div>
      <div className="fixed z-0 top-0  w-full">
        <TsParticles />
      </div>
      <div className="relative w-[90vw] h-[80vh] border-4 border-black mx-20 mt-32 tldraw__editor">
        <div style={{ position: "absolute", inset: 20 }}>
          <TldrawCompo passingText={passingText} />
        </div>
      </div>
    </div>
  );
}

function InsideOfContent() {
  const editor = useEditor();

  return null;
}

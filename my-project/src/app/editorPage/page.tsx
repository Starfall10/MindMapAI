"use client";
import React from "react";
import { Tldraw, useEditor } from "tldraw";
import "../index.css";
import TldrawCompo from "../components/TldrawCompo";
import { Excalidraw } from "@excalidraw/excalidraw";
import ExcalidrawCompo from "../components/ExcalidrawCompo";
const mindmapstring = `\n* mindmap \n** Key Messages \n*** Connect with Friends and Family \n*** Unique Filipino Cultural Themes \n*** Available on Android and iOS \n** Success Metrics \n*** Number of Downloads \n*** User Retention Rate \n*** Average Session Duration \n   *** User Ratings and Reviews \n   *** Social Media Engagement \n   ** Possible Channels \n   ** Social Media \n  *** Facebook Ads \n *** Instagram Stories and Posts \n *** TikTok Challenges \n ** YouTube Influencer Partnerships \n   ** Online Communities \n *** Reddit \n *** Local Gaming Forums \n *** Facebook Groups`;

const TldrawPage = () => {
  return (
    <div className="flex flex-col">
      <div>
        <span>{mindmapstring}</span>
      </div>
      <div className="relative w-[90vw] h-[80vh] border-4 border-black mx-20 tldraw__editor">
        <div style={{ position: "absolute", inset: 20 }}>
          <TldrawCompo />
        </div>
      </div>
    </div>
  );
};

function InsideOfContent() {
  const editor = useEditor();

  return null;
}

export default TldrawPage;

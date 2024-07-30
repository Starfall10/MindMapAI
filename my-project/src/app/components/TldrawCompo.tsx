import React from "react";
import { setUserPreferences, Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { createShapeId } from "tldraw";
import { text } from "stream/consumers";
import mermaid from "mermaid";
import { split } from "postcss/lib/list";

import { set, useForm } from "react-hook-form";
import { IoSendSharp } from "react-icons/io5";
import { useRef, useState } from "react";
import Image from "next/image";

import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { Button, Divider } from "@chakra-ui/react";
import { TbTopologyComplex } from "react-icons/tb";

interface TldrawCompoProps {
  passingText?: string;
}

const boxes = ["box1", "box2", "box3", "box4"];
const mindmapstring = ` * mindmap **  Messages *** Connect with Friends and Family *** Unique Filipino Cultural Themes *** Available on Android and iOS ** Success Metrics *** Number of Downloads *** User Retention Rate *** Average Session Duration *** User Ratings and Reviews *** Social Media Engagement *** Possible Channels ** Social Media *** Facebook Ads *** Instagram Stories and Posts *** TikTok Challenges *** YouTube Influencer Partnerships ** Online Communities *** Reddit *** Local Gaming Forums *** Facebook Groups`;

function getMindMapString() {
  //   const data = useSWR("../api/chats", fetcher);
  const { data, error } = useSWR("", fetch);
  // console.log("Data:", data);
  // console.log("Error:", error);

  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;

  return <div className="h-full"></div>;
}

const TldrawCompo = () => {
  return (
    <Tldraw inferDarkMode>
      <InsideOfContext />
    </Tldraw>
  );
};

function InsideOfContext() {
  getMindMapString();

  let head = 0;
  let body = 0;
  let tail = 0;
  let splitArray = mindmapstring.split(" *");

  for (let i = 0; i < mindmapstring.length; i++) {
    if (
      mindmapstring[i] === "*" &&
      mindmapstring[i + 1] === "*" &&
      mindmapstring[i + 2] === "*"
    ) {
      tail++;
      i = i + 2;
    } else if (mindmapstring[i] === "*" && mindmapstring[i + 1] === "*") {
      body++;
      i = i + 1;
    } else if (mindmapstring[i] === "*") {
      head++;
    }
  }

  const editor = useEditor();

  editor.mark("first");

  for (let i = 1; i < splitArray.length; i++) {
    let xSpace = 0;
    if (splitArray[i][0] === " ") {
      // console.log(splitArray[i]);
      xSpace = 0;
    } else if (splitArray[i][0] === "*" && splitArray[i][1] !== "*") {
      // console.log("\t " + splitArray[i]);
      xSpace = 300;
    } else if (splitArray[i][0] === "*" && splitArray[i][1] === "*") {
      // console.log("\t \t " + splitArray[i]);
      xSpace = 300 * 2;
    }

    editor.createShapes([
      {
        id: createShapeId(splitArray[i]),
        type: "geo",
        x: 100 + xSpace,
        y: 100 + 150 * i,
        props: {
          geo: "cloud",
          w: 500,
          h: 100,
          dash: "draw",
          color: "blue",
          size: "m",
          text: splitArray[i],
        },
      },
    ]);
  }

  editor.setCamera({ x: 0, y: 0, z: 0.4 });
  editor.setCurrentTool("hand");

  return null; // or whatever
}

export default TldrawCompo;

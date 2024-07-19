import React from "react";
import { setUserPreferences, Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { createShapeId } from "tldraw";
import { text } from "stream/consumers";
import mermaid from "mermaid";
import { split } from "postcss/lib/list";

const boxes = ["box1", "box2", "box3", "box4"];
const mindmapstring1 = `\n* mindmap\n** Key Messages\n*** Connect with Friends and Family\n*** Unique Filipino Cultural Themes\n*** Available on Android and iOS \n** Success Metrics \n*** Number of Downloads \n*** User Retention Rate \n*** Average Session Duration \n*** User Ratings and Reviews \n*** Social Media Engagement \n** Possible Channels \n** Social Media \n*** Facebook Ads \n*** Instagram Stories and Posts \n*** TikTok Challenges \n** YouTube Influencer Partnerships \n** Online Communities \n*** Reddit \n*** Local Gaming Forums \n*** Facebook Groups`;
const mindmapstring = ` * mindmap ** Key Messages *** Connect with Friends and Family *** Unique Filipino Cultural Themes *** Available on Android and iOS ** Success Metrics *** Number of Downloads *** User Retention Rate *** Average Session Duration *** User Ratings and Reviews *** Social Media Engagement *** Possible Channels ** Social Media *** Facebook Ads *** Instagram Stories and Posts *** TikTok Challenges *** YouTube Influencer Partnerships ** Online Communities *** Reddit *** Local Gaming Forums *** Facebook Groups`;

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

const TldrawCompo = () => {
  return (
    <Tldraw inferDarkMode>
      <InsideOfContext />
    </Tldraw>
  );
};

function InsideOfContext() {
  const editor = useEditor();

  editor.mark("first");

  // for (let i = 0; i < boxes.length; i++) {
  //   editor.createShapes([
  //     {
  //       id: createShapeId(boxes[i]),
  //       type: "geo",
  //       x: 100 + 150 * i,
  //       y: 100 + 150 * i,
  //       props: {
  //         geo: "cloud",
  //         w: 100,
  //         h: 100,
  //         dash: "draw",
  //         color: "blue",
  //         size: "m",
  //         text: boxes[i],
  //       },
  //     },
  //   ]);
  // }

  for (let i = 1; i < splitArray.length; i++) {
    let xSpace = 0;
    if (splitArray[i][0] === " ") {
      console.log(splitArray[i]);
      xSpace = 0;
    } else if (splitArray[i][0] === "*" && splitArray[i][1] !== "*") {
      console.log("\t " + splitArray[i]);
      xSpace = 1000;
    } else if (splitArray[i][0] === "*" && splitArray[i][1] === "*") {
      console.log("\t \t " + splitArray[i]);
      xSpace = 1000 * 2;
    }

    editor.createShapes([
      {
        id: createShapeId(splitArray[i]),
        type: "geo",
        x: 100 + xSpace,
        y: 100 + 150 * i,
        props: {
          geo: "cloud",
          w: 1000,
          h: 100,
          dash: "draw",
          color: "blue",
          size: "m",
          text: splitArray[i],
        },
      },
    ]);
  }

  // editor.createShapes([
  //   {
  //     id: createShapeId("arrow"),
  //     type: "arrow",
  //     x: 100,
  //     y: 100,
  //     props: {
  //       start: { x: 100, y: 100 },
  //       end: { x: 200, y: 200 },
  //       color: "black",
  //       width: 2,
  //     },
  //   },
  // ]);

  // editor.deleteShapes([createShapeId("1")]);

  editor.setCamera({ x: 0, y: 0, z: 0.7 });
  editor.setCurrentTool("hand");

  return null; // or whatever
}

export default TldrawCompo;

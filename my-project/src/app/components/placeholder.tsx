import React from "react";
import { setUserPreferences, Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { createShapeId } from "tldraw";

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

  for (let i = 1; i < splitArray.length; i++) {
    let xSpace = 0;
    if (splitArray[i][0] === " ") {
      xSpace = 0;
    } else if (splitArray[i][0] === "*" && splitArray[i][1] !== "*") {
      xSpace = 300;
    } else if (splitArray[i][0] === "*" && splitArray[i][1] === "*") {
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

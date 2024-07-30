import React from "react";
import { setUserPreferences, Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { createShapeId } from "tldraw";
import { split } from "postcss/lib/list";

interface TldrawCompoProps {
  passingText: string;
}

let mindmapstring = ` * mindmap ** Key Messages *** Connect with Friends and Family *** Unique Filipino Cultural Themes *** Available on Android and iOS ** Success Metrics *** Number of Downloads *** User Retention Rate *** Average Session Duration *** User Ratings and Reviews *** Social Media Engagement *** Possible Channels ** Social Media *** Facebook Ads *** Instagram Stories and Posts *** TikTok Challenges *** YouTube Influencer Partnerships ** Online Communities *** Reddit *** Local Gaming Forums *** Facebook Groups`;

const TldrawCompo = ({ passingText }: TldrawCompoProps) => {
  console.log("ppppppp: " + passingText);
  setMindMapString(passingText);
  return (
    <Tldraw inferDarkMode>
      <InsideOfContext />
    </Tldraw>
  );
};

function setMindMapString(passingText: string) {
  mindmapstring = passingText;
}

function InsideOfContext() {
  const editor = useEditor();
  mindmapstring = mindmapstring.replace("@startmindmap", "");
  mindmapstring = mindmapstring.replace("@endmindmap", "");

  console.log("mindmapstring: " + mindmapstring);

  const splitArray = mindmapstring.split("**");
  // console.log("splitArray: " + splitArray);
  editor.mark("first");

  for (let i = 0; i < splitArray.length; i++) {
    // console.log("splitArray: " + i + " " + splitArray[i]);
    let xSpace = 0;
    if (splitArray[i][0] === " ") {
      xSpace = 0;
    } else if (splitArray[i][0] === "*" && splitArray[i][1] !== "*") {
      xSpace = 300;
    } else if (splitArray[i][0] === "*" && splitArray[i][1] === "*") {
      xSpace = 300 * 2;
    }
    if (i === 0) {
      xSpace = -250;
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
          text: splitArray[i].replace("*", ""),
        },
      },
    ]);
  }

  editor.setCamera({ x: 0, y: 0, z: 0.4 });
  editor.setCurrentTool("hand");

  return null;
}

export default TldrawCompo;

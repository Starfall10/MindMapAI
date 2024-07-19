const { split } = require("postcss/lib/list");

const mindmapstring = ` * mindmap ** Key Messages *** Connect with Friends and Family *** Unique Filipino Cultural Themes *** Available on Android and iOS ** Success Metrics *** Number of Downloads *** User Retention Rate *** Average Session Duration *** User Ratings and Reviews *** Social Media Engagement ** Possible Channels ** Social Media *** Facebook Ads *** Instagram Stories and Posts *** TikTok Challenges ** YouTube Influencer Partnerships ** Online Communities *** Reddit *** Local Gaming Forums *** Facebook Groups`;
const mindmapstring1 = `\n* mindmap\n** Key Messages\n*** Connect with Friends and Family\n*** Unique Filipino Cultural Themes\n*** Available on Android and iOS \n** Success Metrics \n*** Number of Downloads \n*** User Retention Rate \n*** Average Session Duration \n*** User Ratings and Reviews \n*** Social Media Engagement \n** Possible Channels \n** Social Media \n*** Facebook Ads \n*** Instagram Stories and Posts \n*** TikTok Challenges \n** YouTube Influencer Partnerships \n** Online Communities \n*** Reddit \n*** Local Gaming Forums \n*** Facebook Groups`;



// console.log(mindmapstring.charAt(5)); // ""

let head = 0;
let body = 0;
let tail = 0;
let splitArray = mindmapstring.split(" *");

for (let i = 0; i < mindmapstring.length; i++) {
    if(mindmapstring[i] === "*" && mindmapstring[i+1] === "*" && mindmapstring[i+2] === "*") {
        tail++;
        i = i + 2;
    }else if(mindmapstring[i] === "*" && mindmapstring[i+1] === "*") {
        body++;
        i = i + 1;
    } else if(mindmapstring[i] === "*") {
        head++;
    }
}

for (let i = 0; i < splitArray.length; i++) {
   if(splitArray[i][0] === " " ) {
        console.log(splitArray[i]) }
    else if(splitArray[i][0] === "*" && splitArray[i][1] !== "*" ) {
        console.log("\t " + splitArray[i])
    } else if(splitArray[i][0] === "*" && splitArray[i][1 ] === "*" ) {
        console.log("\t \t " + splitArray[i])
   }

}

// console.log(head, body, tail); // 1 6 14
console.log(splitArray); 

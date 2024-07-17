import { NextResponse } from "next/server";
import puppeteer from "puppeteer";


export async function POST(req: Request) {
    const {mindmapstring : mindmap} = await req.json();
    var imgURL = "";
    if(!mindmap) {
        return NextResponse.json({ error: "Prompt is required" });
    }

    try {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto("https://www.plantuml.com/plantuml/")
        const textArea = await page.locator("#inflated");
        await textArea.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await textArea.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await textArea.click({clickCount: 3});
        await page.keyboard.press('Backspace');
        await page.type("#inflated", mindmap);

        await Promise.all([
            await page.$$eval('button', buttons => {
                for (const button of buttons) {
                if (button.textContent === 'Submit') {
                    button.click();
                    break; // Clicking the first matching button and exiting the loop
                }
                }
            }),
            page.waitForNavigation({waitUntil: 'networkidle2'}),
        ]);


        await page.screenshot({path: 'testing.png', fullPage: true});

        imgURL = await page.$eval('img#theimg', img => img.src);

        console.log("somethieng", imgURL);

        await browser.close();

    } catch {
        return NextResponse.json({ error: "An error occured" }); 
    } finally {
        return NextResponse.json({ imgURL });

    }

}
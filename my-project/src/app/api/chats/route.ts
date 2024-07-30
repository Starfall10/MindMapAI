import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import router from "next/router";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  res: NextApiResponse
) {
  const body = await req.json();
  const { chatText, isDisplay } = body;

  const savedContact = await prisma.chat.create({
    data: { chat: chatText , isDisplay: isDisplay },
  });



  return NextResponse.json({ data: savedContact });

}

export async function GET(
  req: Request,
  res: NextApiResponse
) {

  const chats = await prisma.chat.findMany()
  // console.log(chats)
  return NextResponse.json(chats);

}

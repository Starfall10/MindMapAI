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
  const { chatText } = body;

  const savedContact = await prisma.chat.create({
    data: { chat: chatText },
  });



  return NextResponse.json({ data: savedContact });

}

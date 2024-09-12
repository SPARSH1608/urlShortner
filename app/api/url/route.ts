"use server";
import prisma from "@/db/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

console.log(nanoid);
// console.log(id);

let id: string;
function generatesRandomId() {
  id = nanoid(4);
}
export async function GET() {
  return NextResponse.json({
    id: id,
  });
}
// Take the Url input from the user
export async function POST(req: NextRequest, res: NextResponse) {
  generatesRandomId();
  const body = await req.json();
  console.log(body.url);
  // this is not working as expected even after sending the new url string it is returning the same id. ---> Fixed the issue
  try {
    const doesUrlExists = await prisma.urls.findFirst({
      where: {
        originalLink: body.url,
      },
    });

    // console.log(doesUrlExists);

    if (doesUrlExists) {
      const updatedData = await prisma.urls.updateMany({
        where: {
          originalLink: body.url,
        },
        data: {
          originalLink: body.url,
          shortenUrl: id,
        },
      });
      console.log(updatedData);
      return NextResponse.json({
        originalLink: body.url,
        shortenUrl: id,
      });
    } else {
      const newUrl = await prisma.urls.create({
        data: {
          originalLink: body.url,
          shortenUrl: id,
        },
      });
      console.log(newUrl);
      return NextResponse.json({
        shortenUrl: id,
        "your input is": body.url,
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      messge: "Oops something went Wrong",
      id: id,
      error: err,
    });
  }
}

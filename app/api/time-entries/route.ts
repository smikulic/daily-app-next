import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";
import { ensureAuthenticated } from "../utils";

export async function GET(request: Request) {
  const session = await auth();

  if (!ensureAuthenticated(session)) {
    return new NextResponse("Unauthenticated!", { status: 401 });
  }

  const userId = session?.user.id;

  try {
    const timeEntries = await prisma.timeEntry.findMany({
      where: { userId },
      include: {
        user: true,
        project: true,
      },
      orderBy: {
        createdAt: "asc", // or 'desc' for descending order
      },
    });

    return new NextResponse(JSON.stringify(timeEntries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!ensureAuthenticated(session)) {
    return new NextResponse("Unauthenticated!", { status: 401 });
  }

  try {
    const userId = session?.user.id;
    const args = await request.json();

    const createdTimeEntry = await prisma.timeEntry.create({
      data: {
        name: args.name,
        hours: args.hours,
        date: args.date,
        billableAmount: args.billableAmount,
        project: { connect: { id: args.projectId } },
        user: { connect: { id: userId } },
      },
    });

    return new NextResponse(JSON.stringify(createdTimeEntry), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

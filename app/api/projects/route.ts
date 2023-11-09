import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";

export async function GET(request: Request) {
  const session = await auth();
  const userId = session?.user.id;
  // ensureAuthenticated(currentUser);

  try {
    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc", // or 'desc' for descending order
      },
    });

    return new NextResponse(JSON.stringify(projects), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user.id;
  // ensureAuthenticated(currentUser);

  try {
    const args = await request.json();

    const createdProject = await prisma.project.create({
      data: {
        name: args.name,
        rate: args.rate,
        currency: args.currency,
        user: { connect: { id: userId } },
      },
    });

    return new NextResponse(JSON.stringify(createdProject), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

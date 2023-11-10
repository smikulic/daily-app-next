import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";

// DELETE /api/time-entry/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // const session = await auth();
  // const userId = session?.user.id;
  // ensureAuthenticated(currentUser);

  try {
    const deletedTimeEntry = await prisma.timeEntry.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(JSON.stringify(deletedTimeEntry), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";

// DELETE /api/project/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // const session = await auth();
  // const userId = session?.user.id;
  // ensureAuthenticated(currentUser);

  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(JSON.stringify(deletedProject), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

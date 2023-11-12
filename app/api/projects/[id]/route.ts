import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";
import { ensureAuthenticated } from "../../utils";

// DELETE /api/project/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!ensureAuthenticated(session)) {
    return new NextResponse("Unauthenticated!", { status: 401 });
  }

  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(JSON.stringify(deletedProject), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

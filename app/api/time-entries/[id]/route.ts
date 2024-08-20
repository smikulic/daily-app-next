import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/app/auth";
import { ensureAuthenticated } from "../../utils";

// DELETE /api/time-entry/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!ensureAuthenticated(session)) {
    return new NextResponse("Unauthenticated!", { status: 401 });
  }

  try {
    const deletedTimeEntry = await prisma.timeEntry.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(JSON.stringify(deletedTimeEntry), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

// PATCH /api/time-entry/:id
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!ensureAuthenticated(session)) {
    return new NextResponse("Unauthenticated!", { status: 401 });
  }

  try {
    const userId = session?.user.id;
    const args = await request.json();
    const { name, hours } = args;

    // Ensure the time entry ID is provided
    if (!params.id) {
      return new NextResponse("Time entry ID is required", { status: 400 });
    }

    // Find the existing time entry to ensure it belongs to the current user
    const existingTimeEntry = await prisma.timeEntry.findUnique({
      where: { id: params.id },
      include: { user: true },
    });

    // If the time entry doesn't exist or doesn't belong to the user, return an error
    if (!existingTimeEntry || existingTimeEntry.userId !== userId) {
      return new NextResponse("Time entry not found or unauthorized", {
        status: 404,
      });
    }

    // Update the time entry with the provided data
    const updatedTimeEntry = await prisma.timeEntry.update({
      where: { id: params.id },
      data: {
        name: name ?? existingTimeEntry.name,
        hours: hours ?? existingTimeEntry.hours,
      },
    });

    return new NextResponse(JSON.stringify(updatedTimeEntry), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

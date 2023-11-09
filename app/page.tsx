// import prisma from "@/lib/prisma";
import TrackerForm from "@/components/tracker-form/tracker-form";

export default function TrackerPage() {
  // const users = await prisma.user.findMany();
  // console.log({ users });

  console.log("TrackerPage: ");

  return <TrackerForm />;
}

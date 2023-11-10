"use client";

// import prisma from "@/lib/prisma";
import TrackerForm from "@/components/tracker-form/tracker-form";
import { TimeEntry } from "@prisma/client";
import { useEffect, useState } from "react";

export default function TrackerPage() {
  // const users = await prisma.user.findMany();
  // console.log({ users });

  const [timeEntryData, setTimeEntryData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isRemoveTimeEntryLoading, setRemoveTimeEntryLoading] = useState(false);

  const getTimeEntries = async () => {
    fetch("/api/time-entries")
      .then((res) => res.json())
      .then((data) => {
        setTimeEntryData(data);
        setLoading(false);
      });
  };

  const onDeleteTimeEntry = async ({
    timeEntryId,
  }: {
    timeEntryId: string;
  }) => {
    setRemoveTimeEntryLoading(true);

    fetch(`/api/time-entries/${timeEntryId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        getTimeEntries();
      });
  };

  useEffect(() => {
    getTimeEntries();
  }, []);

  console.log("TrackerPage: ", { timeEntryData });

  return (
    <>
      <TrackerForm refetchTimeEntries={getTimeEntries} />

      <div className="flex flex-col items-center h-full w-full p-4">
        {isLoading && (
          <div className="relative h-16 w-full mb-2">Loading...</div>
        )}
        {!isLoading && (!timeEntryData || timeEntryData.length < 1) && (
          <div className="relative h-16 w-full mb-2">
            No time entries available
          </div>
        )}

        {!isLoading &&
          timeEntryData?.length > 0 &&
          timeEntryData.map((timeEntry: any) => {
            const timeEntryId = timeEntry.id;
            const formattedBillableAmount = new Intl.NumberFormat("DE-de", {
              style: "currency",
              currency: timeEntry.project.currency,
            }).format(timeEntry.billableAmount);

            return (
              <div key={timeEntryId} className="relative h-16 w-full mb-2">
                <div className="flex items-center justify-between px-4 h-16 bg-white border border-violet-100 rounded-l">
                  <div>{timeEntry.name}</div>
                  <div>{formattedBillableAmount}</div>
                  {/* <div>{formattedRate}</div> */}
                </div>
                <div className="absolute top-0 opacity-0 flex items-center justify-between px-4 h-16 w-full bg-violet-50 border border-violet-100 rounded-l hover:opacity-100 hover:z-10">
                  <div>{timeEntry.name}</div>
                  <div className="flex justify-end">
                    {isRemoveTimeEntryLoading && (
                      <div className="flex items-center">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Removing...</span>
                        </div>
                        <span className="text-sm">Removing...</span>
                      </div>
                    )}
                    {!isRemoveTimeEntryLoading && (
                      <>
                        <div className="mx-3 text-violet-900 cursor-pointer">
                          Edit
                        </div>
                        <div
                          className="mx-3 text-red-700 cursor-pointer"
                          onClick={() => onDeleteTimeEntry({ timeEntryId })}
                        >
                          Remove
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

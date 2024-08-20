"use client";

import { TimeEntry } from "@prisma/client";
import { useState } from "react";
import { Loading } from "../loading";

type EditTrackerFormType = {
  initialData: TimeEntry;
  refetchTimeEntries: () => void;
  onClose: () => void;
};

export default function EditTrackerForm({
  initialData,
  refetchTimeEntries,
  onClose,
}: EditTrackerFormType) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(initialData.name);
  const [hours, setHours] = useState(initialData.hours);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleHoursChange = (event: any) => {
    setHours(event.target.value);
  };

  const handleOnCreateTimeEntry = async () => {
    try {
      setLoading(true);

      await fetch(`/api/time-entries/${initialData.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          hours: Number(hours),
        }),
      });

      await refetchTimeEntries();

      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error updating time entry:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="relative my-2 h-12 border border-violet-300 rounded-xl">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full h-full pl-4 pr-4 rounded-2xl text-l text-gray-700 placeholder:text-gray-400 focus:outline-none"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      <div className="relative my-2 h-12 border border-violet-300 rounded-xl">
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div className="h-full flex items-center px-2">
            <input
              type="text"
              name="hours"
              id="hours"
              placeholder="0"
              className="h-full w-6 bg-transparent text-center text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              value={hours}
              onChange={handleHoursChange}
            />
          </div>
          <div className="h-full flex items-center pr-2 border-l-transparent border-violet-300">
            h
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center w-full justify-end h-full">
        <div
          className="p-2 mr-1 text-sm text-violet-100 bg-gray-600 rounded-xl cursor-pointer hover:text-violet-400"
          onClick={onClose}
        >
          Cancel
        </div>
        <div
          className="p-2 w-full text-sm text-center text-violet-100 bg-violet-600 rounded-xl cursor-pointer hover:text-violet-400"
          onClick={handleOnCreateTimeEntry}
        >
          {loading ? <Loading /> : "Save"}
        </div>
      </div>
    </div>
  );
}

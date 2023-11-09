"use client";

import { Project } from "@prisma/client";
import { useState } from "react";

type ProjectFormType = {
  onCreateProject: ({ name, rate, currency }: Project) => void;
};

// export default function ProjectForm({ onCreateProject }: ProjectFormType) {
export default function ProjectForm() {
  // const users = await prisma.user.findMany();
  // console.log({ users });
  const [timeEntryDate, setTimeEntryDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleTimeEntryDateChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setTimeEntryDate(newValue);
  };

  const onCreateProject = async ({
    name,
    rate,
    currency,
  }: Partial<Project>) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify({ name, rate, currency }),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("ProjectForm: ");

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full border-b py-4 pl-4 pr-20 text-xl text-gray-700 placeholder:text-gray-400 focus:outline-none"
          placeholder="Project name"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div className="h-full flex items-center px-2 border-l border-r">
            <input
              type="text"
              name="rate"
              id="rate"
              className="h-full w-10 bg-transparent text-center text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              placeholder="100"
            />
          </div>
          <div className="h-full flex items-center px-2 border-l-transparent border-r">
            <select
              id="currency"
              name="currency"
              className="h-full w-16 bg-transparent text-sm text-gray-700 truncate focus:outline-none"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div className="px-2">
            <div
              className="text-lime-600 cursor-pointer hover:text-lime-500"
              onClick={() =>
                onCreateProject({
                  name: "test project",
                  rate: 100,
                  currency: "USD",
                })
              }
            >
              <svg
                className="h-12 w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

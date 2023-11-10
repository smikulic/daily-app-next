"use client";

import { Project } from "@prisma/client";
import { useState } from "react";

type ProjectFormType = {
  refetchProjects: () => void;
  onCreateProject?: ({ name, rate, currency }: Partial<Project>) => void;
};

export default function ProjectForm({
  refetchProjects,
  onCreateProject,
}: ProjectFormType) {
  // const users = await prisma.user.findMany();
  // console.log({ users });
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleRateChange = (event: any) => {
    setRate(event.target.value);
  };

  const handleCurrencyChange = (event: any) => {
    setCurrency(event.target.value);
  };

  const handleOnCreateProject = ({
    name,
    rate,
    currency,
  }: Partial<Project>) => {
    setLoading(true);

    // onCreateProject({
    //   name,
    //   rate,
    //   currency,
    // });

    fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ name, rate, currency }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetchProjects();

        setLoading(false);
        setName("");
        setRate(0);
      });
  };

  console.log("ProjectForm: ", { loading });

  return (
    <div className="relative my-8 h-16 w-10/12 border border-violet-300 rounded-xl">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Project name"
        className="block w-full h-full pl-4 pr-20 rounded-2xl text-xl text-gray-700 placeholder:text-gray-400 focus:outline-none"
        value={name}
        onChange={handleNameChange}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <div className="h-full flex items-center px-2 border-l border-violet-300">
          <input
            type="number"
            name="rate"
            id="rate"
            placeholder="rate"
            className="h-full w-16 bg-transparent text-center text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            value={rate}
            onChange={handleRateChange}
          />
        </div>
        <div className="h-full flex items-center px-2">
          <select
            id="currency"
            name="currency"
            className="h-full w-16 bg-transparent text-sm text-gray-700 truncate focus:outline-none"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>
        <div className="h-full flex items-center px-2 border-l-transparent border-r border-violet-300">
          / hour
        </div>

        <div className="px-5 flex items-center h-full bg-violet-600 rounded-r-[0.7rem]">
          <div
            className="text-sm text-violet-100 bg-violet-600 cursor-pointer hover:text-violet-400"
            onClick={() =>
              handleOnCreateProject({ name, rate: Number(rate), currency })
            }
          >
            {loading ? (
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
                  <span className="sr-only">Saving...</span>
                </div>
                <span className="text-sm">Saving...</span>
              </div>
            ) : (
              "Save"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

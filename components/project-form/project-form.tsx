"use client";

import { Project } from "@prisma/client";
import { useState } from "react";
import { Loading } from "../loading";

type ProjectFormType = {
  refetchProjects: () => void;
  onCreateProject?: ({ name, rate, currency }: Partial<Project>) => void;
};

export default function ProjectForm({
  refetchProjects,
}: // onCreateProject,
ProjectFormType) {
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

  const handleOnCreateProject = async ({
    name,
    rate,
    currency,
  }: Partial<Project>) => {
    try {
      setLoading(true);

      // onCreateProject({
      //   name,
      //   rate,
      //   currency,
      // });

      await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify({ name, rate, currency }),
      });

      await refetchProjects();

      setLoading(false);
      setName("");
      setRate(0);
    } catch (error) {
      console.error("Error creating a project:", error);
      setLoading(false);
    }
  };

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
            {loading ? <Loading /> : "Save"}
          </div>
        </div>
      </div>
    </div>
  );
}

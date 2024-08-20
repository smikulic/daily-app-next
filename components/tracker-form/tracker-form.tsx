"use client";

import { Project } from "@prisma/client";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Loading } from "../loading";

type TrackerFormType = {
  refetchTimeEntries: () => void;
};

export default function TrackerForm({ refetchTimeEntries }: TrackerFormType) {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [hours, setHours] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [timeEntryDate, setTimeEntryDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const getProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();

      setProjectsData(data);
      setSelectedProjectId(data[0].id);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleHoursChange = (event: any) => {
    setHours(event.target.value);
  };

  const handleProjectChange = (event: any) => {
    setSelectedProjectId(event.target.value);
  };

  const handleTimeEntryDateChange = (newValue: any) => {
    setTimeEntryDate(newValue);
  };

  const handleOnCreateTimeEntry = async () => {
    try {
      setLoading(true);

      const selectedProject: Project = projectsData.filter(
        (project: Project) => project.id === selectedProjectId
      )[0];
      const billableAmount = selectedProject?.rate * hours;

      await fetch("/api/time-entries", {
        method: "POST",
        body: JSON.stringify({
          name,
          date: new Date(timeEntryDate.endDate).toISOString(),
          hours: Number(hours),
          billableAmount: Number(billableAmount),
          projectId: selectedProjectId,
        }),
      });

      await refetchTimeEntries();

      setLoading(false);
      setName("");
      setHours(0);
      setTimeEntryDate({
        startDate: new Date(),
        endDate: new Date(),
      });
    } catch (error) {
      console.error("Error creating time entry:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="relative my-8 h-16 w-10/12 border border-violet-300 rounded-xl">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="What are you working on?"
        className="block w-full h-full pl-4 pr-20 rounded-2xl text-l text-gray-700 placeholder:text-gray-400 focus:outline-none"
        value={name}
        onChange={handleNameChange}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <div className="h-full flex items-center px-2 border-l border-violet-300">
          <select
            id="project"
            name="project"
            className="h-full w-28 bg-transparent text-sm text-gray-700 truncate focus:outline-none"
            value={selectedProjectId}
            onChange={handleProjectChange}
          >
            {projectsData.map((project: Project) => {
              return (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="h-full flex items-center px-2">
          <Datepicker
            asSingle
            useRange={false}
            value={timeEntryDate}
            onChange={handleTimeEntryDateChange}
            placeholder={"Date"}
            displayFormat={"DD MMM YY"}
            inputClassName="w-28 text-sm focus:outline-none"
            toggleClassName="absolute right-0 h-full text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
          />
        </div>
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
        <div className="h-full flex items-center pr-2 border-l-transparent border-r border-violet-300">
          h
        </div>

        <div className="px-5 flex items-center h-full bg-violet-600 rounded-r-[0.7rem]">
          <div
            className="text-sm text-violet-100 bg-violet-600 cursor-pointer hover:text-violet-400"
            onClick={handleOnCreateTimeEntry}
          >
            {loading ? <Loading /> : "Save"}
          </div>
        </div>
      </div>
    </div>
  );
}

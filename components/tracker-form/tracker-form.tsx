"use client";

import { Project, TimeEntry } from "@prisma/client";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type TrackerFormType = {
  refetchTimeEntries: () => void;
};

export default function TrackerForm({ refetchTimeEntries }: TrackerFormType) {
  // const users = await prisma.user.findMany();
  // console.log({ users });

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
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjectsData(data);
        // setLoading(false);
      });
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
    console.log("newValue:", newValue);
    setTimeEntryDate(newValue);
  };

  const handleOnCreateTimeEntry = () => {
    setLoading(true);

    const selectedProject: Project = projectsData.filter(
      (project: Project) => project.id === selectedProjectId
    )[0];
    const billableAmount = selectedProject.rate * hours;

    fetch("/api/time-entries", {
      method: "POST",
      body: JSON.stringify({
        name,
        date: timeEntryDate.endDate,
        hours: Number(hours),
        billableAmount: Number(billableAmount),
        projectId: selectedProjectId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetchTimeEntries();

        setLoading(false);
        setName("");
        // setRate(0);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  console.log("TrackerForm: ");

  return (
    <div className="relative my-8 h-16 w-10/12 border border-violet-300 rounded-xl">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="What are you working on?"
        className="block w-full h-full pl-4 pr-20 rounded-2xl text-xl text-gray-700 placeholder:text-gray-400 focus:outline-none"
        value={name}
        onChange={handleNameChange}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <div className="h-full flex items-center px-2 border-l border-violet-300">
          <select
            id="project"
            name="project"
            className="h-full w-32 bg-transparent text-sm text-gray-700 truncate focus:outline-none"
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
            {/* <option>Glean Analytics hehe</option>
            <option>Project 2</option>
            <option>Project 3</option> */}
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

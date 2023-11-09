"use client";

import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { SelectChangeEvent } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";

export default function TrackerForm() {
  // const users = await prisma.user.findMany();
  // console.log({ users });
  // const [age, setAge] = useState("");
  const [timeEntryDate, setTimeEntryDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleTimeEntryDateChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setTimeEntryDate(newValue);
  };

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  console.log("TrackerForm: ");

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          name="timeEntry"
          id="timeEntry"
          className="block w-full border-b py-4 pl-4 pr-20 text-xl text-gray-700 placeholder:text-gray-400 focus:outline-none"
          placeholder="What are you working on?"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div className="h-full flex items-center px-2 border-l border-r">
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
              <span className="text-gray-700">h</span>
            </div> */}
            <input
              type="number"
              name="hours"
              id="hours"
              className="h-full w-10 bg-transparent text-center text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              placeholder="8 h"
            />
          </div>
          <div className="h-full flex items-center pl-3 border-l-transparent border-r">
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
          <div className="h-full flex items-center px-2 border-l-transparent border-r">
            <select
              id="project"
              name="project"
              className="h-full w-32 bg-transparent text-sm text-gray-700 truncate focus:outline-none"
            >
              <option>Glean Analytics hehe</option>
              <option>Project 2</option>
              <option>Project 3</option>
            </select>
          </div>
          <div className="px-2">
            <div className="text-lime-600 cursor-pointer hover:text-lime-500">
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

    // <Grid container spacing={1}>
    //   <Grid xs={12}>
    //     <TextField
    //       fullWidth
    //       label="What are you working on?"
    //       id="timeEntryName"
    //     />
    //   </Grid>
    //   <Grid xs={3}>
    //     <TextField label="Hours" id="hours" type="number" />
    //   </Grid>
    //   <Grid xs={5}>
    //     <FormControl fullWidth>
    //       <InputLabel id="project-label">project</InputLabel>
    //       <Select
    //         labelId="project-label"
    //         id="project"
    //         value={age}
    //         label="Project"
    //         onChange={handleChange}
    //       >
    //         <MenuItem value={10}>Ten</MenuItem>
    //         <MenuItem value={20}>Twenty</MenuItem>
    //         <MenuItem value={30}>Thirty</MenuItem>
    //       </Select>
    //     </FormControl>
    //   </Grid>
    // </Grid>
  );
}

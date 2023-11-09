"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/project-form/project-form";
import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

export default function ProjectsPage() {
  // const projects = await prisma.project.findMany({
  //   where: { userId: currentUser.id },
  //   include: {
  //     user: true,
  //   },
  //   orderBy: {
  //     createdAt: "asc", // or 'desc' for descending order
  //   },
  // });

  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // const getProjects = async () => {
  //   try {
  //     const response = await fetch("/api/projects", {
  //       method: "GET",
  //     });
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjectsData(data);
        setLoading(false);
      });
  }, []);

  console.log("ProjectsPage: ", { projectsData });

  return (
    <>
      <ProjectForm />
      {isLoading && <p>Loading...</p>}
      {!isLoading && (!projectsData || projectsData.length < 1) && (
        <p>No projects data</p>
      )}
      {!isLoading &&
        projectsData?.length > 0 &&
        projectsData.map((project: Project) => {
          return <p key={project.id}>{project.name}</p>;
        })}
    </>
  );
  // return <ProjectForm onCreateProject={onCreateProject} />;
}

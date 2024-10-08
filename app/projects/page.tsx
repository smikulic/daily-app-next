"use client";

import { useEffect, useState } from "react";
import ProjectForm from "@/components/project-form/project-form";
import { Project } from "@prisma/client";
// import prisma from "@/lib/prisma";

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
  const [isRemoveProjectLoading, setRemoveProjectLoading] = useState(false);

  const getProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();

      setProjectsData(data);
      setLoading(false);
      setRemoveProjectLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // const onCreateProject = async ({
  //   name,
  //   rate,
  //   currency,
  // }: Partial<Project>) => {
  //   // setLoading(true);

  //   fetch("/api/projects", {
  //     method: "POST",
  //     body: JSON.stringify({ name, rate, currency }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       getProjects();
  //       // setLoading(false);
  //     });
  // };

  const onDeleteProject = async ({ projectId }: { projectId: string }) => {
    setRemoveProjectLoading(true);

    fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        getProjects();
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <ProjectForm
        // onCreateProject={onCreateProject}
        refetchProjects={getProjects}
      />
      <div className="flex flex-col items-center h-full w-full p-4">
        {isLoading && (
          <div className="relative h-16 w-full mb-2">Loading...</div>
        )}
        {!isLoading && (!projectsData || projectsData.length < 1) && (
          <div className="relative h-16 w-full mb-2">No projects available</div>
        )}

        {!isLoading &&
          projectsData?.length > 0 &&
          projectsData.map((project: Project) => {
            const projectId = project.id;
            const formattedRate = new Intl.NumberFormat("DE-de", {
              style: "currency",
              currency: project.currency,
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(project.rate);

            return (
              <div key={projectId} className="relative h-16 w-full mb-2">
                <div className="flex items-center justify-between px-4 h-16 bg-white border border-violet-100 rounded-l">
                  <div>{project.name}</div>
                  <div>{formattedRate}</div>
                </div>
                <div className="absolute top-0 opacity-0 flex items-center justify-between px-4 h-16 w-full bg-violet-50 border border-violet-100 rounded-l hover:opacity-100 hover:z-10">
                  <div>{project.name}</div>
                  <div className="flex justify-end">
                    {isRemoveProjectLoading && (
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
                    {!isRemoveProjectLoading && (
                      <>
                        <div className="mx-3 text-violet-900 cursor-pointer">
                          Edit
                        </div>
                        <div
                          className="mx-3 text-red-700 cursor-pointer"
                          onClick={() => onDeleteProject({ projectId })}
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

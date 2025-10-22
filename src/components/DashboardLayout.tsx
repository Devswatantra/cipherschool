"use client";
import React, { useState, useEffect } from "react";
// Step 1: 'dispatch' ko 'useSandpack' se import karein
import { useSandpack } from "@codesandbox/sandpack-react";
import FileExplorer from "@/components/FileExplorer";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";
import { SandpackProvider } from "@codesandbox/sandpack-react";

import {
  saveProject,
  updateProject,
  getProject,
  getAllProjects,
  deleteProject,
} from "@/app/services/api";

import { defaultFiles } from "@/app/(dashboard)/dashboard/page";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Logo from "./Logo";

interface SavedProject {
  _id: string;
  name: string;
  updatedAt: string;
}

const DashboardLayout: React.FC = () => {
  //updatedone

  const [file, setFile] = useState(defaultFiles);
  const [template, setTemplate] = useState("react");
  // Step 2: 'sandpack' aur 'dispatch' ko hook se lein
  const { sandpack, dispatch } = useSandpack();
  // 'files' ko 'sandpack' object se lein
  const { files } = sandpack;

  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("Untitled Project");
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAllSavedProjects();
  }, []);

  const loadAllSavedProjects = async () => {
    setIsLoading(true);
    try {
      const projects = await getAllProjects();
      setSavedProjects(projects);
    } catch (err: any) {
      console.error("Failed to load projects:", err);
      if (err.response?.status === 401) {
        signOut();
      }
    }
    setIsLoading(false);
  };

  const handleSaveOrUpdate = async () => {
    setIsLoading(true);
    try {
      if (currentProjectId) {
        const updated = await updateProject(
          currentProjectId,
          projectName,
          files
        );
        console.log("Project Updated:", updated);
      } else {
        const newName = prompt("Enter project name:", projectName);
        if (!newName) {
          setIsLoading(false);
          return;
        }

        const saved = await saveProject(newName, files);
        setCurrentProjectId(saved._id);
        setProjectName(saved.name);
        console.log("Project Saved:", saved);
      }
      loadAllSavedProjects();
      alert("Project saved successfully!");
    } catch (err) {
      console.error("Failed to save/update project:", err);
      alert("Error saving project.");
    }
    setIsLoading(false);
  };

  const handleLoadProject = async (projectId: string) => {
    setIsLoading(true);
    try {
      const project = await getProject(projectId);

      //updated
      setFile(project.file); // save to local state
      setTemplate(project.template || "react"); // optional: handle multiple languages

      // Step 3: 'resetFiles' ko 'dispatch' se replace karein
      dispatch({ type: "reset", files: project.files });
      setCurrentProjectId(project._id);
      setProjectName(project.name);
      console.log("Project Loaded:", project);
    } catch (err) {
      console.error("Failed to load project:", err);
    }
    setIsLoading(false);
  };

  const handleDeleteProject = async (
    e: React.MouseEvent,
    projectId: string
  ) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    setIsLoading(true);
    try {
      await deleteProject(projectId);
      if (currentProjectId === projectId) {
        handleNewProject();
      }
      loadAllSavedProjects();
      alert("Project Deleted");
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
    setIsLoading(false);
  };

  const handleNewProject = () => {
    // Step 4: 'resetFiles' ko 'dispatch' se replace karein
    //updated
    setFile(defaultFiles);
    dispatch({ type: "reset", files: defaultFiles });
    setCurrentProjectId(null);
    setProjectName("Untitled Project");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-gray-200">
      {/* === HEADER: SAVE / NEW BUTTONS === */}
      <header className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700 flex-shrink-0">
        <Logo />
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="bg-gray-800 text-white text-lg font-bold border-none rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={handleNewProject}
            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 cursor-pointer rounded-md text-sm"
          >
            New
          </button>
          <button
            onClick={handleSaveOrUpdate}
            disabled={isLoading}
            className="bg-primary hover:bg-primary-500 text-white px-4 py-1 cursor-pointer rounded-md text-sm font-semibold disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : currentProjectId ? "Update" : "Save"}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Logout"
            className="p-2 hover:bg-gray-700 rounded-full cursor-pointer"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* === MAIN CONTENT AREA === */}
      <div className="flex flex-1 overflow-hidden">
        {/* updtaed */}

        {/* === SAVED PROJECTS (NEW SIDEBAR) === */}
        <div className="w-48 flex-shrink-0 bg-gray-900 border-r border-gray-700 overflow-y-auto p-4">
          <h2 className="text-sm font-bold text-primary uppercase mb-4 font-bold font-roboto  ">
            My Projects
          </h2>
          <nav className="space-y-1">
            {isLoading && <p>Loading...</p>}
            {savedProjects.map((proj) => (
              <div
                key={proj._id}
                onClick={() => handleLoadProject(proj._id)}
                className={`group flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  currentProjectId === proj._id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="truncate">{proj.name}</span>
                <button
                  onClick={(e) => handleDeleteProject(e, proj._id)}
                  className="p-1 rounded-md text-gray-400 hover:text-primary opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Delete Project"
                >
                  X
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* === FILE EXPLORER (Aapka component) === */}
        <div className="w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <FileExplorer />
        </div>

        {/* === EDITOR + PREVIEW === */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col border-b md:border-b-0 md:border-r border-gray-700">
            <CodeEditor />
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
            <LivePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

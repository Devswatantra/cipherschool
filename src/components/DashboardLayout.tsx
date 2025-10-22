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

// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   SandpackProvider,
//   useSandpack, // Import useSandpack
//   SandpackLayout,
//   SandpackFileExplorer,
//   SandpackCodeEditor,
//   SandpackPreview,
// } from "@codesandbox/sandpack-react";
// // import { nightOwl } from "@codesandbox/sandpack-themes";
// import * as api from "@/app/services/api"; // Import all API functions
// import { File, Plus, Save, Trash2, X } from "lucide-react";
// import { toast } from "sonner";

// // Sandpack se files ka type
// type SandpackFiles = api.FilesObject;

// // Database se project ka type
// interface Project {
//   _id: string;
//   name: string;
//   files: SandpackFiles;
//   user: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // Default files jab "New" button par click ho
// const defaultFiles = {
//   "/App.js": {
//     code: `export default function App() {
//   return <h1>Hello CipherStudio!</h1>
// }`,
//   },
//   "/index.js": {
//     code: `import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );`,
//   },
//   "/public/index.html": { code: `<div id="root"></div>` },
// };

// // Yeh component SandpackProvider ke andar render hota hai
// // Taaki hum useSandpack hook ka istemal kar sakein
// const DashboardContent: React.FC = () => {
//   // Sandpack hook se state aur methods lein
//   // FIX: resetFiles ki jagah 'dispatch' ka istemal karein
//   const { sandpack, dispatch } = useSandpack();
//   const { files } = sandpack; // Current files in editor

//   const [projects, setProjects] = useState<Project[]>([]);
//   const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
//   const [currentProjectName, setCurrentProjectName] =
//     useState<string>("New Project");
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Page load par saare projects fetch karein
//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         setIsLoading(true);
//         const data = await api.getAllProjects();
//         setProjects(data);
//       } catch (error) {
//         console.error("Failed to fetch projects:", error);
//         toast.error("Could not load projects.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadProjects();
//   }, []);

//   // 2. Ek naya project load karein (ya editor reset karein)
//   const handleNewProject = () => {
//     setCurrentProjectId(null);
//     setCurrentProjectName("New Project");
//     // FIX: resetFiles(defaultFiles) ki jagah dispatch ka istemal karein
//     dispatch({ type: "reset", files: defaultFiles });
//     toast.success("New project started!");
//   };

//   // 3. Database se project load karein aur editor update karein
//   const handleLoadProject = async (project: Project) => {
//     try {
//       // API se latest data fetch karein (cache-buster api.ts mein hai)
//       const loadedProject = await api.getProject(project._id);

//       setCurrentProjectId(loadedProject._id);
//       setCurrentProjectName(loadedProject.name);

//       // DEBUG: Check karein ki API se kya files aa rahi hain
//       console.log("DEBUG: Files from API:", loadedProject.files);

//       // FIX: Sandpack editor ko API se aaye files se update karein
//       dispatch({ type: "reset", files: loadedProject.files });

//       toast.success(`Project "${loadedProject.name}" loaded!`);
//     } catch (error) {
//       console.error("Failed to load project:", error);
//       toast.error("Failed to load project.");
//     }
//   };

//   // 4. Project ko SAVE (agar naya hai) ya UPDATE (agar purana hai) karein
//   const handleSaveOrUpdate = async () => {
//     // Sandpack se current files object lein
//     const currentFiles = files;

//     try {
//       if (currentProjectId) {
//         // --- UPDATE EXISTING PROJECT ---
//         const updatedProject = await api.updateProject(
//           currentProjectId,
//           currentProjectName,
//           currentFiles
//         );
//         setProjects(
//           projects.map((p) => (p._id === currentProjectId ? updatedProject : p))
//         );
//         toast.success(`Project "${updatedProject.name}" updated!`);
//       } else {
//         // --- SAVE NEW PROJECT ---
//         let projectName = currentProjectName;
//         if (projectName === "New Project") {
//           projectName = prompt(
//             "Enter a name for your project:",
//             "My React App"
//           );
//           if (!projectName) return; // User cancelled
//         }

//         const newProject = await api.saveProject(projectName, currentFiles);
//         setProjects([...projects, newProject]); // List mein add karein
//         setCurrentProjectId(newProject._id); // Naya ID set karein
//         setCurrentProjectName(newProject.name);
//         toast.success(`Project "${newProject.name}" saved!`);
//       }
//     } catch (error) {
//       console.error("Failed to save/update project:", error);
//       toast.error("Failed to save project.");
//     }
//   };

//   // 5. Project ko DELETE karein
//   const handleDeleteProject = async (
//     e: React.MouseEvent,
//     projectId: string
//   ) => {
//     e.stopPropagation(); // Parent (handleLoadProject) ko trigger hone se rokein
//     if (!window.confirm("Are you sure you want to delete this project?"))
//       return;

//     try {
//       await api.deleteProject(projectId);
//       setProjects(projects.filter((p) => p._id !== projectId));

//       // Agar current project delete hua hai, toh editor reset karein
//       if (currentProjectId === projectId) {
//         handleNewProject();
//       }
//       toast.success("Project deleted.");
//     } catch (error) {
//       console.error("Failed to delete project:", error);
//       toast.error("Failed to delete project.");
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-800 text-gray-200">
//       {/* Header Bar */}
//       <header className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700 flex-shrink-0">
//         <h1 className="text-xl font-bold text-white">
//           <input
//             type="text"
//             value={currentProjectName}
//             onChange={(e) => setCurrentProjectName(e.target.value)}
//             className="bg-transparent text-white font-bold text-xl rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </h1>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleNewProject}
//             className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
//           >
//             <Plus size={16} />
//             New
//           </button>
//           <button
//             onClick={handleSaveOrUpdate}
//             className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             <Save size={16} />
//             {currentProjectId ? "Update" : "Save"}
//           </button>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Project List Sidebar */}
//         <aside className="w-56 flex-shrink-0 bg-gray-900 border-r border-gray-700 p-4 flex flex-col">
//           <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
//             My Projects
//           </h2>
//           <nav className="flex-1 overflow-y-auto space-y-1 pr-2">
//             {isLoading ? (
//               <p className="text-gray-400">Loading...</p>
//             ) : (
//               projects.map((project) => (
//                 <div
//                   key={project._id}
//                   onClick={() => handleLoadProject(project)}
//                   className={`
//                     group flex items-center justify-between p-2 rounded-md cursor-pointer
//                     ${
//                       currentProjectId === project._id
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                     }
//                   `}
//                 >
//                   <span className="flex-1 truncate">{project.name}</span>
//                   <button
//                     onClick={(e) => handleDeleteProject(e, project._id)}
//                     className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </div>
//               ))
//             )}
//           </nav>
//         </aside>

//         {/* Sandpack IDE Layout (File Explorer, Editor, Preview) */}
//         <SandpackLayout className="flex-1 overflow-hidden">
//           <SandpackFileExplorer
//             autoHidden={false}
//             className="w-56 flex-shrink-0 border-r border-gray-700"
//           />
//           <SandpackCodeEditor
//             showTabs
//             showLineNumbers
//             wrapContent
//             className="flex-1"
//           />
//           <SandpackPreview showNavigator showRefreshButton className="flex-1" />
//         </SandpackLayout>
//       </div>
//     </div>
//   );
// };

// // Main Dashboard component (wrapper)
// const DashboardPage: React.FC = () => {
//   return (
//     // SandpackProvider ko yahaan rakhein taaki DashboardContent hook istemal kar sake
//     <SandpackProvider
//       template="react"
//       files={defaultFiles} // Start with default files
//       options={{
//         editorHeight: "100%", // Editor ko poori height dein
//       }}
//     >
//       <DashboardContent />
//     </SandpackProvider>
//   );
// };

// export default DashboardPage;

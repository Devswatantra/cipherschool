"use client";
import React from "react";
// 1. Import useSandpack to connect to the provider
import { useSandpack } from "@codesandbox/sandpack-react";

// 2. Import icons for a better UI
import { AiFillDelete } from "react-icons/ai";
import { File, Plus } from "lucide-react"; // (npm install lucide-react)

const FileExplorer: React.FC = () => {
  // 3. Get all sandpack state and methods from the hook
  const { sandpack } = useSandpack();
  const { files, activeFile, setActiveFile, addFile, deleteFile } = sandpack;

  const handleAddFile = () => {
    const name = prompt("File name (e.g., /styles.css):");
    // 4. Use Sandpack's addFile method
    if (name) addFile(name, "");
  };

  const handleDeleteFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    fileName: string
  ) => {
    // Stop the click from also triggering the setActiveFile on the parent
    e.stopPropagation();
    // 5. Use Sandpack's deleteFile method
    deleteFile(fileName);
  };

  return (
    // Main container: full height, flex column, dark bg, padding
    <div className="file-explorer h-full flex flex-col bg-gray-900 p-4">
      {/* Header section with Title and "New File" button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider font-roboto ">
          File Explorer
        </h2>
        <button
          onClick={handleAddFile}
          className="p-1 text-gray-400 hover:text-white hover:bg-primary cursor-pointer rounded-md"
          title="New File"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* List of files */}
      <nav className="flex-1 overflow-y-auto space-y-1">
        {/* 6. Map over the files object from Sandpack */}
        {Object.keys(files).map((fileName) => {
          // Check if this file is the currently active one
          const isActive = activeFile === fileName;
          return (
            <div
              key={fileName}
              onClick={() => setActiveFile(fileName)} // Set active file on click
              title={fileName}
              className={`
                flex items-center justify-between w-full p-2 rounded-md cursor-pointer
                group ${
                  isActive
                    ? "bg-gray-700 text-white" // Active file style
                    : "text-gray-300 hover:bg-gray-800 hover:text-white" // Inactive file style
                }
              `}
            >
              {/* File icon and name */}
              <div className="flex items-center gap-2 flex-1 truncate">
                <File size={16} className="flex-shrink-0" />
                <span className="flex-1 truncate">
                  {fileName.substring(1)}
                </span>{" "}
                {/* Remove leading "/" */}
              </div>

              {/* Delete button (shows on hover) */}
              <button
                onClick={(e) => handleDeleteFile(e, fileName)}
                className="
                  flex-shrink-0 p-1 rounded-md text-gray-500
                  hover:text-red-500 hover:bg-gray-700
                  opacity-0 group-hover:opacity-100 transition-opacity " // Show on hover
              >
                <AiFillDelete size={16} />
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default FileExplorer;

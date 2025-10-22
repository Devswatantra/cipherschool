"use client";
import { createContext, useState, ReactNode } from "react";
import { File } from "../types";

interface ProjectContextType {
  files: File[];
  setFiles: (files: File[]) => void;
  activeFile: string;
  setActiveFile: (file: string) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [files, setFiles] = useState<File[]>([
    {
      name: "App.tsx",
      code: "export default function App() { return <h1>Hello</h1> }",
    },
  ]);
  const [activeFile, setActiveFile] = useState<string>("App.tsx");

  return (
    <ProjectContext.Provider
      value={{ files, setFiles, activeFile, setActiveFile }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

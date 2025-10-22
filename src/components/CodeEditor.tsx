// "use client";
// import React, { useContext } from "react";
// import { ProjectContext } from "@/app/context/ProjectContext";
// import { Sandpack } from "@codesandbox/sandpack-react";

// const CodeEditor: React.FC = () => {
//   const context = useContext(ProjectContext);
//   if (!context) return null;

//   const { files, activeFile, setFiles } = context;

//   const activeCode = files.find((f) => f.name === activeFile)?.code || "";

//   const updateCode = (newCode: string) => {
//     setFiles(
//       files.map((f) => (f.name === activeFile ? { ...f, code: newCode } : f))
//     );
//   };

//   return (
//     <Sandpack
//       template="react-ts"
//       files={{
//         [activeFile]: activeCode,
//       }}
//       customSetup={{
//         entry: activeFile,
//       }}
//       options={{
//         editorHeight: 500,
//         showLineNumbers: true,
//         onUpdate: (code) => updateCode(code),
//       }}
//     />
//   );
// };

// export default CodeEditor;

"use client";
import React from "react";
// 1. We import SandpackCodeEditor, not the all-in-one Sandpack component.
import { SandpackCodeEditor } from "@codesandbox/sandpack-react";

// 2. The ProjectContext logic is no longer needed *here*
// because SandpackProvider in dashboard.tsx now manages the
// files, active file, and code updates.
//
// import { useContext } from "react";
// import { ProjectContext } from "@/app/context/ProjectContext";

const CodeEditor: React.FC = () => {
  /*
  // 3. All this logic is now handled by the SandpackProvider
  //    in pages/dashboard.tsx.
  const context = useContext(ProjectContext);
  if (!context) return null;
  const { files, activeFile, setFiles } = context;
  const activeCode = files.find((f) => f.name === activeFile)?.code || "";
  const updateCode = (newCode: string) => {
    setFiles(
      files.map((f) => (f.name === activeFile ? { ...f, code: newCode } : f))
    );
  };
  */

  return (
    // 4. This wrapper div takes up the full height of its parent panel
    <div className="h-full w-full bg-gray-900 ">
      <SandpackCodeEditor
        // 5. We apply a dark theme to match the IDE
        theme="dark"
        // 6. We tell the editor to fill its parent div (100% height)
        style={{ height: "100%" }}
        showTabs={true} // Shows file tabs
        showLineNumbers={true}
        wrapContent={true}

        // 7. That's it! All file content, file switching, and
        //    code updates are automatically handled by the
        //    SandpackProvider in dashboard.tsx.
      />
    </div>
  );
};

export default CodeEditor;

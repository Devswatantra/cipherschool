// "use client";
// import React from "react";
// import { signOut } from "next-auth/react";
// import { Button } from "@/components/ui/button";

// const Dashboardpage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b via-white from-white to-primary overflow-hidden">
//       Dashboard
//       <div >
//         <Button onClick={() => signOut()}>Sign Out</Button>
//       </div>
//     </div>
//   );
// };

// export default Dashboardpage;

"use client";

// import React from "react";
// import { ProjectProvider } from "@/app/context/ProjectContext";
// import FileExplorer from "@/components/FileExplorer";
// import CodeEditor from "@/components/CodeEditor";
// import LivePreview from "@/components/LivePreview";

// const Dashboard: React.FC = () => {
//   return (
//     <ProjectProvider>
//       <div className="flex h-screen">
//         {/* File Explorer */}
//         <div className="w-1/5 border-r border-gray-300 p-2">
//           <FileExplorer />
//         </div>

//         {/* Code Editor */}
//         <div className="w-2/5 p-2">
//           <CodeEditor />
//         </div>

//         {/* Live Preview */}
//         <div className="w-2/5 p-2">
//           <LivePreview />
//         </div>
//       </div>
//     </ProjectProvider>
//   );
// };

// export default Dashboard;

// import React from "react";
// import { ProjectProvider } from "@/app/context/ProjectContext";
// import FileExplorer from "@/components/FileExplorer";
// import CodeEditor from "@/components/CodeEditor";
// import LivePreview from "@/components/LivePreview";

// // Import SandpackProvider
// import { SandpackProvider } from "@codesandbox/sandpack-react";

// // Dummy files for Sandpack.
// // In your final app, these files would come from your ProjectContext.
// const sandpackFiles = {
//   "/App.js": `export default function App() {
//   return <h1>Hello CipherStudio!</h1>
// }`,
//   "/index.js": `import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );`,
// };

// const Dashboard: React.FC = () => {
//   return (
//     <ProjectProvider>
//       {/*
//         SandpackProvider MUST wrap all components (Explorer, Editor, Preview)
//         so they can all share the same code and stay in sync.
//       */}
//       <SandpackProvider files={sandpackFiles} template="react">
//         {/* Main container:
//           - flex: enables the horizontal 3-column layout
//           - h-screen: makes the dashboard fill the full screen height
//           - bg-gray-800: sets a base dark background color
//           - text-gray-200: sets the default text color to be light
//         */}
//         <div className="flex h-screen bg-gray-800 text-gray-200">
//           {/* File Explorer (Left Panel) */}
//           <div className="w-1/5 border-r border-gray-700 bg-gray-900 overflow-y-auto">
//             {/* This panel has a slightly darker background for contrast.
//               'overflow-y-auto' adds scrolling if the file list gets long.
//               We remove the 'p-2' so the FileExplorer component can fill the panel.
//             */}
//             <FileExplorer />
//           </div>

//           {/* Code Editor (Center Panel) */}
//           <div className="w-2/5 border-r border-gray-700 flex flex-col">
//             {/* 'flex flex-col' is crucial. It makes this panel a column,
//               allowing the CodeEditor component inside to use 'h-full'
//               and stretch to fill the vertical space.
//             */}
//             <CodeEditor />
//           </div>

//           {/* Live Preview (Right Panel) */}
//           <div className="w-2/5 flex flex-col">
//             {/* 'flex flex-col' is also crucial here for the
//               LivePreview component to stretch to 'h-full'.
//             */}
//             <LivePreview />
//           </div>
//         </div>
//       </SandpackProvider>
//     </ProjectProvider>
//   );
// };

// export default Dashboard;

// import React from "react";
// // We no longer need ProjectProvider if using useSandpack hooks
// // import { ProjectProvider } from "@/app/context/ProjectContext";
// import FileExplorer from "@/components/FileExplorer";
// import CodeEditor from "@/components/CodeEditor";
// import LivePreview from "@/components/LivePreview";
// import { SandpackProvider } from "@codesandbox/sandpack-react";

// // Dummy files for Sandpack.
// // In your final app, these files would come from your backend.
// const sandpackFiles = {
//   "/App.js": `export default function App() {
//   return <h1>Hello CipherStudio!</h1>
// }`,
//   "/index.js": `import React from "react";
// import ReactDOM from "react-dom/client"; // IMPORTANT: Use /client for React 18+
// import App from "./App";

// // IMPORTANT: Use createRoot for React 18+
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );`,
//   "/styles.css": `body {
//   font-family: sans-serif;
//   margin: 20px;
//   background-color: #f0f0f0;
// }`,
//   "/public/index.html": `<div id="root"></div>`,
// };

// const Dashboard: React.FC = () => {
//   return (
//     // <ProjectProvider>  // Remove ProjectProvider as it's replaced by SandpackProvider
//     <SandpackProvider files={sandpackFiles} template="react">
//       {/* Main container:
//           - flex flex-col: make it a vertical flex container
//           - h-screen: occupy full screen height
//           - bg-gray-800 text-gray-200: dark theme
//         */}
//       <div className="flex flex-col h-screen bg-gray-800 text-gray-200">
//         {/* Optional: Add a simple header bar for project title/save buttons */}
//         <header className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
//           <h1 className="text-xl font-bold text-white">CipherStudio</h1>
//           <span className="text-sm text-gray-400">/ MyAwesomeProject</span>
//           {/* Add Save/Settings buttons here if you like, similar to my initial suggestion */}
//         </header>

//         {/* Main content area: File Explorer, Code Editor, Live Preview */}
//         {/*
//             - flex: makes children horizontal
//             - flex-1: allows this section to grow and take all remaining vertical space
//             - overflow-hidden: prevents scrollbars from main container if children overflow
//           */}
//         <div className="flex flex-1 overflow-hidden">
//           {/* File Explorer (Left Panel) */}
//           {/*
//               - w-64: fixed width for the file explorer (or w-1/5 as you had it)
//               - flex-shrink-0: prevents it from shrinking
//               - bg-gray-900 border-r border-gray-700: styling
//               - overflow-y-auto: scrollable if file list is long
//             */}
//           <div className="w-64 flex-shrink-0 bg-gray-900 border-r border-gray-700 overflow-y-auto">
//             <FileExplorer />
//           </div>

//           {/* Editor and Preview container (Right two-thirds) */}
//           {/*
//               - flex-1: allows this section to grow and take all remaining horizontal space
//               - flex flex-col md:flex-row: On medium screens and up, it becomes a horizontal flex container
//                                           for the editor and preview. On smaller screens, it would stack.
//               - overflow-hidden: important to contain children correctly
//             */}
//           <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
//             {/* Code Editor (Center Panel) */}
//             {/*
//                 - flex-1: allows the editor to grow and take its share of space
//                 - h-1/2 md:h-full: on smaller screens, half height, on medium+, full height
//                 - flex flex-col: makes the editor's panel a vertical flex container for its contents
//                 - border-b md:border-b-0 md:border-r border-gray-700: responsive borders
//               */}
//             <div className="flex-1 h-1/2 md:h-full flex flex-col border-b md:border-b-0 md:border-r border-gray-700">
//               <CodeEditor />
//             </div>

//             {/* Live Preview (Right Panel) */}
//             {/*
//                 - flex-1: allows the preview to grow and take its share of space
//                 - h-1/2 md:h-full: on smaller screens, half height, on medium+, full height
//                 - flex flex-col: makes the preview's panel a vertical flex container for its contents
//               */}
//             <div className="flex-1 h-1/2 md:h-full flex flex-col overflow-y-auto">
//               <LivePreview />
//             </div>
//           </div>
//         </div>
//       </div>
//     </SandpackProvider>
//     // </ProjectProvider>
//   );
// };

// export default Dashboard;

// pages/dashboard.tsx

//

"use client"; // Yeh "use client" zaroori hai SandpackProvider ke liye
import React from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import DashboardLayout from "@/components/DashboardLayout"; // Hum yeh file abhi banayenge

// Yeh aapke default files hain jab koi "New Project" banata hai
export const defaultFiles = {
  "/App.js": `export default function App() {
  return <h1>Hello CipherStudio!</h1>
}`,
  "/index.js": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  "/public/index.html": `<div id="root"></div>`,
};

const DashboardPage: React.FC = () => {
  return (
    // SandpackProvider poore layout ko wrap karega

    <SandpackProvider files={defaultFiles} template="react">
      <DashboardLayout />
    </SandpackProvider>

    // <DashboardLayout /> //updated one
  );
};

export default DashboardPage;

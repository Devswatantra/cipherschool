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

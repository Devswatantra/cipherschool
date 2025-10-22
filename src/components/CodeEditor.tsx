"use client";
import React from "react";
// 1. We import SandpackCodeEditor, not the all-in-one Sandpack component.
import { SandpackCodeEditor } from "@codesandbox/sandpack-react";

const CodeEditor: React.FC = () => {
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

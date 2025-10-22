"use client";
import React from "react";
import { SandpackPreview } from "@codesandbox/sandpack-react";

const LivePreview: React.FC = () => {
  return (
    <div className="h-full w-full bg-white overflow-auto">
      <SandpackPreview
        showNavigator={true}
        showRefreshButton={true}
        // Add this style to make the preview fill the panel vertically
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default LivePreview;

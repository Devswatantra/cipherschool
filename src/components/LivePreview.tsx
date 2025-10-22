// "use client";
// import React from "react";
// import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";

// const LivePreview: React.FC = () => {
//   const files = {
//     "/index.js": `console.log("Hello Sandpack");`,
//   };

//   return (
//     <SandpackProvider files={files} template="react">
//       <div className="h-[500px] border border-gray-300">
//         <SandpackPreview />
//       </div>
//     </SandpackProvider>
//   );
// };

// export default LivePreview;

// "use client";
// import React from "react";
// // 1. We only import SandpackPreview here.
// //    The <SandpackProvider> will be in pages/dashboard.tsx
// import { SandpackPreview } from "@codesandbox/sandpack-react";

// const LivePreview: React.FC = () => {
//   // 2. The 'files' const and <SandpackProvider> are removed from this component.

//   return (
//     // 3. This div now fills the full height of its parent panel.
//     //    - bg-white: The preview area itself is white, like a browser.
//     //    - overflow-auto: Adds scrollbars if the previewed content is taller than the panel.
//     <div className="h-full w-full bg-white overflow-scroll">
//       <SandpackPreview
//         showNavigator={true} // Optional: Adds a browser-like URL bar
//         showRefreshButton={true} // Optional: Adds a refresh button
//         // This component will now automatically get its code
//         // from the SandpackProvider in your dashboard page.
//       />
//     </div>
//   );
// };

// export default LivePreview;

// components/LivePreview.tsx

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

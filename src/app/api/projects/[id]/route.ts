// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/authOptions";

// import Project from "@/models/Project";
// import { connectDB } from "@/config/connectDB";

// interface Params {
//   params: { id: string };
// }

// export const dynamic = "force-dynamic";
// // GET /api/projects/[id]
// // Ek single project fetch karega
// export async function GET(request: Request, { params }: Params) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   try {
//     const project = await Project.findOne({
//       _id: params.id,
//       user: session.user.id, // Security check: Sirf user ka apna project
//     });
//     if (!project) {
//       return NextResponse.json(
//         { message: "Project not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(project);
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

// // PUT /api/projects/[id]
// // Ek project ko update karega
// export async function PUT(request: Request, { params }: Params) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   try {
//     const { name, files } = await request.json();
//     const project = await Project.findOne({
//       _id: params.id,
//       user: session.user.id,
//     });

//     if (!project) {
//       return NextResponse.json(
//         { message: "Project not found" },
//         { status: 404 }
//       );
//     }

//     project.name = name || project.name;
//     project.files = files || project.files;

//     const updatedProject = await project.save();
//     return NextResponse.json(updatedProject);
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

// // DELETE /api/projects/[id]
// // Ek project ko delete karega
// export async function DELETE(request: Request, { params }: Params) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   try {
//     const deletedProject = await Project.findOneAndDelete({
//       _id: params.id,
//       user: session.user.id,
//     });

//     if (!deletedProject) {
//       return NextResponse.json(
//         { message: "Project not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json({ message: "Project deleted" });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";

// FIX 1: Caching ko rokein
export const dynamic = "force-dynamic";

// GET /api/projects/[id] - Ek project ko load karein
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    // FIX 2: Session get karne ka sahi tareeka
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { id } = params;

    // Sirf wahi project find karein jo user ka hai
    const project = await Project.findOne({ _id: id, user: userId });
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("API GET [id] Error:", error);
    return NextResponse.json(
      { message: "Error fetching project", error },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Ek project ko update karein
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    // FIX 2: Session get karne ka sahi tareeka
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { id } = params;
    const body = await request.json();

    // Sirf wahi project update karein jo user ka hai
    const updatedProject = await Project.findOneAndUpdate(
      { _id: id, user: userId },
      body,
      { new: true } // updated document return karein
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("API PUT [id] Error:", error);
    return NextResponse.json(
      { message: "Error updating project", error },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Ek project ko delete karein
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    // FIX 2: Session get karne ka sahi tareeka
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { id } = params;

    // Sirf wahi project delete karein jo user ka hai
    const deletedProject = await Project.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    console.error("API DELETE [id] Error:", error);
    return NextResponse.json(
      { message: "Error deleting project", error },
      { status: 500 }
    );
  }
}

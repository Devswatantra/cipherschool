// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/authOptions"; // Aapke auth options ka path

// import Project from "@/models/Project";
// import { connectDB } from "@/config/connectDB";

// // GET /api/projects
// // Saare projects fetch karega jo user se linked hain
// export const dynamic = "force-dynamic";
// export async function GET() {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   try {
//     const projects = await Project.find({ user: session.user.id }).sort({
//       updatedAt: -1,
//     });
//     return NextResponse.json(projects);
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

// // POST /api/projects
// // Ek naya project save karega
// export async function POST(request: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user?.id) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   await connectDB();

//   try {
//     const { name, files } = await request.json();

//     if (!files) {
//       return NextResponse.json(
//         { message: "Files are required" },
//         { status: 400 }
//       );
//     }

//     const newProject = new Project({
//       name,
//       files,
//       user: session.user.id,
//     });

//     const savedProject = await newProject.save();
//     return NextResponse.json(savedProject, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

import { getServerSession } from "next-auth/next"; // Import getServerSession
import { authOptions } from "@/lib/authOptions"; // Import aapka object

import Project from "@/models/Project";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";

// FIX: Caching ko rokein
export const dynamic = "force-dynamic";

// POST: Naya project save karein
export async function POST(request: NextRequest) {
  await connectDB();
  try {
    // FIX: Session get karne ka sahi tareeka
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const body = await request.json();

    const project = await Project.create({
      ...body,
      user: userId,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Error creating project", error },
      { status: 500 }
    );
  }
}

// GET: Sirf logged-in user ke projects laayein
export async function GET() {
  await connectDB();
  try {
    // FIX: Session get karne ka sahi tareeka
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const projects = await Project.find({ user: userId }).sort({
      updatedAt: -1,
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching projects", error },
      { status: 500 }
    );
  }
}

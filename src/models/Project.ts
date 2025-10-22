import mongoose, { Document, Schema } from "mongoose";

// Sandpack file object ka type define karein
// { code: "...", hidden: true, ... }
const SandpackFileSchema = new Schema(
  {
    code: { type: String, required: true },
    hidden: { type: Boolean, optional: true },
    active: { type: Boolean, optional: true },
  },
  { _id: false } // Is sub-document ke liye _id na banayein
);

export interface IProject extends Document {
  name: string;
  // FIX 1: Type ko Map se plain object mein badla
  files: {
    [key: string]: { code: string; hidden?: boolean; active?: boolean };
  };
  user: Schema.Types.ObjectId;
}

const ProjectSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Aapke User model ka naam
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "Untitled Project",
    },
    // FIX 2: 'files' ka type Map se Mixed kiya
    // Isse Mongoose plain JS object ko save kar payega
    files: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true, // 'createdAt' aur 'updatedAt' fields add karega
  }
);

// Mongoose ko "compiling model" error se bachane ke liye
export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

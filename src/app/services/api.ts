import axios from "axios";

// API URL ab relative hai. Yeh /api/projects ko call karega
const API_URL = "/api/projects";

// This matches the 'files' object from Sandpack
// (Updated to match our Mixed model which can be complex)
export type FilesObject = {
  [key: string]: string | { code: string; hidden?: boolean; active?: boolean };
};

// 1. Ek naya project SAVE karne ke liye
export const saveProject = async (name: string, files: FilesObject) => {
  console.log("Saving new project:", { name, files });
  const { data } = await axios.post(API_URL, { name, files });
  return data;
};

// 2. Ek existing project ko UPDATE karne ke liye
export const updateProject = async (
  id: string,
  name: string,
  files: FilesObject
) => {
  console.log("Updating project:", { id, name, files });
  const { data } = await axios.put(`${API_URL}/${id}`, { name, files });
  return data;
};

// 3. Ek project ko ID se LOAD karne ke liye
export const getProject = async (id: string) => {
  // --- YEH HAI FIX ---
  // Hum ek random query parameter add kar rahe hain taaki browser request ko cache na kare
  const cacheBuster = `_=${new Date().getTime()}`;
  const { data } = await axios.get(`${API_URL}/${id}?${cacheBuster}`);
  return data;
};

// 4. Saare saved projects ki list lene ke liye
export const getAllProjects = async () => {
  // --- YEH BHI FIX KAR RAHE HAIN ---
  const cacheBuster = `_=${new Date().getTime()}`;
  const { data } = await axios.get(`${API_URL}?${cacheBuster}`);
  return data;
};

// 5. Ek project ko DELETE karne ke liye
export const deleteProject = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

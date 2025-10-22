export interface File {
  name: string;
  code: string;
}

export interface Project {
  _id?: string;
  userId: string;
  projectName: string;
  files: File[];
}

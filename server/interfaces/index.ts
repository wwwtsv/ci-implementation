export interface Build {
  id: string;
  repository: string;
  commitHash: string;
  startDate: string;
  endDate: string;
  command: string;
  status: boolean | null;
  stdOutput: string;
}

export interface BuildFormData {
  repository: string;
  hashCommit: string;
  buildCommand: string;
}

export type Builds = Build[];

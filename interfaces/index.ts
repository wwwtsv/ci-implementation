export interface Build {
  id: string;
  repositoryUrl: string;
  commitHash: string;
  startDate: string;
  endDate: string;
  command: string;
  status: boolean | null;
  stdOutput: string;
}

export interface BuildFormData {
  repositoryUrl: string;
  hashCommit: string;
  buildCommand: string;
}

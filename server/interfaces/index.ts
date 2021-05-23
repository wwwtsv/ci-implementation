interface Build {
  id: number;
  repository: string;
  commitHash: string;
  startDate: string;
  endDate: string;
  command: string;
  status: boolean;
  output: string;
}

export type Builds = Build[];

import { Request, Response } from "express";

const renderMainPage = (req: Request, res: Response): void => {
  res.render("index", { title: "Simple CI" });
};

export const renderDetailPage = (req: Request, res: Response): void => {
  res.render("detail", {
    id: 123,
    repository: "https://github.com/facebook/react.git",
    commitHash: "633c85ecb1a880d507195f98551c26aefb0b0f17",
    startDate: "Sun May 23 2021 21:26:19 GMT+0300 (Москва, стандартное время)",
    endDate: "Sun May 23 2021 21:27:19 GMT+0300 (Москва, стандартное время)",
    command: "npm i && npm run build",
    status: true,
    output: `/Users/aleksejcvetkov/.nvm/versions/node/v12.14.0/bin/node /Users/aleksejcvetkov/.nvm/versions/node/v12.14.0/lib/node_modules/npm/bin/npm-cli.js run start:agent --scripts-prepend-node-path=auto
> ci-implementation@1.0.0 start:agent /Users/aleksejcvetkov/WebstormProjects/ci-implementation
> ts-node-dev --respawn --project ./tsconfig.json ./agent/index.ts

[INFO] 16:17:40 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 4.2.4)
{"message":"\\n      🤖 Server listening on port: 3010\\n    ","level":"info","timestamp":"2021-05-23 16:17:41"}

Process finished with exit code 130 (interrupted by signal 2: SIGINT)
`,
  });
};

export default renderMainPage;

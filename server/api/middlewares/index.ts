import { Request, Response } from "express";

const renderMainPage = (req: Request, res: Response): void => {
  res.render("index", { title: "Simple CI" });
};

export default renderMainPage;

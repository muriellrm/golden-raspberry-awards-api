import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation error",
      issues: error.issues,
    });
  }
  
  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }

  res.status(500).json({ message: "Internal server error!" });
};

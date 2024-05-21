import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UsersModel } from "../models/usersModel";
import { validationResult } from "express-validator";

export async function createUser(
  req: Request,
  res: Response
): Promise<Response | void> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  console.log("Request body:", req.body); // Debug log

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UsersModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    console.log("User created:", userResponse); // Debug log
    return res.json(userResponse);
  } catch (error: any) {
    console.error("Error creating user:", error); // Debug log
    if (error.code === 11000) {
      res.status(409).send("User already exists.");
    } else {
      res.status(500).send("Failed to create user.");
    }
  }
}

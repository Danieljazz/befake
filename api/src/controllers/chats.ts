import { db } from "../connect.js";

export const userMessages = (req, res) => {
  const param = req.query.id;
  return res.status(200).json(param);
};
export const createMessage = (req, res) => {};

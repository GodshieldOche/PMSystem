import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;

  const jwt = cookies.PmToken;

  res.status(200).json({ token: jwt });
}

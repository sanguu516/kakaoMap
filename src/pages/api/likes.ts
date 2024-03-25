import { StoreApiResponse, StoreType } from "@/interface";
import { Store } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | Store>
) {}

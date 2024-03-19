import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { PrismaClient, Store } from "@prisma/client";

interface ResponeseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | Store>
) {
  const prisma = new PrismaClient();
  const { page = "", limit = "", q, district }: ResponeseType = req.query;

  if (page) {
    const skipPage = parseInt(page) - 1;
    const count = await prisma.store.count();

    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        name: q ? { contains: q } : undefined,
        address: district ? { contains: district } : undefined,
      },
      take: 10,
      skip: skipPage * 10,
    });

    // totalpage, data , page, totalcount

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const { id }: { id?: string } = req.query;

    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {},
      },
    });
    res.status(200).json(id ? stores[0] : stores);
  }
}

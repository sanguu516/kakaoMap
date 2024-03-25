import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { PrismaClient, Store } from "@prisma/client";
import axios from "axios";

interface ResponeseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[] | Store>
) {
  const prisma = new PrismaClient();
  const { page = "", limit = "", q, district }: ResponeseType = req.query;
  if (req.method === "POST") {
    const formData = req.body;

    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );
    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].x, lng: data.documents[1].y },
    });
    console.log(data);
    return res.status(200).json(data);
  } else if (req.method === "PUT") {
    //데이터 수정 처리

    const formData = req.body;

    const headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers }
    );

    const result = await prisma.store.update({
      where: { id: formData.id },
      data: { ...formData, lat: data.documents[0].x, lng: data.documents[1].y },
    });

    return res.status(200).json(result);
  } else if (req.method === "DELETE") {
    const { id }: { id?: string } = req.query;

    if (id) {
      const result = await prisma.store.delete({
        where: { id: parseInt(id) },
      });
      return res.status(200).json(result);
    }
  } else {
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
}

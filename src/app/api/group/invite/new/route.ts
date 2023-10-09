import { getGroup } from "@/service/group";
import { encode } from "@/util/crypto";
import { dateFormat } from "@/util/dayjs";
import { withSession } from "@/util/session";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { groupId, expireDate } = await req.json();

  if (!groupId) return new Response("Bad Request", { status: 401 });

  return withSession((user) => {
    try {
      return NextResponse.json({
        url: `http://${req.headers.get("host")}/invite/${encode(
          `${groupId}@${dateFormat(expireDate)}`
        )}`,
      });
    } catch (error) {
      return new Response("Bad Request", { status: 401 });
    }
  });
}

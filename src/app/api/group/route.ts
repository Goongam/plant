import { createGroup, getGroup } from "@/service/group";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return getGroup()
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(err, { status: 500 }));
}

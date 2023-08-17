import { getPublicGroups } from "@/service/group";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return getPublicGroups()
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(err, { status: 500 }));
}

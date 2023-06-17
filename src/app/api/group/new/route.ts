import { createGroup } from "@/service/group";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, isSecret } = await req.json();

  return createGroup(name).then((res) => NextResponse.json(res));
}

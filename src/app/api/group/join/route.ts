import { createGroup, getGroup, joinGroup } from "@/service/group";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOption } from "../../auth/[...nextauth]/route";
import { withSession } from "@/util/session";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const { groupId } = await req.json();

    return joinGroup(user.email, groupId)
      .then((result) => NextResponse.json(result))
      .catch((err) => new Response(err, { status: 400 }));
  });
}

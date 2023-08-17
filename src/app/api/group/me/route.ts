import { getMyGroup } from "@/service/group";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return withSession((user) => {
    return getMyGroup(user.id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}

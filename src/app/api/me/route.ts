import { getMyGroup } from "@/service/group";
import { getUserInfo } from "@/service/user";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return withSession((user) => {
    return getUserInfo(user.id)
      .then((result) => NextResponse.json(result))
      .catch(() => new Response("error", { status: 401 }));
  });
}

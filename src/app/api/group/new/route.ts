import { createGroup } from "@/service/group";
import { withSession } from "@/util/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return withSession(async (user) => {
    const form = await req.formData();

    const value: any = {};
    for (const key of form.keys()) {
      value[key] = form.get(key)?.toString();
    }

    value["isSecret"] = value["isSecret"] === "비공개" ? true : false;
    value["isOffline"] = value["isOffline"] === "on" ? true : false;

    return createGroup(value, user.id).then((res) => NextResponse.json(res));
  });
}

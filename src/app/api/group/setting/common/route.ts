import { joinGroup, updateGroup } from "@/service/group";
import { NextResponse } from "next/server";
import { withSession } from "@/util/session";

export async function PATCH(req: Request) {
  return withSession(async (user) => {
    const form = await req.formData();

    const value: any = {};
    for (const key of form.keys()) {
      value[key] = form.get(key)?.toString();
    }

    value["isSecret"] = value["isSecret"] === "비공개" ? true : false;
    value["isOffline"] = value["isOffline"] === "on" ? true : false;

    return updateGroup(value, value["groupId"])
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(err, { status: 500 }));
  });
}

import { sendEmail } from "@/service/sendEmail";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export async function POST(req: Request) {
  const body = await req.json();

  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: "메일 전송 실패" }), {
      status: 400,
    });
  }

  const { from, subject, message } = body;

  return sendEmail(body)
    .then(
      () =>
        new Response(JSON.stringify({ message: "메일을 성공적으로 보냄" }), {
          status: 200,
        })
    )
    .catch(() => {
      return new Response(JSON.stringify({ message: "메일 전송 실패" }), {
        status: 500,
      });
    });
  //   return new Response("Hello, Next.js!");
}

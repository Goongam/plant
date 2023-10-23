export interface EmailData {
  from: string;
  subject: string;
  message: string;
}
export async function sendContactEmail(email: EmailData) {
  const response = await fetch("/api/contact", {
    method: "post",
    body: JSON.stringify(email),
    headers: {
      "Content-Type": "appication/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "서버 요청 실패");
  }
  return data;
}

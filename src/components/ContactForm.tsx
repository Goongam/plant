"use client";
import { ChangeEvent, FormEventHandler, useState, FormEvent } from "react";
import Banner, { BannerData } from "./Banner";
import { sendContactEmail } from "@/service/email";
import Loading from "./ui/Loading";

interface Form {
  from: string;
  subject: string;
  message: string;
}

const DEFAULT_DATA = {
  from: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState<Form>(DEFAULT_DATA);
  const [banner, setBanner] = useState<BannerData>();
  const [loading, setLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    sendContactEmail(form)
      .then(() => {
        setBanner({ message: "메일을 전송했습니다!", state: "success" });
        setForm(DEFAULT_DATA);
      })
      .catch(() => {
        setBanner({ message: "메일 전송에 실패하였습니다", state: "error" });
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setBanner(undefined);
        }, 3000);
      });
  };
  return (
    <section className="w-full max-w-md">
      {banner && <Banner banner={banner} />}
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 my-4 p-4 bg-green-700 rounded-md text-white"
      >
        <label htmlFor="from">이메일</label>
        <input
          className="font-semibold text-black"
          type="email"
          id="from"
          name="from"
          required
          autoFocus
          value={form.from}
          onChange={onChange}
        />
        <label htmlFor="subject">제목</label>
        <input
          className="font-semibold text-black"
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
        />
        <label htmlFor="message">내용</label>
        <textarea
          className="text-black"
          rows={10}
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
        />
        <button
          type="submit"
          className="bg-yellow-700 text-white hover:bg-yellow-500 rounded-sm h-6"
        >
          {loading ? <Loading size={10} color="white" type="Beat" /> : "전송"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;

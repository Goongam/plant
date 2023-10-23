import ContactForm from "@/components/ContactForm";
import TstoryIcon from "@/components/ui/icons/Tstory";
import { AiFillGithub } from "react-icons/ai";

export const metadata = {
  title: "Contact Me",
  description: "군감에게 연락하기",
};

const LINKS = [
  { icon: <AiFillGithub />, link: "http://github.com/goongam" },
  { icon: <TstoryIcon />, link: "https://goongam341.tistory.com/" },
];

export default function Contact() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-2">Contact Me</h2>
      <div className="flex gap-1">
        {LINKS.map((link, index) => (
          <a
            key={index}
            href={link.link}
            target="_blank"
            rel="noreferrer"
            className="text-5xl hover:text-yellow-500"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <ContactForm />
    </section>
  );
}

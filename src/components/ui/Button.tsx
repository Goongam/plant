"use client";

interface Props {
  onClickHandler: () => void;
  text: string;
}
export default function Button({ onClickHandler, text }: Props) {
  return <button onClick={onClickHandler}>{text}</button>;
}

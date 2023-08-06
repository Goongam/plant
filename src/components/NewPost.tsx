"use client";

import { useGroup } from "@/hooks/group";
import { Group } from "@/service/group";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useRef,
  useState,
  DragEvent,
  ChangeEvent,
  MouseEvent,
} from "react";
import { useMutation, useQuery } from "react-query";
import FilesIcon from "./ui/icons/FileIcon";
import Loading from "./ui/Loading";

interface Props {
  groupId: string;
}

const MAX_IMAGES_LENGTH = 5;

function getImageElement(images: File[]) {
  const remain = MAX_IMAGES_LENGTH - images.length;
  let imageElements: Array<File | undefined> = [...images];

  for (let i = 0; i < remain; i++) {
    imageElements.push(undefined);
  }

  return imageElements;
}
export default function NewPost({ groupId }: Props) {
  const { group, isError, isLoading } = useGroup(groupId);
  const [dragging, setDragging] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const {
    isLoading: mutating,
    isIdle,
    isPaused,
    mutate,
    isError: mutateError,
  } = useMutation(
    (formdata: FormData) =>
      fetch(`/api/post/new`, {
        method: "post",
        body: formdata,
      }).then((res) => res.json()),
    {
      onMutate(variables) {
        console.log("onmu");
      },
      onSuccess() {
        setIsSuccess(true);
        router.push(`/group/${groupId}`);
      },
      onError() {
        console.log("에러처리");
      },
    }
  );

  console.log(isIdle, isPaused);

  const router = useRouter();
  // const imgArray = Array.from(images ?? []);

  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const fileList = e.dataTransfer?.files;
    const files = Array.from(fileList ?? []);

    setImages((preFiles) =>
      [...preFiles, ...files].slice(0, MAX_IMAGES_LENGTH)
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;
    const files = Array.from(fileList ?? []);

    setImages((preFiles) =>
      [...preFiles, ...files].slice(0, MAX_IMAGES_LENGTH)
    );

    e.target.value = "";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();

    //이미지
    if (images) {
      images.forEach((file) => {
        formdata.append("files", file);
      });
    }

    //코멘트
    const comment = commentRef.current?.value;
    if (!comment) return;
    formdata.append("comment", comment);

    formdata.append("group", groupId);

    //TODO: 에러처리, 전송 로딩

    mutate(formdata);
  };

  const handleImgDelete = (index: number) => {
    const deletedImages = [
      ...images.slice(0, index),
      ...images.slice(index + 1, MAX_IMAGES_LENGTH),
    ];

    setImages(deletedImages);
  };
  return (
    <section className="w-full h-full flex-col items-center">
      {(mutating || isSuccess) && (
        <div className="absolute w-full h-full top-0 bg-slate-300/75 flex justify-center items-center z-50">
          <Loading type="Moon" size={30} />
        </div>
      )}
      <h2 className="border-b-4 border-gray-400 p-4 pb-8 mx-2 mb-10 font-bold text-2xl">
        {group?.name} · 새 글 작성
      </h2>
      {mutateError && (
        <div className="w-full h-32 bg-red-300 flex justify-center items-center p-5 text-white text-2xl font-bold mb-1">
          업로드 중 오류가 발생하였습니다. 다시 시도해주세요
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center px-4 max-w-3xl mx-auto"
      >
        <input
          type="file"
          id="input-form"
          multiple
          onChange={handleChange}
          hidden
        />
        <label
          htmlFor="input-form"
          className="flex justify-center items-center w-full h-52 bg-slate-100"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FilesIcon />
        </label>
        <div className="w-full grid grid-cols-5">
          {getImageElement(images).map((img, index) =>
            img ? (
              <div
                key={`${img.length}${img.name}${index}`}
                className="relative w-full aspect-square"
              >
                <Image
                  // key={img.name}
                  fill
                  className="object-cover"
                  src={URL.createObjectURL(img)}
                  alt="uploadImage"
                />
                <button
                  className="absolute right-0 top-0"
                  onClick={() => handleImgDelete(index)}
                >
                  x
                </button>
              </div>
            ) : (
              <div key={index} className="flex items-center justify-center">
                <FilesIcon size="s" />
              </div>
            )
          )}
        </div>
        <textarea
          className="w-full h-52 mt-4 border border-black rounded-md"
          ref={commentRef}
          placeholder="코멘트 작성..."
          required
        />
        <button className="w-full h-10 bg-green-400 text-white font-bold mt-4 rounded-lg">
          업로드
        </button>
      </form>
    </section>
  );
}

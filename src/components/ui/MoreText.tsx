import { useMoreText } from "@/hooks/moreText";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
}
export default function MoreText({ children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { handleMore, handleSimple, hasMore, isClickMore } =
    useMoreText(contentRef);

  return (
    <>
      <div
        ref={contentRef}
        className={`line-clamp-4 ${isClickMore && "line-clamp-none"}`}
      >
        {children}
      </div>
      {hasMore && !isClickMore && (
        <button onClick={handleMore} className="text-start text-black/40">
          더보기
        </button>
      )}
      {hasMore && isClickMore && (
        <button onClick={handleSimple} className="text-start text-black/40">
          간략히보기
        </button>
      )}
    </>
  );
}

import { RefObject, useEffect, useState } from "react";
export function useMoreText(ref: RefObject<HTMLDivElement>) {
  const [hasMore, setHasMore] = useState(false);
  const [isClickMore, setIsClickMore] = useState(false);

  useEffect(() => {
    const current = ref.current;
    const clientHeight = current?.clientHeight;
    const scrollHeight = current?.scrollHeight;

    if (!clientHeight || !scrollHeight) return;

    if (clientHeight === scrollHeight) setHasMore(false); //초과x
    else setHasMore(true); //초과됨
  }, [ref, hasMore]);

  const handleMore = () => {
    setIsClickMore(true);
    // setHasMore(true);
  };
  const handleSimple = () => {
    setIsClickMore(false);
    // setHasMore(false);
  };

  return { handleMore, handleSimple, hasMore, isClickMore };
}

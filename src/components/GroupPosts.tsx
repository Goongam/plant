import { Post } from "@/service/post";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "./ui/Loading";
import { useInfinitePosts } from "@/hooks/post";

interface Props {
  groupId: string;
}

export default function GroupPosts({ groupId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfinitePosts(groupId);
  return (
    <>
      {data && (
        <InfiniteScroll
          loadMore={() => {
            fetchNextPage();
          }}
          hasMore={hasNextPage}
          className="flex flex-col w-full items-center gap-6"
        >
          {data?.pages?.map((page) =>
            page.posts.map((post: Post) => (
              <PostCard key={post._id} post={post} />
            ))
          )}
        </InfiniteScroll>
      )}
      {isFetching && <Loading type="Moon" />}
    </>
  );
}

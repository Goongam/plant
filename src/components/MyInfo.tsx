"use client";

import { User } from "@/service/user";
import Avatar from "./Avatar";
import CalanderUser from "./CalanderByUser";
import UserPosts from "./UserPosts";
import { postFilterState } from "@/state";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { POST_HEADER } from "./PostContainer";
import { useInfinityUserPosts } from "@/hooks/post";

interface Props {
  user: User;
}
export default function MyInfo({ user }: Props) {
  const { postFilterDate: filterDate } = useRecoilValue(postFilterState);
  const setFilter = useSetRecoilState(postFilterState);

  const { refetch } = useInfinityUserPosts(user.id);

  const showAllPost = () => {
    setFilter({ postFilterDate: undefined, postFilterUser: undefined });
  };

  return (
    <>
      <div className="bg-[#F8F0E5] rounded-sm flex-1 m-4 flex flex-col md:flex-row p-2 gap-2">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-black w-[85px] h-[85px] flex justify-center items-center rounded-full">
            <Avatar image={user.image} size="l" />
          </div>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <div className="bg-white w-full">
          <CalanderUser userId={user.id} />
        </div>
      </div>
      <div>
        {filterDate ? (
          <div className={`${POST_HEADER} mx-4 mb-4`}>
            <div className="flex font-bold text-2xl ">
              <p>
                {filterDate &&
                  `${new Date(filterDate).getMonth() + 1}월 ${new Date(
                    filterDate
                  ).getDate()}일`}
              </p>
            </div>
            <div onClick={showAllPost}>전체보기</div>
          </div>
        ) : (
          <div className={`${POST_HEADER} mx-4 mb-4`}>
            <div className="flex font-bold text-2xl ">전체 포스트</div>
            <p onClick={() => refetch()}>새로고침</p>
          </div>
        )}
        <UserPosts userId={user.id} />
      </div>
    </>
  );
}

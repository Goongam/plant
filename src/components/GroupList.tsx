"use client";

import { getGroup } from "@/service/group";
import { useQuery } from "react-query";

export default function GroupList() {
  const { data, isLoading } = useQuery(["groups"], () =>
    fetch("/api/group").then((res) => res.json())
  );
  console.log(data);

  return (
    <section className="grid grid-cols-3 sm:grid-cols1 md:grid-cols-2"></section>
  );
}

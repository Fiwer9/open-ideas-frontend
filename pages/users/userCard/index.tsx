import React from "react";
import { UserCard } from "../../../components/UsersComponents/UserCard";
import { useAuthenticatedUser } from "../../../hooks/useNotRegister";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Index() {
  const router = useRouter();
  const { userId } = router.query;
  let id = Array.isArray(userId) ? userId[0] : userId;
  id = id || "";
  Cookies.set("userId", id);

  return (
    <div>
      <UserCard userId={id} />
    </div>
  );
}

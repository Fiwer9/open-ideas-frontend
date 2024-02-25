import React from "react";
import { UserEditing } from "../../../components/UsersComponents/UserEditing";
import { useAuthenticatedUser } from "../../../hooks/useNotRegister";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { userId } = router.query;
  let id = Array.isArray(userId) ? userId[0] : userId;
  id = id || "";

  return (
    <div>
      <UserEditing userId={id} />
    </div>
  );
}

import React from "react";
import { useRouter } from "next/router";
import { PageDevelopment } from "../../../components/PageDevelopmentComponent/PageDevelopment";
import { useCheckStaff } from "../../../hooks/useCheckStaff";

export default function Index() {
  const isStaff = useCheckStaff();

  const router = useRouter();
  const { userId } = router.query;
  let id = Array.isArray(userId) ? userId[0] : userId;
  id = id || "";

  return (
    <div>
      {/*<UserEditing userId={id} />*/}
      {isStaff && <PageDevelopment />}
    </div>
  );
}

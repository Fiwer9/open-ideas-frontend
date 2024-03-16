import React from "react";
import { useCheckStaff } from "../../../hooks/useCheckStaff";
import { UserCard } from "../../../components/UsersComponents/UserCard";

export default function Index() {
  const isStaff = useCheckStaff();

  return <div>{isStaff && <UserCard />}</div>;
}

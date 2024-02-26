import React, { useEffect } from "react";
import router from "next/router";
import NewLogin from "../components/AuthComponents/NewLogin";
import { useAppDispatch } from "../redux/store";
import { checkAuth } from "../redux/authSlice/asyncActions";

export default function Index() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("token_access")) {
      dispatch(checkAuth());
      router.push("/queries");
    }
  }, []);
  return <NewLogin />;
}

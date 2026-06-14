import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectIsStaff } from "../redux/menuSlice/selectors";

export const useCheckStaff = () => {
  const router = useRouter();
  const isStaffFromStore = useSelector(selectIsStaff);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const hasStaffAccess =
      isStaffFromStore || sessionStorage.getItem("isStaff") === "true";

    if (!hasStaffAccess) {
      setHasAccess(false);
      router.replace("/queries");
      return;
    }

    setHasAccess(true);
  }, [isStaffFromStore, router]);

  return hasAccess;
};

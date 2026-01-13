import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useCheckStaff = () => {
  const router = useRouter();
  const [isStaff, setIsStaff] = useState(false);
  const checkUserStatus = () => {
    if (sessionStorage.getItem("isStaff") === "true") {
      router.push("/queries");
      return false;
    }
    return true;
  };

  useEffect(() => {
    setIsStaff(checkUserStatus());
  }, []);

  return isStaff;
};

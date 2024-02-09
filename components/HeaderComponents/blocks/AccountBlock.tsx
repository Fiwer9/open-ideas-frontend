import React, { memo, useEffect } from "react";
import styles from "../styles/Account.module.scss";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/usersSlice/selectors";
import { useAppDispatch } from "../../../redux/store";
import { fetchCurrentUser } from "../../../redux/usersSlice/asyncActions";
import { selectCurrentUser } from "../../../redux/authSlice/selectors";
import { fetchOrganizationById } from "../../../redux/organizationsSlice/asyncActions";
import { selectOrganization } from "../../../redux/organizationsSlice/selectors";

export const AccountBlock: React.FC = memo(() => {
  const user = useSelector(selectUser);
  const { user_id } = useSelector(selectCurrentUser);
  const organization = useSelector(selectOrganization);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser({ user_id }));
  }, []);

  useEffect(() => {
    dispatch(
      fetchOrganizationById({ organization_id: user?.department?.organization })
    );
  }, [user]);

  return (
    <div className={styles.account}>
      <Button type={"text"} className={styles.buttonTop}>
        {user.name || "Аноним"}
      </Button>{" "}
      <span>|</span>
      <Button type={"text"} className={styles.aratrum}>
        {organization.name || "Неизвестно"}
      </Button>{" "}
      <span>|</span>
      <Button type={"text"} className={styles.buttonTop}>
        {user.department?.name || "Неизвестно"}
      </Button>
    </div>
  );
});

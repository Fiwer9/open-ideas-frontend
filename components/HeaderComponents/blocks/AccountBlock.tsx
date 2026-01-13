import React, { memo, useEffect, useState } from "react";

import { Button } from "antd";
import { useSelector } from "react-redux";

import styles from "../styles/Account.module.scss";
import { useAppDispatch } from "../../../redux/store";
import { selectCurrentUser } from "../../../redux/authSlice/selectors";
import { fetchOrganizationById } from "../../../redux/organizationsSlice/asyncActions";
import { Status } from "../../../redux/queriesSlice/types";
import { selectUserForHeader } from "../../../redux/headerSlice/selectors";
import {
  fetchOrganizationHeader,
  fetchUserHeader,
} from "../../../redux/headerSlice/asyncActions";

export const AccountBlock: React.FC = memo(() => {
  const [isClient, setIsClient] = useState(false);
  const { userName, organization, department, status, organizationId } =
    useSelector(selectUserForHeader);
  const { user_id } = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserHeader({ user_id }));
  }, []);

  useEffect(() => {
    dispatch(
      fetchOrganizationHeader({
        organization_id: organizationId,
      })
    );
  }, [organizationId]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <div className={styles.account}>
      <Button
        loading={status === Status.LOADING}
        type={"text"}
        className={styles.buttonTop}
      >
        {userName || "Аноним"}
      </Button>{" "}
      <span>|</span>
      <Button
        loading={status === Status.LOADING}
        type={"text"}
        className={styles.aratrum}
      >
        {organization || "Неизвестно"}
      </Button>{" "}
      <span>|</span>
      <Button
        loading={status === Status.LOADING}
        type={"text"}
        className={styles.buttonTop}
      >
        {department || "Неизвестно"}
      </Button>
    </div>
  );
});

import React, { memo, useEffect } from "react";

import { Button } from "antd";
import { useSelector } from "react-redux";

import styles from "../styles/Account.module.scss";
import { useAppDispatch } from "../../../redux/store";
import { selectCurrentUser } from "../../../redux/authSlice/selectors";
import { Status } from "../../../redux/queriesSlice/types";
import { selectUserForHeader } from "../../../redux/headerSlice/selectors";
import { fetchAccountHeader } from "../../../redux/headerSlice/asyncActions";

const getDisplayValue = (
  value: string,
  fallback: string,
  status: Status
): string => {
  if (value) {
    return value;
  }

  if (status === Status.LOADING || status === Status.WAITING) {
    return "";
  }

  return fallback;
};

export const AccountBlock: React.FC = memo(() => {
  const { userName, organization, department, status } =
    useSelector(selectUserForHeader);
  const { user_id } = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const isLoading = status === Status.LOADING || status === Status.WAITING;

  useEffect(() => {
    dispatch(fetchAccountHeader({ user_id }));
  }, [dispatch, user_id]);

  return (
    <div className={styles.account}>
      <Button
        loading={isLoading && !userName}
        type="text"
        className={styles.buttonTop}
      >
        {getDisplayValue(userName, "Аноним", status)}
      </Button>
      <span>|</span>
      <Button
        loading={isLoading && !organization}
        type="text"
        className={styles.aratrum}
      >
        {getDisplayValue(organization, "Неизвестно", status)}
      </Button>
      <span>|</span>
      <Button
        loading={isLoading && !department}
        type="text"
        className={styles.buttonTop}
      >
        {getDisplayValue(department, "Неизвестно", status)}
      </Button>
    </div>
  );
});

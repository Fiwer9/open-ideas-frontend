import React, { memo, useEffect, useState } from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { Header } from "../HeaderComponents/Header";
import Image from "next/image";
import avatar from "../../public/img/AvatarAratrum.svg";

import styles from "./styles/UserCard.module.scss";
import { Button, Col } from "antd";
import Cookies from "js-cookie";
import { UserResponse } from "../../models/response/UserResponse";
import { fetchData, getOrganizationName } from "../../utils/utils";
import UsersService from "../../services/UsersService";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import OrganizationsService from "../../services/OrganizationsService";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import { SliderSmall } from "../SliderComponents/SliderSmall";
import { useRouter } from "next/router";
import { getOrganizationName, getQueriesByNumber } from "../../utils/utils";
import { useSelector } from "react-redux";
import {
  selectUser,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import {
  selectOrganizations,
  selectOrgStatus,
} from "../../redux/organizationsSlice/selectors";
import {
  selectQueriesData,
  selectStatusQueries,
} from "../../redux/queriesSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchCurrentUser } from "../../redux/usersSlice/asyncActions";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import { fetchQueries } from "../../redux/queriesSlice/asyncActions";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";
import { Status } from "../../redux/queriesSlice/types";

export const UserCard: React.FC = memo(() => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);
  const organizations = useSelector(selectOrganizations);
  const queries = useSelector(selectQueriesData);
  const dispatch = useAppDispatch();
  const organizationStatus = useSelector(selectOrgStatus);
  const userStatus = useSelector(selectUsersStatus);
  const queriesStatus = useSelector(selectStatusQueries);

  useEffect(() => {
    if (
      organizationStatus === Status.SUCCESS &&
      userStatus === Status.SUCCESS &&
      queriesStatus === Status.SUCCESS
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [organizationStatus, userStatus, queriesStatus]);

  const fetchData = async () => {
    dispatch(setPageId(Number(userId)));
    await dispatch(fetchCurrentUser({ user_id: userId }));
    await dispatch(fetchOrganizations());
    await dispatch(fetchQueries({ user_id: userId }));
  };

  useEffect(() => {
    userId && fetchData();
  }, [userId]);

  useEffect(() => {
    user?.name && dispatch(setPageName(user.name));
  }, [user?.name]);

  if (isLoading) {
    return;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.slider}>
          <Slider />
        </div>
        <div className={styles.content}>
          <div className={styles.headerContainer}>
            <Header />
          </div>
          <Tabs />
          <div className={styles.userContainer}>
            <Image
              src={avatar}
              alt={"Аватар"}
              width={190}
              height={190}
              className={styles.avatar}
            />

            <div className={styles.infUser}>
              <p className={styles.nameUser}>{user?.name}</p>

              <Col className={styles.column}>
                <div>
                  <div className={styles.row}>
                    <p className={styles.rowText}>E-mail:</p>
                    <p className={styles.rowInf}>{user?.email}</p>
                  </div>

                  <div className={styles.row}>
                    <p className={styles.rowText}>Эксперт по инициативам:</p>
                    <p className={styles.rowInf}>
                      {queries
                        ? getQueriesByNumber(queries)
                            .toString()
                            .replaceAll(",", ", ")
                        : ""}
                    </p>
                  </div>

                  <div className={styles.rowOrgAdapt}>
                    <div className={`${styles.row} ${styles.rowOrg}`}>
                      <p className={styles.rowText}>Организация:</p>
                      <p className={styles.rowInf}>
                        {organizations && user?.department
                          ? getOrganizationName(
                              user?.department.organization,
                              organizations,
                            )
                          : "Не назначено"}
                      </p>
                    </div>

                    <div className={styles.row}>
                      <p className={styles.rowText}>Отдел:</p>
                      <p className={styles.rowInf}>
                        {user?.department
                          ? user?.department.name
                          : "Не назначено"}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Button
                className={styles.btnFooter}
                type="primary"
                onClick={() =>
                  router.push(`/users/editingUser?userId=${userId}`)
                }
              >
                <span>Редактировать профиль</span>
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.sliderSmall}>
          <SliderSmall />
        </div>
      </div>
    </>
  );
});

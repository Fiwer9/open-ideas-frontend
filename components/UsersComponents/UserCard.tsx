import React, {useEffect, useState} from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { Header } from "../HeaderComponents/Header";
import Image from "next/image";
import avatar from "../../public/img/AvatarAratrum.svg";

import styles from "./styles/UserCard.module.scss";
import { Button, Col } from "antd";
import router from "next/router";
import Cookies from "js-cookie";
import {UserResponse} from "../../models/response/UserResponse";
import {fetchData, getOrganizationName} from "../../utils/utils";
import UsersService from "../../services/UsersService";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import OrganizationsService from "../../services/OrganizationsService";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";

interface UserCardProps {
  userId: string;
}

export const UserCard = ({userId} : UserCardProps) => {
  Cookies.set('userId', userId);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserResponse>();
  const [organizations, setOrganizations] = useState<OrganizationsResponse[]>();
  const [queries, setQueries] = useState<QueriesResponse[]>([]);
  useEffect(() => {
    userId && fetchData(setIsLoading, setUser, UsersService.getCurrentUpdateUser, userId);
    fetchData(setIsLoading, setOrganizations, OrganizationsService.getOrganizations);
    fetchData(setIsLoading, setQueries, QueriesService.getQueriesTableData, userId)
  }, [userId]);

  function getQueries() {
    return queries.map(query => `№${query.id}`)
  }

  const data = {
    user_name: user?.name,
    email: user?.email,
    organization: organizations && getOrganizationName(user?.department.organization, organizations),
    department: user?.department.name,
    expert_queries: queries ? getQueries().toString().replaceAll(',', ', ') : ''
  }

  useEffect(() => {
    user && Cookies.set('userName', user.name)
  }, [user]);
  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={Cookies.get('user_name')} organization={Cookies.get('organization')} department={Cookies.get('department')}/>
          <Tabs />
          <div className={styles.userContainer}>
            <Image src={avatar} alt={'Аватар'} width={190} height={190}/>

            <div className={styles.infUser}>
              <p className={styles.nameUser}>{data.user_name}</p>

              <Col className={styles.column}>
                <div>
                  <div className={styles.row}>
                    <p className={styles.rowText}>E-mail:</p>
                    <p className={styles.rowInf}>{data.email}</p>
                  </div>

                  <div className={styles.row}>
                    <p className={styles.rowText}>Эксперт по инициативам:</p>
                    <p className={styles.rowInf}>{data.expert_queries}</p>
                  </div>

                  <div className={`${styles.row} ${styles.rowOrg}`}>
                    <p className={styles.rowText}>Организация:</p>
                    <p className={styles.rowInf}>{data.organization}</p>
                  </div>

                  <div className={styles.row}>
                    <p className={styles.rowText}>Отдел:</p>
                    <p className={styles.rowInf}>{data.department}</p>
                  </div>
                </div>
              </Col>

              <Button className={styles.btnFooter} type="primary" onClick={() => router.push(`/users/editingUser?userId=${userId}`)}>
                <span>Редактировать профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

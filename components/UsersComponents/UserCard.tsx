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

interface UserCardProps {
  userId: string;
}

export const UserCard = ({userId} : UserCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserResponse>();
  const [organizations, setOrganizations] = useState<OrganizationsResponse[]>();

  useEffect(() => {
    userId && fetchData(setIsLoading, setUser, UsersService.getCurrentUpdateUser, userId);
    fetchData(setIsLoading, setOrganizations, OrganizationsService.getOrganizations);
  }, [userId]);

  const data = {
    user_name: user?.name,
    email: user?.email,
    organization: organizations && getOrganizationName(user?.department.organization, organizations),
    department: user?.department.name,
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
                <div className={styles.row}>
                  <p className={styles.rowField}>E-mail:</p>
                  <p className={styles.rowField}>Эксперт по инициативам:</p>
                  <p className={`${styles.rowField} ${styles.orgUser}`}>Организация:</p>
                  <p className={styles.rowField}>Отдел:</p>
                </div>

                <div className={styles.row}>
                  <p className={styles.rowInf}>{data.email}</p>
                  <p className={styles.rowInf}>№1, №123, №98453</p>
                  <p className={`${styles.rowInf} ${styles.orgUser}`}>{data.organization}</p>
                  <p className={styles.rowInf}>{data.department}</p>
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

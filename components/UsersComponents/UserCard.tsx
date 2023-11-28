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
    fetchData(setIsLoading, setUser, UsersService.getCurrentUpdateUser, userId);
    fetchData(setIsLoading, setOrganizations, OrganizationsService.getOrganizations);
  }, []);

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
              <p className={styles.nameUser}>{user?.name}</p>

              <Col className={styles.column}>
                <div>
                  <div className={styles.row}>
                    <p className={styles.rowText}>E-mail:</p>
                    <p className={styles.rowInf}>{user?.email}</p>
                  </div>

                  <div className={styles.row}>
                    <p className={styles.rowText}>Эксперт по инициативам:</p>
                    <p className={styles.rowInf}>№1, №123, №98453</p>
                  </div>

                  <div className={`${styles.row} ${styles.rowOrg}`}>
                    <p className={styles.rowText}>Организация:</p>
                    <p className={styles.rowInf}>{organizations && getOrganizationName(user?.department.organization, organizations)}</p>
                  </div>

                  <div className={styles.row}>
                    <p className={styles.rowText}>Отдел:</p>
                    <p className={styles.rowInf}>{user?.department.name}</p>
                  </div>
                </div>
              </Col>

              <Button className={styles.btnFooter} type="primary" onClick={() => router.push('/users/editingUser')}>
                <span>Редактировать профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

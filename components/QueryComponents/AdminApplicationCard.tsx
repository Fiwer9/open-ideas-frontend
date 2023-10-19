import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/AdminApplicationCard.module.scss";
import { HeartOutlined } from "@ant-design/icons";
import { Col, Select } from "antd";
import avatar from "../../public/img/AvatarAratrum.svg";
import Image from "next/image";
import Modal from "../ModalsComponents/Modal";
import React, {useContext, useEffect, useState} from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { useRouter } from "next/router";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import {UserResponse} from "../../models/response/UserResponse";
import {Context} from "../../pages/_app";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import OrganizationsService from "../../services/OrganizationsService";
import UsersService from "../../services/UsersService";
import {fetchData, getDirectionTranslation, getLikes, getOrganizationName} from "../../utils/utils";
import Cookies from "js-cookie";


interface AdminApplicationCardProps {
  queryId: string;
}

export const AdminApplicationCard = ({queryId} : AdminApplicationCardProps) => {
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [organization, setOrganization] = useState<OrganizationsResponse[]>([])
  const [users, setUsers] = useState<UserResponse[]>([])
  const { store } = useContext(Context);
  const [status, setStatus] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [applicationData, setApplicationData] = useState<QueriesResponse>({
    name: '',
    initiator_users: [0],
    implementation_effect: '',
    initiative_direction: '',
    organization: 0,
    expert_users: [],
    status: '',
    description: '',
    date: '',
    id: 0
  })

  useEffect(() => {

    function begin() {
      fetchData(setIsLoading, setApplicationData, QueriesService.getQueriesTableDataById, queryId)
      fetchData(setIsLoading, setOrganization, OrganizationsService.getOrganizations)
      fetchData(setIsLoading, setUsers, UsersService.getUsers)
    }

    queryId ? begin() : router.push('/queries')

  }, [queryId])

  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={Cookies.get('user_name')} organization={Cookies.get('organization')} department={Cookies.get('department')}/>
          <Tabs />
          <div>
            <div>
              <div className={styles.headerContainer}>
                <p className={styles.nameInitiative}>{applicationData.name}</p>
                <div className={styles.btnHeader}>
                  <div className={styles.likesContainer}>
                    <HeartOutlined width={20} height={20} />
                    <p className={styles.numberLikes}>{getLikes(users, queryId)}</p>
                  </div>

                  <Select
                    className='select'
                    style={{width: 175}}
                    defaultValue="В процессе"
                    options={[
                      { value: 'value1', label: 'В процессе' },
                      { value: 'value2', label: 'Отклонена' },
                      { value: 'value3', label: 'Выполнена' },
                    ]}
                  />
                </div>
              </div>
              <p className={styles.data}>Дата создания 25 ноября 2022 г. в 15:25</p>
            </div>

            <Col className={styles.column}>
              <div className={styles.row}>
                <p className={styles.rowText}>Получено от:</p>
                <p className={styles.rowText}>Инициатива (Идея):</p>
                <p className={styles.rowText}>Описание инициативы:</p>
                <p className={styles.rowText}>Эффект от доработки:</p>
                <p className={styles.rowText}>Направление:</p>
                <p className={styles.rowText}>Организация:</p>
                <p className={styles.rowText}>Отдел:</p>
                <p className={styles.rowText}>Назначенный эксперт:</p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowInf}>Иванов Виктор Анатольевич</p>
                <p className={styles.rowInf}>{applicationData.name}</p>
                <p className={styles.rowInf}>{applicationData.description}</p>
                <p className={styles.rowInf}>{applicationData.implementation_effect}</p>
                <p className={styles.rowInf}>{getDirectionTranslation(applicationData.initiative_direction)}</p>
                <p className={styles.rowInf}>{getOrganizationName(applicationData.organization, organization)}</p>
                <p className={styles.rowInf}>Отдел</p>
                <p className={styles.rowInf}>Иванов Олег</p>
              </div>
            </Col>

            <div className={styles.commentContainer}>
              <p className={styles.comment}>Комментарии:</p>
            </div>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                <div className={styles.userImg}>
                  <Image src={avatar} alt={"Avatar"}/>
                </div>
                <div className={styles.infComment}>
                  <p className={styles.name}>Иванов Олег (Эксперт)</p>
                  <p className={styles.date}>19.04.2023</p>
                  <p className={styles.commentText}>Согласен с данной идеей!</p>
                </div>
              </div>
              <div className={styles.avatar}>
                <div className={styles.userImg}>
                  <Image src={avatar} alt={"Avatar"}/>
                </div>
                <div className={styles.infComment}>
                  <p className={styles.name}>Иванов Олег</p>
                  <p className={styles.date}>19.04.2023</p>
                  <p className={styles.commentText}>Согласен с данной идеей!</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button className={`${styles.btnBlue} ${styles.btnFooter}`} onClick={() => router.push(`/queries/editingApplication`)}>Редактировать данные инициативы</button>
            <button className={`${styles.btnRed} ${styles.btnFooter}`}
                    onClick={() => {
                      setModalActive(true);
                    }}>Удалить инициативу</button>
          </div>
        </div>
      </div>

      <Modal
        className={styles.models} active={modalActive} setActive={setModalActive}
        text1={"Удалить инициативу?"}
        text2={"Восстановить будет невозможно"}
        classNameBtn1={styles.btnBlue}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnRed}
        textBtn2={"Удалить инициативу"}
        onClick1={closeModal}
        onClick2={() => router.push('/queries')}
      />
    </>
  );
};

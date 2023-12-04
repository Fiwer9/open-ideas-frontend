import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/AdminApplicationCard.module.scss";
import { DownloadOutlined, HeartOutlined } from "@ant-design/icons";
import { Col, Select, Upload } from "antd";
import avatar from "../../public/img/AvatarAratrum.svg";
import Image from "next/image";
import Modal from "../ModalsComponents/Modal";
import React, {useContext, useEffect, useState} from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { useRouter } from "next/router";
import {UserResponse} from "../../models/response/UserResponse";
import {Context} from "../../pages/_app";
import {
  fetchData,
  formatDate, formatDateRu, formatDateToServer, getAuthor, getDirectionName,
  getLikes,
  getOrganizationName, getStatusClassName, getStatusTranslation,
  getUserName
} from "../../utils/utils";
import Cookies from "js-cookie";
import type { UploadProps } from 'antd';
import FetchQueries from "../../hooks/fetches/FetchQueries/FetchQueries";
import {FetchUsers} from "../../hooks/fetches/FetchUsers/FetchUsers";
import FetchOrganizations from "../../hooks/fetches/FetchOrganizations/FetchOrganizations";
import FetchComments from "../../hooks/fetches/FetchComments/FetchComments";
import FetchDirections from "../../hooks/fetches/FetchDirections/FetchDirections";


interface AdminApplicationCardProps {
  queryId: string;
}

export const AdminApplicationCard = ({queryId} : AdminApplicationCardProps) => {

  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [organization, setOrganization] = FetchOrganizations.useGetOrganizations()
  const [users, setUsers] = FetchUsers.useGetUsers();
  const [user, setUser] = useState<UserResponse>()
  const { store } = useContext(Context);
  const [dataComment, setDataComment] = FetchComments.useGetComments();
  const [directions, setDirections] = FetchDirections.useGetDirections();
  const [status, setStatus] = useState('')
  const [applicationData, setApplicationData] = FetchQueries.useGetQueriesById(queryId? queryId : Cookies.get('queryId'))

  useEffect(() => {

    function begin() {
      const translateStatus = getStatusTranslation(applicationData.status)
      setStatus(translateStatus)
    }

    begin()

  }, [queryId])

  const closeModal = () => {
    setModalActive(false);
  };

  useEffect(() => {
    getAuthor(applicationData.initiator_users, users, setUser)
    Cookies.set('queryName', applicationData.name)
  }, [applicationData]);


  function getExpert(users_id: any) {
    const expert = []
    for (let id of users_id) {
      for (let user of users) {
        if (id === user.id) {
          expert.push(user.name)
        }
      }
    }
    return expert? expert : 'Не назначено'
  }

  const checkExpert = (comment_user: number) => {
    let isExpert = false;

    applicationData.expert_users.forEach((user) => {
      if (user === comment_user) {
        isExpert = true;
      }
    });

    return isExpert;
  }

  const data = {
    user_name: user?.name,
    query_name: applicationData.name,
    description: applicationData.description,
    effect: applicationData.implementation_effect,
    direction: getDirectionName(applicationData.initiative_direction, directions),
    organization: getOrganizationName(applicationData.organization, organization),
    department: user?.department.name,
    expert: getExpert(applicationData.expert_users),
    status: getStatusTranslation(applicationData.status)
  }

  useEffect(() => {
    setStatus(getStatusTranslation(applicationData.status))
  }, [applicationData]);

  const patchQuery = async (status: string) => {
    try {
      const currentDate = new Date();
      const date = formatDateToServer(currentDate, '-')
      await store.patchQuery(date, applicationData.name, applicationData.description,
        applicationData.initiative_direction, status, applicationData.implementation_effect,
        applicationData.organization, applicationData.initiator_users, Number(queryId));
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  function handleDeleteIdea() {
    router.push('/queries')
    store.deleteQuery(Number(queryId))
  }

  const props: UploadProps = {
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        url: '',
      },
      {
        uid: '2',
        name: 'xxx.png',
        status: 'done',
        url: '',
      },
      {
        uid: '3',
        name: 'xxx.png',
        status: 'done',
        url: '',
      },
    ],
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: <DownloadOutlined />,
      showRemoveIcon: false,
    },
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
                  {applicationData.status && (
                    <Select
                      className={`selectInitiative ${getStatusClassName(styles, applicationData.status)}`}
                      style={{width: 250}}
                      defaultValue={applicationData.status}
                      options={[
                        { value: 'registered', label: 'Зарегистрирована' },
                        { value: 'check', label: 'На рассмотрении' },
                        { value: 'analysis', label: 'Анализируется экспертом' },
                        { value: 'accepted', label: 'На рассмотрении у руководства' },
                        { value: 'implementation', label: 'Принята к реализации' },
                        { value: 'done', label: 'Выполнена' },
                        { value: 'rejected', label: 'Отклонена' },
                      ]}
                      onChange={(value) => patchQuery(value)}
                    />
                  )}
                </div>
              </div>
              <p className={styles.data}>{`Дата создания ${formatDateRu(applicationData.date)}`}</p>
            </div>

            <Col className={styles.column}>
              <div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Получено от:</p>
                  <p className={styles.rowInf}>{data.user_name}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Инициатива (Идея):</p>
                  <p className={styles.rowInf}>{data.query_name}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Описание инициативы:</p>
                  <p className={styles.rowInf}>{data.description}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Эффект от доработки:</p>
                  <p className={styles.rowInf}>{data.effect}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Направление:</p>
                  <p className={styles.rowInf}>{data.direction}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Организация:</p>
                  <p className={styles.rowInf}>{data.organization}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Отдел:</p>
                  <p className={styles.rowInf}>{data.department}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Назначенный эксперт:</p>
                  <p className={styles.rowInf}>{data.expert? data.expert : 'Не назначено'}</p>
                </div>
              </div>
              <div className={styles.rows}>
                <div className={styles.files}>
                  <p className={styles.rowTexts}>Прикреплённые файлы:</p>
                  <Upload {...props} className='uploadFile'></Upload>
                </div>
              </div>
            </Col>

            <div className={styles.commentContainer}>
              <p className={styles.comment}>Комментарии:</p>
            </div>
            {dataComment .filter((comment) => comment.query === Number(queryId))
              .map((comment) => (
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar}>
                    <div className={styles.userImg}>
                      <Image src={avatar} alt={"Avatar"}/>
                    </div>
                    <div className={styles.infComment}>
                      <p className={styles.name}>{`${getUserName(comment.user, users)} ${checkExpert(comment.user)? '(Эксперт)' : '(Пользователь)'}`}</p>
                      <p className={styles.date}>{formatDate(comment.created_at)}</p>
                      <p className={styles.commentText}>{comment.comment_text}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.btnContainer}>
            <button className={`${styles.btnBlue} ${styles.btnFooter}`} onClick={() => router.push(`/queries/editingApplication?queryId=${queryId}`)}>Редактировать данные инициативы</button>
            <button className={`${styles.btnRed} ${styles.btnFooter}`}
                    onClick={() => {
                      setModalActive(true);
                    }}>Удалить инициативу</button>
          </div>
        </div>
      </div>

      <Modal
        active={modalActive} setActive={setModalActive}
        text1={"Удалить инициативу?"}
        text2={"Восстановить будет невозможно"}
        classNameBtn1={styles.btnBlue}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnRed}
        textBtn2={"Удалить инициативу"}
        onClick1={closeModal}
        onClick2={handleDeleteIdea}
        stylesContentModal={styles.contentModal}
      />
    </>
  );
};

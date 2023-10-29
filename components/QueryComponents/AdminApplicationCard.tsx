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
import {
  fetchData,
  formatDate, formatDateRu, formatDateToServer, getAuthor,
  getDirectionTranslation,
  getLikes,
  getOrganizationName, getStatusTranslation,
  getUserName
} from "../../utils/utils";
import Cookies from "js-cookie";
import {CommentResponse} from "../../models/response/CommentResponse";
import CommentService from "../../services/CommentService";


interface AdminApplicationCardProps {
  queryId: string;
}

export const AdminApplicationCard = ({queryId} : AdminApplicationCardProps) => {
  Cookies.set('queryId', queryId)
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [organization, setOrganization] = useState<OrganizationsResponse[]>([])
  const [users, setUsers] = useState<UserResponse[]>([])
  const [user, setUser] = useState<UserResponse>()
  const { store } = useContext(Context);
  const [dataComment, setDataComment] = useState<CommentResponse[]>([])
  const [status, setStatus] = useState('')
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
      const translateStatus = getStatusTranslation(applicationData.status)
      setStatus(translateStatus)
      fetchData(setIsLoading, setOrganization, OrganizationsService.getOrganizations)
      fetchData(setIsLoading, setUsers, UsersService.getUsers)
      fetchData(setIsLoading, setDataComment, CommentService.getComments)
    }

    queryId ? begin() : router.push('/queries')

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
    direction: getDirectionTranslation(applicationData.initiative_direction),
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
                    key={status}
                    className='select'
                    style={{maxWidth: 600}}
                    defaultValue={status}
                    options={[
                      { value: 'registered', label: 'Зарегистрирована' },
                      { value: 'check', label: 'В процессе' },
                      { value: 'analysis', label: 'Анализируется экспертом' },
                      { value: 'accepted', label: 'На рассмотрении у руководства' },
                      { value: 'implementation', label: 'Принята к реализации' },
                      { value: 'done', label: 'Выполнена' },
                      { value: 'rejected', label: 'Отклонена' },
                    ]}
                    onChange={(value) => patchQuery(value)}
                  />
                </div>
              </div>
              <p className={styles.data}>Дата создания {formatDateRu(applicationData.date)}</p>
            </div>

            <Col className={styles.column}>
              <div className={styles.row} key={0}>
                <p className={styles.rowText}>Получено от:</p>
                <p className={styles.rowText}>Инициатива (Идея):</p>
                <p className={styles.rowText}>Описание инициативы:</p>
                <p className={styles.rowText}>Эффект от доработки:</p>
                <p className={styles.rowText}>Направление:</p>
                <p className={styles.rowText}>Организация:</p>
                <p className={styles.rowText}>Отдел:</p>
                <p className={styles.rowText}>Назначенный эксперт:</p>
              </div>
              <div className={styles.row} key={1}>
                <p className={styles.rowInf}>{data.user_name}</p>
                <p className={styles.rowInf}>{data.query_name}</p>
                <p className={styles.rowInf}>{data.description}</p>
                <p className={styles.rowInf}>{data.effect}</p>
                <p className={styles.rowInf}>{data.direction}</p>
                <p className={styles.rowInf}>{data.organization}</p>
                <p className={styles.rowInf}>{data.department}</p>
                <p className={styles.rowInf}>{data.expert || 'Не назначено'}</p>
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
        className={styles.models} active={modalActive} setActive={setModalActive}
        text1={"Удалить инициативу?"}
        text2={"Восстановить будет невозможно"}
        classNameBtn1={styles.btnBlue}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnRed}
        textBtn2={"Удалить инициативу"}
        onClick1={closeModal}
        onClick2={handleDeleteIdea}
      />
    </>
  );
};

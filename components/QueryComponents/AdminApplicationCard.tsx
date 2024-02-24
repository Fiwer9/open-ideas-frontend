import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/AdminApplicationCard.module.scss";
import { DownloadOutlined, HeartOutlined } from "@ant-design/icons";
import { Col, Select, Upload } from "antd";
import avatar from "../../public/img/AvatarAratrum.svg";
import Image from "next/image";
import Modal from "../ModalsComponents/Modal";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { useRouter } from "next/router";
import { UserResponse } from "../../models/response/UserResponse";
import {
  formatDate,
  formatDateRu,
  formatDateToServer,
  getAuthor,
  getDirectionName,
  getOrganizationName,
  getStatusClassName,
  getStatusTranslation,
  getUserName,
  statusTranslation,
} from "../../utils/utils";
import Cookies from "js-cookie";
import type { UploadProps } from "antd";
import FetchQueries from "../../hooks/fetches/FetchQueries/FetchQueries";
import { FetchUsers } from "../../hooks/fetches/FetchUsers/FetchUsers";
import FetchOrganizations from "../../hooks/fetches/FetchOrganizations/FetchOrganizations";
import FetchComments from "../../hooks/fetches/FetchComments/FetchComments";
import FetchDirections from "../../hooks/fetches/FetchDirections/FetchDirections";
import { useSelector } from "react-redux";
import { selectOrganizations } from "../../redux/organizationsSlice/selectors";
import { selectUpdateUsers } from "../../redux/usersSlice/selectors";
import { selectComments } from "../../redux/commentsSlice/selectors";
import { selectDirections } from "../../redux/directionsSlice/selectors";
import { selectQueryData } from "../../redux/queriesSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchQueriesById } from "../../redux/queriesSlice/asyncActions";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import { fetchUpdateUsers } from "../../redux/usersSlice/asyncActions";
import { fetchComments } from "../../redux/commentsSlice/asyncActions";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import debounce from "lodash.debounce";

export const AdminApplicationCard = () => {
  const router = useRouter();
  const { queryId } = router.query as { queryId: string };
  const [modalActive, setModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const organizations = useSelector(selectOrganizations);
  const users = useSelector(selectUpdateUsers);
  const [user, setUser] = useState<UserResponse>();
  const dataComments = useSelector(selectComments);
  const directions = useSelector(selectDirections);
  const applicationData = useSelector(selectQueryData);
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    debounce(async () => {
      await dispatch(fetchQueriesById({ id: queryId }));
      await dispatch(fetchUpdateUsers());
      await dispatch(fetchDirections());
      await dispatch(fetchOrganizations());
      await dispatch(fetchComments());
      const translateStatus = statusTranslation[applicationData.status];
      setStatus(translateStatus);
    }, 2000),
    [queryId]
  );

  useEffect(() => {
    queryId && fetchData();
  }, [queryId]);

  const closeModal = () => {
    setModalActive(false);
  };

  useEffect(() => {
    Cookies.set("queryName", applicationData.name);
  }, [applicationData]);

  function getExpert(users_id?: [number]) {
    try {
      const expert = [];
      for (let id of users_id) {
        for (let user of users) {
          if (id === user.id) {
            expert.push(user.name);
          }
        }
      }
      return expert;
    } catch (e) {
      return "Не назначено";
    }
  }

  const checkExpert = (commentUser: number) =>
    applicationData.expert_users[0] === commentUser;

  const data = {
    user_name: user?.name,
    query_name: applicationData.name,
    description: applicationData.description,
    effect: applicationData.implementation_effect,
    direction: getDirectionName(
      applicationData.initiative_direction,
      directions
    ),
    organization: getOrganizationName(
      applicationData.organization,
      organizations
    ),
    department: user?.department.name,
    expert: getExpert(applicationData.expert_users),
    status: getStatusTranslation(applicationData.status),
  };

  useEffect(() => {
    setStatus(statusTranslation[applicationData.status]);
  }, [applicationData]);

  const patchQuery = async (status: string) => {
    try {
      const currentDate = new Date();
      const date = formatDateToServer(currentDate, "-");
      // await store.patchQuery(
      //   date,
      //   applicationData.name,
      //   applicationData.description,
      //   applicationData.initiative_direction,
      //   status,
      //   applicationData.implementation_effect,
      //   applicationData.organization,
      //   applicationData.initiator_users,
      //   Number(queryId)
      // );
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  function handleDeleteIdea() {
    router.push("/queries");
    // store.deleteQuery(Number(queryId));
  }

  const props: UploadProps = {
    defaultFileList: [
      {
        uid: "1",
        name: "xxx.png",
        status: "done",
        url: "",
      },
      {
        uid: "2",
        name: "xxx.png",
        status: "done",
        url: "",
      },
      {
        uid: "3",
        name: "xxx.png",
        status: "done",
        url: "",
      },
    ],
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: <DownloadOutlined />,
      showRemoveIcon: false,
    },
  };

  const getLikes = useCallback(() => {
    let like = 0;
    for (let user of users) {
      for (let query_id of user.likes) {
        if (query_id === Number(queryId)) {
          like += 1;
        }
      }
    }
    return like;
  }, [users]);

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
          <div>
            <div className={styles.ideaInfContainer}>
              <div className={styles.headerContainerIdea}>
                <p className={styles.nameInitiative}>{applicationData.name}</p>
                <div className={styles.btnHeader}>
                  <div className={styles.likesContainer}>
                    <HeartOutlined width={20} height={20} />
                    <p className={styles.numberLikes}>
                      {users.length > 0 && getLikes()}
                    </p>
                  </div>
                  {applicationData.status && (
                    <Select
                      className={`selectInitiative ${getStatusClassName(
                        styles,
                        applicationData.status
                      )}`}
                      style={{ width: 250 }}
                      defaultValue={applicationData.status}
                      options={[
                        { value: "registered", label: "Зарегистрирована" },
                        { value: "check", label: "На рассмотрении" },
                        { value: "analysis", label: "Анализируется экспертом" },
                        {
                          value: "accepted",
                          label: "На рассмотрении у руководства",
                        },
                        {
                          value: "implementation",
                          label: "Принята к реализации",
                        },
                        { value: "done", label: "Выполнена" },
                        { value: "rejected", label: "Отклонена" },
                      ]}
                      onChange={(value) => patchQuery(value)}
                    />
                  )}
                </div>
              </div>
              <p className={styles.data}>{`Дата создания ${
                applicationData.date && formatDateRu(applicationData.date)
              }`}</p>
            </div>

            <Col className={styles.column}>
              <div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Получено от:</p>
                  <p className={styles.rowInf}>
                    {users.length > 0 &&
                      getAuthor(applicationData.initiator_users, users)}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Инициатива (Идея):</p>
                  <p className={styles.rowInf}>{applicationData.name}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Описание инициативы:</p>
                  <p className={styles.rowInf}>{applicationData.description}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Эффект от доработки:</p>
                  <p className={styles.rowInf}>
                    {applicationData.implementation_effect}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Направление:</p>
                  <p className={styles.rowInf}>
                    {getDirectionName(
                      applicationData.initiative_direction,
                      directions
                    )}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Организация:</p>
                  <p className={styles.rowInf}>
                    {getOrganizationName(
                      applicationData.organization,
                      organizations
                    )}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Отдел:</p>
                  <p className={styles.rowInf}>{}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Назначенный эксперт:</p>
                  <p className={styles.rowInf}>
                    {data.expert ? data.expert : "Не назначено"}
                  </p>
                </div>
              </div>
              <div className={styles.rows}>
                <div className={styles.files}>
                  <p className={styles.rowTexts}>Прикреплённые файлы:</p>
                  <Upload {...props} className="uploadFile"></Upload>
                </div>
              </div>
            </Col>

            <div className={styles.commentContainer}>
              <p className={styles.comment}>Комментарии:</p>
            </div>
            {dataComments
              .filter((comment) => comment.query === Number(queryId))
              .map((comment) => (
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar}>
                    <div className={styles.userImg}>
                      <Image src={avatar} alt={"Avatar"} />
                    </div>
                    <div className={styles.infComment}>
                      <p className={styles.name}>{`${getUserName(
                        comment.user,
                        users
                      )} ${
                        checkExpert(comment.user)
                          ? "(Эксперт)"
                          : "(Пользователь)"
                      }`}</p>
                      <p className={styles.date}>
                        {formatDate(comment.created_at)}
                      </p>
                      <p className={styles.commentText}>
                        {comment.comment_text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className={styles.btnContainer}>
            <button
              className={`${styles.btnBlue} ${styles.btnFooter}`}
              onClick={() =>
                router.push(`/queries/editingApplication?queryId=${queryId}`)
              }
            >
              Редактировать данные инициативы
            </button>
            <button
              className={`${styles.btnRed} ${styles.btnFooter}`}
              onClick={() => {
                setModalActive(true);
              }}
            >
              Удалить инициативу
            </button>
          </div>

          <div className={styles.btnContainer430}>
            <button
              className={`${styles.btnBlue} ${styles.btnFooter430}`}
              onClick={() =>
                router.push(`/queries/editingApplication?queryId=${queryId}`)
              }
            >
              Редактировать
            </button>
            <button
              className={`${styles.btnRed} ${styles.btnFooter430}`}
              onClick={() => {
                setModalActive(true);
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>

      <Modal
        active={modalActive}
        setActive={setModalActive}
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

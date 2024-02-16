import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card, Form, Upload, Radio } from "antd";
import {
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";
import { Logo } from "../PicturesComponents/Logo";
import { Buttons } from "../ButtonComponent/Button";
import avatar from "../../public/img/AvatarAratrum.svg";
import styles from "./styles/ApplicationCard.module.scss";
import router, { useRouter } from "next/router";
import OrganizationsService from "../../services/OrganizationsService";
import {
  getDirectionName,
  formatDateToServer,
  getOrganizationName,
  getStatusClassName,
  getStatusTranslation,
  getUserName,
  formatDate,
} from "../../utils/utils";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import CommentService from "../../services/CommentService";
import { CommentResponse } from "../../models/response/CommentResponse";
import UsersService from "../../services/UsersService";
import { UserResponse } from "../../models/response/UserResponse";
import Image from "next/image";
import type { UploadProps } from "antd";
import FetchQueries from "../../hooks/fetches/FetchQueries/FetchQueries";
import FetchDirections from "../../hooks/fetches/FetchDirections/FetchDirections";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import {
  selectDirections,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import {
  selectOrganization,
  selectOrganizations,
} from "../../redux/organizationsSlice/selectors";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import { selectCurrentUser } from "../../redux/authSlice/selectors";
import {
  fetchQueries,
  fetchQueriesById,
} from "../../redux/queriesSlice/asyncActions";
import {
  selectQueriesData,
  selectQueryData,
  selectStatusQueries,
} from "../../redux/queriesSlice/selectors";
import { WritableDraft } from "immer/src/types/types-external";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import {
  selectUpdateUsers,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import {
  selectComments,
  selectStatusComments,
} from "../../redux/commentsSlice/selectors";
import { fetchUpdateUsers } from "../../redux/usersSlice/asyncActions";
import { fetchComments } from "../../redux/commentsSlice/asyncActions";
import { Status } from "../../redux/queriesSlice/types";

type ApplicationCardProps = {
  user_status: string;
};

export const ApplicationCard = ({ user_status }: ApplicationCardProps) => {
  const router = useRouter();
  const { queryId } = router.query as { queryId: string };
  const [isLoading, setIsLoading] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const users = useSelector(selectUpdateUsers);
  const [status, setStatus] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const dataComment = useSelector(selectComments);
  const directions = useSelector(selectDirections);
  const organizations = useSelector(selectOrganizations);
  const applicationData = useSelector(selectQueryData);
  const statusDirections = useSelector(selectStatusDirections);
  const statusUsers = useSelector(selectUsersStatus);
  const statusComments = useSelector(selectStatusComments);
  const statusQuery = useSelector(selectStatusQueries);
  const { user_id } = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      statusDirections === Status.LOADING ||
      statusUsers === Status.LOADING ||
      statusQuery === Status.LOADING ||
      statusComments === Status.LOADING
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [statusDirections, statusUsers, statusQuery, statusComments]);

  useEffect(() => {
    queryId && dispatch(fetchQueriesById({ id: queryId }));
  }, [queryId]);

  useEffect(() => {
    dispatch(fetchUpdateUsers());
    dispatch(fetchDirections());
    dispatch(fetchOrganizations());
    dispatch(fetchComments());
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       for (let user of users) {
  //         if (user.id === user_id) {
  //           for (let query_id of user.likes) {
  //             if (query_id === Number(queryId)) {
  //               setIsLiked(true);
  //             }
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [queryId]);

  function getLikes() {
    let like = 0;
    for (let user of users) {
      for (let query_id of user.likes) {
        if (query_id === Number(queryId)) {
          like += 1;
        }
      }
    }
    return like;
  }

  const patchQuery = async (status: string) => {
    try {
      const currentDate = new Date();
      const date = formatDateToServer(currentDate, "-");
      // await store.patchQuery(date, applicationData.name, applicationData.description,
      //   applicationData.initiative_direction, status, applicationData.implementation_effect,
      //   applicationData.organization, applicationData.initiator_users, Number(queryId));
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  const sendComment = async (comment: string) => {
    try {
      const userId = sessionStorage.getItem("user_id");
      // await store.sendComment(comment, Number(queryId), userId ? Number(userId) : 0);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  const checkExpert = (comment_user: number) => {
    let isExpert = false;

    applicationData.expert_users.forEach((user) => {
      if (user === comment_user) {
        isExpert = true;
      }
    });

    return isExpert;
  };

  const getAllUserLikes = () => {
    const res = [];
    for (let user of users) {
      if (user.id === Number(sessionStorage.getItem("user_id"))) {
        for (let query_id of user.likes) {
          res.push(query_id);
        }
      }
    }
    return res;
  };

  const patchAddLike = async (id: number) => {
    try {
      const likes = getAllUserLikes();
      likes.push(Number(queryId));
      // await store.patchLike(id, likes);
      const users = await UsersService.getUsers();
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  const patchRemoveLike = async (id: number) => {
    try {
      const likes = getAllUserLikes();
      const index = likes.indexOf(Number(queryId));
      if (index > -1) {
        likes.splice(index, 1);
      }
      // await store.patchLike(id, likes);
      const users = await UsersService.getUsers();
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  if (!queryId) {
    return null;
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

  return (
    <div>
      <Card className={styles.card} loading={isLoading}>
        <Form className={styles.form}>
          <Form.Item className={styles.logo}>
            <div className={styles.headerContainer}>
              <div className={styles.logo}>
                <Logo width={147} height={42} />
              </div>
              <div className={styles.headerContent}>
                <div className={styles.iconContainer}>
                  {isLiked ? (
                    <HeartFilled
                      className={styles.likes}
                      style={{ color: "#FF185D" }}
                      onClick={() => {
                        patchRemoveLike(
                          Number(sessionStorage.getItem("user_id"))
                        );
                        setIsLiked(false);
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      className={styles.likes}
                      onClick={() => {
                        patchAddLike(Number(sessionStorage.getItem("user_id")));
                        setIsLiked(true);
                      }}
                    />
                  )}
                  <p className={styles.numberLikes}>
                    {users.length > 0 && getLikes()}
                  </p>
                </div>
                <p
                  className={`${styles.statusQuery} ${getStatusClassName(
                    styles,
                    applicationData.status
                  )}`}
                >
                  {getStatusTranslation(applicationData.status)}
                </p>
              </div>
            </div>
          </Form.Item>
          <Col className={styles.col}>
            <Row className={styles.row}>
              <p className={styles.rowText}>Номер заявки:</p>
              <p className={styles.rowInf}>{applicationData.id}</p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Инициатива (Идея):</p>
              <p className={styles.rowInf}>{applicationData.name}</p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Описание инициативы:</p>
              <p className={styles.rowInf}>{applicationData.description}</p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Направление:</p>
              <p className={styles.rowInf}>
                {directions.length > 0 &&
                  applicationData.initiative_direction &&
                  getDirectionName(
                    applicationData.initiative_direction,
                    directions
                  )}
              </p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Организация:</p>
              <p className={styles.rowInf}>
                {organizations.length > 0 &&
                  applicationData.organization &&
                  getOrganizationName(
                    applicationData.organization,
                    organizations
                  )}
              </p>
            </Row>
            <Row className={styles.row}>
              <div className={styles.files}>
                <p className={styles.rowText}>Прикреплённые файлы:</p>
                <Upload {...props} className="uploadFile"></Upload>
              </div>
            </Row>
            <Row className={styles.row}>
              <p className={`${styles.rowText} ${styles.comments}`}>
                Комментарии:
              </p>
            </Row>
            {dataComment
              ?.filter((comment) => comment.query === Number(queryId))
              .map((comment, index) => (
                <Row className={styles.row} key={index}>
                  <div className={styles.userContainer}>
                    <div className={styles.userAvatar}>
                      <Image src={avatar} width={60} alt={"Аватарка"}></Image>
                    </div>
                    <div className={styles.user}>
                      <div className={styles.userName}>
                        <p className={styles.name}>
                          {getUserName(comment.user, users)}
                        </p>
                        <p className={styles.status}>
                          {checkExpert(comment.user)
                            ? "(Эксперт)"
                            : "(Пользователь)"}
                        </p>
                      </div>
                      <p className={styles.data}>
                        {formatDate(comment.created_at)}
                      </p>
                      <p className={styles.comment}>{comment.comment_text}</p>
                    </div>
                  </div>
                </Row>
              ))}
          </Col>
          <Form.Item className={styles.textAreaContainer}>
            <p className={styles.textAreaTitle}>
              Оставьте свой комментарий по инициативе здесь:
            </p>
            <div className={styles.textArea}>
              <textarea
                className={styles.textAreaCustom}
                placeholder={"Напишите комментарий по этой инициативе"}
                onChange={(evt: any) => {
                  setCommentValue(evt.target.value);
                }}
                value={commentValue}
              />
            </div>
          </Form.Item>
          {user_status ? (
            <div className={styles.footerContainerChild}>
              <div className={styles.buttonsContainer}>
                <div className={styles.checkboxContainer}>
                  <Radio.Group
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    value={status}
                  >
                    <Radio className={styles.checkbox} value={"rejected"}>
                      {" "}
                      Отклонено
                    </Radio>
                    <Radio className={styles.checkbox} value={"accepted"}>
                      Одобрено для реализации
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className={styles.submitBtns}>
                <div className={styles.btnWhite}>
                  <Buttons
                    text={"Отменить"}
                    onClick={() => {
                      router.push("/queries");
                    }}
                  />
                </div>
                <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                  <Buttons
                    onClick={() => {
                      commentValue && sendComment(commentValue);
                      status && patchQuery(status);
                      router.push("/queries");
                    }}
                    text={"Отправить"}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.footerContainer}>
              <div className={styles.btnWhite}>
                <Buttons
                  onClick={() => router.push("/queries")}
                  text={"Назад"}
                />
              </div>
              <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                <Buttons
                  text={"Отправить"}
                  type="submit"
                  onClick={() => {
                    router.push("/queries");
                    commentValue && sendComment(commentValue);
                  }}
                />
              </div>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};

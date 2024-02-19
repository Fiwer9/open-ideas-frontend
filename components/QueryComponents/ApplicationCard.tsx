import React, { memo, useCallback, useEffect, useState } from "react";
import { Card, Upload, Radio, Flex } from "antd";
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
import { useRouter } from "next/router";
import {
  formatDateToServer,
  getOrganizationName,
  getStatusClassName,
  getStatusTranslation,
  getUserName,
  formatDate,
  getAllUserLikes,
  getDirectionName,
} from "../../utils/utils";
import Image from "next/image";
import type { UploadProps } from "antd";
import { useSelector } from "react-redux";
import {
  selectDirections,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import { selectOrganizations } from "../../redux/organizationsSlice/selectors";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import { selectCurrentUser } from "../../redux/authSlice/selectors";
import {
  fetchQueriesById,
  patchQuery,
} from "../../redux/queriesSlice/asyncActions";
import {
  selectQueryData,
  selectStatusQueries,
} from "../../redux/queriesSlice/selectors";
import {
  selectUpdateUsers,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import {
  selectComments,
  selectCurrentComment,
  selectStatusComments,
} from "../../redux/commentsSlice/selectors";
import {
  fetchUpdateUsers,
  patchLikes,
} from "../../redux/usersSlice/asyncActions";
import {
  fetchComments,
  postComment,
} from "../../redux/commentsSlice/asyncActions";
import { Status } from "../../redux/queriesSlice/types";
import { CommentResponse } from "../../models/response/CommentResponse";
import { UsersUpdateResponse } from "../../models/response/UsersUpdateResponse";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import { TextAreas } from "../TextAreaComponent/TextArea";
import { setCurrentComment } from "../../redux/commentsSlice/slice";
import debounce from "lodash.debounce";

type ApplicationCardProps = {
  user_status: string;
};

type CommentBlockProps = {
  index: number;
  comment: CommentResponse;
  users: UsersUpdateResponse[];
  applicationData: QueriesResponse;
};

const CommentBlock: React.FC<CommentBlockProps> = memo(
  ({ index, comment, users, applicationData }) => {
    const checkExpert = (commentUser: number) =>
      applicationData.expert_users[0] === commentUser;

    return (
      <Row className={styles.row} key={index}>
        <div className={styles.userContainer}>
          <div className={styles.userAvatar}>
            <Image src={avatar} width={60} alt={"Аватарка"}></Image>
          </div>
          <div className={styles.user}>
            <div className={styles.userName}>
              <p className={styles.name}>
                {users.length > 0 && getUserName(comment.user, users)}
              </p>
              <p className={styles.status}>
                {applicationData.expert_users && checkExpert(comment.user)
                  ? "(Эксперт)"
                  : "(Пользователь)"}
              </p>
            </div>
            <p className={styles.data}>{formatDate(comment.created_at)}</p>
            <p className={styles.comment}>{comment.comment_text}</p>
          </div>
        </div>
      </Row>
    );
  }
);

export const ApplicationCard: React.FC<ApplicationCardProps> = memo(
  ({ user_status }) => {
    const router = useRouter();
    const { queryId } = router.query as { queryId: string };
    const [isLoading, setIsLoading] = useState(false);
    const commentValue = useSelector(selectCurrentComment);
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
        statusDirections === Status.SUCCESS &&
        statusUsers === Status.SUCCESS &&
        statusQuery === Status.SUCCESS &&
        statusComments === Status.SUCCESS
      ) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }, [statusDirections, statusUsers, statusQuery, statusComments]);

    const getIsLiked = () => {
      const currentUser = users.find((user) => user.id === user_id);
      setIsLiked(
        Boolean(
          currentUser.likes.find((query_id) => query_id === Number(queryId))
        )
      );
    };

    const fetchData = useCallback(
      debounce(async () => {
        await dispatch(fetchQueriesById({ id: queryId }));
        await dispatch(fetchUpdateUsers());
        await dispatch(fetchDirections());
        await dispatch(fetchOrganizations());
        await dispatch(fetchComments());
      }, 2000),
      [queryId]
    );

    useEffect(() => {
      queryId && fetchData();
    }, [queryId]);

    useEffect(() => {
      users.length > 0 && getIsLiked();
    }, [users]);

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

    const changeStatus = async (status: string) => {
      const currentDate = new Date();
      const date = formatDateToServer(currentDate, "-");
      const {
        name,
        id,
        description,
        organization,
        initiative_direction,
        initiator_users,
        implementation_effect,
      } = applicationData;
      await dispatch(
        patchQuery({
          date,
          status,
          id,
          description,
          name,
          initiative_direction,
          initiator_users,
          implementation_effect,
          organization,
        })
      );
    };

    const sendComment = async (comment: string) => {
      await dispatch(
        postComment({ comment, query_id: Number(queryId), user_id })
      );
    };

    const patchAddLike = async (userId: number) => {
      const likedQueries = [...getAllUserLikes(users, userId), Number(queryId)];
      await dispatch(patchLikes({ userId, likedQueries }));
      await dispatch(fetchUpdateUsers());
    };

    const patchRemoveLike = async (userId: number) => {
      const likedQueries = getAllUserLikes(users, userId);
      const index = likedQueries.indexOf(Number(queryId));
      if (index > -1) {
        likedQueries.splice(index, 1);
      }
      await dispatch(patchLikes({ userId, likedQueries }));
      await dispatch(fetchUpdateUsers());
    };

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
      <>
        <Card className={styles.card} loading={isLoading}>
          <Flex className={styles.form} vertical={true}>
            <div className={styles.logo}>
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
                          patchRemoveLike(user_id);
                          setIsLiked(false);
                        }}
                      />
                    ) : (
                      <HeartOutlined
                        className={styles.likes}
                        onClick={() => {
                          patchAddLike(user_id);
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
                      applicationData?.status
                    )}`}
                  >
                    {getStatusTranslation(applicationData?.status)}
                  </p>
                </div>
              </div>
            </div>
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
                  {applicationData.organization &&
                    organizations.length > 0 &&
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
                  Комментарии (
                  {
                    dataComment.filter(
                      (comment) => comment.query === Number(queryId)
                    ).length
                  }
                  ):
                </p>
              </Row>
              {dataComment
                ?.filter((comment) => comment.query === Number(queryId))
                .map((comment, index) => (
                  <CommentBlock
                    key={index}
                    index={index}
                    comment={comment}
                    users={users}
                    applicationData={applicationData}
                  />
                ))}
            </Col>
            <div className={styles.textAreaContainer}>
              <p className={styles.textAreaTitle}>
                Оставьте свой комментарий по инициативе здесь:
              </p>
              <div className={styles.textArea}>
                <TextAreas
                  placeholder={"Напишите комментарий по этой инициативе"}
                />
              </div>
            </div>
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
                      type="reset"
                    />
                  </div>
                  <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                    <Buttons
                      onClick={() => {
                        commentValue && sendComment(commentValue);
                        status && changeStatus(status);
                        router.push("/queries");
                      }}
                      text={"Отправить"}
                      type={"submit"}
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
                    type={"reset"}
                  />
                </div>
                <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                  <Buttons
                    text={"Отправить"}
                    type="submit"
                    onClick={() => {
                      commentValue && sendComment(commentValue);
                      dispatch(setCurrentComment(""));
                      router.push("/queries");
                    }}
                  />
                </div>
              </div>
            )}
          </Flex>
        </Card>
      </>
    );
  }
);

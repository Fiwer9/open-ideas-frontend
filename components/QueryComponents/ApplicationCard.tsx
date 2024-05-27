import {
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, Col, Flex, Radio, Row, UploadProps } from "antd";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice/selectors";
import {
  fetchCommentsById,
  postComment,
} from "../../redux/commentsSlice/asyncActions";
import {
  selectComments,
  selectCurrentComment,
  selectStatusComments,
} from "../../redux/commentsSlice/selectors";
import {
  setComments,
  setCurrentComment,
} from "../../redux/commentsSlice/slice";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import {
  selectDirections,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import { selectOrganizations } from "../../redux/organizationsSlice/selectors";
import {
  fetchQueriesById,
  patchQuery,
} from "../../redux/queriesSlice/asyncActions";
import {
  selectQueryData,
  selectStatusQueries,
} from "../../redux/queriesSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import { useAppDispatch } from "../../redux/store";
import { fetchUsers, patchLikes } from "../../redux/usersSlice/asyncActions";
import {
  selectUsers,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import {
  checkExpert,
  formatDateToServer,
  getAllUserLikes,
  getDirectionName,
  getOrganizationName,
  getStatusClassName,
  statusTranslation,
} from "../../utils/utils";
import { Buttons } from "../ButtonComponent/Button";
import { Logo } from "../PicturesComponents/Logo";
import { TextAreas } from "../TextAreaComponent/TextArea";
import styles from "./styles/ApplicationCard.module.scss";
import { CommentBlock } from "./blocks/CommentBlock";
import { setStatusQueries } from "../../redux/queriesSlice/slice";
import { setStatusDirections } from "../../redux/directionsSlice/slice";

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

export const ApplicationCard: React.FC = memo(() => {
  const router = useRouter();
  const { queryId } = router.query as { queryId: string };
  const [isLoading, setIsLoading] = useState(false);
  const commentValue = useSelector(selectCurrentComment);
  const users = useSelector(selectUsers);
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
  const [isExpert, setIsExpert] = useState(false);
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
        currentUser.likes.find((query_id) => query_id === Number(queryId)),
      ),
    );
  };

  const fetchData = useCallback(
    debounce(async () => {
      await dispatch(fetchQueriesById({ id: queryId }));
      await dispatch(fetchUsers());
      await dispatch(fetchDirections());
      await dispatch(fetchOrganizations());
      await dispatch(fetchCommentsById({ queryId }));
    }, 2000),
    [queryId],
  );

  useEffect(() => {
    queryId && fetchData();
  }, [queryId]);

  useEffect(() => {
    users.length > 0 && getIsLiked();
  }, [users]);

  useEffect(() => {
    applicationData?.expert_users && setIsExpert(checkExpert(applicationData));
  }, [applicationData?.expert_users]);

  const getLikes = () => {
    let like = 0;
    for (let user of users) {
      for (let query_id of user.likes) {
        if (query_id === Number(queryId)) {
          like += 1;
        }
      }
    }
    return like;
  };

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
      }),
    );
  };

  const sendComment = async (comment: string) => {
    await dispatch(
      postComment({ comment, query_id: Number(queryId), user_id }),
    );
    const currentDate = new Date();
    const date = formatDateToServer(currentDate, "-");
    dispatch(
      setComments([
        ...dataComment,
        {
          comment_text: comment,
          query: Number(queryId),
          user: user_id,
          created_at: date,
          id: dataComment.length + 1,
        },
      ]),
    );
  };

  const patchAddLike = async (userId: number) => {
    const likedQueries = [...getAllUserLikes(users, userId), Number(queryId)];
    await dispatch(patchLikes({ userId, likedQueries }));
    await dispatch(fetchUsers());
  };

  const patchRemoveLike = async (userId: number) => {
    const likedQueries = getAllUserLikes(users, userId);
    const index = likedQueries.indexOf(Number(queryId));
    if (index > -1) {
      likedQueries.splice(index, 1);
    }
    await dispatch(patchLikes({ userId, likedQueries }));
    await dispatch(fetchUsers());
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
                    applicationData?.status,
                  )}`}
                >
                  {statusTranslation[applicationData?.status]}
                </p>
              </div>
            </div>
          </div>
          <Col className={styles.col}>
            <Row className={styles.row}>
              <p className={styles.rowText}>Номер заявки:</p>
              <p className={styles.rowInf}>{applicationData?.id}</p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Инициатива (Идея):</p>
              <p className={styles.rowInf}>{applicationData?.name}</p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Описание инициативы:</p>
              <p className={styles.rowInf}>{applicationData?.description}</p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Направление:</p>
              <p className={styles.rowInf}>
                {directions.length > 0 &&
                  applicationData?.initiative_direction &&
                  getDirectionName(
                    applicationData?.initiative_direction,
                    directions,
                  )}
              </p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Организация:</p>
              <p className={styles.rowInf}>
                {applicationData?.organization &&
                  organizations.length > 0 &&
                  getOrganizationName(
                    applicationData?.organization,
                    organizations,
                  )}
              </p>
            </Row>
            {/*<Row className={styles.row}>*/}
            {/*  <div className={styles.files}>*/}
            {/*    <p className={styles.rowText}>Прикреплённые файлы:</p>*/}
            {/*    <Upload {...props} className="uploadFile"></Upload>*/}
            {/*  </div>*/}
            {/*</Row>*/}
            <Row className={styles.row}>
              <p className={`${styles.rowText} ${styles.comments}`}>
                Комментарии ({dataComment.length}
                ):
              </p>
            </Row>
            {dataComment.map((comment, index) => (
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
          {isExpert ? (
            <div className={styles.footerContainerChild}>
              <div className={styles.buttonsContainer}>
                <div className={styles.checkboxContainer}>
                  <Radio.Group
                    onChange={(e) => {
                      setStatus(e.target.value);
                      changeStatus(e.target.value);
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
                    text={"Назад"}
                    onClick={() => {
                      dispatch(setStatusQueries(Status.WAITING));
                      dispatch(setStatusDirections(Status.WAITING));
                      router.push("/queries");
                      dispatch(setCurrentComment(""));
                    }}
                    type="reset"
                  />
                </div>
                <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                  <Buttons
                    onClick={() => {
                      commentValue && sendComment(commentValue);
                      dispatch(setCurrentComment(""));
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
                  onClick={() => {
                    router.push("/queries");
                    dispatch(setCurrentComment(""));
                  }}
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
                  }}
                />
              </div>
            </div>
          )}
        </Flex>
      </Card>
    </>
  );
});

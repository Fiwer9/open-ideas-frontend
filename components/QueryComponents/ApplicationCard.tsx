import {
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Alert, Card, Col, Flex, Radio, Row, Upload, UploadProps } from "antd";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
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
import { QueryStatus } from "../../models/response/QueriesResponse";
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
import Logo from "../PicturesComponents/Logo";
import AdminQuerySkeleton from "../SkeletonComponents/AdminQuerySkeleton";
import { TextAreas } from "../TextAreaComponent/TextArea";

import { setStatusQueries } from "../../redux/queriesSlice/slice";
import { setStatusDirections } from "../../redux/directionsSlice/slice";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";
import {
  selectFilesData,
  selectStatusFiles,
} from "../../redux/filesSlice/selectors";
import { fetchFiles } from "../../redux/filesSlice/asyncActions";

import { CommentBlock } from "./blocks/CommentBlock";
import styles from "./styles/ApplicationCard.module.scss";

export const ApplicationCard: React.FC = memo(() => {
  const router = useRouter();
  const { queryId } = router.query as { queryId: string };
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const commentValue = useSelector(selectCurrentComment);
  const users = useSelector(selectUsers);
  const [status, setStatus] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const dataComment = useSelector(selectComments);
  const comments = Array.isArray(dataComment) ? dataComment : [];
  const directions = useSelector(selectDirections);
  const organizations = useSelector(selectOrganizations);
  const applicationData = useSelector(selectQueryData);
  const files = useSelector(selectFilesData);
  const statusDirections = useSelector(selectStatusDirections);
  const statusUsers = useSelector(selectUsersStatus);
  const statusComments = useSelector(selectStatusComments);
  const statusQuery = useSelector(selectStatusQueries);
  const statusFiles = useSelector(selectStatusFiles);
  const { user_id } = useSelector(selectCurrentUser);
  const [like, setLike] = useState<number>();
  const [isExpert, setIsExpert] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLoaded =
      statusComments === Status.SUCCESS &&
      statusQuery === Status.SUCCESS &&
      statusDirections === Status.SUCCESS &&
      statusFiles === Status.SUCCESS &&
      statusUsers === Status.SUCCESS;

    const hasError = [
      statusComments,
      statusQuery,
      statusDirections,
      statusFiles,
      statusUsers,
    ].includes(Status.ERROR);

    if (isLoaded || hasError) {
      setIsLoading(false);
      setLoadFailed(hasError || (isLoaded && !applicationData));
    }
  }, [
    applicationData,
    statusQuery,
    statusComments,
    statusDirections,
    statusFiles,
    statusUsers,
  ]);

  const getIsLiked = () => {
    const currentUser = users.find((user) => user.id === user_id);
    if (!currentUser?.likes?.length) {
      setIsLiked(false);
      return;
    }

    setIsLiked(
      currentUser.likes.some((query_id) => query_id === Number(queryId))
    );
  };

  const fetchData = async () => {
    await dispatch(fetchQueriesById({ id: queryId }));
    await dispatch(fetchUsers());
    await dispatch(fetchDirections());
    await dispatch(fetchOrganizations());
    await dispatch(fetchFiles());
    await dispatch(fetchCommentsById({ queryId }));
  };

  useEffect(() => {
    if (!router.isReady || !queryId) {
      return;
    }

    setIsLoading(true);
    setLoadFailed(false);
    fetchData();
  }, [router.isReady, queryId]);

  useEffect(() => {
    if (users.length === 0) {
      return;
    }
    getIsLiked();
    getLikes();
  }, [users]);

  useEffect(() => {
    if (!applicationData?.name) {
      return;
    }

    dispatch(setPageName(applicationData.name));
    dispatch(setPageId(Number(queryId)));
  }, [applicationData?.name, dispatch, queryId]);

  useEffect(() => {
    applicationData?.expert_users && setIsExpert(checkExpert(applicationData));
  }, [applicationData?.expert_users]);

  const getLikes = () => {
    let likesCount = 0;

    for (const user of users) {
      for (const query_id of user.likes ?? []) {
        if (query_id === Number(queryId)) {
          likesCount += 1;
        }
      }
    }

    setLike(likesCount);
  };

  const changeStatus = async (status: string) => {
    if (!applicationData) {
      return;
    }

    if (!applicationData?.id) {
      return;
    }

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
    const currentDate = new Date();
    const date = formatDateToServer(currentDate, "-");
    dispatch(
      setComments([
        ...comments,
        {
          comment_text: comment,
          query: Number(queryId),
          user: user_id,
          created_at: date,
          id: comments.length + 1,
        },
      ])
    );
  };

  const patchAddLike = async (userId: number) => {
    const likedQueries = [...getAllUserLikes(users, userId), Number(queryId)];
    await dispatch(patchLikes({ userId, likedQueries }));
    setLike((prev) => (prev ?? 0) + 1);
  };

  const patchRemoveLike = async (userId: number) => {
    const likedQueries = getAllUserLikes(users, userId);
    const index = likedQueries.indexOf(Number(queryId));
    if (index > -1) {
      likedQueries.splice(index, 1);
    }
    await dispatch(patchLikes({ userId, likedQueries }));
    setLike((prev) => (prev ?? 0) - 1);
  };

  const props: UploadProps = {
    defaultFileList: (files ?? [])
      .filter((file) => file.query === Number(queryId))
      .map((file, count) => {
        const fileName = file.file?.split("/").pop() ?? "file";

        return {
          uid: count.toString(),
          name: fileName,
          status: "done",
          url: file.file,
        };
      }),
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: <DownloadOutlined />,
      showRemoveIcon: false,
    },
  };

  if (isLoading) {
    return <AdminQuerySkeleton />;
  }

  if (loadFailed) {
    return (
      <Alert
        type="error"
        showIcon
        message="Не удалось загрузить инициативу"
        description="Проверьте подключение к серверу и попробуйте открыть инициативу снова."
        action={
          <Buttons
            text="Назад"
            type="button"
            onClick={() => router.push("/queries")}
          />
        }
      />
    );
  }

  return (
    <>
      <Card className={styles.card}>
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
                    {users.length > 0 && like}
                  </p>
                </div>
                <p
                  className={`${styles.statusQuery} ${getStatusClassName(
                    styles,
                    applicationData?.status ?? QueryStatus.REGISTERED
                  )}`}
                >
                  {applicationData?.status
                    ? statusTranslation[applicationData.status]
                    : ""}
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
                    directions
                  )}
              </p>
            </Row>
            <Row className={styles.row}>
              <p className={styles.rowText}>Организация:</p>
              <p className={styles.rowInf}>
                {applicationData?.organization &&
                  Array.isArray(organizations) &&
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
                Комментарии ({comments.length}
                ):
              </p>
            </Row>
            {applicationData &&
              comments.map((comment, index) => (
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

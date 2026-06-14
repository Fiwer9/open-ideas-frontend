import { DownloadOutlined, HeartOutlined } from "@ant-design/icons";
import { Col, Select, UploadProps } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchCommentsById } from "../../redux/commentsSlice/asyncActions";
import {
  selectComments,
  selectStatusComments,
} from "../../redux/commentsSlice/selectors";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import {
  selectDirections,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import {
  selectOrganizations,
  selectOrgStatus,
} from "../../redux/organizationsSlice/selectors";
import {
  deleteQuery,
  fetchQueriesById,
  patchQuery,
} from "../../redux/queriesSlice/asyncActions";
import {
  selectQueryData,
  selectStatusQueries,
} from "../../redux/queriesSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import {
  fetchCurrentUser,
  fetchUsers,
} from "../../redux/usersSlice/asyncActions";
import {
  selectUser,
  selectUsers,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import { statusOptions } from "../../utils/consts";
import { QueryStatus } from "../../models/response/QueriesResponse";
import {
  formatDateRu,
  formatDateToServer,
  getAuthor,
  getDirectionName,
  getOrganizationName,
  getStatusClassName,
} from "../../utils/utils";

import { changeIsModalSubmitActive } from "../../redux/modalsSlice/slice";
import ModalAdditionalText from "../ModalsComponents/ModalAdditionalText";
import { Status } from "../../redux/queriesSlice/types";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";
import AdminPageLayout from "../AdminPageLayout";
import { MainText } from "../MainTextComponent";
import AdminQuerySkeleton from "../SkeletonComponents/AdminQuerySkeleton";

import styles from "./styles/AdminApplicationCard.module.scss";
import { CommentBlockAdmin } from "./blocks/CommentBlock";

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

export const AdminApplicationCard = () => {
  const router = useRouter();
  const { queryId } = router.query as { queryId: string };
  const [isLoading, setIsLoading] = useState(true);
  const organizations = useSelector(selectOrganizations);
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);
  const dataComments = useSelector(selectComments);
  const directions = useSelector(selectDirections);
  const applicationData = useSelector(selectQueryData);
  const statusOrganizations = useSelector(selectOrgStatus);
  const statusUsers = useSelector(selectUsersStatus);
  const statusComments = useSelector(selectStatusComments);
  const statusDirections = useSelector(selectStatusDirections);
  const statusQuery = useSelector(selectStatusQueries);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLoaded =
      statusDirections === Status.SUCCESS &&
      statusQuery === Status.SUCCESS &&
      statusComments === Status.SUCCESS &&
      statusOrganizations === Status.SUCCESS &&
      statusUsers === Status.SUCCESS;

    const hasError = [
      statusDirections,
      statusQuery,
      statusComments,
      statusOrganizations,
      statusUsers,
    ].includes(Status.ERROR);

    if (isLoaded || hasError) {
      setIsLoading(false);
    }
  }, [
    statusDirections,
    statusUsers,
    statusOrganizations,
    statusComments,
    statusQuery,
  ]);

  const fetchData = async () => {
    await dispatch(fetchQueriesById({ id: queryId }));
    await dispatch(fetchUsers());
    await dispatch(fetchDirections());
    await dispatch(fetchOrganizations());
    await dispatch(fetchCommentsById({ queryId }));
    dispatch(setPageId(Number(queryId)));
  };

  useEffect(() => {
    if (!router.isReady || !queryId) {
      return;
    }

    setIsLoading(true);
    fetchData();
  }, [router.isReady, queryId]);

  useEffect(() => {
    if (!applicationData?.name) {
      return;
    }

    dispatch(setPageName(applicationData.name));

    const initiatorId = applicationData.initiator_users?.[0];
    if (initiatorId) {
      dispatch(fetchCurrentUser({ user_id: initiatorId }));
    }
  }, [applicationData?.name, applicationData?.initiator_users, dispatch]);

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

  function getExpert(users_id?: [number]) {
    if (!users_id?.length) {
      return "Не назначено";
    }

    const expert = users.find((item) => item.id === users_id[0]);
    return expert?.name ?? "Не назначено";
  }

  const handleDeleteIdea = async () => {
    dispatch(changeIsModalSubmitActive(false));
    await dispatch(deleteQuery({ queryId }));
    await router.push("/queries");
  };

  const getLikes = () => {
    let likesCount = 0;

    for (const user of users) {
      for (const query_id of user.likes ?? []) {
        if (query_id === Number(queryId)) {
          likesCount += 1;
        }
      }
    }

    return likesCount;
  };

  return (
    <>
      <AdminPageLayout>
        {!isLoading ? (
          <div>
            <div className={styles.ideaInfContainer}>
              <div className={styles.headerContainerIdea}>
                <MainText text={applicationData?.name ?? ""} />
                <div className={styles.btnHeader}>
                  <div className={styles.likesContainer}>
                    <HeartOutlined width={20} height={20} />
                    <p className={styles.numberLikes}>
                      {users.length > 0 && getLikes()}
                    </p>
                  </div>
                  <Select
                    className={`selectInitiative ${getStatusClassName(
                      styles,
                      applicationData?.status ?? QueryStatus.REGISTERED
                    )}`}
                    style={{ width: 250 }}
                    defaultValue={applicationData?.status}
                    options={statusOptions}
                    onChange={(value) => changeStatus(value)}
                  />
                </div>
              </div>
              <p className={styles.data}>{`Дата создания ${formatDateRu(
                applicationData?.date
              )}`}</p>
            </div>

            <Col className={styles.column}>
              <div className={styles.rightContent}>
                <div className={styles.row}>
                  <p className={styles.rowText}>Получено от:</p>
                  <p className={styles.rowInf}>
                    {getAuthor(applicationData?.initiator_users, users)}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Инициатива (Идея):</p>
                  <p className={styles.rowInf}>{applicationData?.name}</p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Описание инициативы:</p>
                  <p className={styles.rowInf}>
                    {applicationData?.description}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Эффект от доработки:</p>
                  <p className={styles.rowInf}>
                    {applicationData?.implementation_effect}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Направление:</p>
                  <p className={styles.rowInf}>
                    {getDirectionName(
                      applicationData?.initiative_direction,
                      directions
                    )}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Организация:</p>
                  <p className={styles.rowInf}>
                    {getOrganizationName(
                      applicationData?.organization ?? 0,
                      Array.isArray(organizations) ? organizations : []
                    )}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Отдел:</p>
                  <p className={styles.rowInf}>
                    {user?.department?.name && user.department.name}
                  </p>
                </div>
                <div className={styles.row}>
                  <p className={styles.rowText}>Назначенный эксперт:</p>
                  <p className={styles.rowInf}>
                    {getExpert(applicationData?.expert_users)}
                  </p>
                </div>
              </div>
              {/*<div className={styles.rows}>*/}
              {/*  <div className={styles.files}>*/}
              {/*    <p className={styles.rowTexts}>Прикреплённые файлы:</p>*/}
              {/*    <Upload {...props} className="uploadFile"></Upload>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </Col>

            <div className={styles.commentContainer}>
              <p className={styles.comment}>
                Комментарии ({(dataComments ?? []).length}):
              </p>
            </div>
            {applicationData &&
              (Array.isArray(dataComments) ? dataComments : []).map(
                (comment, index) => (
                <CommentBlockAdmin
                  key={index}
                  index={index}
                  comment={comment}
                  users={users}
                  applicationData={applicationData}
                />
              )
              )}
          </div>
        ) : (
          <AdminQuerySkeleton />
        )}
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
              dispatch(changeIsModalSubmitActive(true));
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
              dispatch(changeIsModalSubmitActive(true));
            }}
          >
            Удалить
          </button>
        </div>
      </AdminPageLayout>

      <ModalAdditionalText
        text={"Удалить инициативу?"}
        additionalText={"Восстановить будет невозможно"}
        buttonText={"Удалить инициативу"}
        handleOk={handleDeleteIdea}
      />
    </>
  );
};

import { DownloadOutlined, HeartOutlined } from "@ant-design/icons";
import { Col, Select, Upload, UploadProps } from "antd";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
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
import {
  formatDateRu,
  formatDateToServer,
  getAuthor,
  getDirectionName,
  getOrganizationName,
  getStatusClassName,
} from "../../utils/utils";
import { Header } from "../HeaderComponents/Header";
import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { CommentBlockAdmin } from "./blocks/CommentBlock";
import styles from "./styles/AdminApplicationCard.module.scss";
import { changeIsModalSubmitActive } from "../../redux/modalsSlice/slice";
import ModalAdditionalText from "../ModalsComponents/ModalAdditionalText";
import { Status } from "../../redux/queriesSlice/types";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";
import { SliderSmall } from "../SliderComponents/SliderSmall";

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      statusDirections === Status.SUCCESS &&
      statusQuery === Status.SUCCESS &&
      statusComments === Status.SUCCESS &&
      statusOrganizations === Status.SUCCESS &&
      statusUsers === Status.SUCCESS
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [
    statusDirections,
    statusUsers,
    statusOrganizations,
    statusComments,
    statusQuery,
  ]);

  const fetchData = useCallback(
    debounce(async () => {
      await dispatch(fetchQueriesById({ id: queryId }));
      await dispatch(fetchUsers());
      await dispatch(fetchDirections());
      await dispatch(fetchOrganizations());
      await dispatch(fetchCommentsById({ queryId }));
      dispatch(setPageId(Number(queryId)));
    }, 2000),
    [queryId],
  );

  useEffect(() => {
    queryId && fetchData();
  }, [queryId]);

  useEffect(() => {
    applicationData?.name && dispatch(setPageName(applicationData.name));
    applicationData?.expert_users &&
      dispatch(
        fetchCurrentUser({ user_id: applicationData?.initiator_users[0] }),
      );
  }, [applicationData?.name]);

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

  function getExpert(users_id?: [number]) {
    try {
      const { name } = users.find((user) => user.id === users_id[0]);

      return name;
    } catch (e) {
      return "Не назначено";
    }
  }

  const handleDeleteIdea = async () => {
    dispatch(changeIsModalSubmitActive(false));
    await dispatch(deleteQuery({ queryId }));
    await router.push("/queries");
  };

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

  if (!isClient) {
    return;
  }

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
          {!isLoading && (
            <>
              <Tabs />
              <div>
                <div className={styles.ideaInfContainer}>
                  <div className={styles.headerContainerIdea}>
                    <p className={styles.nameInitiative}>
                      {applicationData?.name}
                    </p>
                    <div className={styles.btnHeader}>
                      <div className={styles.likesContainer}>
                        <HeartOutlined width={20} height={20} />
                        <p className={styles.numberLikes}>
                          {users.length > 0 && getLikes()}
                        </p>
                      </div>
                      {applicationData?.status && (
                        <Select
                          className={`selectInitiative ${getStatusClassName(
                            styles,
                            applicationData?.status,
                          )}`}
                          style={{ width: 250 }}
                          defaultValue={applicationData?.status}
                          options={statusOptions}
                          onChange={(value) => changeStatus(value)}
                        />
                      )}
                    </div>
                  </div>
                  <p className={styles.data}>{`Дата создания ${formatDateRu(
                    applicationData?.date,
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
                          directions,
                        )}
                      </p>
                    </div>
                    <div className={styles.row}>
                      <p className={styles.rowText}>Организация:</p>
                      <p className={styles.rowInf}>
                        {getOrganizationName(
                          applicationData?.organization,
                          organizations,
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
                  <div className={styles.rows}>
                    <div className={styles.files}>
                      <p className={styles.rowTexts}>Прикреплённые файлы:</p>
                      <Upload {...props} className="uploadFile"></Upload>
                    </div>
                  </div>
                </Col>

                <div className={styles.commentContainer}>
                  <p className={styles.comment}>
                    Комментарии ({dataComments.length}):
                  </p>
                </div>
                {dataComments.map((comment, index) => (
                  <CommentBlockAdmin
                    key={index}
                    index={index}
                    comment={comment}
                    users={users}
                    applicationData={applicationData}
                  />
                ))}
              </div>
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.btnBlue} ${styles.btnFooter}`}
                  onClick={() =>
                    router.push(
                      `/queries/editingApplication?queryId=${queryId}`,
                    )
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
                    router.push(
                      `/queries/editingApplication?queryId=${queryId}`,
                    )
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
            </>
          )}
        </div>

        <div className={styles.sliderSmall}>
          <SliderSmall />
        </div>
      </div>

      <ModalAdditionalText
        text={"Удалить инициативу?"}
        additionalText={"Восстановить будет невозможно"}
        handleOk={handleDeleteIdea}
      />
    </>
  );
};

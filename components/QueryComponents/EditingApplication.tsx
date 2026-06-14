import React, { useEffect, useState } from "react";

import { Button, Form, Input, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import { UploadOutlined } from "@ant-design/icons";

import {
  formatDateToServer,
  getAuthor,
  getOrganizationName,
  getOrganizationNameById,
} from "../../utils/utils";
import {
  selectUser,
  selectUsers,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import {
  fetchCurrentUser,
  fetchUsers,
} from "../../redux/usersSlice/asyncActions";
import {
  fetchDepartments,
  fetchOrganizations,
} from "../../redux/organizationsSlice/asyncActions";
import {
  selectDepartments,
  selectOrganizations,
  selectOrgStatus,
} from "../../redux/organizationsSlice/selectors";
import {
  fetchQueriesById,
  patchQuery,
} from "../../redux/queriesSlice/asyncActions";

import {
  selectQueryData,
  selectStatusQueries,
} from "../../redux/queriesSlice/selectors";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import {
  selectDirections,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";

import AdminPageLayout from "../AdminPageLayout";
import { Status } from "../../redux/queriesSlice/types";
import AdminQuerySkeleton from "../SkeletonComponents/AdminQuerySkeleton";

import styles from "./styles/EditingApplication.module.scss";

interface EditQueryProps {
  name: string;
  description: string;
  initiative_direction: number;
  implementation_effect: string;
  organization: string;
  expert_users: number;
}

export const EditingApplication = () => {
  const [form] = Form.useForm<EditQueryProps>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { queryId } = router.query as { queryId: string };
  const [organizationId, setOrganizationId] = useState(0);

  const dispatch = useAppDispatch();

  const applicationData = useSelector(selectQueryData);
  const users = useSelector(selectUsers);
  const organizations = useSelector(selectOrganizations);
  const directions = useSelector(selectDirections);
  const user = useSelector(selectUser);
  const departments = useSelector(selectDepartments);
  const statusQuery = useSelector(selectStatusQueries);
  const statusUsers = useSelector(selectUsersStatus);
  const statusDirections = useSelector(selectStatusDirections);
  const statusOrganizations = useSelector(selectOrgStatus);

  useEffect(() => {
    setTimeout(() => {
      if (
        statusDirections === Status.SUCCESS &&
        statusQuery === Status.SUCCESS &&
        statusOrganizations === Status.SUCCESS &&
        statusUsers === Status.SUCCESS
      ) {
        setLoading(false);
      }
    }, 1000);
  }, [statusQuery, statusUsers, statusDirections, statusOrganizations]);

  const fetchData = async () => {
    await dispatch(fetchQueriesById({ id: queryId }));
    await dispatch(fetchUsers());
    await dispatch(fetchDirections());
    await dispatch(fetchOrganizations());
    dispatch(setPageId(Number(queryId)));
  };

  useEffect(() => {
    queryId && fetchData();
  }, [queryId]);

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

  useEffect(() => {
    organizationId &&
      dispatch(
        fetchDepartments({
          organization_id: organizationId
            ? organizationId
            : applicationData?.organization,
        })
      );
  }, [organizationId]);

  function handleSaveChanges(data: EditQueryProps) {
    const currentDate = new Date();
    const date = formatDateToServer(currentDate, "-");
    const {
      name,
      organization,
      initiative_direction,
      implementation_effect,
      expert_users,
      description,
    } = data;
    dispatch(
      patchQuery({
        date,
        status: applicationData?.status,
        id: Number(queryId),
        organization: getOrganizationNameById(organization, organizations),
        description,
        name,
        initiative_direction,
        implementation_effect,
        initiator_users: applicationData?.initiator_users,
        expert_users:
          expert_users !== 0
            ? typeof expert_users === "string"
              ? applicationData?.expert_users
              : [expert_users]
            : null,
      })
    );
    router.back();
  }

  return (
    <AdminPageLayout>
      {!loading ? (
        <Form
          name={"edit-query"}
          onFinish={handleSaveChanges}
          form={form}
          layout="vertical"
          className={styles.contentContainer}
          initialValues={{
            name: applicationData?.name,
            description: applicationData?.description,
            implementation_effect: applicationData?.implementation_effect,
            initiative_direction: applicationData?.initiative_direction,
            organization: getOrganizationName(
              applicationData?.organization,
              organizations
            ),
            department: user?.department?.name,
            expert_users: getAuthor(applicationData?.expert_users, users),
          }}
        >
          <p className={styles.textHeader}>Редактирование инициативы</p>
          <div className={styles.inpContainer}>
            <div className={styles.formContainer}>
              <Form.Item
                className={styles.formItem}
                label={"Инициатива (Идея)"}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Введите название инициативы",
                  },
                ]}
              >
                <Input className={`${styles.formField} ${styles.inp}`} />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={"Описание инициативы"}
                name={"description"}
                rules={[
                  {
                    required: true,
                    message: "Введите описание инициативы",
                  },
                ]}
              >
                <TextArea className={styles.formField} rows={5} />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={"Эффект от доработки"}
                name={"implementation_effect"}
                rules={[
                  {
                    required: true,
                    message: "Введите эффект от доработки",
                  },
                ]}
              >
                <TextArea className={styles.formField} rows={5} />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={"Направление"}
                name={"initiative_direction"}
                rules={[
                  {
                    required: true,
                    message: "Выберите направление инициативы",
                  },
                ]}
              >
                <Select
                  className={`${styles.formField} ${styles.inp}`}
                  options={directions.map((direct) => ({
                    value: direct.id,
                    label: direct.name,
                  }))}
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={"Организация"}
                name={"organization"}
                rules={[
                  {
                    required: true,
                    message: "Выберите организацию",
                  },
                ]}
              >
                <Select
                  className={`${styles.formField} ${styles.inp}`}
                  options={organizations.map((org) => ({
                    value: org.id,
                    label: org.name,
                  }))}
                  onChange={(evt) => setOrganizationId(evt)}
                  disabled
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={"Отдел"}
                name={"department"}
                rules={[
                  {
                    required: true,
                    message: "Выберите отдел",
                  },
                ]}
              >
                <Select
                  className={`${styles.formField} ${styles.inp}`}
                  options={departments.map((dep) => ({
                    value: dep.id,
                    label: dep.name,
                  }))}
                  aria-required={true}
                  disabled
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={"Назначенный эксперт"}
                name={"expert_users"}
                rules={[
                  {
                    required: false,
                    message: "Выберите эксперта",
                  },
                ]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label.toLowerCase() ?? "").includes(
                      input.toLowerCase()
                    )
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  className={`${styles.formField} ${styles.inp}`}
                  options={[
                    ...users
                      .filter((user) => user.groups.includes(2))
                      .map((user) => ({
                        value: user.id,
                        label: user.name,
                      })),
                  ]}
                  aria-required={true}
                />
              </Form.Item>
            </div>
            <div className={styles.files}>
              <Form.Item
                className={styles.formItem}
                label={"Дополнительные файлы"}
                name={"file"}
              >
                <Upload
                  maxCount={5}
                  // eslint-disable-next-line max-len
                  accept=".webm, .pdf, .doc, .docx, .odt, .xml, application/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .png, video/*, audio/*"
                  multiple
                  className="upload"
                >
                  <Button icon={<UploadOutlined />}>Загрузить</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Form>
      ) : (
        <AdminQuerySkeleton />
      )}
      <div className={styles.btnContainer}>
        <Button
          className={`${styles.btnDefault} ${styles.btnFooter}`}
          form={"edit-query"}
          htmlType={"submit"}
        >
          <span>Сохранить изменения</span>
        </Button>
      </div>
    </AdminPageLayout>
  );
};

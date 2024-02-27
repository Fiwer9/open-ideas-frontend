import React, { useEffect, useState } from "react";
import styles from "./styles/EditingApplication.module.scss";
import { Slider } from "../SliderComponents/SliderComponents";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import {
  formatDateToServer,
  getAuthor,
  getOrganizationName,
  getOrganizationNameById,
} from "../../utils/utils";
import { useSelector } from "react-redux";
import {
  selectUpdateUsers,
  selectUser,
} from "../../redux/usersSlice/selectors";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../../redux/store";
import {
  fetchCurrentUser,
  fetchUpdateUsers,
} from "../../redux/usersSlice/asyncActions";
import {
  fetchDepartments,
  fetchOrganizations,
} from "../../redux/organizationsSlice/asyncActions";
import {
  selectDepartments,
  selectOrganizations,
} from "../../redux/organizationsSlice/selectors";
import {
  fetchQueriesById,
  patchQuery,
} from "../../redux/queriesSlice/asyncActions";
import { useRouter } from "next/router";
import { selectQueryData } from "../../redux/queriesSlice/selectors";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import { selectDirections } from "../../redux/directionsSlice/selectors";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";

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
  const router = useRouter();
  const { queryId } = router.query as { queryId: string };
  const [organizationId, setOrganizationId] = useState(0);

  const dispatch = useAppDispatch();

  const applicationData = useSelector(selectQueryData);
  const users = useSelector(selectUpdateUsers);
  const organizations = useSelector(selectOrganizations);
  const directions = useSelector(selectDirections);
  const user = useSelector(selectUser);
  const departments = useSelector(selectDepartments);

  const fetchData = debounce(async () => {
    await dispatch(fetchQueriesById({ id: queryId }));
    await dispatch(fetchUpdateUsers());
    await dispatch(fetchDirections());
    await dispatch(fetchOrganizations());
    dispatch(setPageId(Number(queryId)));
  }, 2000);

  useEffect(() => {
    queryId && fetchData();
  }, [queryId]);

  useEffect(() => {
    applicationData.name && dispatch(setPageName(applicationData.name));
    applicationData?.expert_users &&
      dispatch(
        fetchCurrentUser({ user_id: applicationData?.initiator_users[0] }),
      );
  }, [applicationData.name]);

  useEffect(() => {
    organizationId &&
      dispatch(
        fetchDepartments({
          organization_id: organizationId
            ? organizationId
            : applicationData.organization,
        }),
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
        status: applicationData.status,
        id: Number(queryId),
        organization: getOrganizationNameById(organization, organizations),
        description,
        name,
        initiative_direction,
        implementation_effect,
        initiator_users: applicationData.initiator_users,
        expert_users:
          expert_users !== 0
            ? typeof expert_users === "string"
              ? applicationData.expert_users
              : [expert_users]
            : null,
      }),
    );
    router.back();
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
          {applicationData?.name &&
            organizations?.length > 0 &&
            user?.name &&
            directions?.length > 0 && (
              <>
                <Tabs />
                <Form
                  name={"edit-query"}
                  onFinish={handleSaveChanges}
                  form={form}
                  layout="vertical"
                  className={styles.contentContainer}
                  initialValues={{
                    name: applicationData.name,
                    description: applicationData.description,
                    implementation_effect:
                      applicationData.implementation_effect,
                    initiative_direction: applicationData.initiative_direction,
                    organization: getOrganizationName(
                      applicationData.organization,
                      organizations,
                    ),
                    department: user?.department?.name,
                    expert_users: getAuthor(
                      applicationData.expert_users,
                      users,
                    ),
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
                        <Input
                          className={`${styles.formField} ${styles.inp}`}
                        />
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
                              input.toLowerCase(),
                            )
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase(),
                              )
                          }
                          className={`${styles.formField} ${styles.inp}`}
                          options={[
                            ...users
                              .filter(
                                (user) => user.is_active && user.is_verified,
                              )
                              .map((user) => ({
                                value: user.id,
                                label: user.name,
                              })),
                          ]}
                          aria-required={true}
                        />
                      </Form.Item>
                    </div>
                    {/*<div className={styles.files}>*/}
                    {/*  <Form.Item*/}
                    {/*    className={styles.formItem}*/}
                    {/*    label={"Дополнительные файлы"}*/}
                    {/*    name={"file"}*/}
                    {/*  >*/}
                    {/*    <Upload*/}
                    {/*      maxCount={5}*/}
                    {/*      accept=".webm, .pdf, .doc, .docx, .odt, .xml, application/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .png, video/*, audio/*"*/}
                    {/*      multiple*/}
                    {/*      className="upload"*/}
                    {/*    >*/}
                    {/*      <Button icon={<UploadOutlined />}>Загрузить</Button>*/}
                    {/*    </Upload>*/}
                    {/*  </Form.Item>*/}
                    {/*</div>*/}
                  </div>
                </Form>
                <div className={styles.btnContainer}>
                  <Button
                    className={`${styles.btnDefault} ${styles.btnFooter}`}
                    form={"edit-query"}
                    htmlType={"submit"}
                  >
                    <span>Сохранить изменения</span>
                  </Button>
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
};

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/authSlice/selectors";
import {useAppDispatch} from "../../redux/store";
import {selectOrganizations, selectOrgStatus,} from "../../redux/organizationsSlice/selectors";
import {selectDirections, selectStatusDirections,} from "../../redux/directionsSlice/selectors";
import {Status} from "../../redux/queriesSlice/types";
import {fetchOrganizations} from "../../redux/organizationsSlice/asyncActions";
import {fetchDirections} from "../../redux/directionsSlice/asyncActions";
import {Button, Card, Form, Input, message, Select, Upload, UploadFile} from "antd";
import styles from "./styles/CreateQuery.module.scss";
import {Logo} from "../PicturesComponents/Logo";
import {formatDateToServer, getOrganizationName, getOrganizationNameById} from "../../utils/utils";
import {Buttons} from "../ButtonComponent/Button";
import router from "next/router";
import ModalAntdSubmit from "../ModalsComponents/ModalAntdSubmit";
import TextArea from "antd/lib/input/TextArea";
import ModalAntdBack from "../ModalsComponents/ModalAntdBack";
import {changeIsModalResetActive, changeIsModalSubmitActive,} from "../../redux/modalsSlice/slice";
import {MainText} from "../MainTextComponent";
import {setStatusQueries} from "../../redux/queriesSlice/slice";
import {setStatusDirections} from "../../redux/directionsSlice/slice";
import {selectUserForHeader} from "../../redux/headerSlice/selectors";
import {fetchUserHeader} from "../../redux/headerSlice/asyncActions";
import {selectSettings} from "../../redux/settingsSlice/selectors";
import {UploadOutlined} from "@ant-design/icons";
import {fetchSettings} from "../../redux/settingsSlice/asyncActions";
import {postQuery} from "../../redux/queriesSlice/asyncActions";
import {selectQueryData} from "../../redux/queriesSlice/selectors";
import {postFiles} from "../../redux/filesSlice/asyncActions";

interface PostQueryProps {
  name: string;
  description: string;
  organization: string;
  initiative_direction: number;
  implementation_effect: string;
  files: UploadFile<any>[];
}

function NewCreateQuery() {
  const { user_id } = useSelector(selectCurrentUser);
  const [form] = Form.useForm<PostQueryProps>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const organizations = useSelector(selectOrganizations);
  const user = useSelector(selectUserForHeader);
  const directions = useSelector(selectDirections);
  const statusDirections = useSelector(selectStatusDirections);
  const statusOrganizations = useSelector(selectOrgStatus);
  const settings = useSelector(selectSettings);
  const currentQuery = useSelector(selectQueryData);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile<any>[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (
        user.status === Status.SUCCESS &&
        statusDirections === Status.SUCCESS &&
        statusOrganizations === Status.SUCCESS
      ) {
        setIsLoading(false);
      }
    }, 1000);
  }, [user.status, statusDirections, statusOrganizations]);

  const fetchData = async () => {
    await dispatch(fetchSettings());
    await dispatch(fetchOrganizations());
    await dispatch(fetchDirections());
    await dispatch(fetchUserHeader({ user_id }));
  };

  useEffect(() => {
    user_id && fetchData();
  }, [user_id]);

  useEffect(() => {
    if (uploadedFiles.length !== 0) {
      const formFileData = new FormData()
      formFileData.append('query', currentQuery.id.toString())
      formFileData.append('query_draft', '')
      uploadedFiles.map((file) => formFileData.append('file', file.originFileObj))
      dispatch(postFiles(formFileData))
    }
  }, [currentQuery])

  const onSubmit = async (data: PostQueryProps) => {
    const {
      name,
      organization,
      description,
      initiative_direction,
      implementation_effect,
      files
    } = data;
    setUploadedFiles(files)
    const formattedEndDate = formatDateToServer(new Date(), "-");
    await dispatch(
      postQuery({
        name,
        description,
        implementation_effect,
        initiative_direction,
        date: formattedEndDate,
        planned_implementation_date: formattedEndDate,
        status: "check",
        initiator_users: [user_id],
        organization: getOrganizationNameById(organization, organizations),
      }),
    );
    dispatch(setStatusQueries(Status.WAITING));
    dispatch(setStatusDirections(Status.WAITING));
    await router.push("/queries/thanks");
  };

  const onReset = () => {
    dispatch(setStatusQueries(Status.WAITING));
    dispatch(setStatusDirections(Status.WAITING));
    router.push("/queries");
  };

  return (
    <>
      <Card loading={isLoading} className={styles.card}>
        {user?.userName && organizations.length > 0 && (
          <>
            <div className={styles.logo}>
              <Logo width={112.73} height={32} />
            </div>
            <div className={styles.content}>
              <div className={styles.title}>
                <MainText text={"Создание инициативы"} />
              </div>
            </div>

            <Form
              initialValues={{
                initiator_users: user.userName,
                organization: getOrganizationName(
                  user.organizationId,
                  organizations,
                ),
              }}
              layout={"vertical"}
              className={styles.form}
              form={form}
              onFinish={onSubmit}
              onReset={onReset}
              name={"create-query"}
              id={"create-query"}
            >
              <Form.Item
                className={styles.formItems}
                name={"initiator_users"}
                rules={[
                  {
                    required: true,
                    message: "Введите ваше Ф. И. О",
                  },
                ]}
                label={"Ф. И. О."}
              >
                <Input className={styles.inp} disabled={true} />
              </Form.Item>
              <Form.Item
                className={styles.formItems}
                name={"organization"}
                required={true}
                label={"Организация"}
                rules={[
                  {
                    required: true,
                    message: "Напишите свою организацию",
                  },
                ]}
              >
                <Input className={styles.inp} disabled={true} />
              </Form.Item>
              <Form.Item
                className={styles.formItems}
                name={"name"}
                required={true}
                label={"Инициатива (Идея)"}
                rules={[
                  {
                    required: true,
                    message: "Напишите название инициативы",
                  },
                ]}
              >
                <Input
                  className={styles.inp}
                  placeholder={"Напишите название инициативы "}
                />
              </Form.Item>
              <Form.Item
                className={styles.formItems}
                name={"initiative_direction"}
                rules={[
                  {
                    required: true,
                    message: "Выберите направление",
                  },
                ]}
                label={"Направление"}
              >
                <Select
                  className={`select ${styles.mySelectContainer}`}
                  style={{ height: 40 }}
                  placeholder="Направление инициативы"
                  options={directions.map((direction) => ({
                    value: direction.id,
                    label: direction.name,
                  }))}
                />
              </Form.Item>
              <Form.Item
                className={styles.formItems}
                name={"description"}
                label={"Описание инициативы"}
                rules={[
                  {
                    required: true,
                    message: "Напишите описание к инициативе",
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  className={styles.textAreaCustom}
                  placeholder={"Напишите описание инициативы"}
                />
              </Form.Item>
              <Form.Item
                className={styles.formItems}
                name={"implementation_effect"}
                label={"Эффект от доработки"}
                rules={[
                  {
                    required: true,
                    message: "Напишите эффект от доработки",
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  className={styles.textAreaCustom}
                  placeholder={"Напишите ожидаемый эффект от доработки"}
                />
              </Form.Item>
              {settings?.allow_file_attachment && (
                <Form.Item
                  className={styles.formItems}
                  name={"files"}
                  valuePropName={"fileList"}
                  getValueFromEvent={(event) => {
                    return event?.fileList;
                  }}
                  label={"Загрузка дополнительных файлов"}
                  rules={[
                    {
                      validator(_, fileList) {
                        return new Promise((resolve, reject) => {
                          if (
                            fileList &&
                            fileList[0].size > settings?.max_file_size
                          ) {
                            reject("Размер файла превышен!");
                          } else {
                            resolve("Файл загружен!");
                          }
                        });
                      },
                    },
                  ]}
                >
                  <Upload
                    maxCount={settings?.max_files_attached}
                    accept=".pdf, .webm, .doc, .docx, .odt, .xml, application/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .png, video/*, audio/*"
                    multiple
                    className="upload"
                    beforeUpload={(file) => {
                      return new Promise((resolve, reject) => {
                        if (file.size > settings?.max_file_size) {
                          reject("Размер файла превышен!");
                          message.error("Размер файла превышен!");
                        } else {
                          resolve("Файл загружен!");
                        }
                      });
                    }}
                  >
                    <Button
                      className={styles.uploadBtn}
                      icon={<UploadOutlined />}
                    >
                      Загрузить
                    </Button>
                  </Upload>
                </Form.Item>
              )}
              <div className={styles.containerBtn}>
                <div className={styles.btnWhite}>
                  <Buttons
                    text={"Назад"}
                    onClick={() => {
                      dispatch(changeIsModalResetActive(true));
                    }}
                    type={"button"}
                  />
                </div>
                <div className={styles.btnBlue}>
                  <Buttons
                    text={"Отправить"}
                    onClick={() => {
                      dispatch(changeIsModalSubmitActive(true));
                    }}
                    type={"button"}
                  />
                </div>
              </div>
            </Form>
          </>
        )}
      </Card>

      <ModalAntdSubmit
        form={"create-query"}
        text={
          "Вы уверены, что хотите зарегистрировать инициативу и внесли все необходимые данные? После регистрации внесение изменений невозможно"
        }
      />
      <ModalAntdBack
        form={"create-query"}
        text={
          "Вы уверены, что хотите отменить создание инициативы? При отмене заявки ранее внесенная информация не будет сохранена"
        }
      />
    </>
  );
}

export default NewCreateQuery;

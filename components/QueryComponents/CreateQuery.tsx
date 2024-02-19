import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import {
  selectOrganizations,
  selectOrgStatus,
} from "../../redux/organizationsSlice/selectors";
import {
  selectUser,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import {
  selectDirections,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import { fetchCurrentUser } from "../../redux/usersSlice/asyncActions";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import { Card, Form, Input, Select } from "antd";
import styles from "./styles/CreateQuery.module.scss";
import { Logo } from "../PicturesComponents/Logo";
import {
  formatDateToServer,
  getOrganizationName,
  getOrganizationNameById,
} from "../../utils/utils";
import { Buttons } from "../ButtonComponent/Button";
import router from "next/router";
import debounce from "lodash.debounce";
import ModalAntdSubmit from "../ModalsComponents/ModalAntdSubmit";
import { postQuery } from "../../redux/queriesSlice/asyncActions";
import TextArea from "antd/lib/input/TextArea";
import ModalAntdBack from "../ModalsComponents/ModalAntdBack";
import {
  changeIsModalResetActive,
  changeIsModalSubmitActive,
} from "../../redux/modalsSlice/slice";
import { MainText } from "../MainTextComponent";

interface PostQueryProps {
  name: string;
  description: string;
  organization: string;
  initiative_direction: number;
  implementation_effect: string;
}

function NewCreateQuery() {
  const { user_id } = useSelector(selectCurrentUser);
  const [form] = Form.useForm<PostQueryProps>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const organizations = useSelector(selectOrganizations);
  const user = useSelector(selectUser);
  const directions = useSelector(selectDirections);
  const statusDirections = useSelector(selectStatusDirections);
  const statusOrganizations = useSelector(selectOrgStatus);
  const statusUsers = useSelector(selectUsersStatus);

  useEffect(() => {
    if (
      statusDirections === Status.SUCCESS &&
      statusOrganizations === Status.SUCCESS &&
      statusUsers === Status.SUCCESS
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [statusDirections, statusOrganizations, statusUsers]);

  const fetchData = debounce(async () => {
    await dispatch(fetchCurrentUser({ user_id }));
    await dispatch(fetchOrganizations());
    await dispatch(fetchDirections());
  }, 2000);

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data: PostQueryProps) => {
    try {
      const {
        name,
        organization,
        description,
        initiative_direction,
        implementation_effect,
      } = data;
      const formattedEndDate = formatDateToServer(new Date(), "-");
      dispatch(
        postQuery({
          name,
          implementation_effect,
          date: formattedEndDate,
          status: "check",
          initiative_direction,
          initiator_users: [user_id],
          description,
          organization: getOrganizationNameById(organization, organizations),
        })
      );
      router.push("/queries");
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  const onReset = () => {
    router.push("/queries");
  };

  return (
    <>
      <Card loading={isLoading} className={styles.card}>
        {user?.department?.organization && organizations.length > 0 && (
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
                initiator_users: user.name,
                organization: getOrganizationName(
                  user.department.organization,
                  organizations
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
              {/*TODO*/}
              {/*{store.isAllowFileAttachment && (*/}
              {/*    <Form.Item className={styles.formItems}>*/}
              {/*        <div className={styles.label}>*/}
              {/*            <InputLabel title={"Загрузка дополнительных файлов"}/>*/}
              {/*        </div>*/}
              {/*        <Upload*/}
              {/*            maxCount={5}*/}
              {/*            accept=".pdf, .webm, .doc, .docx, .odt, .xml, application/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .png, video/*, audio/*"*/}
              {/*            multiple*/}
              {/*            className='upload'*/}
              {/*        >*/}
              {/*            <Button className={styles.uploadBtn} icon={<UploadOutlined />}>Загрузить</Button>*/}
              {/*        </Upload>*/}
              {/*    </Form.Item>*/}
              {/*)}*/}
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

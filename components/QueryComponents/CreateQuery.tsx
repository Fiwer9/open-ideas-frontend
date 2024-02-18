import React, { memo, useCallback, useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
import { InputLabel } from "../InputLabelComponent/InputLabel";
import { Logo } from "../PicturesComponents/Logo";
import { Buttons } from "../ButtonComponent/Button";

import styles from "./styles/CreateQuery.module.scss";
import Modal from "../ModalsComponents/Modal";
import router from "next/router";
import {
  formatDateToServer,
  getOrganizationId,
  getOrganizationName,
} from "../../utils/utils";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  selectOrganizations,
  selectOrgStatus,
} from "../../redux/organizationsSlice/selectors";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import {
  fetchCurrentUpdateUser,
  fetchCurrentUser,
} from "../../redux/usersSlice/asyncActions";
import { selectCurrentUser } from "../../redux/authSlice/selectors";
import {
  selectUpdateUser,
  selectUser,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import {
  selectDirections,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import debounce from "lodash.debounce";
import { SubmitHandler, useForm } from "react-hook-form";
import { QueriesResponse } from "../../models/response/QueriesResponse";

export const CreateQuery: React.FC = memo(() => {
  const { user_id } = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [effect, setEffect] = useState("");
  const [direction, setDirection] = useState(0);
  const [idea, setIdea] = useState("");
  const [secondModalActive, setSecondModalActive] = useState(false);
  const organizations = useSelector(selectOrganizations);
  const user = useSelector(selectUser);
  const directions = useSelector(selectDirections);
  const statusDirections = useSelector(selectStatusDirections);
  const statusOrganizations = useSelector(selectOrgStatus);
  const statusUsers = useSelector(selectUsersStatus);

  const closeModal = () => {
    setModalActive(false);
    setSecondModalActive(false);
  };

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

  const fetchData = async () => {
    await dispatch(fetchCurrentUser({ user_id }));
    await dispatch(fetchOrganizations());
    await dispatch(fetchDirections());
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getOrganization() {
    return user.department.organization;
  }

  const postQuery: SubmitHandler<QueriesResponse> = async (data) => {
    try {
      alert(data);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <>
      <Card loading={isLoading} className={styles.card}>
        <Form className={styles.form}>
          <Form.Item className={styles.logo}>
            <Logo width={112.73} height={32} />
          </Form.Item>
          <Form.Item className={styles.content}>
            <div className={styles.title}>
              <InputLabel
                title={"Создание инициативы"}
                className={styles.label2}
              />
            </div>
          </Form.Item>
          <Form.Item className={styles.formItems}>
            <div className={styles.label}>
              <InputLabel title={"Ф. И. О."} />
            </div>
            <Input className={styles.inp} value={user.name} disabled={true} />
          </Form.Item>
          <Form.Item className={styles.formItems}>
            <div className={styles.label}>
              <InputLabel title={"Организация"} />
            </div>
            <Input
              className={styles.inp}
              value={
                user_id &&
                organizations.length > 0 &&
                getOrganizationName(user.department.organization, organizations)
              }
              disabled={true}
            />
          </Form.Item>
          <Form.Item className={styles.formItems}>
            <div className={styles.label}>
              <InputLabel title={"Инициатива (Идея)"} />
            </div>
            <Input
              className={styles.inp}
              placeholder={"Напишите название инициативы "}
              onChange={(e: any) => {
                setIdea(e.target.value);
              }}
              value={idea}
              required
            />
          </Form.Item>
          <Form.Item className={styles.formItems} required={true}>
            <div className={styles.label}>
              <InputLabel title={"Направление"} />
            </div>
            <div className={styles.mySelectContainer}>
              <Select
                className="select"
                style={{ height: 40 }}
                placeholder="Направление инициативы"
                options={directions.map((direction) => ({
                  value: direction.id,
                  label: direction.name,
                }))}
                onChange={(e: any) => {
                  setDirection(e);
                }}
              />
            </div>
          </Form.Item>
          <Form.Item className={styles.formItems}>
            <div className={styles.label}>
              <InputLabel title={"Описание инициативы"} />
            </div>
            <textarea
              className={styles.textAreaCustom}
              placeholder={"Напишите описание инициативы"}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description || ""}
              required={true}
            />
          </Form.Item>
          <Form.Item className={styles.formItems}>
            <div className={styles.label}>
              <InputLabel title={"Эффект от доработки"} />
            </div>
            <textarea
              className={styles.textAreaCustom}
              placeholder={"Напишите ожидаемый эффект от доработки"}
              onChange={(e) => {
                setEffect(e.target.value);
              }}
              value={effect || ""}
              required={true}
            />
          </Form.Item>
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
                  setSecondModalActive(true);
                }}
                type={"reset"}
              />
            </div>
            <div className={styles.btnBlue}>
              <Buttons
                text={"Отправить"}
                onClick={() => {
                  setModalActive(true);
                }}
                type={"submit"}
              />
            </div>
          </div>
        </Form>
      </Card>

      <Modal
        active={modalActive}
        setActive={setModalActive}
        text1={
          "Вы уверены, что хотите зарегистрировать инициативу и внесли все необходимые данные? После регистрации внесение изменений невозможно"
        }
        classNameBtn1={styles.btnWhite}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnBlue}
        textBtn2={"Отправить"}
        onClick1={closeModal}
        onClick2={() => {
          const currentDate = new Date();
          const formattedEndDate = formatDateToServer(currentDate, "-");
          idea &&
            description &&
            direction &&
            effect &&
            postQuery({
              date: formattedEndDate,
              name: idea,
              description,
              organization: getOrganizationId(getOrganization(), organizations),
              status: "check",
              implementation_effect: effect,
              initiator_users: [user_id],
              initiative_direction: direction,
            });
          idea && description && direction && effect && router.push("/queries");
          closeModal();
        }}
        stylesContentModal={styles.contentModal}
      />
      <Modal
        active={secondModalActive}
        setActive={setSecondModalActive}
        text1={
          "Вы уверены, что хотите отменить создание инициативы? При отмене заявки ранее внесенная информация не будет сохранена"
        }
        classNameBtn1={styles.btnWhite}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnBlue}
        textBtn2={"Выйти"}
        onClick1={closeModal}
        onClick2={() => router.push("/queries")}
        stylesContentModal={styles.contentModal}
      />
    </>
  );
});

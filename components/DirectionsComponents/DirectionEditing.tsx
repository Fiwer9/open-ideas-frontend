import React, { useEffect, useState } from "react";

import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import router from "next/router";

import { useSelector } from "react-redux";

import {
  getDirectionById,
  patchDirection,
} from "../../redux/directionsSlice/asyncActions";
import { fetchUsers } from "../../redux/usersSlice/asyncActions";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";
import { useAppDispatch } from "../../redux/store";
import AdminPageLayout from "../AdminPageLayout";
import {
  selectDirection,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import {
  selectUsers,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import AdminQuerySkeleton from "../SkeletonComponents/AdminQuerySkeleton";

import styles from "./styles/DirectionEditing.module.scss";

interface EditDirectionProps {
  name: string;
  description: string;
  experts: [{ value: number; label: string }] | number[];
}

const DirectionEditing: React.FC = () => {
  const { directionId } = router.query as { directionId: string };
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm<EditDirectionProps>();
  const users = useSelector(selectUsers);
  const currentDirection = useSelector(selectDirection);
  const statusDirections = useSelector(selectStatusDirections);
  const statusUsers = useSelector(selectUsersStatus);
  const experts =
    currentDirection.experts &&
    users.filter((user) => currentDirection.experts.indexOf(user.id) !== -1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (
        statusDirections === Status.SUCCESS &&
        statusUsers === Status.SUCCESS
      ) {
        setIsLoading(false);
      }
    }, 1000);
  }, [statusDirections, statusUsers]);

  const fetchData = async () => {
    await dispatch(getDirectionById(Number(directionId)));
    await dispatch(fetchUsers());
    dispatch(setPageId(Number(directionId)));
  };

  const handleSaveChanges = async (data: EditDirectionProps) => {
    const { name, description, experts } = data;
    await dispatch(
      patchDirection({
        id: Number(directionId),
        name,
        description,
        experts: experts.map((expert) =>
          expert.value ? expert.value : expert
        ),
      })
    );
    router.back();
  };

  useEffect(() => {
    directionId && fetchData();
  }, [directionId]);

  useEffect(() => {
    currentDirection?.name && dispatch(setPageName(currentDirection.name));
  }, [currentDirection?.name]);

  return (
    <>
      <AdminPageLayout>
        {!isLoading ? (
          <Form
            name={"editing-direction"}
            onFinish={handleSaveChanges}
            layout="vertical"
            className={styles.form}
            form={form}
            initialValues={{
              name: currentDirection?.name,
              description: currentDirection?.description,
              experts:
                experts &&
                experts.map((expert) => {
                  return { value: expert.id, label: expert.name };
                }),
            }}
          >
            <div className={styles.editing}>
              <p className={styles.heading}>Редактирование направления</p>

              <div className={styles.formContainer}>
                <Form.Item
                  className={styles.formItem}
                  label={"Название"}
                  name={"name"}
                  rules={[
                    {
                      required: true,
                      message: "Введите название направления",
                    },
                  ]}
                >
                  <Input
                    className={styles.inp}
                    style={{ height: 40, borderRadius: 2 }}
                    placeholder={"Введите название напрваления"}
                  />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  label={"Описание направления"}
                  name={"description"}
                  rules={[
                    {
                      required: true,
                      message: "Введите описание направления",
                    },
                  ]}
                >
                  <TextArea
                    className={styles.textArea}
                    rows={5}
                    style={{ borderRadius: 2 }}
                    placeholder={
                      "Опишите направление, чем оно занимается, за что ответственно"
                    }
                  />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  style={{ marginBottom: 60 }}
                  label={"Прикреплённые эксперты"}
                  name={"experts"}
                  rules={[
                    {
                      required: true,
                      message: "Выберите экспертов",
                    },
                  ]}
                >
                  <Select
                    className="select"
                    style={{ height: 40 }}
                    placeholder={
                      "Выберите экспертов, отвечающих за данное направление"
                    }
                    mode={"multiple"}
                    showSearch={true}
                    filterOption={(input, option) =>
                      (option?.label.toLowerCase() ?? "").includes(
                        input.toLowerCase()
                      )
                    }
                    notFoundContent={"Нет экспертов"}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      ...users
                        .filter((user) => user.groups.includes(2))
                        .map((user) => ({
                          value: user.id,
                          label: user.name,
                        })),
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        ) : (
          <AdminQuerySkeleton />
        )}
        <div className={styles.btnContainer}>
          <Button
            className={styles.btnFooter}
            form={"editing-direction"}
            htmlType={"submit"}
          >
            Сохранить изменения
          </Button>
        </div>
      </AdminPageLayout>
    </>
  );
};

export default DirectionEditing;

import React, { useEffect, useState } from "react";
import { CheckboxBlock } from "../FilterComponents/blocks/FilterCheckboxBar";
import { Button, Form, Input, Select } from "antd";

import styles from "./styles/UserEditing.module.scss";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectUser } from "../../redux/usersSlice/selectors";
import {
  fetchCurrentUser,
  patchUser,
} from "../../redux/usersSlice/asyncActions";
import { selectQueriesData } from "../../redux/queriesSlice/selectors";
import {
  selectDepartments,
  selectOrganizations,
} from "../../redux/organizationsSlice/selectors";
import { fetchQueries } from "../../redux/queriesSlice/asyncActions";
import {
  fetchDepartments,
  fetchOrganizations,
} from "../../redux/organizationsSlice/asyncActions";
import { getOrganizationName } from "../../utils/utils";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";
import AdminPageLayout from "../AdminPageLayout";

interface EditUserProps {
  userName: string;
  email: string;
  organization: {
    value: number;
    label: string;
  };
  department: {
    value: number;
    label: string;
  };
  initiatives: InitiativesArgs[];
  active: boolean;
  personal: boolean;
  superuser: boolean;
  verification: boolean;
}

type InitiativesArgs = {
  value: number;
  label: string;
};

export const UserEditing = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const [form] = Form.useForm<EditUserProps>();
  const [initValues, setInitialValues] = useState<EditUserProps>(null);
  const user = useSelector(selectUser);
  const queries = useSelector(selectQueriesData);
  const organizations = useSelector(selectOrganizations);
  const departments = useSelector(selectDepartments);
  const [organization, setOrganization] = useState(0);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    dispatch(setPageId(Number(userId)));
    await dispatch(fetchCurrentUser({ user_id: userId }));
    await dispatch(fetchQueries({}));
    await dispatch(fetchOrganizations());
    await dispatch(fetchDepartments({}));
  };

  useEffect(() => {
    userId && fetchData();
  }, [userId]);

  useEffect(() => {
    user?.name && dispatch(setPageName(user.name));
  }, [user?.name]);

  const getData = (organizationId?: number): EditUserProps => ({
    userName: user?.name,
    email: user?.email,
    organization: {
      value: user?.department.organization,
      label:
        organizations.length > 0 &&
        getOrganizationName(user?.department.organization, organizations),
    },
    initiatives: getQueries(),
    department: {
      value: !organizationId ? user?.department.id : null,
      label: !organizationId ? user?.department.name : "",
    },
    active: user?.is_active,
    personal: user?.is_staff,
    superuser: user?.is_superuser,
    verification: user?.is_verified,
  });

  useEffect(() => {
    if (user?.name && queries?.length > 0 && organizations?.length > 0) {
      setInitialValues(getData());
    }
  }, [user?.name, queries?.length, organizations?.length]);

  function getQueries(): InitiativesArgs[] {
    return queries
      .filter((query) => query.expert_users.find((id) => Number(userId) === id))
      .map((query) => ({
        value: query.id,
        label: `№${query.id}`,
      }));
  }

  const onChangeOrganization = (id: number) => {
    setOrganization(id);
    const departmentForOrg = departments.find((dep) => dep.organization === id);
    form.setFieldsValue({
      department: {
        value: departmentForOrg.id,
        label: departmentForOrg.name,
      },
    });
  };

  const handleSaveButton = async (data: EditUserProps) => {
    const {
      department,
      superuser,
      email,
      initiatives,
      userName,
      active,
      personal,
      verification,
    } = data;
    const depart = departments.find(
      (_department) => _department.id === department.value,
    );
    dispatch(
      patchUser({
        id: Number(userId),
        department: depart,
        email,
        name: userName,
        is_active: active,
        is_staff: personal,
        is_superuser: superuser,
        is_verified: verification,
      }),
    );
    router.back();
  };

  const getDepOptions = () => {
    return departments
      .filter((dep) =>
        organization
          ? dep.organization === organization
          : user?.department
            ? dep.organization === user?.department.id
            : "Не назначено",
      )
      .map((department) => {
        return {
          value: department.id,
          label: department.name,
        };
      });
  };

  if (!initValues) {
    return;
  }

  return (
    <AdminPageLayout>
      <Form
        name={"editing-user"}
        form={form}
        onFinish={handleSaveButton}
        layout="vertical"
        initialValues={initValues}
        className={styles.contentContainer}
      >
        <div className={styles.editing}>
          <p className={styles.heading}>Редактирование профиля</p>

          <div className={styles.formContainer}>
            <Form.Item
              className={styles.formItem}
              label={"Ф. И. О."}
              name={"userName"}
              rules={[
                {
                  required: true,
                  message: "Введите Ф. И. О. пользователя",
                },
              ]}
            >
              <Input
                className={styles.inp}
                style={{ height: 40, borderRadius: 2 }}
              />
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              label={"E-mail"}
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Введите почту пользователя",
                },
              ]}
            >
              <Input
                className={styles.inp}
                style={{ height: 40, borderRadius: 2 }}
              />
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              label={"Назначить эксперта на инициативы"}
              name={"initiatives"}
            >
              <Select
                disabled={true}
                className="select"
                placeholder={"Выберите инициативы"}
                style={{ height: 40 }}
                mode={"multiple"}
                options={queries.map((query) => ({
                  value: query.id,
                  label: `№${query.id}`,
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
                  message: "Введите организацию",
                },
              ]}
            >
              <Select
                className="select"
                placeholder={"Выберите организацию"}
                style={{ height: 40 }}
                options={organizations.map((organization) => ({
                  value: organization.id,
                  label: organization.name,
                }))}
                onChange={onChangeOrganization}
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
                className="select"
                style={{ height: 40, marginBottom: 60 }}
                placeholder={"Выберите отдел"}
                options={getDepOptions()}
              />
            </Form.Item>
            <div className={styles.btnContainer}>
              <Button
                form={"editing-user"}
                htmlType={"submit"}
                className={styles.btnFooter}
              >
                <span>Сохранить изменения</span>
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.rightsGroopContainer}>
          <div className={styles.rigths}>
            <p className={styles.heading}>Права доступа</p>

            <div className={styles.checkboxContainer}>
              <CheckboxBlock
                name={"active"}
                checkboxText={"Активный"}
                hintText={
                  "Отметьте, если пользователь должен считаться активным. Уберите эту отметку вместо удаления учётной записи."
                }
              />
              <CheckboxBlock
                name={"personal"}
                checkboxText={"Статус персонала"}
                hintText={
                  "Отметьте, если пользователь может входить в административную часть сайта."
                }
              />
              <CheckboxBlock
                name={"superuser"}
                checkboxText={"Статус суперпользователя"}
                hintText={
                  "Указывает, что пользователь имеет все права без явного их назначения"
                }
              />
              <CheckboxBlock
                name={"verification"}
                checkboxText={"Верифицированный"}
                hintText={"Указывает, что пользователь закончил регистрацию"}
              />
            </div>
          </div>

          <div className={styles.group}>
            <p className={styles.heading}>Группы</p>

            <Form.Item
              className={`${styles.formItem} ${styles.groupForm}`}
              label={"Выберете группу в которой будет находится пользователь"}
            >
              <Select
                disabled={true}
                mode="multiple"
                placeholder={"Выберете группы"}
                allowClear
                className="select"
                // defaultValue={user.groups.map((group) => group.name)}
                style={{ height: 40 }}
                options={[
                  { value: "1", label: "User" },
                  { value: "2", label: "Expert" },
                ]}
                aria-required={true}
              />
            </Form.Item>
          </div>

          <div className={styles.btnContainer1440}>
            <Button
              className={styles.btnFooter1440}
              form={"editing-user"}
              htmlType={"submit"}
            >
              <span>Сохранить изменения</span>
            </Button>
          </div>
        </div>
      </Form>
    </AdminPageLayout>
  );
};

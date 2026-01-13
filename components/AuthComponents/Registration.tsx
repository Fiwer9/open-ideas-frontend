import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";

import router from "next/router";

import { useSelector } from "react-redux";

import { useAppDispatch } from "../../redux/store";
import { Buttons } from "../ButtonComponent/Button";
import Logo from "../PicturesComponents/Logo";
import { InputLabel } from "../InputLabelComponent/InputLabel";
import { selectAuthStatus } from "../../redux/authSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import {
  fetchDepartments,
  fetchOrganizations,
} from "../../redux/organizationsSlice/asyncActions";
import {
  selectDepartments,
  selectOrganizations,
} from "../../redux/organizationsSlice/selectors";
import { putRegistration } from "../../redux/authSlice/asyncActions";

import styles from "./styles/Registration.module.scss";

export const Registration = () => {
  const [name, setName] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<number>(0);
  const [departmentId, setDepartmentId] = useState<number>();
  const departments = useSelector(selectDepartments);
  const organizations = useSelector(selectOrganizations);
  const dispatch = useAppDispatch();
  const status = useSelector(selectAuthStatus);

  const optionsDep = departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const optionsOrg = organizations.map((org) => ({
    value: org.id,
    label: org.name,
  }));

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, []);

  useEffect(() => {
    organizationId && setDepartmentId(null);
    organizationId &&
      dispatch(fetchDepartments({ organization_id: organizationId }));
  }, [organizationId]);

  const handleInputChange = (evt: any) => {
    setName(evt.target.value);
  };

  const handleSubmitButton = async () => {
    try {
      dispatch(
        putRegistration({
          name,
          departmentId,
        })
      );
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (status !== Status.SUCCESS) {
      return;
    }
    router.push("/queries");
  }, [status]);

  return (
    <div className={styles.container}>
      <Form className={styles.form}>
        <Form.Item className={styles.logo}>
          <Logo width={112} height={32} />
        </Form.Item>
        <Form.Item className={styles.content}>
          <InputLabel
            className={styles.title}
            title={"Введите своё Ф. И. О."}
          />
          <div className={styles.input}>
            <Input
              data-testid="inputFIO"
              onChange={handleInputChange}
              placeholder={"Напишите фамилию, имя и отчество"}
              required
            />
          </div>
        </Form.Item>
        {organizations && (
          <Form.Item className={styles.contentSelect} required={true}>
            <InputLabel
              className={styles.contentSelectTitle}
              title={"Выберите свою организацию"}
            />
            <div className={styles.mySelectContainer}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                loading={status === Status.LOADING}
                className={styles.select}
                data-testid="organizationSelect"
                placeholder={"Название организации"}
                options={optionsOrg}
                onChange={(e: any) => {
                  setOrganizationId(e);
                }}
              />
            </div>
          </Form.Item>
        )}
        {organizationId && departments ? (
          <Form.Item className={styles.contentSelect} required={true}>
            <InputLabel
              className={styles.contentSelectTitle}
              title={"Выберите свой отдел"}
            />
            <div className={styles.mySelectContainer}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                loading={status === Status.LOADING}
                className={styles.select}
                placeholder={"Название отдела"}
                options={optionsDep}
                onChange={(e: any) => {
                  setDepartmentId(e);
                }}
                value={departmentId}
              />
            </div>
          </Form.Item>
        ) : null}
        <div className={styles.containerBtn}>
          <div
            className={
              name && organizationId && departmentId
                ? styles.btnBlue
                : styles.disabledBtn
            }
          >
            <Buttons
              dataTestId="registrationButton"
              text={"Зарегистрироваться"}
              props={
                name && organizationId && departmentId ? "submit" : "disabled"
              }
              type={"submit"}
              onClick={() => {
                if (name && organizationId && departmentId) {
                  handleSubmitButton();
                }
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { InputLabel } from "../InputLabelComponent/InputLabel";
import { Logo } from "../PicturesComponents/Logo";
import { Buttons } from "../ButtonComponent/Button";

import styles from "./styles/Registration.module.scss";
import router from "next/router";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { putRegistration } from "../../redux/authSlice/slice";
import { selectStatus } from "../../redux/authSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import {
  fetchDepartments,
  fetchOrganizations,
} from "../../redux/organizationsSlice/asyncActions";
import {
  selectDepartments,
  selectOrganizations,
} from "../../redux/organizationsSlice/selectors";

export const Registration = () => {
  const [name, setName] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<number>(0);
  const [department, setDepartment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const departments = useSelector(selectDepartments);
  const organizations = useSelector(selectOrganizations);
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);

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
    dispatch(fetchDepartments({ organization_id: organizationId }));
  }, [organizationId]);

  const handleInputChange = (evt: any) => {
    setName(evt.target.value);
    setError(null);
  };

  const handleSubmitButton = async () => {
    try {
      let departmentId = 0;
      for (let dep of departments) {
        if (dep.name === department) {
          departmentId = dep.id;
        }
      }
      dispatch(
        putRegistration({
          name,
          departmentId,
        })
      );
      router.push("/queries");
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

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
                  setDepartment(e);
                }}
              />
            </div>
          </Form.Item>
        ) : null}
        <div className={styles.containerBtn}>
          <div
            className={
              name && organizationId && department && !error
                ? styles.btnBlue
                : styles.disabledBtn
            }
          >
            <Buttons
              text={"Зарегистрироваться"}
              props={
                name && organizationId && department && !error
                  ? "submit"
                  : "disabled"
              }
              type={"submit"}
              onClick={() => {
                if (name && organizationId && department && !error) {
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

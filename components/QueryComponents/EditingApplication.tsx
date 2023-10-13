import React from "react";
import styles from "./styles/EditingApplication.module.scss";
import { Slider } from "../SliderComponents/SliderComponents";
import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";

export const EditingApplication = () => {
  return (
    <>
      <div className={styles.container}>
        <Slider />
        <div className={styles.content}>
          <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
          <Tabs />
          <div className={styles.contentContainer}>
            <p className={styles.textHeader}>Редактирование инициативы</p>

            <Form
              layout="vertical"
              className={styles.formContainer}
            >
              <Form.Item
                className={styles.formItem}
                label={"Инициатива (Идея)"}
                name={"initiative"}
                rules={[{
                  required: true,
                  message: 'Введите название инициативы'
                }]}
              >
                <Input
                  className={`${styles.formField} ${styles.inp}`}
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={'Описание инициативы'}
                name={'description'}
                rules={[{
                  required: true,
                  message: 'Введите описание инициативы'
                }]}
              >
                <TextArea
                  className={styles.formField}
                  rows={5}
                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={'Эффект от доработки'}
                name={'modification'}
                rules={[{
                  required: true,
                  message: 'Введите эффект от доработки'
                }]}
              >
                <TextArea
                  className={styles.formField}
                  rows={5}
                  required
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={'Направление'}
                name={'direction'}
                rules={[{
                  required: true,
                  message: 'Выберете направление инициативы'
                }]}
              >
                <Select
                  className={`${styles.formField} ${styles.inp}`}
                  defaultValue="Направление инициативы"
                  options={[
                    { value: 'value1', label: 'Технические процессы' },
                    { value: 'value2', label: 'IT процессы' },
                    { value: 'value3', label: 'Рабочие процессы' },
                  ]}
                  aria-required={true}
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={'Организация'}
                name={'organization'}
                rules={[{
                  required: true,
                  message: 'Выберете организацию'
                }]}
              >
                <Select
                  className={`${styles.formField} ${styles.inp}`}
                  defaultValue="Организация"
                  options={[
                    { value: 'value1', label: 'LamArt' },
                    { value: 'value2', label: 'Aratrum' },
                    { value: 'value3', label: 'Газпром' },
                  ]}
                  aria-required={true}
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={'Отдел'}
                name={'department'}
                rules={[{
                  required: true,
                  message: 'Выберете отдел'
                }]}
              >
                <Select
                  className={`${styles.formField} ${styles.inp}`}
                  defaultValue="Отдел"
                  options={[
                    { value: 'value1', label: 'IT отдел' },
                    { value: 'value2', label: 'Юридический отдел' },
                    { value: 'value3', label: 'Экономический отдел' },
                  ]}
                  aria-required={true}
                />
              </Form.Item>
              <Form.Item
                className={styles.formItem}
                label={'Назначенный эксперт'}
                name={'expert'}
                rules={[{
                  required: true,
                  message: 'Выберете эксперта'
                }]}
              >
                <Select
                  className={`${styles.formField} ${styles.inp}`}
                  defaultValue="Назначенный эксперт"
                  options={[
                    { value: 'value1', label: 'Иванов Олег' },
                    { value: 'value2', label: 'Иванов Иван' },
                    { value: 'value3', label: 'Иванов Дмитрий' },
                  ]}
                  aria-required={true}
                />
              </Form.Item>
            </Form>
          </div>

          <div className={styles.btnContainer}>
            <Button className={`${styles.btnDefault} ${styles.btnFooter}`} onClick={() => window.history.back()}>
              <span>Сохранить изменения</span></Button>
          </div>
        </div>
      </div>
    </>
  );
};

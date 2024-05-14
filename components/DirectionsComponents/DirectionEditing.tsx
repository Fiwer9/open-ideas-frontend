import React, { memo } from "react";
import AdminPageLayout from "../AdminPageLayout";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import router from "next/router";

import styles from './styles/DirectionEditing.module.scss'


export const DirectionEditing: React.FC = memo(() => {
  
    return (
      <>
        <AdminPageLayout>
            <Form
                name={"editing-direction"}
                layout="vertical"
                className={styles.form}
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
                                    placeholder={'Введите название напрваления'}
                                />
                        </Form.Item>
                        <Form.Item
                            className={styles.formItem}
                            label={"Описание направления"}
                            name={"description"}
                            rules={[
                                {
                                    required: true,
                                    message: "Введите описане направления",
                                },
                            ]}
                        >
                                <TextArea 
                                    className={styles.textArea} 
                                    rows={5} 
                                    style={{ borderRadius: 2 }}
                                    placeholder={'Опишите направление, чем оно занимается\за что ответственно'} 
                                />
                        </Form.Item>
                        <Form.Item
                            className={styles.formItem}
                            label={"Прикреплённые эксперты"}
                            name={"experts"}
                            rules={[
                                {
                                    required: true,
                                    message: "Выберите эксперта",
                                },
                            ]}
                        >
                                <Select
                                    className="select"
                                    style={{ height: 40, marginBottom: 60 }}
                                    placeholder={"Выберите экспертов, отвечающих за данное направление"}
                                    options={[
                                        { value: '1', label: 'Экономические' },
                                        { value: '2', label: 'Технологическое' },
                                        { value: '3', label: 'Рабочее' },
                                        { value: '4', label: 'Гуманитарное' },
                                      ]}
                                />
                        </Form.Item>
                    </div>
                </div>
            </Form>

            <div className={styles.btnContainer}>
              <Button
                className={styles.btnFooter}
                form={"edit-query"}
                htmlType={"submit"}
                onClick={() => {router.push(`/directions/directionCard`)}}
              >
                Сохранить изменения
              </Button>
            </div>
        </AdminPageLayout>
      </>
    );
  });
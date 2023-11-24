import React, {ChangeEvent, useEffect, useState} from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import CheckboxBar from "../FilterComponents/blocks/CheckboxBar";
import { Button, Form, Input, Select } from "antd";

import styles from "./styles/UserEditing.module.scss";
import Cookies from "js-cookie";
import {UserResponse} from "../../models/response/UserResponse";
import {fetchData} from "../../utils/utils";
import UsersService from "../../services/UsersService";

interface UserEditingProps {
  userId: string;
}

export const UserEditing = ({userId}: UserEditingProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserResponse>();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchData(setIsLoading, setUser, UsersService.getCurrentUpdateUser, userId);
  }, []);

  function handleChangeApplicationVar(event: ChangeEvent<any>, setData: React.SetStateAction<any>): void {
    setData(event.target.value)
  }

  useEffect(() => {
    setIsLoading(true)
    if (user) {
      setUserName(user?.name);
      setEmail(user.email);
    }
    setIsLoading(false);
  }, [user]);

  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={Cookies.get('user_name')} organization={Cookies.get('organization')} department={Cookies.get('department')}/>
          <Tabs />
            <Form
              layout="vertical"
              initialValues={{
                name: user?.name,
                email: user?.email,
              }}
              className={styles.contentContainer}>
              <div className={styles.editing}>
                <p className={styles.heading}>Редактирование профиля</p>

                <div className={styles.formContainer}>
                  <Form.Item
                    className={styles.formItem}
                    label={"Ф. И. О."}
                    name={"name"}
                    rules={[{
                      required: true,
                      message: 'Введите Ф. И. О. пользователя',
                    }]}
                  >
                    <Input className={styles.inp} onChange={(evt) => handleChangeApplicationVar(evt, setUserName)}/>
                  </Form.Item>
                  <Form.Item
                    className={styles.formItem}
                    label={"E-mail"}
                    name={"email"}
                    rules={[{
                      required: true,
                      message: 'Введите почту пользователя',
                    }]}
                  >
                    <Input className={styles.inp} />
                  </Form.Item>
                  <Form.Item
                    className={styles.formItem}
                    label={"Назначить эксперта на инициативы"}
                    name={"initiatives"}
                  >
                    <Select
                      className='select'
                      style={{height: 40}}
                      defaultValue="Инициативы"
                      options={[
                        { value: 'value1', label: '№1, №123, №98453' },
                        { value: 'value2', label: '№1, №123, №98453' },
                        { value: 'value3', label: '№1, №123, №98453' },
                      ]}
                      aria-required={true}
                    />
                  </Form.Item>
                  <Form.Item
                    className={styles.formItem}
                    label={"Организация"}
                    name={"organization"}
                    rules={[{
                      required: true,
                      message: 'Введите организацию',
                    }]}
                  >
                    <Select
                      className='select'
                      style={{height: 40}}
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
                      className='select'
                      style={{height: 40}}
                      defaultValue="Отдел"
                      options={[
                        { value: 'value1', label: 'IT отдел' },
                        { value: 'value2', label: 'Юридический отдел' },
                        { value: 'value3', label: 'Экономический отдел' },
                      ]}
                      aria-required={true}
                    />
                  </Form.Item>
                  <div className={styles.btnContainer}>
                    <Button className={styles.btnFooter}>
                      <span>Сохранить изменения</span></Button>
                  </div>
                </div>
              </div>

              <div className={styles.rightsGroopContainer}>
                <div className={styles.rigths}>
                  <p className={styles.heading}>Права доступа</p>

                  <div className={styles.checkboxContainer}>
                    <Form.Item className={styles.checkboxItem}>
                      <CheckboxBar
                        checkboxText={'Активный'}
                        hintText={'Отметьте, если пользователь должен считаться активным. Уберите эту отметку вместо удаления учётной записи.'}
                      />
                    </Form.Item>
                    <Form.Item className={styles.checkboxItem}>
                      <CheckboxBar
                        checkboxText={'Статус персонала'}
                        hintText={'Отметьте, если пользователь может входить в административную часть сайта.'}
                      />
                    </Form.Item>
                    <Form.Item className={styles.checkboxItem}>
                      <CheckboxBar
                        checkboxText={'Статус суперпользователя'}
                        hintText={'Указывает, что пользователь имеет все права без явного их назначения'}
                      />
                    </Form.Item>
                    <Form.Item className={styles.checkboxItem}>
                      <CheckboxBar
                        checkboxText={'Верифицированный'}
                        hintText={'Указывает, что пользователь закончил регистрацию'}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className={styles.group}>
                  <p className={styles.heading}>Группы</p>

                  <Form.Item
                    className={`${styles.formItem} ${styles.groupForm}`}
                    label={'Выберете группу в которой будет находится пользователь'}
                    name={'group'}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      className='select'
                      style={{height: 40}}
                      defaultValue="User1"
                      options={[
                        { value: 'value1', label: 'User1' },
                        { value: 'value2', label: 'User2' },
                        { value: 'value3', label: 'User3' },
                      ]}
                      aria-required={true}
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
        </div>
      </div>
    </>
  );
};

import React, { useContext, useEffect, useState} from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import CheckboxBar from "../FilterComponents/blocks/CheckboxBar";
import { Button, Form, Input, Select } from "antd";

import styles from "./styles/UserEditing.module.scss";
import Cookies from "js-cookie";
import {UserResponse} from "../../models/response/UserResponse";
import {fetchData, getDepartmentName, getOrganizationName} from "../../utils/utils";
import UsersService from "../../services/UsersService";
import QueriesService from "../../services/QueriesService";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import OrganizationsService from "../../services/OrganizationsService";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import {IDepartment} from "../../models/IDepartment";
import {Context} from "../../pages/_app";

interface UserEditingProps {
  userId: string;
}

export const UserEditing = ({userId}: UserEditingProps) => {
  const { store } = useContext(Context)
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserResponse>({
    name: '',
    id: 0,
    department: {name: '', id: 0, organization: 0},
    is_verified: false,
    is_superuser: false,
    is_staff: false,
    is_active: false,
    groups: [],
    email: '',
    date_joined: '',
    first_name: '',
    last_login: '',
    last_name: '',
    likes: [],
    user_permissions: [],
    password: '',
    username: ''
  });
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [expertInitiatives, setExpertInitiatives] = useState<string>('')
  const [organization, setOrganization] = useState(0);
  const [department, setDepartment] = useState<number | undefined>()
  const [groups, setGroups] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isActive, setIsActive] = useState(false)
  const [isStaff, setIsStaff] = useState(false)
  const [isSuperUser, setIsSuperUser] = useState(false)
  const [queries, setQueries] = useState<QueriesResponse[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationsResponse[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(() => {
    fetchData(setIsLoading, setUser, UsersService.getCurrentUpdateUser, userId ? userId : Cookies.get('userId')) // Сделал так чтобы если данные не прогрузились отбрасывало на предыдущую пока так;
    fetchData(setIsLoading, setQueries, QueriesService.getQueriesTableData)
    fetchData(setIsLoading, setOrganizations, OrganizationsService.getOrganizations)
    fetchData(setIsLoading, setDepartments, OrganizationsService.getDepartments)
  }, []);

  function handleChangeApplicationVar(event: any, setData: React.SetStateAction<any>): void {
    setData(event.target.value)
  }

  function handleChangeApplicationSelect(event: any[], setData: React.SetStateAction<any>): void {
    console.log(event)
    setData(event)
  }

  useEffect(() => {
    if (user) {
      setUserName(user.name)
      setEmail(user.email)
      setIsSuperUser(user?.is_superuser);
      setIsActive(user?.is_active);
      setIsStaff(user?.is_staff);
      setIsVerified(user?.is_verified);
    }
  }, [user]);

  function getQueries() {
    const res = [];
    for (let query of queries) {
      for (let user of query.expert_users) {
        if (user === Number(userId)) {
          res.push(`№${query.id}`)
        }
      }
    }
    return res;
  }

  const handleVerification = (e: any) => {
    setIsVerified(e)
  }

  const handleActive = (e: any) => {
    console.log(e)
    setIsActive(e)
  }

  const handleStaff = (e: any) => {
    setIsStaff(e)
  }

  const handleSuperUser = (e: any) => {
    setIsSuperUser(e)
  }

  const handleSaveButton = () => {
    try {
      store.putUserUpdate(userName, email, isVerified, isActive, isStaff, isSuperUser, Number(userId))
      department && store.putRegistration(userName, department)
      Cookies.set('department', getDepartmentName(department, departments) as string)
      Cookies.set('organization', getOrganizationName(organization, organizations))
      Cookies.set('user_name', userName)
      window.history.back()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.slider}>
          <Slider/>
        </div>
        <div className={styles.content}>
          <Header user_name={Cookies.get('user_name')} organization={Cookies.get('organization')} department={Cookies.get('department')}/>
          <Tabs />
          {user.name && (
            <Form
              layout="vertical"
              initialValues={{
                userName: user.name,
                email: user.email,
                organization: user.department && user.department.organization,
                department: department,
                active: user.is_active,
                personal: user.is_staff,
                superuser: user.is_superuser,
                verification: user.is_verified,
              }}
              className={styles.contentContainer}>
              <div className={styles.editing}>
                <p className={styles.heading}>Редактирование профиля</p>

                <div className={styles.formContainer}>
                  <Form.Item
                    className={styles.formItem}
                    label={"Ф. И. О."}
                    name={"userName"}
                    rules={[{
                      required: true,
                      message: 'Введите Ф. И. О. пользователя',
                    }]}
                  >
                    <Input
                      className={styles.inp}
                      style={{height: 40, borderRadius: 2}}
                      onChange={(evt) => handleChangeApplicationVar(evt, setUserName)}
                    />
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
                    <Input
                      className={styles.inp}
                      style={{height: 40, borderRadius: 2}}
                      onChange={(evt) => handleChangeApplicationVar(evt, setEmail)}
                    />
                  </Form.Item>
                  <Form.Item
                    className={styles.formItem}
                    label={"Назначить эксперта на инициативы"}
                    name={"initiatives"}
                  >
                    <Select
                      disabled={true}
                      className='select'
                      placeholder={'Выберете инициативы'}
                      style={{height: 40}}
                      mode={'multiple'}
                      defaultValue={getQueries()}
                      options={queries.map(query => ({
                        value: query.id,
                        label: `№${query.id}`
                      }))}
                      aria-required={true}
                      onChange={(e) => e ? handleChangeApplicationSelect([e], setExpertInitiatives) : handleChangeApplicationSelect([], setExpertInitiatives)}
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
                      disabled={true}
                      placeholder={'Выберете организацию'}
                      style={{height: 40}}
                      options={organizations.map(organization => ({
                        value: organization.id,
                        label: organization.name
                      }))}
                      onChange={(e) => {
                        handleChangeApplicationSelect(e, setOrganization)
                        handleChangeApplicationSelect([], setDepartment)
                      }}
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
                      disabled={true}
                      style={{height: 40, marginBottom: 60}}
                      placeholder={'Выберете отдел'}
                      options={departments.filter(dep => organization ? dep.organization === organization : user.department? dep.organization === user.department.organization : 'Не назначено').map(department => ({
                        value: department.id,
                        label: department.name
                      }))}
                      onChange={(e) => handleChangeApplicationSelect(e, setDepartment)}
                      aria-required={true}
                    />
                  </Form.Item>
                  <div className={styles.btnContainer}>
                    <Button className={styles.btnFooter} onClick={handleSaveButton}>
                      <span>Сохранить изменения</span></Button>
                  </div>
                </div>
              </div>

              <div className={styles.rightsGroopContainer}>
                <div className={styles.rigths}>
                  <p className={styles.heading}>Права доступа</p>

                  <div className={styles.checkboxContainer}>
                    <Form.Item className={styles.checkboxItem} name={'active'}>
                      <CheckboxBar
                        defaultChecked={user.is_active}
                        checkboxText={'Активный'}
                        hintText={'Отметьте, если пользователь должен считаться активным. Уберите эту отметку вместо удаления учётной записи.'}
                        onToggleArchive={handleActive}
                      />
                    </Form.Item>
                    <Form.Item className={styles.checkboxItem} name={'personal'}>
                      <CheckboxBar
                        defaultChecked={user.is_staff}
                        checkboxText={'Статус персонала'}
                        hintText={'Отметьте, если пользователь может входить в административную часть сайта.'}
                        onToggleArchive={handleStaff}
                      />
                    </Form.Item>
                    <Form.Item className={styles.checkboxItem} name={'superuser'}>
                      <CheckboxBar
                        defaultChecked={user.is_superuser}
                        checkboxText={'Статус суперпользователя'}
                        hintText={'Указывает, что пользователь имеет все права без явного их назначения'}
                        onToggleArchive={handleSuperUser}
                      />
                    </Form.Item>
                    <Form.Item className={styles.checkboxItem} name={'verification'}>
                      <CheckboxBar
                        defaultChecked={user.is_verified}
                        checkboxText={'Верифицированный'}
                        hintText={'Указывает, что пользователь закончил регистрацию'}
                        onToggleArchive={handleVerification}
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
                      disabled={true}
                      mode="multiple"
                      placeholder={'Выберете группы'}
                      allowClear
                      className='select'
                      defaultValue={user.groups.map(group => group.name)}
                      style={{height: 40}}
                      options={[
                        { value: '1', label: 'User' },
                        { value: '2', label: 'Expert' },
                      ]}
                      aria-required={true}
                      onChange={(e) => handleChangeApplicationSelect(e, setGroups)}
                    />
                  </Form.Item>
                </div>

                <div className={styles.btnContainer1440}>
                  <Button className={styles.btnFooter1440} onClick={handleSaveButton}>
                    <span>Сохранить изменения</span></Button>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

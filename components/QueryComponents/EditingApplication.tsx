import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import styles from "./styles/EditingApplication.module.scss";
import { Slider } from "../SliderComponents/SliderComponents";
import {Button, Form, Input, Select, Upload} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import Cookies from "js-cookie";
import {
  fetchData, formatDateToServer,
  getAuthor,
  getDirectionTranslation,
  getOrganizationName
} from "../../utils/utils";
import QueriesService from "../../services/QueriesService";
import OrganizationsService from "../../services/OrganizationsService";
import UsersService from "../../services/UsersService";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import {UserResponse} from "../../models/response/UserResponse";
import {Context} from "../../pages/_app";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import {IDepartment} from "../../models/IDepartment";
import { UploadOutlined } from "@ant-design/icons";

interface EditingApplicationProps {
  queryId: string;
}
export const EditingApplication = ({queryId}: EditingApplicationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [organization, setOrganization] = useState<OrganizationsResponse[]>([])
  const [users, setUsers] = useState<UserResponse[]>([])
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const [user, setUser] = useState<UserResponse>()
  const [applicationData, setApplicationData] = useState<QueriesResponse>({
    name: '',
    initiator_users: [0],
    implementation_effect: '',
    initiative_direction: '',
    organization: 0,
    expert_users: [],
    status: '',
    description: '',
    date: '',
    id: 0
  })
  const [applicationName, setApplicationName] = useState('')
  const [applicationDescription, setApplicationDescription] = useState('')
  const [applicationEffect, setApplicationEffect] = useState('')
  const [applicationDirection, setApplicationDirection] = useState('')
  const { store } = useContext(Context)
  const [expertSelect, setExpertSelect] = useState<number[]>([])

  useEffect(() => {

    function begin() {
      queryId && fetchData(setIsLoading, setApplicationData, QueriesService.getQueriesTableDataById, queryId)
      fetchData(setIsLoading, setOrganization, OrganizationsService.getOrganizations)
      fetchData(setIsLoading, setUsers, UsersService.getUsers)
      fetchData(setIsLoading, setDepartments, OrganizationsService.getDepartments)
    }

    begin()

  }, [queryId])

  useEffect(() => {
    getAuthor(applicationData.initiator_users, users, setUser)
    setApplicationName(applicationData.name)
    setApplicationDescription(applicationData.description)
    setApplicationEffect(applicationData.implementation_effect)
    setApplicationDirection(applicationData.initiative_direction)
    setExpertSelect(applicationData.expert_users)
  }, [applicationData, user]);

  function handleChangeApplicationVar(event: ChangeEvent<any>, setData: React.SetStateAction<any>): void {
      setData(event.target.value)
    }

  function handleChangeApplicationSelect(event: any[], setData: React.SetStateAction<any>): void {
    setData(event)
  }

  function handleSaveChanges() {
    const currentDate = new Date();
    const date = formatDateToServer(currentDate, '-')
    store.patchQuery(date, applicationName, applicationDescription, applicationDirection, applicationData.status, applicationEffect,
      applicationData.organization, applicationData.initiator_users, Number(queryId), expertSelect)
    window.history.back()
  }


  return (
    <>
      <div className={styles.container}>
        <Slider />
        <div className={styles.content}>
          <Header user_name={Cookies.get('user_name')} organization={Cookies.get('organization')} department={Cookies.get('department')}/>
          <Tabs />
            {applicationData.name && user?.department.name && applicationData.expert_users && (
              <Form
                layout="vertical"
                className={styles.contentContainer}
                initialValues={{
                  initiative: applicationName,
                  description: applicationDescription,
                  modification: applicationEffect,
                  direction: getDirectionTranslation(applicationData.initiative_direction),
                  organization: getOrganizationName(applicationData.organization, organization),
                  department: user?.department.name,
                  expert: applicationData.expert_users ? applicationData.expert_users : 'Не назначено',
                }}
              >
                <p className={styles.textHeader}>Редактирование инициативы</p>
                <div className={styles.inpContainer}>
                  <div className={styles.formContainer}>
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
                        onChange={(evt) => handleChangeApplicationVar(evt, setApplicationName)}
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
                        onChange={(e) => handleChangeApplicationVar(e, setApplicationDescription)}
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
                        onChange={(e) => handleChangeApplicationVar(e, setApplicationEffect)}
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
                        options={[
                          { value: 'tech_process', label: 'Технологические процессы' },
                          { value: 'business_process', label: 'Бизнес-процессы' },
                          { value: 'work_safety', label: 'Охрана труда' },
                          { value: 'workspace', label: 'Рабочее пространство' }
                        ]}
                        onChange={(e) => handleChangeApplicationSelect(e, setApplicationDirection)}
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
                        options={organization.map(org => ({
                          value: org.id,
                          label: org.name
                        }))}
                        aria-required={true}
                        disabled
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
                        options={departments.filter(dep => dep.organization === applicationData.organization).map(dep => ({
                          value: dep.id,
                          label: dep.name
                        }))}
                        aria-required={true}
                        disabled
                      />
                    </Form.Item>
                    <Form.Item
                      className={styles.formItem}
                      label={'Назначенный эксперт'}
                      name={'expert'}
                      rules={[{
                        message: 'Выберете эксперта'
                      }]}
                    >
                      <Select
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        className={`${styles.formField} ${styles.inp}`}
                        options={[
                          { value: null, label: "-" },
                          ...users.map(user => ({
                            value: user.id,
                            label: user.name
                          }))
                        ]}
                        aria-required={true}
                        onChange={(e) => e ? handleChangeApplicationSelect([e], setExpertSelect) : handleChangeApplicationSelect([], setExpertSelect)}
                      />
                    </Form.Item>
                  </div>
                <div className={styles.files}>
                  <Form.Item
                    className={styles.formItem}
                    label={'Дополнительные файлы'}
                    name={'file'}
                  >
                    <Upload
                      maxCount={5}
                      accept=".webm, .pdf, .doc, .docx, .odt, .xml, application/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .png, video/*, audio/*"
                      multiple
                      className='upload'
                    >
                      <Button icon={<UploadOutlined />}>Загрузить</Button>
                    </Upload>
                  </Form.Item>
              </div>
                </div>
          </Form>
            )}

          <div className={styles.btnContainer}>
            <Button className={`${styles.btnDefault} ${styles.btnFooter}`} onClick={() => handleSaveChanges()}>
              <span>Сохранить изменения</span></Button>
          </div>
        </div>
      </div>
    </>
  );
};

import React, {useContext, useEffect, useState} from "react";
import { Form, Select, Card, Input, Upload, Button } from "antd";
import { InputLabel } from "../InputLabelComponent/InputLabel";
import { Logo } from "../PicturesComponents/Logo";
import { Buttons } from "../ButtonComponent/Button";

import styles from "./styles/CreateQuery.module.scss";
import Modal from "../ModalsComponents/Modal";
import router from "next/router";
import {UserResponse} from "../../models/response/UserResponse";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import OrganizationsService from "../../services/OrganizationsService";
import UsersService from "../../services/UsersService";
import {formatDateToServer, getOrganizationId, getOrganizationName} from "../../utils/utils";
import {Context} from "../../pages/_app";
import { UploadOutlined } from "@ant-design/icons";

export const CreateQuery = () => {
    const [modalActive, setModalActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('')
    const [effect, setEffect] = useState('')
    const [users, setUsers] = useState<UserResponse>(
        {
            id: 0,
            password: '',
            last_login: '',
            is_superuser: false,
            username: '',
            first_name: '',
            last_name: '',
            is_staff: false,
            is_active: false,
            date_joined: '',
            name: '',
            email: '',
            department: {
                id: 0,
                organization: 0,
                name: ''
            },
            groups: [],
            user_permissions: [],
            likes: [],
        }
    )
    const [direction, setDirection] = useState('')
    const [organization, setOrganization] = useState<OrganizationsResponse[]>([])
    const [idea, setIdea] = useState('')
    const [secondModalActive, setSecondModalActive] = useState(false);
    const { store } = useContext(Context);
    const closeModal = () => {
      setModalActive(false);
      setSecondModalActive(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const organizations = await OrganizationsService.getOrganizations()
                const users = await UsersService.getCurrentUser(Number(sessionStorage.getItem("user_id")))
                setUsers(users.data)
                setOrganization(organizations.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()

    }, [])

    function getOrganization() {
        return users.department.organization
    }

    const postQuery = async (date: string, name: string, description: string, initiative_direction: string, status: string,
                       implementation_effect: string, organization: number, initiator_users: [number])=> {
        try {
            await store.postQuery(date, name, description, initiative_direction, status,
                implementation_effect, organization, initiator_users);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    return (
        <>
            <Card loading={isLoading} className={styles.card}>
                <Form className={styles.form}>
                    <Form.Item className={styles.logo}>
                        <Logo width={112.73} height={32}/>
                    </Form.Item>
                    <Form.Item className={styles.content}>
                        <div className={styles.title}>
                            <InputLabel title={"Создание инициативы"} label2={styles.label2}/>
                        </div>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Ф. И. О."} />
                        </div>
                        <Input className={styles.inp} value={users.name} disabled={true}/>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Организация"}/>
                        </div>
                        <Input className={styles.inp} value={getOrganizationName(getOrganization(), organization)} disabled={true} />
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Инициатива (Идея)"}/>
                        </div>
                        <Input className={styles.inp} placeholder={"Напишите название инициативы "} onChange={((e: any) => {
                            setIdea(e.target.value)
                        })} value={idea} required/>
                    </Form.Item>
                    <Form.Item className={styles.formItems} required={true}>
                        <div className={styles.label}>
                            <InputLabel title={"Направление"}/>
                        </div>
                        <div className={styles.mySelectContainer}>
                            <Select
                                className='select'
                                style={{height: 40}}
                                placeholder="Направление инициативы"
                                options={[
                                    { value: 'tech_process', label: 'Технологические процессы' },
                                    { value: 'business_process', label: 'Бизнес-процессы' },
                                    { value: 'work_safety', label: 'Охрана труда' },
                                    { value: 'workspace', label: 'Рабочее пространство' },
                                ]}
                                onChange={(e: any) => {
                                    setDirection(e)
                                }}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Описание инициативы"}/>
                        </div>
                        <textarea className={styles.textAreaCustom} placeholder={"Напишите описание инициативы"} onChange={(e) => {
                            setDescription(e.target.value)
                        }} value={description || ''} required={true}/>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Эффект от доработки"}/>
                        </div>
                        <textarea className={styles.textAreaCustom} placeholder={"Напишите ожидаемый эффект от доработки"}
                                  onChange={(e) => {
                                      setEffect(e.target.value)
                                  }} value={effect || ''} required={true}/>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                      <div className={styles.label}>
                        <InputLabel title={"Загрузка дополнительных файлов"}/>
                      </div>
                      <Upload
                        maxCount={5}
                        accept=".pdf, .webm, .doc, .docx, .odt, .xml, application/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .png, video/*, audio/*"
                        multiple
                        className='upload'
                      >
                        <Button className={styles.uploadBtn} icon={<UploadOutlined />}>Загрузить</Button>
                      </Upload>
                    </Form.Item>
                    <div className={styles.containerBtn}>
                        <div className={styles.btnWhite}>
                            <Buttons text={"Назад"} onClick={() => {
                                setSecondModalActive(true);
                            }}/>
                        </div>
                        <div className={styles.btnBlue}>
                            <Buttons text={"Отправить"} onClick={() => {
                              setModalActive(true);
                            }}/>
                        </div>
                    </div>
                </Form>
            </Card>

            <Modal
                active={modalActive} setActive={setModalActive}
                text1={"Вы уверены, что хотите зарегистрировать инициативу и внесли все необходимые данные? После регистрации внесение изменений невозможно"}
                classNameBtn1={styles.btnWhite}
                textBtn1={"Назад"}
                classNameBtn2={styles.btnBlue}
                textBtn2={"Отправить"}
                onClick1={closeModal}
                onClick2={() => {
                    const currentDate = new Date();
                    const formattedEndDate = formatDateToServer(currentDate, '-');
                    idea&& description&& direction&& effect&& postQuery(formattedEndDate, idea, description, direction, 'check', effect,
                        getOrganizationId(getOrganization(), organization), [users.id])
                    idea&& description&& direction&& effect&& router.push('/queries')
                    closeModal()
                }}
                stylesContentModal={styles.contentModal}
            />
            <Modal
                active={secondModalActive} setActive={setSecondModalActive}
                text1={"Вы уверены, что хотите отменить создание инициативы? При отмене заявки ранее внесенная информация не будет сохранена"}
                classNameBtn1={styles.btnWhite}
                textBtn1={"Назад"}
                classNameBtn2={styles.btnBlue}
                textBtn2={"Выйти"}
                onClick1={closeModal}
                onClick2={() => router.push('/queries')}
                stylesContentModal={styles.contentModal}
            />
        </>
    );
};

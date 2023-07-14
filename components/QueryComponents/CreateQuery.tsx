import React, {useEffect, useState} from "react";
import {Form, Select, Card, Input} from "antd";
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
import {getOrganizationName} from "../../utils/utils";
import TextArea from "antd/es/input/TextArea";

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
    let direction = '';
    const [organization, setOrganization] = useState<OrganizationsResponse[]>([])
    const [idea, setIdea] = useState('')
    const [secondModalActive, setSecondModalActive] = useState(false);
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

    function postQuery(date: string, name: string, description: string, initiative_direction: string, status: string,
                       implementation_effect: string, organization: number, initiator_users: [], expert_users: []) {

    }

    return (
        <>
            <Card loading={isLoading} className={styles.card}>
                <Form className={styles.form}>
                    <Form.Item className={styles.logo}>
                        <Logo />
                    </Form.Item>
                    <Form.Item className={styles.content}>
                        <div className={styles.title}>
                            <InputLabel title={"Создание заявки"}/>
                        </div>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Ф. И. О."} />
                        </div>
                        <Input value={users.name} disabled={true}/>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Организация"}/>
                        </div>
                        <Input value={getOrganizationName(getOrganization(), organization)} disabled={true} />
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Инициатива (Идея)"}/>
                        </div>
                        <Input placeholder={"Напишите название инициативы "} onChange={((e: any) => {
                            setIdea(e.target.value)
                        })} value={idea}/>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Направление"}/>
                        </div>
                        <div className={styles.mySelectContainer}>
                            <Select
                                placeholder="Направление инициативы"
                                options={[
                                    { value: 'tech_process', label: 'Технологические процессы' },
                                    { value: 'business_process', label: 'Бизнес-процессы' },
                                    { value: 'work_safety', label: 'Охрана труда' },
                                    { value: 'workspace', label: 'Рабочее пространство' },
                                ]}
                                onChange={(e: any) => {
                                    direction = e;
                                    console.log(direction)
                                }}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Описание инициативы"}/>
                        </div>
                        <TextArea className={styles.textAreaCustom} placeholder={"Напишите описание инициативы"} onChange={(e) => {
                            setDescription(e.target.value)
                        }} value={description}/>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Эффект от доработки"}/>
                        </div>
                        <TextArea className={styles.textAreaCustom} placeholder={"Напишите ожидаемый эффект от доработки"}
                                  onChange={(e) => {
                                      setEffect(e.target.value)
                                      console.log(effect)
                                  }} value={effect}/>
                    </Form.Item>
                    <div className={styles.containerBtn}>
                        <div className={styles.btnWhite}>
                            <Buttons text={"Отменить"} onClick={() => {
                                setSecondModalActive(true);
                                router.push('/queries/create')}
                            } />
                        </div>
                        <div className={styles.btnBlue}>
                            <Buttons text={"Отправить"} onClick={() => {
                                setModalActive(true);
                                router.push('/queries/create')}
                            }/>
                        </div>
                    </div>
                </Form>
            </Card>

            <Modal
                className={styles.models} active={modalActive} setActive={setModalActive}
                text={"Вы уверены, что хотите зарегистрировать заявку и внесли все необходимые данные? После регистрации внесение изменений невозможно"}
                textBtnWhite={"Назад"}
                textBtnBlue={"Отправить"}
                onClickWhite={closeModal}
                onClickBlue={() => {
                    router.push('/queries')
                }}
            />
            <Modal
                className={styles.models} active={secondModalActive} setActive={setSecondModalActive}
                text={"Вы уверены, что хотите отменить создание заявки? При отмене заявки ранее внесенная информация не будет сохранена"}
                textBtnWhite={"Назад"}
                textBtnBlue={"Выйти"}
                onClickWhite={closeModal}
                onClickBlue={() => router.push('/queries')}
            />
        </>
    );
};

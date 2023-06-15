import React, {useState} from "react";
import {Form, Select} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {InputPattern} from "../InputComponent/Input";
import {Logo} from "../PicturesComponents/Logo";
import {TextAreas} from "../TextAreaComponent/TextArea";
import {Buttons} from "../ButtonComponent/Button";

import styles from "./styles/CreateQuery.module.scss";
import Modal from "../ModalsComponents/Modal";

export const CreateQuery = () => {
    const [modalActive, setModalActive] = useState(false);

    return (
        <>
            <div className={styles.container}>
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
                            <InputLabel title={"Ф. И. О."}/>
                        </div>
                        <InputPattern />
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Организация"}/>
                        </div>
                        <InputPattern />
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Инициатива (Идея)"}/>
                        </div>
                        <InputPattern placeholder={"Напишите название инициативы "}/>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Направление"}/>
                        </div>
                        <div className={styles.mySelectContainer}>
                            <Select
                                defaultValue="Направление инициативы"
                                options={[
                                    { value: 'TechnologicalProcesses', label: 'Технологические процессы' },
                                    { value: 'BusinessProcesses', label: 'Бизнес-процессы' },
                                    { value: 'LaborProtection', label: 'Охрана труда' },
                                    { value: 'Workspace', label: 'Рабочее пространство' },
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Описание инициативы"}/>
                        </div>
                        <TextAreas placeholder={"Напишите описание инициативы"}/>
                    </Form.Item>
                    <Form.Item className={styles.formItems}>
                        <div className={styles.label}>
                            <InputLabel title={"Эффект от доработки"}/>
                        </div>
                        <TextAreas placeholder={"Напишите ожидаемый эффект от доработки"}/>
                    </Form.Item>
                    <div className={styles.containerBtn}>
                        <div className={styles.btnWhite}>
                            <Buttons text={"Отменить"} />
                        </div>
                        <div className={styles.btnBlue}>
                            <Buttons text={"Отправить"} onClick={() => setModalActive(true)}/>
                        </div>
                    </div>
                </Form>
            </div>

            <div className={styles.modalContainer}>
                <Modal
                    className active={modalActive} setActive={setModalActive}
                    text={"Вы уверены, что хотите зарегистрировать заявку и внесли все необходимые данные? После регистрации внесение изменений невозможно"}
                    textBtn={"Отправить"}
                >
                </Modal>
            </div>
            {/*<div className={styles.modalContainer}>*/}
            {/*    <Modal*/}
            {/*        className active={modalActive} setActive={setModalActive}*/}
            {/*        text={"Вы уверены, что хотите отменить создание заявки? При отмене заявки ранее внесенная информация не будет сохранена"}*/}
            {/*        textBtn={"Выйти"}*/}
            {/*    >*/}
            {/*    </Modal>*/}
            {/*</div>*/}
        </>
    );
};

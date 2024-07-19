import { Form, Input, Select, Button } from 'antd'
import { Logo } from '../PicturesComponents/Logo'
import TextArea from 'antd/lib/input/TextArea'
import React, { memo } from 'react'

import styles from './styles/Modal.module.scss'
import {useAppDispatch} from "../../redux/store";
import {postDirection, fetchDirections} from "../../redux/directionsSlice/asyncActions";
import {PostDirectionArgs} from "../../redux/directionsSlice/types";
import {Buttons} from "../ButtonComponent/Button";
import {UserResponse} from "../../models/response/UserResponse";

interface ModalCreateDirectionProps {
	active: any
	setActive: any;
  users: UserResponse[];
  onClickCancel?: () => void;
}

const ModalCreateDirection = ({ active, setActive, onClickCancel, users }: ModalCreateDirectionProps) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<PostDirectionArgs>();
  
  const onSubmit = async (data: PostDirectionArgs) => {
    await dispatch(postDirection(data))
    await dispatch(fetchDirections())
    onClickCancel()
  }
  
  const onReset = () => {
    onClickCancel()
  };
  
  if (!active) {
    return;
  }

	return (
		<>
      <div className={styles.modal} onClick={() => setActive(false)}>
        <div
          className={styles.modalContent}
          style={{maxWidth: 570}}
          onClick={e => e.stopPropagation()}
        >
          <Form
            name={"modal-create-direction"}
            layout="vertical"
            className={styles.modalForm}
            form={form}
            onFinish={onSubmit}
            onReset={onReset}
            id={"modal-create-direction"}
          >
            <div className={styles.logo}>
              <Logo width={126.82} height={36} />
            </div>
            <div className={styles.modelText}>
              <p className={styles.text}>Добавление направления</p>
            </div>

            <Form.Item
              className={styles.formItem}
              label={"Название"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Напишите название направления",
                },
              ]}
            >
              <Input
                className={styles.inp}
                style={{ height: 40, borderRadius: 2 }}
                placeholder={'Введите название направления'}
              />
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              label={"Описание направления"}
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Напишите описание направления",
                },
              ]}
            >
              <TextArea
                className={styles.textArea}
                rows={5}
                style={{ borderRadius: 2 }}
                placeholder={'Опишите направление, чем оно занимается, за что ответственно'}
              />
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              label={"Прикреплённые эксперты"}
              name={"experts"}
              rules={[
                {
                  required: true,
                  message: "Выберите экспертов",
                },
              ]}
            >
              <Select
                className="select"
                style={{ height: 40, marginBottom: 60 }}
                mode={"multiple"}
                showSearch={false}
                placeholder={"Выберите экспертов, отвечающих за данное направление"}
                options={[...users
                  .filter((user) => user.groups.includes(2))
                  .map((user) => ({
                    value: user.id,
                    label: user.name,
                  })),]}
              />
            </Form.Item>
            
            <div className={styles.btnContainer}>
              <div className={styles.btnWhite}>
                <Buttons
                  text={"Отменить"}
                  type={"reset"}
                />
              </div>
              <div className={styles.btnBlue}>
                <Buttons
                  text={"Создать"}
                  type={"submit"}
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default memo(ModalCreateDirection)

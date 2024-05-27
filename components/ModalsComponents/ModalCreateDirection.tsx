import { Form, Input, Select, Button } from 'antd'
import { Logo } from '../PicturesComponents/Logo'
import TextArea from 'antd/lib/input/TextArea'
import { memo } from 'react'

import styles from './styles/Modal.module.scss'

interface ModalCreateDirectionProps {
	active: any
	setActive: any;
    onClickCancel?: () => void;
    onClickCreate?: () => void;
}

const ModalCreateDirection = ({
	active,
	setActive,
    onClickCancel,
    onClickCreate,
}: ModalCreateDirectionProps) => {
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
                        >
                                <Select
                                    className="select"
                                    style={{ height: 40, marginBottom: 60 }}
                                    placeholder={"Выберите экспертов, отвечающих за данное направление"}
                                    options={[
                                        { value: '1', label: 'Георгий' },
                                        { value: '2', label: 'Глеб' },
                                        { value: '3', label: 'Мария' },
                                        { value: '4', label: 'Никита' },
                                    ]}
                                />
                        </Form.Item>

                        <div className={styles.btnContainer}>
                            <button 
                                className={`${styles.btnWhite} ${styles.btnFooter}`}
                                onClick={onClickCancel}
                            >
                                Отменить
                            </button>
                            <button 
                                className={`${styles.btnBlue} ${styles.btnFooter}`}
                                onClick={onClickCreate}
                            >
                                Создать
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
		</>
	)
}

export default memo(ModalCreateDirection)

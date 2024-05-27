import { Form } from 'antd'
import { Buttons } from '../ButtonComponent/Button'
import { Logo } from '../PicturesComponents/Logo'

import styles from './styles/Modal.module.scss'

interface ModalProps {
	active: any
	setActive: any
	text1: string
	text2?: string
	textBtn1: string
	textBtn2: string
	onClick1: any
	onClick2: any
	classNameBtn1: any
	classNameBtn2: any
	layout?: any
	stylesContentModal?: any
}

const Modal = ({
	active,
	setActive,
	text1,
	text2,
	textBtn1,
	textBtn2,
	onClick1,
	onClick2,
	classNameBtn1,
	classNameBtn2,
	layout,
	stylesContentModal,
}: ModalProps) => {
	return (
		<>
			{active ? (
				<div className={styles.modal} onClick={() => setActive(false)}>
					<div
						className={styles.modalContent}
						onClick={e => e.stopPropagation()}
					>
						<Form className={styles.modalForm}>
							<Form.Item className={styles.logo}>
								<Logo width={126.82} height={36} />
							</Form.Item>
							<Form.Item
								className={`${styles.modelText} ${stylesContentModal}`}
							>
								<p
									className={
										textBtn2 === 'Отправить' ? styles.text : styles.textCancel
									}
								>
									{text1}
								</p>
								<p className={styles.text2}>{text2}</p>
							</Form.Item>
							{layout ? (
								<Form.Item className={styles.modelContent}>{layout}</Form.Item>
							) : (
								<></>
							)}
							<div className={styles.btnContainer}>
								<div className={classNameBtn1}>
									<Buttons
										className={styles.btnModal}
										type={'reset'}
										text={textBtn1}
										onClick={onClick1}
									/>
								</div>
								<div className={classNameBtn2}>
									<Buttons
										className={styles.btnModal}
										type={'submit'}
										text={textBtn2}
										onClick={onClick2}
									/>
								</div>
							</div>
						</Form>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default Modal

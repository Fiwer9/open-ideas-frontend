import { Button, Modal, Upload } from 'antd'
import { Logo } from '../PicturesComponents/Logo'
import { memo } from 'react'
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { UploadOutlined } from "@ant-design/icons";

import styles from './styles/ModalDownloadsCSV.module.scss'

interface ModalDownloadsCSV {
	isModalOpen: boolean;
    handleCancel: () => any;
    handleOk: () => any;
}

interface DataType {
    key: React.Key;
    name: string;
    email: string;
    organization: string;
    department: string;
}

const ModalDownloadsCSV = ({
	isModalOpen, handleCancel, handleOk
}: ModalDownloadsCSV) => {
    if (!isModalOpen) {
        return;
    }
      
    const columns: TableColumnsType<DataType> = [
        {
            title: 'name',
            dataIndex: 'name',
            showSorterTooltip: false,
            key: "id",
            width: "40%",
            align: "center",
        },
        {
            title: 'email',
            dataIndex: 'email',
            showSorterTooltip: false,
            key: "mail",
            width: "20%",
            align: "center",
        },
        {
            title: 'organization',
            dataIndex: 'organization',
            showSorterTooltip: false,
            key: "org",
            width: "20%",
            align: "center",
        },
        {
            title: 'department',
            dataIndex: 'department',
            showSorterTooltip: false,
            key: "depart",
            width: "20%",
            align: "center",
        },
    ];
    
    const data = [
        {
            key: '1',
            name: 'Петров Иван Васильевич',
            email: 'ivan@inan.ru',
            organization: 'Aratrum',
            department: 'IT-отдел',
        },
    ];

	return (
		<>
            <Modal 
                open={isModalOpen} 
                onCancel={handleCancel} 
                closeIcon={false} 
                width={670} 
                className={styles.modal}
                footer={null}
            >
                <div className={styles.logo}>
                    <Logo width={126.82} height={36} />
                </div>
                <p className={styles.titleCSV}>Загрузить csv-файл</p>
                <p className={styles.textCSV}>Добавление пользователей с помощью загрузки CSV-файла корректно работает только при следующем шаблоне заголовков:</p>
                <div className={styles.tableContainerCSV}>
                    <Table
                        className='tableCSV'
                        dataSource={data}
                        columns={columns}
                        rowKey="id"
                        bordered
                        pagination={false}
                    />
                </div>
                <div className={styles.upload}>
                    <Upload
                        maxCount={1}
                        accept=".csv"
                        className="upload"
                    >
                        <Button icon={<UploadOutlined />}>Выбрать csv-файл</Button>
                    </Upload>
                </div>
                <div className={styles.btnContainer}>
                    <Button 
                        className={styles.btnBack}
                        onClick={handleCancel}
                    >
                        Назад
                    </Button>
                    <Button 
                        className={styles.btnDownload} 
                        type="primary"
                        onClick={handleOk}
                    >
                        Загрузить
                    </Button>
                </div>
            </Modal>
		</>
	)
}

export default memo(ModalDownloadsCSV)

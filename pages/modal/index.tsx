import React, { useState } from "react";
import FilterBar from "../../components/FilterComponents/blocks/FilterBar";
import ModalDownloadsCSV from "../../components/ModalsComponents/ModalDownloadsCSV";
import { CloudUploadOutlined } from "@ant-design/icons";


export default function Index() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <FilterBar
                filterText={"Загрузить"}
                onClick={() => { setIsModalOpen(true) }}
                icon={<CloudUploadOutlined />}
            />

            <ModalDownloadsCSV isModalOpen={isModalOpen} handleCancel={handleCancel} />
        </div>
    );
}

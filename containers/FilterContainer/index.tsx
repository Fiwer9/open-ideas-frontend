import styles from "./styles.module.scss";
import SearchBar from "../../components/FilterComponents/blocks/SearchBar";
import FilterBar from "../../components/FilterComponents/blocks/FilterBar";
import { FilterOutlined } from "@ant-design/icons";
import FilterCheckboxBar from "../../components/FilterComponents/blocks/FilterCheckboxBar";
import { CloudUploadOutlined } from "@ant-design/icons";
import React, { memo, useState } from "react";
import ModalDownloadsCSV from "../../components/ModalsComponents/ModalDownloadsCSV";

interface FilterContainerProps {
  placeholder: string;
  downloadBtn?: boolean;
}

const FilterContainer: React.FC<FilterContainerProps> = ({
  placeholder,
  downloadBtn,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.infContainer}>
      <SearchBar placeholderNum={"Номер"} placeholderQuery={placeholder} />
      <div className={styles.filterContainer}>
        {downloadBtn && (
          <div>
            <FilterBar
              filterText={"Загрузить"}
              onClick={() => {
                setIsModalOpen(true);
              }}
              icon={<CloudUploadOutlined />}
            />

            <ModalDownloadsCSV
              isModalOpen={isModalOpen}
              handleCancel={handleCancel}
              handleOk={handleOk}
            />
          </div>
        )}
        <FilterBar icon={<FilterOutlined />} filterText={"Фильтры"} />
        <FilterCheckboxBar checkboxText={"Архив"} />
      </div>
    </div>
  );
};

export default memo(FilterContainer);

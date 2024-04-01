import styles from "./styles.module.scss";
import SearchBar from "../../components/FilterComponents/blocks/SearchBar";
import FilterBar from "../../components/FilterComponents/blocks/FilterBar";
import { FilterOutlined } from "@ant-design/icons";
import FilterCheckboxBar from "../../components/FilterComponents/blocks/FilterCheckboxBar";
import React, { memo } from "react";

interface FilterContainerProps {
  placeholder: string;
}

const FilterContainer: React.FC<FilterContainerProps> = ({ placeholder }) => {
  return (
    <div className={styles.infContainer}>
      <SearchBar placeholderNum={"Номер"} placeholderQuery={placeholder} />
      <div className={styles.filterContainer}>
        <FilterBar icon={<FilterOutlined />} filterText={"Фильтры"} />
        <FilterCheckboxBar checkboxText={"Архив"} />
      </div>
    </div>
  );
};

export default memo(FilterContainer);

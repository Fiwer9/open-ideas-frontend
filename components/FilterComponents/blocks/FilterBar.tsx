import React, { memo } from "react";
import { Button } from "antd";
import styles from "../styles/FilterBar.module.scss";

interface FilterBarProps {
  filterText: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = memo(
  ({ filterText, icon, onClick }) => {
    return (
      <div className={styles.btnContainer}>
        <Button icon={icon} onClick={onClick}>
          {filterText}
        </Button>
      </div>
    );
  }
);

export default FilterBar;

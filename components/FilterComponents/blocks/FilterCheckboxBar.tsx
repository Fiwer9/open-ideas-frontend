import React, { memo, useState } from "react";
import { Checkbox } from "antd";

import { CheckboxChangeEvent } from "antd/es/checkbox";

import styles from "../styles/CheckboxBar.module.scss";
import { useAppDispatch } from "../../../redux/store";
import {
  changeIsArchive,
  changeIsExpert,
} from "../../../redux/filterSlice/slice";

interface CheckboxBarProps {
  checkboxText: string;
}

const FilterCheckboxBar: React.FC<CheckboxBarProps> = memo(
  ({ checkboxText }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(false);

    function updateIsArchive(checked: boolean) {
      dispatch(changeIsArchive(checked));
    }

    function updateIsExpert(checked: boolean) {
      dispatch(changeIsExpert(checked));
    }

    const onToggleArchive = (evt: CheckboxChangeEvent) => {
      setValue(evt.target.checked);

      if (checkboxText === "Архив") {
        updateIsArchive(evt.target.checked);
      } else {
        updateIsExpert(evt.target.checked);
      }
    };
    return (
      <div className={styles.checkboxContainer}>
        <Checkbox
          defaultChecked={false}
          className="checkbox"
          onChange={onToggleArchive}
          checked={value}
        >
          {checkboxText}
        </Checkbox>
      </div>
    );
  }
);

export default FilterCheckboxBar;

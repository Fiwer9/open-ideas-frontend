import React, { memo, useState } from "react";
import { Checkbox } from "antd";

import styles from "../styles/CheckboxBar.module.scss";
import { useAppDispatch } from "../../../redux/store";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  changeIsArchive,
  changeIsExpert,
} from "../../../redux/filterSlice/slice";

interface CheckboxBlockProps {
  onToggleArchive: (value: boolean) => void;
  checkboxText: string;
  hintText?: string;
  defaultChecked?: boolean;
}

export const CheckboxBlock: React.FC<CheckboxBlockProps> = memo(
  ({ onToggleArchive, checkboxText, hintText, defaultChecked }) => {
    return (
      <div className={styles.checkboxContainerHint}>
        <Checkbox
          defaultChecked={defaultChecked ? defaultChecked : false}
          className="checkbox"
          onChange={(e) => onToggleArchive(e.target.checked)}
        >
          {checkboxText}
        </Checkbox>
        <span className={styles.hintText}>{hintText}</span>
      </div>
    );
  }
);

interface CheckboxBarProps {
  checkboxText: string;
}

const CheckboxBar: React.FC<CheckboxBarProps> = memo(({ checkboxText }) => {
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
        value={value}
      >
        {checkboxText}
      </Checkbox>
    </div>
  );
});

export default CheckboxBar;

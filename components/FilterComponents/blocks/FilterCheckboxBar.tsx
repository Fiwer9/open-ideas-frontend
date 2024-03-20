import React, { memo, useState } from "react";
import { Checkbox, Form } from "antd";

import styles from "../styles/CheckboxBar.module.scss";
import { useAppDispatch } from "../../../redux/store";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  changeIsArchive,
  changeIsExpert,
} from "../../../redux/filterSlice/slice";

interface CheckboxBlockProps {
  checkboxText: string;
  hintText?: string;
  name: string;
}

export const CheckboxBlock: React.FC<CheckboxBlockProps> = memo(
  ({ checkboxText, hintText, name }) => {
    return (
      <div className={styles.checkboxContainerHint}>
        <Form.Item
          name={name}
          valuePropName={"checked"}
          className={styles.formItem}
        >
          <Checkbox className="checkbox">{checkboxText}</Checkbox>
        </Form.Item>
        <span className={styles.hintText}>{hintText}</span>
      </div>
    );
  },
);

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
  },
);

export default FilterCheckboxBar;

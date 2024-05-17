import React, { memo } from "react";
import { Checkbox, Form } from "antd";

import styles from "../styles/CheckboxBar.module.scss";


interface CheckboxBlockProps {
  checkboxText: string;
  hintText?: string;
  name: string;
  paddings?: number;
}

const CheckboxBlock: React.FC<CheckboxBlockProps> = memo(
  ({ checkboxText, hintText, name, paddings }) => {
    return (
      <div className={styles.checkboxContainerHint} style={{padding: paddings}}>
        <Form.Item
          name={name}
          valuePropName={"checked"}
          className={styles.formItem}
        >
          <Checkbox className="checkbox">{checkboxText}</Checkbox>
        </Form.Item>
        <div>
            <span className={styles.hintText}>{hintText}</span>
        </div>
      </div>
    );
  },
);

export default CheckboxBlock;
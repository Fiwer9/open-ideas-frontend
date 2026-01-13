import { Radio, RadioChangeEvent } from "antd";
import React, { memo, useCallback } from "react";

import { AssignmentSettings } from "../../redux/settingsSlice/types";

import styles from "./styles.module.scss";

interface RadioGroupProps {
  onChangeDistribution: (e: RadioChangeEvent) => void;
  distribValue: AssignmentSettings;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  onChangeDistribution,
  distribValue,
}) => (
  <div className={styles.contentBlock}>
    <p className={styles.textOption}>Распределение по:</p>
    <Radio.Group
      className={styles.radioBlock}
      onChange={useCallback((e) => {
        onChangeDistribution(e);
      }, [])}
      value={distribValue}
    >
      <Radio value={AssignmentSettings.DIRECTION}>Направлению инициатив</Radio>
      <Radio value={AssignmentSettings.DEPARTMENT}>Отделу инициатора</Radio>
    </Radio.Group>
  </div>
);
export default memo(RadioGroup);

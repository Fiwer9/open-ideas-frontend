import React, { memo, useCallback } from "react";
import styles from "./styles.module.scss";
import { InputNumber } from "antd";
import debounce from "lodash.debounce";

interface SwitchContentProps {
  maxFileSize: number;
  maxFilesAttached: number;
  onChangeSize: (num: number) => void;
  onChangeCount: (num: number) => void;
}

const SwitchContent: React.FC<SwitchContentProps> = ({
  maxFileSize,
  maxFilesAttached,
  onChangeSize,
  onChangeCount,
}) => (
  <div className={styles.contentSwitch}>
    <div className={styles.switchRow}>
      <p className={styles.textSwitch}>Максимальное число загружаемых файлов</p>
      <InputNumber
        className={"inputNumber"}
        min={0}
        onChange={useCallback(
          debounce((num) => {
            onChangeCount(num);
          }, 1000),
          [],
        )}
        defaultValue={maxFilesAttached}
        max={7}
      />
    </div>
    <div className={`${styles.switchRow} ${styles.text}`}>
      <p className={styles.textSwitch}>Максимальный размер файла</p>
      <InputNumber
        className={"inputNumber"}
        min={0}
        defaultValue={maxFileSize}
        onChange={useCallback(
          debounce((num) => {
            onChangeSize(num);
          }, 1000),
          [],
        )}
        max={5000}
      />
    </div>
  </div>
);

export default memo(SwitchContent);

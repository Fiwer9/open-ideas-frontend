import React, { memo, useState } from "react";
import { Input } from "antd";

import styles from "../TextAreaComponent/styles/TextArea.module.scss";
import { useAppDispatch } from "../../redux/store";
import { setCurrentComment } from "../../redux/commentsSlice/slice";

const { TextArea } = Input;

type TextAreaProps = {
  placeholder: string;
};
export const TextAreas: React.FC<TextAreaProps> = memo(({ placeholder }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const onChangeInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target.value);
    dispatch(setCurrentComment(evt.target.value));
  };

  return (
    <TextArea
      rows={6}
      placeholder={placeholder}
      value={value}
      onChange={onChangeInput}
      className={styles.textArea}
    />
  );
});

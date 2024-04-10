import styles from "./styles.module.scss";
import SwitchBar from "../../components/FilterComponents/blocks/SwitchBar";
import SwitchContent from "../../components/SwitchContent";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { putSettings } from "../../redux/settingsSlice/asyncActions";

const SettingsContainer = () => {
  const select = useSelector((state: RootState) => ({
    settings: state.settings.settings,
  }));
  const dispatch = useAppDispatch();

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowFileAttachment, setAllowFileAttachment] = useState(false);
  const [maxFileSize, setMaxFileSize] = useState(1024);
  const [maxFilesAttached, setMaxFilesAttached] = useState(3);

  useEffect(() => {
    if (select.settings) {
      setAllowFileAttachment(select.settings.allow_file_attachment);
      setMaxFileSize(select.settings.max_file_size);
      setMaxFilesAttached(select.settings.max_files_attached);
      setIsAnonymous(select.settings.anonymous_status);
      // store.isAllowFileAttachment = settings[0].allow_file_attachment;
      // store.isAnonymous = settings[0].anonymous_status;
    }
  }, [select.settings]);

  const changeAllowFileAttachment = (bool: boolean) => {
    setAllowFileAttachment(bool);
    dispatch(putSettings({ id: 1, allow_file_attachment: bool }));
  };

  const changeAnonymousStatus = (bool: boolean) => {
    setIsAnonymous(bool);
    dispatch(putSettings({ id: 1, anonymous_status: bool }));
  };

  const changeMaxFileSize = (num: number) => {
    setMaxFileSize(num);
    dispatch(putSettings({ id: 1, max_file_size: num }));
  };

  const chaneMaxFilesAttached = (num: number) => {
    setMaxFilesAttached(num);
    dispatch(putSettings({ id: 1, max_files_attached: num }));
  };

  return (
    <div className={styles.switchContainer}>
      <SwitchBar
        checkboxText={"Анонимные инициативы"}
        hintText={"Возможность изменять поле Ф. И. О. при создании инициативы"}
        isChecked={isAnonymous}
        onChangeSwitch={changeAnonymousStatus}
      />
      <SwitchBar
        checkboxText={"Прикладывание файлов"}
        hintText={"Возможность прикладывать файлы при создании инициативы"}
        isChecked={allowFileAttachment}
        layout={
          allowFileAttachment && (
            <SwitchContent
              maxFileSize={maxFileSize}
              maxFilesAttached={maxFilesAttached}
              onChangeSize={changeMaxFileSize}
              onChangeCount={chaneMaxFilesAttached}
            />
          )
        }
        onChangeSwitch={changeAllowFileAttachment}
      />
    </div>
  );
};

export default memo(SettingsContainer);

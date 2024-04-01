import styles from "./styles.module.scss";
import SwitchBar from "../../components/FilterComponents/blocks/SwitchBar";
import SwitchContent from "../../components/SwitchContent";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FetchSettings from "../../hooks/fetches/FetchSettings/FetchSettings";

const SettingsContainer = () => {
  const select = useSelector((state: RootState) => ({
    settings: state.settings.settings,
  }));

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
    select.settings &&
      FetchSettings.usePutSettings(
        1,
        bool,
        maxFileSize,
        maxFilesAttached,
        isAnonymous,
      );
    setAllowFileAttachment(bool);
    // store.isAllowFileAttachment = bool;
  };

  const changeAnonymousStatus = (bool: boolean) => {
    select.settings &&
      FetchSettings.usePutSettings(
        1,
        allowFileAttachment,
        maxFileSize,
        maxFilesAttached,
        bool,
      );
    setIsAnonymous(bool);
    // store.isAnonymous = bool;
  };

  const changeMaxFileSize = (num: number) => {
    // settings[0] &&
    //   FetchSettings.usePutSettings(
    //     1,
    //     store.isAllowFileAttachment,
    //     num,
    //     store.maxFilesAttached,
    //     store.isAnonymous
    //   );
    // setMaxFileSize(num);
    // store.maxFileSize = num;
  };

  const chaneMaxFilesAttached = (num: number) => {
    // settings[0] &&
    //   FetchSettings.usePutSettings(
    //     1,
    //     store.isAllowFileAttachment,
    //     store.maxFileSize,
    //     num,
    //     store.isAnonymous
    //   );
    // setMaxFilesAttached(num);
    // store.maxFilesAttached = num;
  };

  return (
    <div className={styles.switchContainer}>
      <SwitchBar
        checkboxText={"Анонимные инициативы"}
        hintText={"Возможность изменять поле Ф. И. О. при создании инициативы"}
        isChecked={select.settings?.anonymous_status}
        onChangeSwitch={changeAnonymousStatus}
      />
      <SwitchBar
        checkboxText={"Прикладывание файлов"}
        hintText={"Возможность прикладывать файлы при создании инициативы"}
        isChecked={select.settings?.allow_file_attachment}
        layout={
          allowFileAttachment && (
            <SwitchContent
              maxFileSize={select.settings?.max_file_size}
              maxFilesAttached={select.settings?.max_files_attached}
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

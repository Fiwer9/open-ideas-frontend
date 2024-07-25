import styles from "./styles.module.scss";
import SwitchBar from "../../components/FilterComponents/blocks/SwitchBar";
import SwitchContent from "../../components/SwitchContent";
import React, {memo, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/store";
import {putSettings} from "../../redux/settingsSlice/asyncActions";
import {selectSettings} from "../../redux/settingsSlice/selectors";
import RadioGroupComponent from "../../components/RadioGroupComponent";
import {RadioChangeEvent} from "antd";
import {AssigmentSettings} from "../../redux/settingsSlice/types";

const SettingsContainer = () => {
  const settings = useSelector(selectSettings);

  const dispatch = useAppDispatch();

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowFileAttachment, setAllowFileAttachment] = useState(false);
  const [maxFileSize, setMaxFileSize] = useState(1024);
  const [maxFilesAttached, setMaxFilesAttached] = useState(3);
  const [allowDistributionQueries, setAllowDistributionQueries] = useState(false);
  const [distribOption, setDistribOption] = useState<AssigmentSettings>();

  useEffect(() => {
    if (settings) {
      setAllowFileAttachment(settings.allow_file_attachment);
      setMaxFileSize(settings.max_file_size);
      setMaxFilesAttached(settings.max_files_attached);
      setIsAnonymous(settings.anonymous_status);
      if (settings.assigment_settings !== AssigmentSettings.MANUAL)
      {
        
        setDistribOption(settings.assigment_settings)
      }
      else {
        setAllowDistributionQueries(false)
      }
    }
  }, [settings]);

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
  
  const changeDistribution = (e: RadioChangeEvent) => {
    setDistribOption(e.target.value);
    console.log(e.target.value);
    dispatch(putSettings({id: 1, assigment_settings: e.target.value}))
  }
  
  const changeAllowDistribQueries = (bool: boolean) => {
    setAllowDistributionQueries(bool);
    if (allowDistributionQueries === true) {
      dispatch(putSettings({id: 1, assigment_settings: AssigmentSettings.DIRECTION}))
    }
    else {
      dispatch(putSettings({id: 1, assigment_settings: AssigmentSettings.MANUAL}))
    }
  }

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
      <SwitchBar
        checkboxText={"Автоматическое распределение инициатив"}
        hintText={"Возможность автоматически распределять инициативы при создании между экспертами"}
        isChecked={allowDistributionQueries}
        layout={
          allowDistributionQueries && (
           <RadioGroupComponent onChangeDistribution={changeDistribution} distribValue={distribOption}/>
          )
        }
        onChangeSwitch={changeAllowDistribQueries}
      />
    </div>
  );
};

export default memo(SettingsContainer);

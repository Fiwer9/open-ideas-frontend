import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/Settings.module.scss";
import { Col, Space, Tag, theme, Tooltip, InputNumber, Input } from "antd";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import SwitchBar from "../FilterComponents/blocks/SwitchBar";
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import FetchSettings from "../../hooks/fetches/FetchSettings/FetchSettings";
import Cookies from "js-cookie";
import {Context} from "../../pages/_app";
import debounce from 'lodash.debounce'


function SwitchContent({maxFileSize, maxFilesAttached, onChangeSize, onChangeCount} : any) {
  return <div className={styles.contentSwitch}>
    <div className={styles.switchRow}>
      <p className={styles.textSwitch}>Максимальное число загружаемых файлов</p>
      <InputNumber className={'inputNumber'} min={0} onChange={useCallback(
          debounce((num) => {
            onChangeCount(num)
          }, 1000), []
      )} defaultValue={maxFilesAttached} max={7}/>
    </div>
    <div className={`${styles.switchRow} ${styles.text}`}>
      <p className={styles.textSwitch}>Максимальный размер файла</p>
      <InputNumber className={'inputNumber'} min={0} defaultValue={maxFileSize} onChange={useCallback(
          debounce((num) => {
            onChangeSize(num)
          }, 1000), []
      )} max={5000}/>
    </div>
  </div>;
}

export const Settings = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = FetchSettings.useGetDomains();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const [loadedDOM, setLoadedDOM] = useState(false)
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const [settings, setSettings] = FetchSettings.useGetSettings();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowFileAttachment, setAllowFileAttachment] = useState(false)
  const [maxFileSize, setMaxFileSize] = useState(1024)
  const [maxFilesAttached, setMaxFilesAttached] = useState(3)
  const { store } = useContext(Context);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: number) => {
    FetchSettings.useRemoveDomains(removedTag)
    const newTags = tags.filter((tag) => tag.id !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let id = 0;
    for (let tag of tags) {
      id += 1;
      if (tag.domain.includes(inputValue)) {
        return setTags([...tags])
      }
    }
    FetchSettings.usePostDomain(inputValue)
    setTags([...tags, {id: id, domain: inputValue}]);
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = (tagId: number) => {
    const newTags = [...tags];
    newTags[editInputIndex].domain = editInputValue;
    FetchSettings.usePutDomain(tagId, editInputValue)
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
    window.location.reload();
  };

  const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
    borderRadius: 2,
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
    borderRadius: 2,
  };

  useEffect(() => {
    setLoadedDOM(true);
  }, [tags]);

  useEffect(() => {
    if (settings[0]) {
      setAllowFileAttachment(settings[0].allow_file_attachment)
      setMaxFileSize(settings[0].max_file_size)
      setMaxFilesAttached(settings[0].max_files_attached)
      setIsAnonymous(settings[0].anonymous_status)
      store.isAllowFileAttachment = settings[0].allow_file_attachment;
      store.isAnonymous = settings[0].anonymous_status
    }
  }, [settings]);

  const changeAllowFileAttachment = (bool: boolean) => {
    settings[0] && FetchSettings.usePutSettings(1, bool, maxFileSize, maxFilesAttached, isAnonymous)
    setAllowFileAttachment(bool)
    store.isAllowFileAttachment = bool;
  }

  const changeAnonymousStatus = (bool: boolean) => {
    settings[0] && FetchSettings.usePutSettings(1, allowFileAttachment, maxFileSize, maxFilesAttached, bool)
    setIsAnonymous(bool)
  }

  const changeMaxFileSize = (num: number) => {
    console.log(num)
    settings[0] && FetchSettings.usePutSettings(1, allowFileAttachment, num, maxFilesAttached, isAnonymous)
    setMaxFileSize(num)
  }

  const chaneMaxFilesAttached = (num: number) => {
    settings[0] && FetchSettings.usePutSettings(1, allowFileAttachment, maxFileSize, num, isAnonymous)
    setMaxFilesAttached(num)
  }

  return (
    <>
      {loadedDOM && (
        <div className={styles.container}>
          <Slider/>
          <div className={styles.content}>
            <Header user_name={Cookies.get('user_name')} organization={Cookies.get('organization')} department={Cookies.get('department')}/>
            <Tabs />
            <MainText text={'Настройки'}/>
            <div className={styles.settingsContainer}>
              <Col className={styles.column}>
                <div className={styles.row}>
                  <p className={styles.rowText}>Почта</p>
                  <Space size={[0, 8]} wrap className={styles.tag}>
                    {tags.map((tag, index) => {
                      if (editInputIndex === index) {
                        return (
                          <Input
                            ref={editInputRef}
                            key={tag.id}
                            size="small"
                            style={tagInputStyle}
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={() => handleEditInputConfirm(tag.id)}
                            onPressEnter={() => handleEditInputConfirm(tag.id)}
                          />
                        );
                      }
                      const isLongTag = editInputValue.length > 20;
                      const tagElem = (
                        <Tag
                          key={tag.id}
                          closable={index >= 0}
                          style={{ userSelect: 'none' }}
                          onClose={() => handleClose(tag.id)}
                        >
                        <span
                          onDoubleClick={(e) => {
                            setEditInputIndex(index);
                            setEditInputValue(tag.domain);
                            e.preventDefault();
                          }}
                        >
                          {isLongTag ? `${tag.domain.slice(0, 20)}...` : tag.domain}
                        </span>
                        </Tag>
                      );
                      return isLongTag ? (
                        <Tooltip title={tag.domain} key={tag.id}>
                          {tagElem}
                        </Tooltip>
                      ) : (
                        tagElem
                      );
                    })}
                    {inputVisible ? (
                      <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                      />
                    ) : (
                      <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                        Добавить домен
                      </Tag>
                    )}
                  </Space>
                </div>
              </Col>
              {settings[0] && (
                  <div className={styles.switchContainer}>
                    <SwitchBar
                        checkboxText={'Анонимные инициативы'}
                        hintText={'Возможность изменять поле Ф. И. О. при создании инициативы'}
                        isChecked={settings[0].anonymous_status}
                        onChangeSwitch={changeAnonymousStatus}
                    />
                    <SwitchBar
                        checkboxText={'Прикладывание файлов'}
                        hintText={'Возможность прикладывать файлы при создании инициативы'}
                        isChecked={settings[0].allow_file_attachment}
                        layout={allowFileAttachment && <SwitchContent maxFileSize={settings[0].max_file_size} maxFilesAttached={settings[0].max_files_attached} onChangeSize={changeMaxFileSize} onChangeCount={chaneMaxFilesAttached}/>}
                        onChangeSwitch={changeAllowFileAttachment}
                    />
                  </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/Settings.module.scss";
import { Col, Space, Tag, theme, Tooltip, InputNumber, Input } from "antd";
import React, {useContext, useEffect, useRef, useState} from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import SwitchBar from "../FilterComponents/blocks/SwitchBar";
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import FetchSettings from "../../hooks/FetchData/FetchSettings/FetchSettings";
import Cookies from "js-cookie";
import * as domain from "domain";
import {SettingsRespone} from "../../models/response/SettingsRespone";
import {Context} from "../../pages/_app";

function SwitchContent({maxFilesSize, maxFilesAttached}: any) {
  const { store } = useContext(Context);
  const handleChangeAttached = (e: any) => {
    store.maxFilesAttached = e;
  }

  const handleMaxSize = (e: any) => {
    store.maxFilesAttached = e;
  }

  return <div className={styles.contentSwitch}>
    <div className={styles.switchRow}>
      <p className={styles.textSwitch}>Максимальное число загружаемых файлов</p>
      <InputNumber className={'inputNumber'} min={0} max={7} defaultValue={maxFilesAttached} onChange={handleChangeAttached}/>
    </div>
    <div className={`${styles.switchRow} ${styles.text}`}>
      <p className={styles.textSwitch}>Максимальный размер файла</p>
      <InputNumber className={'inputNumber'} min={0} max={5000} defaultValue={maxFilesSize} onChange={handleMaxSize}/>
    </div>
  </div>;
}


export const Settings = () => {
  const { store } = useContext(Context);
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
  const [anonymous, setAnonymous] = useState<boolean>()
  const [maxFileSize, setMaxFileSize] = useState<number>()
  const [maxFilesAttached, setMaxFilesAttached] = useState<number>();
  const [allowedFilesAttached, setAllowedFilesAttached] = useState<number>()
  const [allowFileAttachment, setAllowFileAttachment] = useState<boolean>()
  const [layout, setLayout] = useState<JSX.Element>(<div></div>)

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

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex].domain = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
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
    const settings = getSettings() as SettingsRespone;
    setAnonymous(settings.anonymous_status)
    setMaxFileSize(settings.max_file_size)
    setMaxFilesAttached(settings.max_files_attached)
    setAllowedFilesAttached(settings.allowed_files_attached)
    setAllowFileAttachment(settings.allow_file_attachment)
    setLayout(<SwitchContent maxFilesAttached={settings.max_files_attached} maxFilesSize={settings.max_file_size} />)
  }, [settings]);


  const getSettings = () => {
    return settings.length !== 0 ? settings.map((settings) => ({
      allow_file_attachment: settings.allow_file_attachment,
      max_file_size: settings.max_file_size,
      max_files_attached: settings.max_files_attached,
      allowed_files_attached: settings.allowed_files_attached,
      anonymous_status: settings.anonymous_status
    })) :
        {
          allow_file_attachment: false,
          max_file_size: 5000,
          max_files_attached: 7,
          allowed_files_attached: 7,
          anonymous_status: false,
        }
  }

  useEffect(() => {
    setAnonymous(store.isAnonymous)
    setAllowFileAttachment(store.isFilesAttachment)
  }, [store.isAnonymous, store.isFilesAttachment]);

  useEffect(() => {
    setMaxFileSize(store.maxSizeFiles)
    setMaxFilesAttached(store.maxFilesAttached)
  }, [store.maxSizeFiles, store.maxFilesAttached]);

  useEffect(() => {
    FetchSettings.usePostSettings(anonymous, allowFileAttachment, maxFileSize, maxFilesAttached)
  }, [store.isAnonymous, store.isFilesAttachment, store.maxSizeFiles, store.maxFilesAttached]);

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
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
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
                            if (index !== 0) {
                              setEditInputIndex(index);
                              setEditInputValue(tag.domain);
                              e.preventDefault();
                            }
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

              <div className={styles.switchContainer}>
                <SwitchBar
                  checkboxText={'Анонимные инициативы'}
                  hintText={'Возможность изменять поле Ф. И. О. при создании инициативы'}
                  isChecked={anonymous}
                  type={'anon'}
                />
                <SwitchBar
                  checkboxText={'Прикладывание файлов'}
                  hintText={'Возможность прикладывать файлы при создании инициативы'}
                  isChecked={allowFileAttachment}
                  layout={layout}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

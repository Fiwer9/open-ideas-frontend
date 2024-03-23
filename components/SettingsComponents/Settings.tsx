import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/Settings.module.scss";
import type { InputRef } from "antd";
import { Col, Input, Space, Tag, theme, Tooltip } from "antd";
import React, { memo, useEffect, useRef, useState } from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import SwitchBar from "../FilterComponents/blocks/SwitchBar";
import { PlusOutlined } from "@ant-design/icons";
import FetchSettings from "../../hooks/fetches/FetchSettings/FetchSettings";
import SwitchContent from "../SwitchContent";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setDomains } from "../../redux/settingsSlice/slice";
import { fetchDomains } from "../../redux/settingsSlice/asyncActions";

export const Settings = memo(() => {
  const { token } = theme.useToken();
  const select = useSelector((state: RootState) => ({
    tags: state.settings.domains,
    settings: state.settings.settings[0],
  }));
  const dispatch = useAppDispatch();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const [loadedDOM, setLoadedDOM] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [allowFileAttachment, setAllowFileAttachment] = useState(false);
  const [maxFileSize, setMaxFileSize] = useState(1024);
  const [maxFilesAttached, setMaxFilesAttached] = useState(3);

  const fetchData = async () => {
    await dispatch(fetchDomains());
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: number) => {
    FetchSettings.useRemoveDomains(removedTag);
    const newTags = select.tags.filter((tag) => tag.id !== removedTag);
    dispatch(setDomains(newTags));
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let id = 0;
    for (let tag of select.tags) {
      id += 1;
      if (tag.domain.includes(inputValue)) {
        return dispatch(setDomains([...select.tags]));
      }
    }
    FetchSettings.usePostDomain(inputValue);
    dispatch(setDomains([...select.tags, { id: id, domain: inputValue }]));
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = (tagId: number) => {
    const newTags = [...select.tags];
    newTags[editInputIndex].domain = editInputValue;
    FetchSettings.usePutDomain(tagId, editInputValue);
    dispatch(setDomains(newTags));
    setEditInputIndex(-1);
    setEditInputValue("");
    window.location.reload();
  };

  const tagInputStyle: React.CSSProperties = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
    borderRadius: 2,
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
    borderRadius: 2,
  };

  useEffect(() => {
    setLoadedDOM(true);
  }, [select.tags]);

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
    <>
      {loadedDOM && (
        <div className={styles.container}>
          <Slider />
          <div className={styles.content}>
            <Header />
            <Tabs />
            <MainText text={"Настройки"} />
            <div className={styles.settingsContainer}>
              <Col className={styles.column}>
                <div className={styles.row}>
                  <p className={styles.rowText}>Почта</p>
                  <Space size={[0, 8]} wrap className={styles.tag}>
                    {select.tags.map((tag, index) => {
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
                          style={{ userSelect: "none" }}
                          onClose={() => handleClose(tag.id)}
                        >
                          <span
                            onDoubleClick={(e) => {
                              setEditInputIndex(index);
                              setEditInputValue(tag.domain);
                              e.preventDefault();
                            }}
                          >
                            {isLongTag
                              ? `${tag.domain.slice(0, 20)}...`
                              : tag.domain}
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
                      <Tag
                        style={tagPlusStyle}
                        icon={<PlusOutlined />}
                        onClick={showInput}
                      >
                        Добавить домен
                      </Tag>
                    )}
                  </Space>
                </div>
              </Col>
              <div className={styles.switchContainer}>
                <SwitchBar
                  checkboxText={"Анонимные инициативы"}
                  hintText={
                    "Возможность изменять поле Ф. И. О. при создании инициативы"
                  }
                  isChecked={select.settings?.anonymous_status}
                  onChangeSwitch={changeAnonymousStatus}
                />
                <SwitchBar
                  checkboxText={"Прикладывание файлов"}
                  hintText={
                    "Возможность прикладывать файлы при создании инициативы"
                  }
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
            </div>
          </div>
        </div>
      )}
    </>
  );
});

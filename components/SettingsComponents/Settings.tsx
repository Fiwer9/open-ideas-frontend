import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/Settings.module.scss";
import { Col, Space, Tag, theme, Tooltip, InputNumber, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import SwitchBar from "../FilterComponents/blocks/SwitchBar";
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';


function SwitchContent() {
  return <div className={styles.contentSwitch}>
    <div className={styles.switchRow}>
      <p className={styles.textSwitch}>Максимальное число загружаемых файлов</p>
      <InputNumber className={'inputNumber'} min={0} defaultValue={1} />
    </div>
    <div className={`${styles.switchRow} ${styles.text}`}>
      <p className={styles.textSwitch}>Максимальный размер файла</p>
      <InputNumber className={'inputNumber'} min={0} defaultValue={1024} />
    </div>
  </div>;
}


export const Settings = () => {
  const layout = <SwitchContent />

  const { token } = theme.useToken();
  const [tags, setTags] = useState(['mail.ru']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
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

  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
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
                          key={tag}
                          size="small"
                          style={tagInputStyle}
                          value={editInputValue}
                          onChange={handleEditInputChange}
                          onBlur={handleEditInputConfirm}
                          onPressEnter={handleEditInputConfirm}
                        />
                      );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag
                        key={tag}
                        closable={index >= 0}
                        style={{ userSelect: 'none' }}
                        onClose={() => handleClose(tag)}
                      >
                        <span
                          onDoubleClick={(e) => {
                            if (index !== 0) {
                              setEditInputIndex(index);
                              setEditInputValue(tag);
                              e.preventDefault();
                            }
                          }}
                        >
                          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={tag}>
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
              />
              <SwitchBar
                checkboxText={'Прикладывание файлов'}
                hintText={'Возможность прикладывать файлы при создании инициативы'}
                layout={layout}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

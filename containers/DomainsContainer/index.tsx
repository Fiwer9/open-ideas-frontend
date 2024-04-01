import styles from "./styles.module.scss";
import { Col, Input, type InputRef, Space, Tag, theme, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  deleteDomain,
  patchDomain,
  postDomain,
} from "../../redux/settingsSlice/asyncActions";
import { setDomains } from "../../redux/settingsSlice/slice";

const DomainsContainer = () => {
  const { token } = theme.useToken();
  const select = useSelector((state: RootState) => ({
    tags: state.settings.domains,
  }));
  const dispatch = useAppDispatch();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
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

  const handleClose = (removedTag: number) => {
    dispatch(deleteDomain({ id: removedTag }));
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
    dispatch(postDomain({ domain: inputValue }));
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = (tagId: number) => {
    dispatch(patchDomain({ domain: editInputValue, id: tagId }));
    setEditInputIndex(-1);
    setEditInputValue("");
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

  return (
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
  );
};

export default memo(DomainsContainer);

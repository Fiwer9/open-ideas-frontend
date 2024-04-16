import styles from "./styles.module.scss";
import { Col, Input, type InputRef, Space, Tag, theme, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { store, useAppDispatch } from "../../redux/store";
import {
  deleteDomain,
  patchDomain,
  postDomain,
} from "../../redux/settingsSlice/asyncActions";
import { setDomains } from "../../redux/settingsSlice/slice";
import { selectDomains } from "../../redux/settingsSlice/selectors";

const DomainsContainer = () => {
  const { token } = theme.useToken();
  const tags = useSelector(selectDomains);
  const dispatch = useAppDispatch();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const callbacks = {
    handleEditInputConfirm: useCallback(
      (tagId: number) => {
        dispatch(patchDomain({ domain: editInputValue, id: tagId }));
        setEditInputIndex(-1);
        setEditInputValue("");
      },
      [editInputValue, store],
    ),
    handleClose: useCallback(
      (removedTag: number) => {
        dispatch(deleteDomain({ id: removedTag }));
        const newTags = tags.filter((tag) => tag.id !== removedTag);
        dispatch(setDomains(newTags));
      },
      [tags, store],
    ),
    handleInputConfirm: useCallback(() => {
      let id = 0;
      for (let tag of tags) {
        id += 1;
        if (tag.domain.includes(inputValue)) {
          return dispatch(setDomains([...tags]));
        }
      }
      dispatch(postDomain({ domain: inputValue }));
      setInputVisible(false);
      setInputValue("");
    }, [inputValue, tags]),
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
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
                  onBlur={() => callbacks.handleEditInputConfirm(tag.id)}
                  onPressEnter={() => callbacks.handleEditInputConfirm(tag.id)}
                />
              );
            }
            const isLongTag = editInputValue.length > 20;
            const tagElem = (
              <Tag
                key={tag.id}
                closable={index >= 0}
                style={{ userSelect: "none" }}
                onClose={() => callbacks.handleClose(tag.id)}
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
              onBlur={callbacks.handleInputConfirm}
              onPressEnter={callbacks.handleInputConfirm}
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

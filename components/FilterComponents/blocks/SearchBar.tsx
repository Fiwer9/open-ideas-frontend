import React from "react";
import { Input } from "antd";
import styles from '../styles/SerachBar.module.scss'

const SearchBar = ({ onSearchTermChange, onSearchNumberChange } : any) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputNumber}>
        <Input
          placeholder={"Номер"}
          onChange={(event) => onSearchNumberChange(event.target.value)}
        />
      </div>
      <div className={styles.inputSearch}>
        <Input
          placeholder={"Поиск по идеям"}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";
import { Input } from "antd";
import styles from '../styles/SerachBar.module.scss'

const SearchBar = ({ onSearchTermChange, onSearchNumberChange, placeholderNum, placeholderQuery } : any) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputNumber}>
        <Input
          placeholder={placeholderNum}
          onChange={(event) => onSearchNumberChange(event.target.value)}
        />
      </div>
      <div className={styles.inputSearch}>
        <Input
          placeholder={placeholderQuery}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

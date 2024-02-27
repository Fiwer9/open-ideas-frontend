import React from "react";
import { Input } from "antd";
import styles from '../styles/SerachBar.module.scss'

interface SearchBarProps {
  onSearchTermChange?: any,
  onSearchNumberChange?: any,
  placeholderNum?: string,
  placeholderQuery?: string,
  stylesSearch?: any,
}

const SearchBar = ({ onSearchTermChange, onSearchNumberChange, placeholderNum, placeholderQuery, stylesSearch } : SearchBarProps) => {
  return (
    <div className={`${styles.inputContainer} ${stylesSearch}`}>
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

import React, { memo, useCallback, useState } from "react";
import { Input } from "antd";
import styles from "../styles/SerachBar.module.scss";
import { useAppDispatch } from "../../../redux/store";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../../redux/filterSlice/slice";

interface SearchBarProps {
  onSearchNumberChange: (value: string) => void;
  placeholderNum: string;
  placeholderQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = memo(
  ({ onSearchNumberChange, placeholderNum, placeholderQuery }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");

    const updateSearchValue = useCallback(
      debounce((str) => {
        dispatch(setSearchValue(str));
      }, 1000),
      []
    );

    const onSearchTermChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setValue(evt.target.value);
      updateSearchValue(evt.target.value);
    };

    return (
      <div className={styles.inputContainer}>
        <div className={styles.inputNumber}>
          <Input
            placeholder={placeholderNum}
            onChange={(event) => onSearchNumberChange(event.target.value)}
          />
        </div>
        <div className={styles.inputSearch}>
          <Input placeholder={placeholderQuery} onChange={onSearchTermChange} />
        </div>
      </div>
    );
  }
);

export default SearchBar;

import React, { memo, useCallback } from "react";
import { Input } from "antd";
import styles from "../styles/SerachBar.module.scss";
import { useAppDispatch } from "../../../redux/store";
import debounce from "lodash.debounce";
import { setSearchValue } from "../../../redux/filterSlice/slice";

interface SearchBarProps {
  placeholderNum: string;
  placeholderQuery: string;
	stylesSearch?: any,
}

const SearchBar: React.FC<SearchBarProps> = memo(
  ({ placeholderNum, placeholderQuery, stylesSearch }) => {
    const dispatch = useAppDispatch();

    const updateSearchValue = useCallback(
      debounce((str) => {
        dispatch(setSearchValue(str));
      }, 1000),
      []
    );

    const onSearchTermChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchValue(evt.target.value);
    };

    return (
			<div className={`${styles.inputContainer} ${stylesSearch}`}>
        <div className={styles.inputNumber}>
          <Input placeholder={placeholderNum} onChange={onSearchTermChange} />
        </div>
        <div className={styles.inputSearch}>
          <Input placeholder={placeholderQuery} onChange={onSearchTermChange} />
        </div>
      </div>
    );
  }
);

export default SearchBar;

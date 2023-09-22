import React from "react";
import styles from "./styles/index.module.scss";
import SearchBar from "./blocks/SearchBar";
import FilterBar from "./blocks/FilterBar";

export const Filter = ({onSearchTermChange, onSearchNumberChange, onToggleArchive}: any) => {
  return (
    <div className={styles.infContainer}>
      <SearchBar onSearchTermChange={onSearchTermChange} onSearchNumberChange={onSearchNumberChange} />
      <FilterBar onToggleArchive={onToggleArchive} />
    </div>
  )
}

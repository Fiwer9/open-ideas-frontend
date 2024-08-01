import React, { memo, useState } from "react";
import { Button, DatePicker, TimeRangePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

import styles from "../styles/Filter.module.scss";
import {QueriesResponse} from "../../../models/response/QueriesResponse";
import {filterAnalytics, getAnalyticsForGraphic} from "../../../utils/getAnalytics";
import {useAppDispatch} from "../../../redux/store";
import {setFilter, setQueries} from "../../../redux/queriesSlice/slice";

const dateFormatList = ["DD.MM.YYYY", "DD.MM.YY", "DD-MM-YYYY", "DD-MM-YY"];

interface FilterProps {
	queries: QueriesResponse[];
  onChange?: (start: string, end: string) => void;
  selectedDateStart?: string;
  selectedDateEnd?: string;
}

const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Последние 7 дней", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Последние 28 дней", value: [dayjs().add(-28, "d"), dayjs()] },
  { label: "Последние 90 дней", value: [dayjs().add(-90, "d"), dayjs()] },
  { label: "Последние 365 дней", value: [dayjs().add(-365, "d"), dayjs()] },
  { label: "Всё время", value: [dayjs().add(-1825, "d"), dayjs()] },
];

function ContentDate() {
  return (
    <div className={styles.contentDate}>
      <p className={styles.period}>
        Продолжительность выбранного периода: 30 дней
      </p>
      <div className={styles.btnContainer}>
        <Button type="link" className={styles.btnDate}>
          ОТМЕНА
        </Button>
        <Button type="link" className={styles.btnDate}>
          ВЫБРАТЬ
        </Button>
      </div>
    </div>
  );
}

const Filter: React.FC<FilterProps> = memo(({ queries }) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const dispatch = useAppDispatch();
  
  return (
    <div className={styles.filter}>
      <div className={styles.container}>
        <div className={styles.dropdownTitle}>
          <span className={styles.span}>С 1 янв. 2023 г. по сегодняш..</span>
          <div className={styles.dropdown}>
            <span className={styles.textDropdown}>С момента публикации</span>
            <img
              src={"./img/triangle.svg"}
              width={15}
              height={10}
              alt=""
              onClick={() => setIsOpenFilter(!isOpenFilter)}
              className={
                isOpenFilter ? styles.triangleOpen : styles.triangleClose
              }
            ></img>
          </div>
        </div>
        {isOpenFilter ? (
          <RangePicker
            presets={rangePresets}
            renderExtraFooter={() => ContentDate()}
            className={styles.rangePicker}
            defaultValue={[
              dayjs("01.01.2023", dateFormatList[0]),
              dayjs("15.04.2023", dateFormatList[0]),
            ]}
						onChange={(value) => { if (value !== null) {
              dispatch(setFilter({
                startDate: dayjs(value[0]).format('YYYY-MM-DD'),
                endDate: dayjs(value[1]).format('YYYY-MM-DD')
              }))
              dispatch(setQueries(
                filterAnalytics(dayjs(value[0]).format('YYYY-MM-DD'),
                  dayjs(value[1]).format('YYYY-MM-DD'), queries)
              ))
            }
            }}
            // && console.log(
            //   getAnalyticsForGraphic(
            //     filterAnalytics(dayjs(value[0]).format('YYYY-MM-DD'), dayjs(value[1]).format('YYYY-MM-DD'), queries), dayjs(value[0]).format('YYYY-MM-DD'),  dayjs(value[1]).format('YYYY-MM-DD')))}}
						// 	// ? console.log(filterAnalytics(dayjs(value[0]).format('YYYY-MM-DD'), dayjs(value[1]).format('YYYY-MM-DD'), queries))
						// 	// : console.log(value)}}
            format={dateFormatList}
          />
        ) : null}
      </div>
    </div>
  );
});

export default Filter;

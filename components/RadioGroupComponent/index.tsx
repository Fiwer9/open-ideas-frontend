import {Radio, RadioChangeEvent} from "antd";
import React, {memo, useCallback} from "react";
import styles from "./styles.module.scss";
import {AssigmentSettings} from "../../redux/settingsSlice/types";

interface RadioGroupProps {
	onChangeDistribution: (e: RadioChangeEvent) => void;
	distribValue: AssigmentSettings;
}

const RadioGroup : React.FC<RadioGroupProps> = ({ onChangeDistribution, distribValue }) =>
	(
		<div style={{marginTop: "30px", display: "flex", flexDirection: "column", gap: "10px"}}>
			<p className={styles.textOption}>Распределение по:</p>
			<Radio.Group
				onChange={useCallback((e) => {
					onChangeDistribution(e)
				}, [])}
				value={distribValue}
				style={{display: "flex", flexDirection: "row"}}
				defaultValue={distribValue}
			>
				<Radio value={AssigmentSettings.DIRECTION}>Направлению инициатив</Radio>
				<Radio value={AssigmentSettings.DEPARTMENT}>Отделу инициатора</Radio>
			</Radio.Group>
		</div>
	);
export default memo(RadioGroup);
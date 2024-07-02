import React from "react";
import { Charts } from "../../components/AnalyticsComponents/Charts";
import {useCheckStaff} from "../../hooks/useCheckStaff";

export default function Index() {
	const isStaff = useCheckStaff();

	return <div>{isStaff && <Charts />}</div>;
}

import React from "react";
import {ApplicationCard} from "./ApplicationCard";


export const ExpertApplicationCard = ({queryId}: { queryId: string }) => {
    return (
        <ApplicationCard queryId={queryId} user_status={'expert'}/>
    );
};

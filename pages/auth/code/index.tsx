import React from "react";
// @ts-ignore
import {CodeConfirmation} from "../../../components/AuthComponents/CodeConfirmation";
import {useRouter} from "next/router";

export default function Index() {
    const router = useRouter();
    const { email } = router.query;
    let emailCurrent = Array.isArray(email) ? email[0] : email;
    emailCurrent = emailCurrent || "";
    return (
        <div>
            <CodeConfirmation email={emailCurrent} />
        </div>
    )
}

import React from "react";

import Cookies from "js-cookie";

import { QueryList } from "../../components/QueryComponents/QueryList";

export default function Index() {
  Cookies.remove("queryId");
  Cookies.remove("queryName");
  return <QueryList />;
}

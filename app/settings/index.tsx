import React, { memo, useEffect } from "react";
import { MainText } from "../../components/MainTextComponent";
import { useAppDispatch } from "../../redux/store";
import { fetchDomains } from "../../redux/settingsSlice/asyncActions";
import AdminPageLayout from "../../components/AdminPageLayout";
import DomainsContainer from "../../containers/DomainsContainer";
import { Flex } from "antd";
import SettingsContainer from "../../containers/SettingsContainer";

const Settings = () => {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await dispatch(fetchDomains());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AdminPageLayout>
        <MainText text={"Настройки"} />
        <Flex justify={"space-between"}>
          <DomainsContainer />
          <SettingsContainer />
        </Flex>
      </AdminPageLayout>
    </>
  );
};

export default memo(Settings);

import {DomainsResponse} from "../../../models/response/DomainsResponse";
import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {fetchData} from "../../../utils/utils";
import DomainsService from "../../../services/DomainsService";
import {SettingsRespone} from "../../../models/response/SettingsRespone";
import {Context} from "../../../pages/_app";
import SettingsService from "../../../services/SettingsService";

export default class FetchSettings {

  static useGetDomains(): [DomainsResponse[], Dispatch<SetStateAction<DomainsResponse[]>>] {
    const [isLoading, setIsLoading] = useState(false);
    const [domains, setDomains] = useState<DomainsResponse[]>([])

    useEffect(() => {
      fetchData(setIsLoading, setDomains, DomainsService.getDomains)
    }, []);

    return [domains, setDomains]
  }

  static useRemoveDomains(id: number): void {
    DomainsService.deleteDomain(id)
  }

  static usePostDomain(domain: string) {
    return DomainsService.postDomain(domain);
  }

  static useGetSettings(): [SettingsRespone[], Dispatch<SetStateAction<SettingsRespone[]>>] {
    const { store } = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<SettingsRespone[]>([])

    useEffect(() => {
      fetchData(setIsLoading, setSettings, store.getSettings)
    }, []);

    return [settings, setSettings]
  }

  static usePostSettings(anonymous_status?: boolean, allow_file_attachment?: boolean, max_file_size?: number, max_files_attached?: number) {
    return SettingsService.postSettings(allow_file_attachment, max_file_size, max_files_attached, anonymous_status)
  }
}

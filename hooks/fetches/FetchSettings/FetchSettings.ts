import { DomainsResponse } from "../../../models/response/DomainsResponse";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchData } from "../../../utils/utils";
import DomainsService from "../../../services/DomainsService";
import { SettingsResponse } from "../../../models/response/SettingsResponse";
import SettingsService from "../../../services/SettingsSetvice";

export default class FetchSettings {
  static useGetDomains(): [
    DomainsResponse[],
    Dispatch<SetStateAction<DomainsResponse[]>>
  ] {
    const [isLoading, setIsLoading] = useState(false);
    const [domains, setDomains] = useState<DomainsResponse[]>([]);

    useEffect(() => {
      fetchData(setIsLoading, setDomains, DomainsService.getDomains);
    }, []);

    return [domains, setDomains];
  }

  static useRemoveDomains(id: number): void {
    DomainsService.deleteDomain(id);
  }

  static usePostDomain(domain: string) {
    return DomainsService.postDomain(domain);
  }

  static usePutDomain(id: number, domain: string) {
    return DomainsService.putDomain(id, domain);
  }

  static useGetSettings(): [
    SettingsResponse[],
    Dispatch<SetStateAction<SettingsResponse[]>>
  ] {
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState<SettingsResponse[]>([]);

    useEffect(() => {
      // fetchData(setIsLoading, setSettings, store.getSettings)
    }, []);

    return [settings, setSettings];
  }

  static usePutSettings(
    id: number,
    allow_file_attachment: boolean,
    max_file_size: number,
    max_files_attached: number,
    anonymous_status: boolean
  ) {
    return SettingsService.putSettings(
      id,
      allow_file_attachment,
      max_file_size,
      max_files_attached,
      anonymous_status
    );
  }
}

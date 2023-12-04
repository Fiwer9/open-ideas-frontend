import {DomainsResponse} from "../../../models/response/DomainsResponse";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {fetchData} from "../../../utils/utils";
import DomainsService from "../../../services/DomainsService";

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
}

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {fetchData} from "../../../utils/utils";
import {OrganizationsResponse} from "../../../models/response/OrganizationsResponse";
import OrganizationsService from "../../../services/OrganizationsService";


export default class FetchOrganizations {
  static useGetOrganizations() {
    const [isLoading, setIsLoading] = useState(false)
    const [oranizations, setOranizations] = useState<OrganizationsResponse[]>([])
    useEffect(() => {
      fetchData(setIsLoading, setOranizations, OrganizationsService.getOrganizations)
    }, []);

    return [oranizations, setOranizations] as [OrganizationsResponse[], Dispatch<SetStateAction<OrganizationsResponse[]>>]
  }

  static useGetOrganizationsById(id: number) {
    const [isLoading, setIsLoading] = useState(false)
    const [organization, setOrganization] = useState<OrganizationsResponse>({
      id: 0,
      name: ''
    })
    useEffect(() => {
      fetchData(setIsLoading, setOrganization, OrganizationsService.getOrganizationsById, id)
    }, []);

    return [organization, setOrganization] as [OrganizationsResponse, Dispatch<SetStateAction<OrganizationsResponse>>]
  }
}

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {fetchData} from "../../../utils/utils";
import {QueriesResponse} from "../../../models/response/QueriesResponse";
import QueriesService from "../../../services/QueriesService";

export default class FetchQueries {
  static useGetQueries = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [queries, setQueries] = useState<QueriesResponse[]>([])
    useEffect(() => {
      fetchData(setIsLoading, setQueries, QueriesService.getQueriesTableData)
    }, []);

    return [queries, setQueries] as [QueriesResponse[], Dispatch<SetStateAction<QueriesResponse[]>>]
  }

  static useGetQueriesById = (id: string | undefined) => {
    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState<QueriesResponse>({
      name: '',
      initiator_users: [0],
      implementation_effect: '',
      initiative_direction: 0,
      organization: 0,
      expert_users: [],
      status: '',
      description: '',
      date: '',
      id: 0
      })
    useEffect(() => {
      fetchData(setIsLoading, setQuery, QueriesService.getQueriesTableDataById, id)
    }, []);

    return [query, setQuery] as [QueriesResponse, Dispatch<SetStateAction<QueriesResponse>>]
  }
}


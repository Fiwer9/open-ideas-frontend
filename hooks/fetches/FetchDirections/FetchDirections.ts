import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {DirectionResponse} from "../../../models/response/DirectionResponse";
import {fetchData} from "../../../utils/utils";
import DirectionsService from "../../../services/DirectionsService";


export default class FetchDirections {
  static useGetDirections() {
    const [isLoading, setIsLoading] = useState(false)
    const [directions, setDirections] = useState<DirectionResponse[]>([])
    useEffect(() => {
      fetchData(setIsLoading, setDirections, DirectionsService.getDirections)
    }, []);

    return [directions, setDirections] as [DirectionResponse[], Dispatch<SetStateAction<DirectionResponse[]>>]
  }
}

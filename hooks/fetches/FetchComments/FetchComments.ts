import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {fetchData} from "../../../utils/utils";
import {CommentResponse} from "../../../models/response/CommentResponse";
import CommentService from "../../../services/CommentService";


export default class FetchComments {
  static useGetComments() {
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState<CommentResponse[]>([])
    useEffect(() => {
      fetchData(setIsLoading, setComments, CommentService.getComments)
    }, []);

    return [comments, setComments] as [CommentResponse[], Dispatch<SetStateAction<CommentResponse[]>>]
  }
}

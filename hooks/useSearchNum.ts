import {useEffect} from "react";
import {QueriesResponse} from "../models/response/QueriesResponse";

export const useSearchNum = (searchNum: any, lisOfQuery: QueriesResponse[], getData: any, setIsLoading: any, setData: any) => {

  useEffect(() => {
    const filterNumber = async (searchNum: any, listOfQuery: QueriesResponse[], getData: any) => {
      if (!searchNum) {
        const data = await getData()
        return data.data;
      } else {
        return listOfQuery.filter(({id}) =>
          id.toString().includes(searchNum.toString())
        );
      }
    };


    setIsLoading(true)
    const debounce = setTimeout(async () => {
      const filteredQuery = filterNumber(searchNum, lisOfQuery, getData)
      setData(await filteredQuery);
      setIsLoading(false);
    }, 300)


    return () => clearTimeout(debounce);
  }, [searchNum]);
};

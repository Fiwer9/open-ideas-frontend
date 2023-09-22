import {useEffect} from "react";
import {QueriesResponse} from "../models/response/QueriesResponse";

export const useSearchQuery = (searchNum: any, lisOfQuery: QueriesResponse[], getData: any, setIsLoading: any, setData: any) => {

  useEffect(() => {
    const filterQuery = async (searchText: any, listOfQuery: QueriesResponse[], getData: any) => {
      if (!searchText) {
        const data = await getData()
        return data.data;
      } else {
        return listOfQuery.filter(({ name }) =>
          name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    };


    setIsLoading(true)
    const debounce = setTimeout(async () => {
      const filteredQuery = filterQuery(searchNum, lisOfQuery, getData)
      setData(await filteredQuery);
      setIsLoading(false);
    }, 300)


    return () => clearTimeout(debounce);
  }, [searchNum]);
};

import React from "react";
import { useSearchParams } from "react-router-dom";

import { getAllManufactures } from "../../utils";
const AppContext = React.createContext({});

const store = {
  data: [],
  // activePage: 1,
};
export const Provider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = parseInt(searchParams.get("activepage")) || 1;
  console.log("searchParams", searchParams.get("activepage"));
  const [manufactures, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const setManufactures = (data) => {
    // setData(data);
    setData((prevData) => {
      return [...prevData, ...data];
    });
    setIsLoading(false);
  };
  // const getData = async (activePage) => {
  //   const data = await getAllManufactures(activePage);
  //   console.log("DAATA", data);
  //   setManufactures(data.Results);
  // };

  const getData = React.useCallback(
    (activePage: number) => {
      setIsLoading(true);
      getAllManufactures(activePage).then((data) => {
        setManufactures(data.Results);
      });
    },

    []
  );

  React.useEffect(() => {
    getData(parseInt(activePage));
  }, [activePage]);

  console.log("GLOBAL --- STORE ----", manufactures);
  return (
    <AppContext.Provider
      value={{
        setManufactures,
        getData,
        activePage,
        manufactures,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

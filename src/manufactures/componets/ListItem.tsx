import React from "react";
import { memo } from "react";

import { useSearchParams } from "react-router-dom";

import AppContext from "./ManufacturesContext";

const ListItem = (props: {
  title: string;
  isLast: boolean;
  isFirst: boolean;
  data: any;
}) => {
  const { manufactures, isLoading, getData, activePage } =
    React.useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  // const activePage = searchParams.get("activepage");
  const observer = React.useRef<any>();
  const lastItemRef = React.useRef<any>();

  const { data, isLast } = props;

  // const lastManoufacturer = React.useCallback(
  //   (node) => {
  //     if (!node) return;
  //     if (isLoading) return;
  //     // if (observer.current) observer.current.disconect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         setSearchParams({ activepage: parseInt(activePage) + 1 });
  //         observer.current.disconect();
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isLoading, manufactures]
  // );
  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 1,
    };
    if (isLoading) return;
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        setSearchParams({ activepage: parseInt(activePage) + 1 });
        observer.current.disconnect();
      }
    };
    observer.current = new IntersectionObserver(callback, options);
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }
    return () => {
      observer.current.disconnect();
    };
  }, [isLoading]);

  const bg = isLast ? "red" : "#fff";
  return (
    <tr
      ref={isLast ? lastItemRef : null}
      style={{
        // minHeight: "50vh",
        // display: "flex",
        border: "1px solid #000",
        // fontSize: "2rem",
        backgroundColor: bg,
      }}
    >
      <td>{data.Mfr_ID}</td>
      <td>{data.Mfr_CommonName}</td>
      <td>{data.Country}</td>
      <td>
        <button>details</button>
      </td>
    </tr>
  );
};

export default memo(ListItem);

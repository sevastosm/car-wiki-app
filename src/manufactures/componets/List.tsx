import React from "react";
import { useSearchParams } from "react-router-dom";

import ListItem from "./ListItem";
import AppContext from "./ManufacturesContext";

type Props = { data: any };

export default function List() {
  const { manufactures, isLoading, activePage } = React.useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  //   const observer = React.useRef<HTMLDivElement | any>(null);

  //   const lastManoufacturer = React.useCallback(
  //     (node) => {
  //       if (isLoading) return;
  //       if (observer.current) observer.current.disconect();
  //       observer.current = new IntersectionObserver((entries) => {
  //         if (entries[0].isIntersecting) {
  //           setSearchParams({ activepage: parseInt(activePage) + 1 });
  //         }
  //       });
  //       if (node) observer.current.observe(node);
  //     },
  //     [isLoading]
  //   );

  if (!manufactures) return null;
  return (
    <table
      style={{
        maxHeight: "50vh",
        // display: "flex",
        // fontSize: "2rem",
        textAlign: "left",
      }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>common name</th>
          <th>country</th>
          <th>details</th>
        </tr>
      </thead>
      <tbody>
        {manufactures.map((_, index) => {
          if (manufactures.length === index + 1) {
            return (
              <ListItem
                data={_}
                isLast={true}
                isFirst={index === 0}
                key={index + 1}
                title={`${index + 1}`}
              />
            );
          } else {
            return (
              <ListItem
                data={_}
                isLast={false}
                isFirst={index === 0}
                key={index + 1}
                title={`${index + 1}`}
              />
            );
          }
        })}
      </tbody>
    </table>
  );
}

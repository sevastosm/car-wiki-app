import React from "react";
import { Provider } from "./ManufacturesContext";
import List from "./List";

export default function Manufactures() {
  return (
    <Provider>
      <List />
    </Provider>
  );
}

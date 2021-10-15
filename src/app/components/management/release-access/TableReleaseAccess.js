import React from "react";

import { TableEmploye } from "./componentsTableReleaseAccess/TableEmploye";
import { TableAdm } from "./componentsTableReleaseAccess/TableAdm";

function TableManagement() {
  return (
    <div>
      <TableEmploye />
      <TableAdm />
    </div>
  );
}

export default TableManagement;

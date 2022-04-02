import React from "react";

import { TableRow, TableCell, Skeleton } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const SkeletonBarang = () => {
  return (
    <TableRow
      sx={{
        "&:nth-of-type(odd)": {
          backgroundColor: "#fafafa",
        },
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <TableCell align="center">
        <Skeleton
          variant="text"
          width={16}
          height={28}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </TableCell>

      <TableCell component="th" scope="row">
        <Skeleton variant="text" width={185} height={28} />
      </TableCell>

      <TableCell>
        <Skeleton variant="text" width={140} height={28} />
      </TableCell>

      <TableCell align="center">
        <Skeleton
          variant="text"
          width={180}
          height={28}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </TableCell>

      <TableCell align="center">
        <Skeleton
          variant="text"
          width={130}
          height={28}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </TableCell>

      <TableCell align="center">
        <Skeleton
          variant="text"
          width={80}
          height={28}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </TableCell>
    </TableRow>
  );
};

export default SkeletonBarang;

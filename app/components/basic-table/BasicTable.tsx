"use client";
import s from "./BasicTable.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AddLeaveBar } from "../add-leave/AddLeaveBar";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import EnhancedTable from "./TestTable";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import { SimpleSchemaTypes } from "@datocms/cma-client-browser";
import { Loading } from "../loading/Loading";
import { useContext } from "react";
import { LeaveContext } from "@/lib/LeaveContext";

export interface LeaveDataProps {
  id: any;
  leaveName?: string | null | undefined;
  numberOfDays?: any;
}

export const BasicTable = () => {
  const { allLeave, totalDays, deleteLeave } = useContext(LeaveContext);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<readonly any[]>([]);

  // console.log(allLeave);
  // console.log(totalDays);

  const handleClick = (
    event: React.MouseEvent<unknown>,
    id: number,
    trip: any
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      // adds to array
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDelete = async () => {
    let itemsTemp: SimpleSchemaTypes.ItemData[] = [];
    // map over selected items and bring them into the format Dato is expecting
    selected.map((item: SimpleSchemaTypes.ItemBulkDestroyJobSchema) => {
      itemsTemp.push({ type: "item", id: `${item}` });
    });
    deleteLeave(itemsTemp);

    // remove "selected" text and bin icon
    setSelected([]);
  };

  if (!allLeave || allLeave.length === 0) return <Loading />;

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const numSelected = selected.length;

  return (
    <div className={s.BasicTable}>
      <h1>Leave taken</h1>
      <Toolbar>
        {numSelected > 0 && <div>{numSelected} selected</div>}
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <TableContainer>
        <Table className={s.table} aria-label="simple table">
          <TableHead className={s.tableHead}>
            <TableRow>
              <TableCell>Trip</TableCell>
              <TableCell align="right">Leave days taken</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={s.tableBody}>
            {allLeave.map((trip: any, index: number) => {
              const isItemSelected = isSelected(trip.id);

              return (
                <TableRow
                  className={`${s.tableRow} ${selected && s.selected}`}
                  key={trip.id}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                  onClick={(event) => {
                    handleClick(event, trip.id, trip);
                  }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className={s.tableCellFirst}
                    component="th"
                    scope="row"
                  >
                    {trip.leave_name}
                  </TableCell>
                  <TableCell className={s.tableCellLast} align="right">
                    {trip.number_of_days}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className={s.tableHead}>
              <TableCell>Total:</TableCell>
              <TableCell align="right">{totalDays}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={s.btnContainer}>
        <IconButton
          className={s.openButton}
          onClick={() => {
            setOpen(!open);
          }}
          size="large"
          color="primary"
        >
          <Add />
        </IconButton>
      </div>
      {open && <AddLeaveBar />}
    </div>
  );
};

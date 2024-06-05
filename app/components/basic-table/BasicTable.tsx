"use client";
import s from "./BasicTable.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { totalDaysTaken } from "../stats-component/StatsComponent";
import { AddLeaveBar } from "../add-leave/AddLeaveBar";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import EnhancedTable from "./TestTable";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import { buildClient } from "@datocms/cma-client-browser";
import { SimpleSchemaTypes } from "@datocms/cma-client-browser";
import CircularProgress from "@mui/material/CircularProgress";
import { Loading } from "../loading/Loading";

export interface LeaveDataProps {
  id: any;
  leaveName?: string | null | undefined;
  numberOfDays?: any;
}

export function BasicTable() {
  const [itemsToDisplay, setItemsToDisplay] = useState<LeaveDataProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<readonly any[]>([]);
  const client = buildClient({
    apiToken: `${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
  });
  // this works
  const getAllLeaveRecords = async () => {
    console.log("get all leave");
    const records = await client.items.list();
    console.log(records);
    setItemsToDisplay(records);
  };

  useEffect(() => {
    // populate table once on first render
    getAllLeaveRecords();
  }, []);

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
    const itemsToDelete = selected.map(
      (item: SimpleSchemaTypes.ItemBulkDestroyJobSchema) => {
        itemsTemp.push({ type: "item", id: `${item}` });
      }
    );
    const result = await client.items.bulkDestroy({
      items: itemsTemp,
    });
    // remove "selected" text and bin icon
    setSelected([]);
    // refresh table by getting updated records
    getAllLeaveRecords();
  };

  if (!itemsToDisplay || itemsToDisplay.length === 0) return <Loading />;

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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={s.tableHead}>
            <TableRow>
              <TableCell>Trip</TableCell>
              <TableCell align="right">Leave days taken</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={s.tableBody}>
            {itemsToDisplay.map((trip: any, index: number) => {
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
              <TableCell align="right">
                {totalDaysTaken(itemsToDisplay)}
              </TableCell>
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
      {open && <AddLeaveBar getAllLeaveRecords={getAllLeaveRecords} />}
    </div>
  );
}

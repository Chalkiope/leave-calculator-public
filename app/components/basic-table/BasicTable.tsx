"use client"
import s from './Table.module.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { leave } from '@/lib/leave' 
import { totalDaysTaken } from '../stats-component/StatsComponent';


export default function BasicTable() {
  return (
    <TableContainer component={Paper} className={s.BasicTable}>
      <Table aria-label="simple table">
        <TableHead className={s.tableHead}>
          <TableRow>
            <TableCell>Trip</TableCell>
            <TableCell align="right">Leave days taken</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leave.map((trip) => (
            <TableRow
              key={trip.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {trip.name}
              </TableCell>
              <TableCell align="right">{trip.days}</TableCell>
            </TableRow>
          ))}
          <TableRow className={s.tableHead}>
            <TableCell>Total:</TableCell>
            <TableCell align="right">{totalDaysTaken()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
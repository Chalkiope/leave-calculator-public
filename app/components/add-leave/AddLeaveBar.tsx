"use client";
import s from "./AddLeaveBar.module.scss";
import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { AddCircle, Loop } from "@mui/icons-material";
import { LeaveContext } from "@/lib/LeaveContext";

export const AddLeaveBar = () => {
  const { allLeave, addLeave } = useContext(LeaveContext);
  const [newLeaveName, setNewLeaveName] = useState<string>("");
  const [newLeaveDays, setNewLeaveDays] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      addLeave(newLeaveName, newLeaveDays);
    } catch (error) {
      console.log(error);
    } finally {
      setNewLeaveDays(0);
      setNewLeaveName("");
      setIsLoading(false);
    }
  };

  return (
    <div className={s.addLeaveWrapper}>
      <div className={s.addForm}>
        <TextField
          InputLabelProps={{ shrink: true }}
          size="small"
          className={`${s.field} ${s.nameInput}`}
          name="name"
          label="Trip"
          type="text"
          value={newLeaveName}
          onChange={(e) => setNewLeaveName(e.target.value)}
          required
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          size="small"
          className={`${s.field} ${s.daysInput}`}
          name="days"
          label="No. of days"
          type="number"
          value={newLeaveDays}
          onChange={(e) => setNewLeaveDays(Number(e.target.value))}
          required
        />
        <Button
          className={s.addButton}
          variant="contained"
          onClick={onSubmit}
          disabled={isLoading}
          endIcon={isLoading ? <Loop /> : <AddCircle />}
        >
          {isLoading ? "Loading..." : "Add Leave"}
        </Button>
      </div>
    </div>
  );
};

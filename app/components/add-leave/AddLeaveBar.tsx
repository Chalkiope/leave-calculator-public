"use client";
import s from "./AddLeaveBar.module.scss";
import { buildClient } from "@datocms/cma-client-browser";
import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { AddCircle, Loop } from "@mui/icons-material";
import Paper from "@mui/material/Paper";

export const AddLeaveBar = ({
  getAllLeaveRecords,
}: {
  getAllLeaveRecords: () => void;
}) => {
  const [newLeaveName, setNewLeaveName] = useState<string>("");
  const [newLeaveDays, setNewLeaveDays] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const client = buildClient({
    apiToken: `${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const record = await client.items.create({
        item_type: { id: "U0WtEVLcSbGOmgIRiTbz8w", type: "item_type" },
        leave_name: newLeaveName,
        number_of_days: newLeaveDays,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewLeaveDays("");
      setNewLeaveName("");
      setIsLoading(false);
      getAllLeaveRecords();
    }
  };

  return (
    <Paper elevation={1}>
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
            onChange={(e) => setNewLeaveDays(e.target.value)}
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
    </Paper>
  );
};

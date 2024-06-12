"use client";
import { createContext, useEffect, useState } from "react";
import { SimpleSchemaTypes, buildClient } from "@datocms/cma-client-browser";

export const LeaveContext = createContext<{
  allLeave: SimpleSchemaTypes.Item[];
  getAllLeaveRecords: () => void;
  addLeave: (leaveName: string, days: number | null) => void;
  deleteLeave: (items: SimpleSchemaTypes.ItemData[]) => void;
  totalDays: number | null;
}>({
  allLeave: [],
  getAllLeaveRecords: () => {},
  addLeave() {},
  deleteLeave() {},
  totalDays: 0,
});

export default function LeaveContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allLeave, setAllLeave] = useState<SimpleSchemaTypes.Item[]>([]);
  const [totalDays, setTotalDays] = useState<number | null>(null);

  const client = buildClient({
    apiToken: `${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
  });

  const getAllLeaveRecords = async () => {
    const data = await client.items.list({
      filter: {
        type: "leave_table",
      },
    });
    setAllLeave(data);
    totalDaysTaken(data);
  };

  const addLeave = async (leaveName: string, days: number | null) => {
    const record = await client.items.create({
      item_type: { id: "U0WtEVLcSbGOmgIRiTbz8w", type: "item_type" },
      leave_name: leaveName,
      number_of_days: days,
    });
    getAllLeaveRecords();
  };

  const deleteLeave = async (items: SimpleSchemaTypes.ItemData[]) => {
    const result = await client.items.bulkDestroy({
      items: items,
    });

    getAllLeaveRecords();
  };

  // calc total
  const totalDaysTaken = (data: SimpleSchemaTypes.Item[]) => {
    console.log("calc total days");
    let days = 0;
    data.map((item: SimpleSchemaTypes.Item) => {
      console.log(item.number_of_days);
      days += item.number_of_days as number;
    });
    console.log(days);
    setTotalDays(days);
  };

  useEffect(() => {
    getAllLeaveRecords();
  }, []);

  useEffect(() => {
    totalDaysTaken(allLeave);
  }, [allLeave]);

  return (
    <LeaveContext.Provider
      value={{
        allLeave,
        getAllLeaveRecords,
        addLeave,
        deleteLeave,
        totalDays,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
}

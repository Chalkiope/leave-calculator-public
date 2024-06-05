import { LeaveDocument, LeaveQuery } from "@/src/graphql/generated/graphql";
import { getClient } from "@/src/serverClient";

const client = getClient();

export const getAllLeave = async () => {
  const data = await client.query<LeaveQuery>({
    query: LeaveDocument,
  });
  console.log(data.data.allLeaveTables);
  return data.data.allLeaveTables;
};

// export const deleteLeave = async (id:number) => {

// }

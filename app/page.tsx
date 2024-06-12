import s from "./page.module.css";
import { BasicTable } from "./components/basic-table/BasicTable";
import { StatsComponent } from "./components/stats-component/StatsComponent";
import { LeaveDocument, LeaveQuery } from "@/src/graphql/generated/graphql";
import { getClient } from "@/src/serverClient";
import LeaveContextProvider from "@/lib/LeaveContext";

export default async function Home() {
  const client = getClient();
  const data = await client.query<LeaveQuery>({
    query: LeaveDocument,
  });

  return (
    <LeaveContextProvider>
      <main className={s.main}>
        <BasicTable />
        <StatsComponent data={data.data.allLeaveTables} />
      </main>
    </LeaveContextProvider>
  );
}

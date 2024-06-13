import s from "./page.module.scss";
import { BasicTable } from "./components/basic-table/BasicTable";
import { StatsComponent } from "./components/stats-component/StatsComponent";
import { LeaveDocument, LeaveQuery } from "@/src/graphql/generated/graphql";
import { getClient } from "@/src/serverClient";
import LeaveContextProvider from "@/lib/LeaveContext";
import moment from "moment";

export default async function Home() {
  const client = getClient();
  const data = await client.query<LeaveQuery>({
    query: LeaveDocument,
  });

  const now = moment().format("dddd, Do MMMM YYYY");

  return (
    <LeaveContextProvider>
      <header className={s.header}>
        <div className={s.headerInner}>
          <h1>Leave Dashboard</h1>
          <p>Today is {now}</p>
        </div>
      </header>
      <main className={s.main}>
        <BasicTable />
        <StatsComponent data={data.data.allLeaveTables} />
      </main>
    </LeaveContextProvider>
  );
}

import s from "./page.module.scss";
import { BasicTable } from "./components/basic-table/BasicTable";
import { StatsComponent } from "./components/stats-component/StatsComponent";
import LeaveContextProvider from "@/lib/LeaveContext";
import moment from "moment";

export default function Home() {
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
        <StatsComponent />
      </main>
    </LeaveContextProvider>
  );
}

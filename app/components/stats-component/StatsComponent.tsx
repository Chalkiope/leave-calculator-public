"use client";
import { useContext, useState } from "react";
import s from "./StatsComponent.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { LeaveContext } from "@/lib/LeaveContext";

export const StatsComponent = () => {
  const { allLeave, totalDays } = useContext(LeaveContext);
  const hoursTaken = totalDays * 8;

  const startDate = moment([2020, 10, 13]);
  const [futureDate, setFutureDate] = useState<any>(null);
  const today = moment();

  const daysPassed = today.diff(startDate, "days");
  const hoursPassed = daysPassed * 8;
  // get no. of accumulated leave days for no. of workdays
  // 20 / 365 = 0.0547945205479452 >> leave days accumulated per calender day
  const accuFactor = 0.0547945205479452;
  const accumLeaveDays = Math.round(daysPassed * accuFactor);
  const accumLeaveHours = Math.floor(hoursPassed * accuFactor);

  //subtract leave days already taken
  const remainingLeaveDays = accumLeaveDays - totalDays;
  const remainingLeaveHours = Math.floor(accumLeaveHours - hoursTaken);

  const remainingFutureLeave = () => {
    const futureDaysPassed = futureDate.diff(startDate, "days");
    const futureHoursPassed = futureDaysPassed * 8;
    const accumFutureLeaveDays = Math.round(futureDaysPassed * accuFactor);
    const accumFutureLeaveHours = futureHoursPassed * accuFactor;
    const remainingFutureLeaveDays = accumFutureLeaveDays - totalDays;
    const remainingFutureLeaveHours = Math.floor(
      accumFutureLeaveHours - hoursTaken
    );

    return [remainingFutureLeaveDays, remainingFutureLeaveHours];
  };

  return (
    <div className={s.statsComponent}>
      <h1>Leave Stats</h1>

      <div className={s.innerContainer}>
        <div className={`${s.container} ${s.leaveAcc}`}>
          <h2>
            Leave accumulated<span>*since Nov 13, 2020</span>
          </h2>
          <div className={s.counter}>
            {accumLeaveDays} Days / {accumLeaveHours} Hours
          </div>
        </div>
        <div className={`${s.container} ${s.leaveTaken}`}>
          <h2>
            Leave taken<span>*since Nov 13, 2020</span>
          </h2>
          <div className={s.counter}>
            {totalDays} Days / {hoursTaken} Hours
          </div>
        </div>
        <div className={`${s.container} ${s.leaveAvailToday}`}>
          <h2>Leave available today</h2>
          <div className={s.counter}>
            {remainingLeaveDays} Days / {remainingLeaveHours} Hours
          </div>
        </div>
        <div className={`${s.container} ${s.leaveAvailOn}`}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <h2>Leave available on: </h2>
            <DatePicker
              onChange={(value) => {
                setFutureDate(value);
              }}
            />
            <div className={s.counter}>
              {futureDate
                ? `${remainingFutureLeave()[0]} Days / ${
                    remainingFutureLeave()[1]
                  } Hours`
                : ""}
            </div>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

"use client";
import { useState } from "react";
import s from "./StatsComponent.module.scss";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { Moment } from "moment";
import { LeaveDataProps } from "../basic-table/BasicTable";

export const totalDaysTaken = (data: LeaveDataProps[]) => {
  let days = 0;
  data.map((trip: LeaveDataProps) => {
    days += trip.numberOfDays;
  });
  return days;
};

export const StatsComponent = ({ data }: { data: LeaveDataProps[] }) => {
  // console.log(data);

  // const totalDaysTaken = () => {
  //   let days = 0;
  //   data.map((trip: any) => {
  //     days += trip.numberOfDays;
  //   });
  //   return days;
  // };

  const hoursTaken = totalDaysTaken(data) * 8;

  const startDate = moment([2017, 10, 13]);
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
  const remainingLeaveDays = accumLeaveDays - totalDaysTaken(data);
  const remainingLeaveHours = Math.floor(accumLeaveHours - hoursTaken);

  const remainingFutureLeave = () => {
    const futureDaysPassed = futureDate.diff(startDate, "days");
    const futureHoursPassed = futureDaysPassed * 8;
    const accumFutureLeaveDays = Math.round(futureDaysPassed * accuFactor);
    const accumFutureLeaveHours = futureHoursPassed * accuFactor;
    const remainingFutureLeaveDays =
      accumFutureLeaveDays - totalDaysTaken(data);
    const remainingFutureLeaveHours = Math.floor(
      accumFutureLeaveHours - hoursTaken
    );

    return [remainingFutureLeaveDays, remainingFutureLeaveHours];
  };

  return (
    <div className={s.statsComponent}>
      <h1>Leave Stats</h1>
      <Paper elevation={1}>
        <div className={s.innerContainer}>
          <div className={s.container}>
            <h2>Leave accumulated since Nov 13, 2017</h2>
            <div>
              {accumLeaveDays} Days / {accumLeaveHours} Hours
            </div>
          </div>
          <div className={s.container}>
            <h2>Leave taken since Nov 13, 2017</h2>
            <div>
              {totalDaysTaken(data)} Days / {hoursTaken} Hours
            </div>
          </div>
          <div className={s.container}>
            <h2>Leave available today</h2>
            <div>
              {remainingLeaveDays} Days / {remainingLeaveHours} Hours
            </div>
          </div>
          <div className={s.container}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <h2>Leave available on: </h2>
              <DatePicker
                onChange={(value) => {
                  setFutureDate(value);
                }}
              />
              <div>
                {futureDate
                  ? `${remainingFutureLeave()[0]} Days / ${
                      remainingFutureLeave()[1]
                    } Hours`
                  : ""}
              </div>
            </LocalizationProvider>
          </div>
        </div>
      </Paper>
    </div>
  );
};

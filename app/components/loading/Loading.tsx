import CircularProgress from "@mui/material/CircularProgress";
import s from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={s.loadingSpinner}>
      <CircularProgress />
    </div>
  );
};

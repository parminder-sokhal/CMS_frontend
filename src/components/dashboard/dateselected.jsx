import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";

export default function Dateselected({ onDateChange }) {
  const [value, setValue] = React.useState([null, null]);

  const handleChange = (newValue) => {
    setValue(newValue);

    if (newValue[0] && newValue[1]) {
      const start = dayjs(newValue[0]).format("YYYY-MM-DD");
      const end = dayjs(newValue[1]).format("YYYY-MM-DD");
      if (onDateChange) {
        onDateChange(start, end);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          localeText={{ start: "Start date", end: "End date" }}
          value={value}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import { SlCalender } from "react-icons/sl";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker({
  customClass,
  startDate,
  setStartDate,
  toCaption,
  disableDateChange = false,
  clearAble = false,
  datePickerClassName= ""
}) {
  const currentYear = getYear(new Date());

  const years = range(currentYear - 10, currentYear + 11);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="datepicker-wrapper" onClick={onClick} ref={ref}>
      <input
        value={value}
        readOnly
        className="custom-input"
        placeholder="dd/MMM/yyyy hh:mm:ss aa"
        disabled={disableDateChange}
        style={
          disableDateChange
            ? { backgroundColor: "#e9ecef" }
            : { backgroundColor: "white" }
        }
      />
      <span className="calendar-icon">
        <SlCalender />
      </span>
    </div>
  ));

  const setDateValue = (value)=>{
    setStartDate(value)
  }

  // Custom Time Input component
  const CustomTimeInput = ({ date }) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const isPM = hours >= 12;

    // Convert 24h → 12h
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;

    const handleHourChange = (e) => {
      let newHour = parseInt(e.target.value, 10);
      if (isPM && newHour < 12) newHour += 12;
      if (!isPM && newHour === 12) newHour = 0;
      const newDate = new Date(date);
      newDate.setHours(newHour);
      setDateValue(newDate);
    };

    const handleMinuteChange = (e) => {
      const newDate = new Date(date);
      newDate.setMinutes(parseInt(e.target.value, 10));
      setDateValue(newDate);
    };

    const handleSecondChange = (e) => {
      const newDate = new Date(date);
      newDate.setSeconds(parseInt(e.target.value, 10));
      setDateValue(newDate);
    };

    const handleAmPmChange = (e) => {
      let newHour = displayHour;
      if (e.target.value === "PM" && newHour < 12) newHour += 12;
      if (e.target.value === "AM" && newHour === 12) newHour = 0;
      const newDate = new Date(date);
      newDate.setHours(newHour);
      setDateValue(newDate);
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "6px",
        }}
      >
        {/* Hour */}
        <select value={displayHour} onChange={handleHourChange}>
          {Array.from({ length: 12 }, (_, i) => {
            const val = i + 1;
            return (
              <option key={val} value={val}>
                {val.toString().padStart(2, "0")}
              </option>
            );
          })}
        </select>

        {/* AM/PM */}
        <select value={isPM ? "PM" : "AM"} onChange={handleAmPmChange}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>

        {/* Minute */}
        <select value={minutes} onChange={handleMinuteChange}>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>
              {i.toString().padStart(2, "0")}
            </option>
          ))}
        </select>

        {/* Second */}
        <select value={seconds} onChange={handleSecondChange}>
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i}>
              {i.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className={`datepicker-container ${customClass}`}>
      <DatePicker
        selected={startDate} // use prop value instead of internal state
        onChange={setStartDate} // update parent state        
        dateFormat="dd/MMM/yyyy hh:mm:ss aa"
        calendarClassName="custom-calendar"
        customInput={<CustomInput />}
        className={datePickerClassName}
        disabled={disableDateChange}
        isClearable={clearAble}
        showTimeInput
        customTimeInput={<CustomTimeInput />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-header">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="nav-button"
            >
              {"<"}
            </button>
            <select
              value={getMonth(date)}
              onChange={({ target: { value } }) => changeMonth(value)}
              className="dropdown"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
              className="dropdown"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="nav-button"
            >
              {">"}
            </button>
          </div>
        )}
      />
      <div className="custom-label">{toCaption || "Date"}</div>
    </div>
  );
}

const range = (start, end, step = 1) => {
  const output = [];
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

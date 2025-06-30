import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import { SlCalender } from "react-icons/sl";

export default function Datepicker({customClass,startDate,setStartDate,toCaption}) {
  const currentYear = getYear(new Date());

  const years = range(currentYear - 10, currentYear + 11);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="datepicker-wrapper" onClick={onClick} ref={ref}>
      <input
        value={value}
        readOnly
        className="custom-input"
        placeholder="Select Date"
      />
      <span className="calendar-icon"><SlCalender /></span> 
    </div>
  ));

  return (
    <div className={`datepicker-container ${customClass}`}>
      <DatePicker
        selected={startDate} // use prop value instead of internal state
        onChange={setStartDate} // update parent state
        todayButton="Today"
        dateFormat="dd/MMM/yyyy"
        calendarClassName="custom-calendar"
        customInput={<CustomInput />}
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
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="nav-button">
              {"<"}
            </button>
            <select
              value={getMonth(date)}
              onChange={({ target: { value } }) => changeMonth(value)}
              className="dropdown"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
              className="dropdown"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="nav-button">
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
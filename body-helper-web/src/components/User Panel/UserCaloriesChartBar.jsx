"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Chart } from "react-google-charts";
const UserCaloriesChartBar = ({ month, data }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (selectedMonth.length !== 0 && selectedYear.length !== 0) {
      const filterArrByMonth = data.filter(
        (obj) => obj.date.substring(5, 7) === selectedMonth
      );

      const filterArrByYear = filterArrByMonth.filter(
        (obj) => obj.date.substring(0, 4) === selectedYear
      );

      const resultArray = [];

      for (const obj of filterArrByYear) {
        const newArr = [obj.date, obj.total];

        resultArray.push(newArr);
      }
      setChartData(resultArray);
    }
  }, [selectedMonth, selectedYear]);
  const data1 = [
    [`Calorie chart for ${month}`, "Calories"],
    ["01-01-23", 1212],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
    ["01-01-23", 2012],
  ];

  const yearsArray = data.map((obj) => new Date(obj.date).getFullYear());
  const uniqueYears = [...new Set(yearsArray)];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const options = {
    chart: {
      title: "Daily calorie intake for selected month.",
      subtitle: "Monthly report.",
    },
  };
  return (
    <div>
      <div className="chart-selector-wrapper">
        <Form.Select onChange={(e) => setSelectedMonth(e.target.value)}>
          <option>Select Month</option>
          {months.map((month, index) => (
            <option key={month} value={`0${index + 1}`}>
              {month}
            </option>
          ))}
        </Form.Select>
        <Form.Select onChange={(e) => setSelectedYear(e.target.value)}>
          <option>Select Year</option>
          {uniqueYears.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </Form.Select>
      </div>
      <Chart
        chartType="Bar"
        width="100%"
        height="500px"
        data={chartData || []}
        options={options}
      />
    </div>
  );
};

export default UserCaloriesChartBar;

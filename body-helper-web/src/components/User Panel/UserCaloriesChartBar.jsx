"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { toast } from "react-toastify";
const UserCaloriesChartBar = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [chartData, setChartData] = useState([]);
  const [isDataFound, setIsDataFound] = useState(true);

  useEffect(() => {
    const configureDataForChart = (month, year) => {
      const filterArrByMonth = data.filter(
        (obj) => obj.date.substring(5, 7) === month
      );

      const filterArrByYear = filterArrByMonth.filter(
        (obj) => obj.date.substring(0, 4) === year
      );

      const resultArray = [
        [`Calorie chart for ${month} - ${year} `, "Calories"],
      ];

      for (const obj of filterArrByYear) {
        const newArr = [obj.date, Number(obj.total)];

        resultArray.push(newArr);
      }

      return resultArray;
    };
    setIsDataFound(true);
    if (selectedMonth.length !== 0 && selectedYear.length !== 0) {
      const chartData = configureDataForChart(selectedMonth, selectedYear);
      if (chartData.length <= 1) {
        setIsDataFound(false);
        toast.error("You have no information recorded for this period.");
      }

      setChartData(chartData);
    }
  }, [selectedMonth, selectedYear]);

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
            <option key={month} value={index < 9 ? `0${index + 1}` : index + 1}>
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
      {selectedMonth.length !== 0 && selectedYear.length !== 0 ? (
        isDataFound ? (
          <Chart
            chartType="Bar"
            width="100%"
            height="500px"
            data={chartData}
            options={options}
          />
        ) : (
          <p className="red italic">
            *You have no information recorded for this period
          </p>
        )
      ) : (
        <p className="italic red">
          *Select month and year to see a chart bar with your calorie balance
          for the selected period.
        </p>
      )}
    </div>
  );
};

export default UserCaloriesChartBar;

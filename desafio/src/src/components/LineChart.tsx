import { useTodoContext } from "../../context/todoContext";
import React from "react";
import Chart from "react-apexcharts";

const LineChart: React.FC = () => {
  const { tasksCount, columns } = useTodoContext();
  const series = [
    {
      name: "Tarefas",
      data: tasksCount,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: columns,
    },
  };

  return (
    <div className="line-chart">
      <Chart
        options={options}
        series={series}
        type="line"
        width={400}
        height={350}
      />
    </div>
  );
};

export default LineChart;

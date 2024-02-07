import React from "react";
import Chart from "react-apexcharts";
import { useTodoContext } from "../../context/todoContext"
export const PieChart: React.FC = () => {
  const {tasksCount,columns}=useTodoContext()
  
 
  const options: ApexCharts.ApexOptions = {
    labels:columns,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Chart options={options} series={tasksCount} type="pie" width="400" />
    </div>
  );
};

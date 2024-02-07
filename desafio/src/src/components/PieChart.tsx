import React from "react";
import Chart from "react-apexcharts";
import { useTodoContext } from "../../context/todoContext"
export const PieChart: React.FC = () => {
  const {tasksCount}=useTodoContext()
  
  console.log(tasksCount)
  const options: ApexCharts.ApexOptions = {
    labels: ["A Fazer", "Em progresso", "Finalizado"],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Chart options={options} series={tasksCount} type="pie" width="400" />
    </div>
  );
};

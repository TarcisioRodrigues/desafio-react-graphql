import React from "react";
import Chart from "react-apexcharts";

export const PieChart: React.FC = () => {
  const series: number[] = [44, 55, 13];
  const options: ApexCharts.ApexOptions = {
    labels: ["A Fazer", "Em progresso", "Finalizado"],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Chart options={options} series={series} type="pie" width="400" />
    </div>
  );
};

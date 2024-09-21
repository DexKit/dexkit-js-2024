'use client';
   
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<'pie'>;
  options: ChartOptions<'pie'>;
}

export default function PieChart({ data, options }: PieChartProps) {
  return <Pie data={data} options={options} />;
}
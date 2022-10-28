import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getColor } from '../../common/color';
import { Card } from '../AppLayout';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  labels: Array<string>,
  records: Array<number>
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export function BarChat({ labels, records }: Props) {

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Sales',
        data: records,
        backgroundColor: getColor()
      }
    ],
  };

  return (
    <Card className="p-3 h-bar md:h-bar lg:h-bar pc:h-bar pt:h-bar sm:h-bar">
      <Bar options={options} data={data} />
    </Card>
  );
}
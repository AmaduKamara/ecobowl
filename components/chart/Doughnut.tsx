import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Color } from '../../common/color';
import { Card } from '../AppLayout';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Total Complaint',
    },
  },
};

type Props = {
  labels: Array<string>,
  records: Array<number>
}

export function DoughnutChat({ labels, records }: Props) {

  const { backgroundColor } = Color(records && records.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Complaint',
        data: records,
        backgroundColor,
        borderWidth: 2,
      },
    ],
  };


  return (
    <Card className="p-5 h-doug md:h-doug lg:h-doug pc:h-doug pt:h-doug sm:h-doug">
      <Doughnut data={data} />
      </Card>
  );
}
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CPI_DATA } from '../../data/cpidata';
import { getChartMonthLabel } from '../../util/formulas';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getOptions = (
  startZeroBasedMonth: number,
  startYear: number,
) => {
  return {
    maintainAspectRatio: true,
    responsive: true,
    color: '#FFFFFF',
    borderColor: '#FFFF00',
    pointRadius: '0',
    elements: {
      line: {
        borderColor: '#FFFF00'
      }
    },
    scales: {
      y: {
        grid: {
          color: '#999999',
        },
        ticks: {
          color: 'white',
          fontSize: 14,
          callback: function (value: number | string, _index: number, _ticks: any[]) {
            const numVal = typeof value === 'string' ? parseFloat(value) : value;
            return '$' + numVal.toFixed(2);
          }
        }
      },
      x: {
        grid: {
          color: '#999999',
        },
        ticks: {
          color: 'white',
          fontSize: 18,
          callback: function (_value: number | string, index: number, _ticks: any[]) {
            return getChartMonthLabel(((index + startZeroBasedMonth) % 12), startYear + Math.floor((index + startZeroBasedMonth) / 12));
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  }
};

const generateLabelArray = (
  startYear: any,
  startZeroBasedMonth: number,
  endYear: any,
  endZeroBasedMonth: number
): string[] => {
  const labelArray: string[] = [];
  const startYearNum = parseInt(startYear);
  const endYearNum = parseInt(endYear);
  for (let i = startYearNum; i <= endYearNum; i += 1) {
    for (let j = 0; j <= 11; j += 1) {
      if (i === startYear && j < startZeroBasedMonth) {
        continue;
      } else if (j === endYear && j > endZeroBasedMonth) {
        break;
      }
      labelArray.push(getChartMonthLabel(j, i));
    }
  }
  return labelArray;
}

const mapCpiData = (initialCpi: number, startYear: string | number, startZeroBasedMonth: number, endYear: string | number, endZeroBasedMonth: number) => {
  console.log(`mapCpiData : ${initialCpi}, ${startYear}, ${startZeroBasedMonth}, ${endYear}, ${endZeroBasedMonth}`)

  let startYearNum: number;
  let endYearNum: number;
  if (typeof startYear !== 'number') {
    startYearNum = parseInt(startYear);
  } else {
    startYearNum = startYear;
  }
  if (typeof endYear !== 'number') {
    endYearNum = parseInt(endYear);
  } else {
    endYearNum = endYear;
  }

  const cpiData: number[] = [];
  for (let i = startYearNum; i <= endYearNum; i += 1) {
    for (let j = 0; j <= 11; j += 1) {
      if (i === startYearNum && j < startZeroBasedMonth) {
        continue;
      } else if (j === endYearNum && j > endZeroBasedMonth) {
        break;
      }
      const cpiNow = (CPI_DATA[i.toString() as keyof typeof CPI_DATA] as number[])[j];
      cpiData.push(1 / (cpiNow / initialCpi));
    }
  }
  return cpiData;
}

export const getData = (labels: string[], cpiData: number[]) => {
  return {
    labels,
    datasets: [
      {
        label: 'Dollar Value',
        data: cpiData,
        borderColor: 'rgb(255,0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 1)',
      },
    ],
  }
};

const LossChart = ({
  startYear,
  startZeroBasedMonth,
  endYear,
  endZeroBasedMonth,
}: {
  startYear: number,
  startZeroBasedMonth: number,
  endYear: number,
  endZeroBasedMonth: number,
}) => {
  const labelArray = generateLabelArray(
    startYear,
    startZeroBasedMonth,
    endYear,
    endZeroBasedMonth,
  )
  const yearIndex = startYear.toString();
  const initialCpi = (CPI_DATA[yearIndex as keyof typeof CPI_DATA] as number[])[startZeroBasedMonth];
  const cpiData = mapCpiData(initialCpi, startYear, startZeroBasedMonth, endYear, endZeroBasedMonth)
  const data = getData(labelArray, cpiData);
  const options = getOptions(startZeroBasedMonth, startYear);
  let chartWidth = '100%';

  return <Line
    style={{
      width: chartWidth,
      height: '100%',
    }}
    options={options}
    data={data}
  />;
}

export default LossChart;
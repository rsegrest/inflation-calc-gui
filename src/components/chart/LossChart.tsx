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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getOptions = () => {
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
      yAxes: {
        grid: {
          color: '#999999',
        },
        ticks: {
          color: 'white',
          fontSize: 14,
        }
      },
      xAxes: {
        grid: {
          color: '#999999',
        },
        ticks: {
          color: 'white',
          fontSize: 18,
        }
      }
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
      if (j === 0) {
        labelArray.push(`Jan ${i}`);
      } else {
        labelArray.push((j + 1).toString())
      }
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
        borderColor: 'rgb(0,255, 0)',
        // fillColor: 'rgb(0,255,0, 128)',
        backgroundColor: 'rgba(32, 255, 32, 1)',
      },
    ],
  }
};

const LossChart = ({
  startYear,
  endYear,
  startZeroBasedMonth,
  endZeroBasedMonth,
}: {
  startYear: number,
  endYear: number,
  startZeroBasedMonth: number,
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
  const options = getOptions();
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
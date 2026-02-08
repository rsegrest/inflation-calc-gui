import LossChart from './LossChart.tsx';

import { COLORS } from '../constants/colors.ts';
const InflationChart = (props: {
    width: number,
    startYear: number,
    startZeroBasedMonth: number,
    endYear: number,
    endZeroBasedMonth: number,
    startingAmount: number,
    nowDollars: number,
    lostValue: number,
    thenDollars: number,
    timePeriodInMonths: number,
}) => {
    const { width, startYear, startZeroBasedMonth, endYear, endZeroBasedMonth } = props;
    let fontSize = '4rem';
    let height = '10rem';
    if (width < 800) {
        fontSize = '1.2rem';
        height = '20rem';
    }
    return (
        <>
            <div
                className='mont-xbold chart-header'
                style={{
                    color: COLORS.VERMILLION,
                    fontSize,
                }}
            >Dollar Value Lost over Time</div>
            <div
                style={{
                    backgroundColor: COLORS.SLATE,
                    borderRadius: '1rem',
                    padding: '1rem',
                }}
            >
                <LossChart
                    startYear={startYear}
                    startZeroBasedMonth={startZeroBasedMonth}
                    endYear={endYear}
                    endZeroBasedMonth={endZeroBasedMonth} />
            </div>
        </>
    )
}
export default InflationChart;


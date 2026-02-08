import LossChart from './LossChart.tsx';
// import Row from 'react-bootstrap/Row';
// import DeviceDetector from '../../util/DeviceDetector';

import { COLORS } from '../constants/colors.ts';
const InflationChart = ({
    width,
    startYear,
    endYear,
    startZeroBasedMonth,
    endZeroBasedMonth,
    // startingAmount,
    // nowDollars,
    // lostValue,
}: {
    width: number,
    startYear: number,
    endYear: number,
    startZeroBasedMonth: number,
    endZeroBasedMonth: number,
    startingAmount: number,
    nowDollars: number,
    lostValue: number,
}) => {
    // const deviceType = DeviceDetector();

    let fontSize = '4rem';
    let height = '10rem';
    if (width < 800) {
        fontSize = '1.2rem';
        height = '20rem';
    }
    return (
        <div
            className='mont-xbold chart-header'
            style={{
                border: '1px solid pink',
                color: COLORS.SAFFRON,
                margin: 'auto',
                height: '100%',
                display: 'block',
                // fontSize,
                // fontSize: fontSize,
                // height,
                // width: '100%',
            }}
        > Dollar Value Lost over Time</div >
    )
}
export default InflationChart;

/* 
 // <div
        //     style={{
        //         textAlign: 'center',
        //         border: '1px solid chartreuse',
        //         width: '100%',
        //     }}
        // >
        {/* <div
                style={{
                    margin: 'auto',
                    width: '80%',
                    height,
                }}
            > 

<LossChart
    startYear={startYear}
    endYear={endYear}
    startZeroBasedMonth={startZeroBasedMonth}
    endZeroBasedMonth={endZeroBasedMonth} />
// </div>

// )*/

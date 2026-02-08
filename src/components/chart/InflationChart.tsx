import LossChart from './LossChart.tsx';
import Row from 'react-bootstrap/Row';
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
        <Row
            style={{
                textAlign: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    margin: 'auto',
                    width: '80rem',
                    height,
                }}
            >
                <div
                    className='mont-xbold'
                    style={{
                        // fontSize,
                        fontSize: fontSize,
                        color: COLORS.SAFFRON,
                        height,
                    }}
                >Dollar Value Lost over Time</div>
                <LossChart
                    startYear={startYear}
                    endYear={endYear}
                    startZeroBasedMonth={startZeroBasedMonth}
                    endZeroBasedMonth={endZeroBasedMonth}
                // width={width}
                // startingAmount={startingAmount}
                // nowDollars={nowDollars}
                // lostValue={lostValue}
                />
            </div>
        </Row>

    )
}
export default InflationChart;
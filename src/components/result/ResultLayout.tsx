// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import SpendingPower from './SpendingPower';
import LostValue from './LostValue';
import InflationRate from './InflationRate';
import { getNameOfMonth } from '../../util/formulas';
import DeviceDetector from '../../util/DeviceDetector';
import Button from 'react-bootstrap/esm/Button';
import { defaultButtonStyle } from '../constants/style';

// let centerTheBoxStyle = {
//     // marginLeft: 'auto',
//     // marginRight: 'auto',
//     // right: '0',
//     float: 'left',
//     textAlign: 'center',
//     verticalAlign: 'middle',
// } as React.CSSProperties;

// let middle51style = {
//     width: '51%',
//     margin: 'auto',
//     verticalAlign: 'middle',
// } as React.CSSProperties;

let centerBottomStyle = {
    float: 'left',
    textAlign: 'left',
    verticalAlign: 'bottom',

    // width: '15rem',
} as React.CSSProperties;

const ResultLayout = (props: {
    width?: number,
    nowDollars: number,
    thenDollars: number,
    startZeroBasedMonth: number,
    startYear: number,
    inflationRate: number,
    lostValue: number,
    timePeriodInMonths: number,
    // setNowDollars: (dollars: number) => void,
    // setThenDollars: (dollars: number) => void,
    setShowResult: (show: boolean) => void,
    setShowForm: (show: boolean) => void,
}) => {
    console.log('props', props);
    const {
        // width,
        nowDollars,
        thenDollars,
        startZeroBasedMonth,
        startYear,
        inflationRate,
        lostValue,
        timePeriodInMonths,
        // setNowDollars,
        // setThenDollars,
        setShowResult,
        setShowForm,
    } = props;
    const deviceType = DeviceDetector();
    if (deviceType === 'Mobile') {
        delete centerBottomStyle.width;
    }
    return (
        <div
            style={{
                border: '1px solid red',
                width: '100%',
                margin: 'auto',
                textAlign: 'center',
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
            }}
        >
            <div
                style={{
                    width: '100%',
                    border: '1px solid blue',
                    margin: 'auto',
                    // width: '100%',
                    height: '100%',
                }}
            >

                {/* <div
                    className='text-center'
                > */}
                <div
                // sm={1}
                >
                    {/* <a href="/">Home</a> */}
                    <Button
                        style={defaultButtonStyle}
                        onClick={() => {
                            setShowForm(true);
                            setShowResult(false);
                        }}
                    >New Calculation</Button>
                </div>
                <div
                    style={{
                        border: '1px solid green',
                        textAlign: 'center',
                        width: '100%',
                        // float: 'center',
                        // display: 'flex',
                        // justifyContent: 'space-between',
                        // alignItems: 'center',
                    }}
                >
                    {/* <div
                        // sm={4}
                        style={{
                            // float: 'left',
                            border: '1px solid purple',
                        }}
                    > */}
                    <SpendingPower
                        // width={width}
                        nowDollars={nowDollars}
                        thenDollars={thenDollars}
                        startZeroBasedMonth={startZeroBasedMonth}
                        startYear={startYear}
                    />
                    {/* </div> */}
                    {/* <div
                        // sm
                        // className='text-center'
                        style={centerBottomStyle as React.CSSProperties}
                    > */}
                    <InflationRate
                        // width={width}
                        inflationRate={inflationRate}
                        lostValue={lostValue}
                        startMonth={getNameOfMonth(startZeroBasedMonth)}
                        startYear={startYear}
                    />
                    {/* </div> */}
                    {/* <div
                        // sm={4}
                        // colSpan={2}
                        style={centerTheBoxStyle as React.CSSProperties}
                    > */}
                    <LostValue
                        // width={width}
                        lostValue={lostValue}
                        timePeriodInMonths={timePeriodInMonths}
                    />
                    {/* </div> */}
                </div>

            </div>
        </div >
    )
}

export default ResultLayout;
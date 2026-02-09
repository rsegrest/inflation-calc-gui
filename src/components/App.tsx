import * as React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { COLORS } from './constants/colors';
import InflationHeader from './InflationHeader';
import StartingAmountForm from './entry/StartingAmountForm';
import DeviceDetector from '../util/DeviceDetector';

import {
    getHistoricalCpi,
    adjustFigureWithInflation,
    calculateInflationRate,
    calculateTimespanMonths,
    calculateLossPercentage,
    getLatestDateWithData,
    getNameOfMonth,
} from '../util/formulas';
import { getRequestToApi } from '../apiInterface/connect';

// import InputHistoricalFigure from './entry/InputHistoricalFigure';
import InflationChart from './chart/InflationChart';

// import ResultLayout from './result/ResultLayout';
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/600-italic.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/700-italic.css";
import "@fontsource/montserrat/800.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SpendingPower from './result/SpendingPower';
import InflationRate from './result/InflationRate';
import LostValue from './result/LostValue';
import Button from 'react-bootstrap/esm/Button';

const calcCellDimensions = (deviceType: string) => {
    const { innerWidth: width, innerHeight: height } = window;
    let w = width;
    if (deviceType === 'Mobile') {
        w = width * .95;
    } else {
        w = width * .60;
    }
    return {
        width: w,
        height: height * .75
    };
}

const App = () => {

    const nowDate = new Date();
    const latestDateWithData = getLatestDateWithData(nowDate.getMonth(), nowDate.getFullYear());

    const [deviceType, setDeviceType] = React.useState(DeviceDetector());
    const [currentYear] = React.useState(latestDateWithData.year);
    const [currentZeroBasedMonth] = React.useState(latestDateWithData.month);
    const [startingAmount, setStartingAmount] = React.useState(1000);
    const [startZeroBasedMonth, setStartZeroBasedMonth] = React.useState(currentZeroBasedMonth);
    const [startYear, setStartYear] = React.useState((currentYear - 10));
    const [endZeroBasedMonth, setEndZeroBasedMonth] = React.useState((currentZeroBasedMonth));
    const [endYear, setEndYear] = React.useState(currentYear);

    const [historicalStartCpi, setHistoricalStartCpi] = React.useState(getHistoricalCpi(startYear, startZeroBasedMonth));
    const [historicalEndCpi, setHistoricalEndCpi] = React.useState(getHistoricalCpi(endYear, currentZeroBasedMonth));
    const initialNowDollars = adjustFigureWithInflation(startingAmount, historicalStartCpi, historicalEndCpi);

    const [nowDollars, setNowDollars] = React.useState(initialNowDollars);
    const [thenDollars, setThenDollars] = React.useState(startingAmount);
    const [inflationRate, setInflationRate] = React.useState(calculateInflationRate(historicalStartCpi, historicalEndCpi));

    const [showForm, setShowForm] = React.useState(true);
    const [showResult, setShowResult] = React.useState(false);

    const [timePeriodInMonths, setTimePeriodInMonths] = React.useState(calculateTimespanMonths(startYear, startZeroBasedMonth, endYear, endZeroBasedMonth));
    const [lostValue, setLostValue] = React.useState(calculateLossPercentage(historicalStartCpi, historicalEndCpi));

    const [useCurrentDate, setUseCurrentDate] = React.useState(true);

    React.useEffect(() => {
        setHistoricalStartCpi(getHistoricalCpi(startYear, startZeroBasedMonth));
        setHistoricalEndCpi(getHistoricalCpi(endYear, endZeroBasedMonth));

        // lostValue
        setLostValue(calculateLossPercentage(historicalStartCpi, historicalEndCpi));

        // nowDollars
        // thenDollars
        const newNowDollars = adjustFigureWithInflation(startingAmount, historicalStartCpi, historicalEndCpi);
        setNowDollars(newNowDollars);
        setThenDollars(startingAmount);

        // inflationRate
        setInflationRate(calculateInflationRate(historicalStartCpi, historicalEndCpi));

        // lossPercentage
        setLostValue(calculateLossPercentage(historicalStartCpi, historicalEndCpi));

        // timePeriodInMonths
        setTimePeriodInMonths(calculateTimespanMonths(startYear, startZeroBasedMonth, endYear, endZeroBasedMonth));


        // const deviceType = DeviceDetector();
        setDeviceType(DeviceDetector());

    }, [startingAmount, startYear, startZeroBasedMonth, endYear, endZeroBasedMonth, historicalStartCpi, historicalEndCpi])

    let width = calcCellDimensions(deviceType).width;

    let outerStyle: React.CSSProperties = {
        width: '50rem',
        backgroundColor: '#bed6dbff',
        border: '3px solid white',
        textAlign: 'center',
        margin: 'auto',
        borderRadius: '1rem',
        padding: '2rem',
    }
    if (deviceType === 'Mobile') {
        outerStyle = {
            width: '100%',
            backgroundColor: '#bed6dbff',
            border: '3px solid white',
            textAlign: 'center',
            margin: 'auto',
            borderRadius: '1rem',
            padding: '2rem',
        }
    }
    return (
        <div
            style={outerStyle}
        >
            {
                showForm ? (
                    <>
                        <InflationHeader
                            width={width}
                            deviceType={deviceType}
                            latestDateWithData={latestDateWithData}
                        />
                        <StartingAmountForm
                            width={width}
                            deviceType={deviceType}
                            currentYear={currentYear}
                            currentZeroBasedMonth={currentZeroBasedMonth}
                            startingAmount={startingAmount}
                            startZeroBasedMonth={startZeroBasedMonth}
                            endZeroBasedMonth={endZeroBasedMonth}
                            startYear={startYear}
                            endYear={endYear}
                            useCurrentDate={useCurrentDate}
                            setUseCurrentDate={setUseCurrentDate}
                            setStartingAmount={setStartingAmount}
                            setStartZeroBasedMonth={setStartZeroBasedMonth}
                            setEndZeroBasedMonth={setEndZeroBasedMonth}
                            setStartYear={setStartYear}
                            setEndYear={setEndYear}
                            setNowDollars={setNowDollars}
                            setThenDollars={setThenDollars}
                            setShowResult={setShowResult}
                            setShowForm={setShowForm}
                            getRequestToApi={getRequestToApi}
                        />
                    </>
                ) : null

            }
            {showResult ? (
                <>
                    <div
                        style={{
                            paddingBottom: '1rem',
                        }}
                    >
                        <Button
                            className='back-button'
                            // style={backButtonStyle}
                            // onMouseEnter={() => {
                            //     backButtonStyle = { ...defaultButtonStyle, backgroundColor: COLORS.FIRE, color: COLORS.SUNNY, cursor: 'pointer' }
                            // }}
                            // onMouseLeave={() => {
                            //     backButtonStyle = { ...defaultButtonStyle, backgroundColor: COLORS.FIRE, color: COLORS.SUNNY }
                            // }}
                            onClick={() => {
                                setShowForm(true);
                                setShowResult(false);
                            }}
                        >
                            {'New Date Range'}
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'top',
                            verticalAlign: 'top',
                        }}
                    >
                        <SpendingPower
                            nowDollars={nowDollars}
                            thenDollars={thenDollars}
                            startZeroBasedMonth={startZeroBasedMonth}
                            startYear={startYear}
                        />
                        <InflationRate
                            inflationRate={inflationRate}
                            lostValue={lostValue}
                            startMonth={getNameOfMonth(startZeroBasedMonth)}
                            startYear={startYear}
                        />
                        <LostValue
                            lostValue={lostValue}
                            timePeriodInMonths={timePeriodInMonths}
                        />
                    </div>
                    <InflationChart
                        width={width}
                        nowDollars={nowDollars}
                        thenDollars={thenDollars}
                        startZeroBasedMonth={startZeroBasedMonth}
                        startYear={startYear}
                        lostValue={lostValue}
                        timePeriodInMonths={timePeriodInMonths}
                        endZeroBasedMonth={endZeroBasedMonth}
                        endYear={endYear}
                        startingAmount={startingAmount}
                    />
                </>
            ) : (
                null
            )}
        </div>
    )
}

export default App;
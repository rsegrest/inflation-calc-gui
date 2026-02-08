import * as React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import InflationHeader from './InflationHeader';
import StartingAmountForm from './entry/StartingAmountForm';
import DeviceDetector from '../util/DeviceDetector';
import { COLORS } from './constants/colors';

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

import './App.css';
import SpendingPower from './result/SpendingPower';
import InflationRate from './result/InflationRate';
import LostValue from './result/LostValue';
import Button from 'react-bootstrap/esm/Button';
import { defaultButtonStyle } from './constants/style';

const calcCellDimensions = (deviceType: string) => {
    const { innerWidth: width, innerHeight: height } = window;
    let w = width;
    if (deviceType === 'Mobile') {
        w = width * .95;
    } else {
        w = width * .75;
    }
    return {
        width: w,
        height: height * .75
    };
}

const App = () => {

    const nowDate = new Date();
    let currentYear = nowDate.getFullYear();
    const latestDateWithData = getLatestDateWithData(nowDate.getMonth(), currentYear);
    currentYear = latestDateWithData.year;
    let currentZeroBasedMonth = latestDateWithData.month;

    const [deviceType, setDeviceType] = React.useState(DeviceDetector());

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
        // console.log(`deviceType : ${deviceType}`)

    }, [startingAmount, startYear, startZeroBasedMonth, endYear, endZeroBasedMonth, historicalStartCpi, historicalEndCpi])

    let width = calcCellDimensions(deviceType).width;

    return (
        <div
            style={{
                width,
                textAlign: 'center',
                margin: 'auto',
            }}
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
                            startingAmount={startingAmount}
                            setStartingAmount={setStartingAmount}
                            startZeroBasedMonth={startZeroBasedMonth}
                            setStartZeroBasedMonth={setStartZeroBasedMonth}
                            endZeroBasedMonth={endZeroBasedMonth}
                            setEndZeroBasedMonth={setEndZeroBasedMonth}
                            startYear={startYear}
                            setStartYear={setStartYear}
                            endYear={endYear}
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
                            style={defaultButtonStyle}
                            onClick={() => {
                                setShowForm(true);
                                setShowResult(false);
                            }}
                        >New Calculation</Button>
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
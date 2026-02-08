import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InflationHeader from './InflationHeader';
import StartingAmountForm from './entry/StartingAmountForm';
import DeviceDetector from '../util/DeviceDetector';
import {
    getHistoricalCpi,
    adjustFigureWithInflation,
    calculateInflationRate,
    calculateTimespanMonths,
    calculateLossPercentage,
    getLatestMonthWithData,
} from '../util/formulas';
import { getRequestToApi } from '../apiInterface/connect';

// import InputHistoricalFigure from './entry/InputHistoricalFigure';
import InflationChart from './chart/InflationChart';

import ResultLayout from './result/ResultLayout';
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/600-italic.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/700-italic.css";
import "@fontsource/montserrat/800.css";

import './App.css';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
const getChart = ({
    width,
    startYear,
    endYear,
    startZeroBasedMonth,
    endZeroBasedMonth,
    startingAmount,
    nowDollars,
    lostValue,
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
    const deviceType = DeviceDetector();
    if (deviceType === 'Mobile') {
        return null;
    }
    return (
        <InflationChart
            width={width}
            startYear={startYear}
            endYear={endYear}
            startZeroBasedMonth={startZeroBasedMonth}
            endZeroBasedMonth={endZeroBasedMonth}
            startingAmount={startingAmount}
            nowDollars={nowDollars}
            lostValue={lostValue}
        />
    )
}
// Move out
// const callApi = async (
//     {
//         startingAmount,
//         fromYear,
//         toYear,
//         fromMonth,
//         toMonth,
//     }: {
//         startingAmount: number,
//         fromYear: number,
//         toYear: number,
//         fromMonth: number,
//         toMonth: number,
//     }
// ) => {
//     const apiResponse: any = await getRequestToApi({ startingAmount, fromYear, toYear, fromMonth, toMonth });
//     console.log(apiResponse.data)
//     return apiResponse;
// }
// callApi();

const App = () => {

    const nowDate = new Date();
    let currentYear = nowDate.getFullYear();
    const lastestDataMonth = getLatestMonthWithData(nowDate.getMonth(), currentYear);
    currentYear = lastestDataMonth.latestYear;
    let currentZeroBasedMonth = lastestDataMonth.latestMonth;

    const [startingAmount, setStartingAmount] = React.useState(1000);
    const [startZeroBasedMonth, setStartZeroBasedMonth] = React.useState(currentZeroBasedMonth);
    const [startYear, setStartYear] = React.useState((currentYear - 10));
    const [endZeroBasedMonth] = React.useState((currentZeroBasedMonth));
    const [endYear] = React.useState(currentYear);

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


    }, [startingAmount, startYear, startZeroBasedMonth, endYear, endZeroBasedMonth, historicalStartCpi, historicalEndCpi])

    const { width } = getWindowDimensions();
    return (
        <Container
            style={{
                border: '1px solid red',
                width,
                textAlign: 'center',
            }}
        >
            {
                showForm ? (
                    <>
                        <InflationHeader
                            width={width}
                        />
                        <StartingAmountForm
                            width={width}
                            startingAmount={startingAmount}
                            setStartingAmount={setStartingAmount}
                            startZeroBasedMonth={startZeroBasedMonth}
                            setStartZeroBasedMonth={setStartZeroBasedMonth}
                            endZeroBasedMonth={endZeroBasedMonth}
                            startYear={startYear}
                            setStartYear={setStartYear}
                            endYear={endYear}
                            setNowDollars={setNowDollars}
                            setThenDollars={setThenDollars}
                            setShowResult={setShowResult}
                            setShowForm={setShowForm}
                            getRequestToApi={getRequestToApi}
                        />
                    </>
                ) : null

            }
            {
                showResult ? (
                    <Row
                        style={{
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                        }}
                    >
                        <Col>
                            <ResultLayout
                                width={width}
                                nowDollars={nowDollars}
                                thenDollars={thenDollars}
                                startZeroBasedMonth={startZeroBasedMonth}
                                startYear={startYear}
                                inflationRate={inflationRate}
                                lostValue={lostValue}
                                timePeriodInMonths={timePeriodInMonths}
                            // setNowDollars={setNowDollars}
                            // setThenDollars={setThenDollars}
                            // setStartZeroBasedMonth={setStartZeroBasedMonth}
                            // setStartYear={setStartYear}
                            // setInflationRate={setInflationRate}
                            // setLostValue={setLostValue}
                            // setTimePeriodInMonths={setTimePeriodInMonths}
                            // setShowForm={setShowForm}
                            // setShowResult={setShowResult}
                            />
                        </Col>
                    </Row>
                ) : null
            }
            {
                showResult ? getChart({
                    width,
                    startYear,
                    endYear,
                    startZeroBasedMonth,
                    endZeroBasedMonth,
                    startingAmount,
                    nowDollars,
                    lostValue,
                }) : null
            }
        </Container>
    )
}

export default App;
import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DeviceDetector from '../../util/DeviceDetector';
import { getNameOfMonth } from '../../util/formulas';
import {
    getHistoricalCpi,
    adjustFigureWithInflation,
} from '../../util/formulas';
import type ReturnData from '../../dataInterface/ReturnData.interface';
import {
    defaultInputStyle,
    defaultDropdownStyle,
    defaultFormLabelStyle,
    defaultButtonStyle,
} from '../constants/style';
import { COLORS } from '../constants/colors';
import {
    mobileInputStyle,
    mobileDropdownStyle,
} from '../constants/mobileStyle';

const stripSpecialCharacters = (str: any) => {
    if (str === null || str === undefined) return '';
    let newString = String(str).replace(/[$,]/g, '');
    return newString.replace(/\D/g, '');
}

const restoreSpecialCharacters = (str: any) => {
    if (typeof str === 'string') {
        const num = parseFloat(str.replace(/[$,]/g, ''));
        if (!isNaN(num)) return `$${num.toLocaleString()}`;
        return str;
    } else if (typeof str === 'number') {
        return `$${str.toLocaleString()}`;
    } else {
        return str;
    }
}

const getYearArray = (currentYear: number) => {
    const yearArray = [];
    for (let i = currentYear; i > 1913; i -= 1) {
        yearArray.push(i)
    }
    return yearArray;
}

const StartingAmountForm = (props: {
    width: number,
    startingAmount: number,
    setStartingAmount: (amount: number) => void,
    startZeroBasedMonth: number,
    setStartZeroBasedMonth: (month: number) => void,
    startYear: number,
    setStartYear: (year: number) => void,
    endYear: number,
    setEndYear: (year: number) => void,
    endZeroBasedMonth: number,
    setEndZeroBasedMonth: (month: number) => void,
    setNowDollars: (dollars: number) => void,
    setThenDollars: (dollars: number) => void,
    setShowResult: (show: boolean) => void,
    setShowForm: (show: boolean) => void,
    getRequestToApi: (data: { startingAmount: number, fromYear: number, toYear: number, fromMonth: number, toMonth: number }) => Promise<{ data: ReturnData }>,
}) => {
    const {
        width,
        startingAmount,
        setStartingAmount,
        startZeroBasedMonth,
        setStartZeroBasedMonth,
        startYear,
        setStartYear,
        endYear,
        setEndYear,
        endZeroBasedMonth,
        setEndZeroBasedMonth,
        setNowDollars,
        setThenDollars,
        setShowForm,
        getRequestToApi,
        setShowResult,
    } = props;

    const formCellStyle = {
        display: 'block',
        width: '100%',
    }

    const setMonthName = React.useState('month')[1];

    const deviceType = DeviceDetector();
    // console.log(`deviceType : ${deviceType}`)

    let inputStyle = defaultInputStyle;
    let dropdownStyle = defaultDropdownStyle;
    let formLabelStyle = defaultFormLabelStyle;

    if (deviceType === 'Mobile') {
        console.log(`MOBILE -- width is : ${width}`)
        inputStyle = mobileInputStyle;
        dropdownStyle = mobileDropdownStyle;
    }
    const amountFormControl = (
        <Form.Control
            style={{
                ...inputStyle,
            } as React.CSSProperties}
            className='mont-xbold'
            type="text"
            id="amountInput"
            value={startingAmount}
            onChange={(e) => {
                const newString = stripSpecialCharacters(e.target.value);
                if (typeof newString === 'undefined') {
                    if (!isNaN(parseInt(e.target.value))) {
                        const newStartingAmount = parseInt(e.target.value, 10);
                        const newStartCpi = getHistoricalCpi(startYear, startZeroBasedMonth);
                        const newEndCpi = getHistoricalCpi(endYear, endZeroBasedMonth);
                        const newInflatedFigure = adjustFigureWithInflation(newStartingAmount, newStartCpi, newEndCpi);
                        setStartingAmount(parseInt(e.target.value, 10));
                        setNowDollars(newInflatedFigure);
                        setThenDollars(newStartingAmount);
                    } else {
                        setStartingAmount(0);
                    }
                } else {
                    setStartingAmount(parseInt(newString, 10))
                }
            }}
            onFocus={() => { stripSpecialCharacters(startingAmount) }}
            onBlur={() => { restoreSpecialCharacters(startingAmount) }}
        >
        </Form.Control>
    );
    const selectStartMonthForm = (
        <Form.Select
            className='mont-xbold'
            id="startMonthInput"
            value={startZeroBasedMonth}
            onChange={
                (e) => {
                    setStartZeroBasedMonth(parseInt(e.target.value, 10));
                    const nameOfMonth = getNameOfMonth(parseInt(e.target.value, 10));
                    setMonthName(nameOfMonth);
                }}
            style={dropdownStyle}
        >
            <option value='0'>January</option>
            <option value='1'>February</option>
            <option value='2'>March</option>
            <option value='3'>April</option>
            <option value='4'>May</option>
            <option value='5'>June</option>
            <option value='6'>July</option>
            <option value='7'>August</option>
            <option value='8'>September</option>
            <option value='9'>October</option>
            <option value='10'>November</option>
            <option value='11'>December</option>
        </Form.Select>
    )
    const selectStartYearForm = (
        <Form.Select
            className='mont-xbold'
            id="YearInput"
            value={startYear}
            onChange={
                (e) => {
                    setStartYear(parseInt(e.target.value, 10));
                }}
            style={dropdownStyle}
        >
            {getYearArray(endYear).map((yr) => (
                <option value={yr} key={`year_${yr}`}>{yr}</option>
            ))}
        </Form.Select>
    )
    const selectEndMonthForm = (
        <Form.Select
            className='mont-xbold'
            id="startMonthInput"
            value={endZeroBasedMonth}
            onChange={
                (e) => {
                    setEndZeroBasedMonth(parseInt(e.target.value, 10));
                    const nameOfMonth = getNameOfMonth(parseInt(e.target.value, 10));
                    setMonthName(nameOfMonth);
                }}
            style={dropdownStyle}
        >
            <option value='0'>January</option>
            <option value='1'>February</option>
            <option value='2'>March</option>
            <option value='3'>April</option>
            <option value='4'>May</option>
            <option value='5'>June</option>
            <option value='6'>July</option>
            <option value='7'>August</option>
            <option value='8'>September</option>
            <option value='9'>October</option>
            <option value='10'>November</option>
            <option value='11'>December</option>
        </Form.Select>
    )
    const selectEndYearForm = (
        <Form.Select
            className='mont-xbold'
            id="YearInput"
            value={endYear}
            onChange={
                (e) => {
                    setEndYear(parseInt(e.target.value, 10));
                }}
            style={dropdownStyle}
        >
            {getYearArray(endYear).map((yr) => (
                <option value={yr} key={`year_${yr}`}>{yr}</option>
            ))}
        </Form.Select>
    )
    const enableEndDate = true;
    let dateColumnWidth = '100%';
    if (enableEndDate) {
        dateColumnWidth = '49%';
    }
    return (
        <div
            style={{
                border: '5px solid red',
                backgroundColor: COLORS.SUNNY,
                borderRadius: '10px',
                minWidth: '20rem',
                width: '60%',
                maxWidth: '80%',
                margin: 'auto',
                padding: '1rem',
            }}
        >
            <div style={{
                // border: '1px solid blue',
                margin: 'auto',
                width: dateColumnWidth,
            }}>
                <div
                    style={{
                        width: '100%',
                        display: 'block',
                    }}
                >
                    <FloatingLabel
                        className='mont-semibold'
                        style={formLabelStyle}
                        label="Starting Amount:"
                    >
                    </FloatingLabel>
                    <div style={formCellStyle}>
                        {amountFormControl}
                    </div>
                </div>
                <div style={{
                    // border: '1px solid green',
                    display: 'inline-block',
                    width: '49%',
                }}>
                    <div
                        style={{
                            display: 'inline-block',
                        }}
                    >
                        <FloatingLabel
                            className='mont-semibold'
                            style={formLabelStyle}
                            label="Start Month:"
                        >
                        </FloatingLabel>
                        <div style={formCellStyle}>
                            {selectStartMonthForm}
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            display: 'block',
                        }}
                    >
                        <FloatingLabel
                            className='mont-semibold'
                            style={formLabelStyle}
                            label="Start Year:"
                        >
                        </FloatingLabel>
                        <div style={formCellStyle}>
                            {selectStartYearForm}
                        </div>
                    </div>
                </div>
                {
                    enableEndDate && (
                        <div style={{
                            // border: '1px solid green',
                            display: 'inline-block',
                            width: dateColumnWidth,
                        }}>
                            <div
                                style={{
                                    display: 'block',
                                    width: '100%',
                                }}
                            >
                                <FloatingLabel
                                    className='mont-semibold'
                                    style={formLabelStyle}
                                    label="End Month:"
                                >
                                </FloatingLabel>
                                <div style={formCellStyle}>
                                    {selectEndMonthForm}
                                </div>
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'block',
                                }}
                            >
                                <FloatingLabel
                                    className='mont-semibold'
                                    style={formLabelStyle}
                                    label="End Year:"
                                >
                                </FloatingLabel>
                                <div style={formCellStyle}>
                                    {selectEndYearForm}
                                </div>
                            </div>
                        </div>
                    )}
                <div
                    style={{
                        width: '100%',
                        display: 'block',
                    }}>
                    <Button
                        style={defaultButtonStyle}
                        onClick={async () => {
                            const response = await getRequestToApi({
                                startingAmount,
                                fromYear: startYear,
                                toYear: endYear,
                                fromMonth: startZeroBasedMonth,
                                toMonth: endZeroBasedMonth,
                            });
                            console.log('rx response:')
                            console.log(response.data);
                            setShowForm(false);
                            setShowResult(true);
                        }}
                    >SUBMIT</Button>
                </div>
            </div>
        </div>
    )
}

export default StartingAmountForm;
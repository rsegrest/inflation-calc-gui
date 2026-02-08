import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
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
import DatePicker from './DatePicker';

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


const StartingAmountForm = (props: {
    width: number,
    deviceType: string,
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
        deviceType,
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
        width: '100%',
    }

    let inputStyle = defaultInputStyle;
    let dropdownStyle = defaultDropdownStyle;
    let formLabelStyle = defaultFormLabelStyle;

    if (deviceType === 'Mobile') {
        inputStyle = mobileInputStyle;
        dropdownStyle = mobileDropdownStyle;
        formLabelStyle = {
            ...defaultFormLabelStyle,
            fontSize: '1.2rem',
            width: '100%',
        };
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
    const enableEndDate = true;
    let dateColumnWidth = '100%';
    let fullWidth = '60%';
    if (enableEndDate) {
        dateColumnWidth = '45%';
    }
    return (
        <div
            style={{
                border: '5px solid ' + COLORS.VERMILLION,
                backgroundColor: COLORS.SUNNY,
                borderRadius: '10px',
                minWidth: '20rem',
                width: fullWidth,
                maxWidth: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '1rem',
                marginBottom: '1rem',
                padding: '1rem',
            }}
        >
            <div
                className='form-outer-box'
                style={{
                    margin: 'auto',
                    width: '100%',
                }}>
                <div
                    className='form-inner-box starting-amount-box'
                    style={{
                        // width: dateColumnWidth,
                        display: 'block',
                        margin: 'auto',
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
                <DatePicker
                    dateColumnWidth={dateColumnWidth}
                    formLabelStyle={formLabelStyle}
                    formCellStyle={formCellStyle}
                    // selectMonthForm={selectMonthForm}
                    // selectYearForm={selectYearForm}
                    zeroBasedMonth={startZeroBasedMonth}
                    setZeroBasedMonth={setStartZeroBasedMonth}
                    year={startYear}
                    setYear={setStartYear}
                />
                {/* <div
                    className='form-inner-box start-date-box'
                    style={{
                        display: 'inline-block',
                        width: dateColumnWidth,
                        marginRight: '1rem',
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
                            {selectMonthForm(startZeroBasedMonth, setStartZeroBasedMonth)}
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
                            {selectYearForm(startYear, setStartYear)}
                        </div>
                    </div>
                </div> */}
                {
                    enableEndDate && (
                        <DatePicker
                            dateColumnWidth={dateColumnWidth}
                            formLabelStyle={formLabelStyle}
                            formCellStyle={formCellStyle}
                            zeroBasedMonth={endZeroBasedMonth}
                            setZeroBasedMonth={setEndZeroBasedMonth}
                            year={endYear}
                            setYear={setEndYear}
                        />
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
                            console.log(response);

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
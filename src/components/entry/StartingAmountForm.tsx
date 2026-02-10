import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
    getHistoricalCpi,
    adjustFigureWithInflation,
} from '../../util/formulas';
import {
    defaultFormLabelStyle,
    datePickerFormGroupStyle,
    useCurrentDateLabelStyle,
    useCurrentDateFormGroupStyle,
} from '../constants/style';
import { COLORS } from '../constants/colors';
import DatePicker from './DatePicker';
import type { AxiosResponse } from 'axios';

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
    currentYear: number,
    currentZeroBasedMonth: number,
    startingAmount: number,
    startZeroBasedMonth: number,
    startYear: number,
    endYear: number,
    endZeroBasedMonth: number,
    useCurrentDate: boolean,
    setStartingAmount: (amount: number) => void,
    setStartZeroBasedMonth: (month: number) => void,
    setStartYear: (year: number) => void,
    setEndYear: (year: number) => void,
    setEndZeroBasedMonth: (month: number) => void,
    setNowDollars: (dollars: number) => void,
    setThenDollars: (dollars: number) => void,
    setShowResult: (show: boolean) => void,
    setShowForm: (show: boolean) => void,
    setUseCurrentDate: (useCurrentDate: boolean) => void,
    getRequestToApi: (data: { startingAmount: number, fromYear: number, toYear: number, fromMonth: number, toMonth: number }) => Promise<void | AxiosResponse<any, any, {}>>,
}) => {
    const {
        // width,
        deviceType,
        currentYear,
        currentZeroBasedMonth,
        startingAmount,
        startZeroBasedMonth,
        startYear,
        endYear,
        endZeroBasedMonth,
        useCurrentDate,
        setUseCurrentDate,
        setStartingAmount,
        setStartZeroBasedMonth,
        setStartYear,
        setEndYear,
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

    let formLabelStyle = defaultFormLabelStyle;

    let fullWidth = '60%';
    let outerDivStyle = {
        border: '5px solid ' + COLORS.VERMILLION,
        backgroundColor: COLORS.SUNNY,
        borderRadius: '10px',
        width: fullWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1rem',
        marginBottom: '1rem',
        padding: '1rem',
    }
    if (deviceType === 'Mobile') {
        fullWidth = '100%';
        formLabelStyle = {
            ...defaultFormLabelStyle,
            fontSize: '1.2rem',
            width: '100%',
        };
    }

    let dateColumnWidth = '100%';
    if (!useCurrentDate && deviceType !== 'Mobile') {
        dateColumnWidth = '45%';
    }
    if (deviceType === 'Mobile') {
        outerDivStyle = {
            ...outerDivStyle,
        }
    }
    return (
        <div
            style={outerDivStyle}
        >
            <Form
                className='form-outer-box'
            >
                <Form.Group
                    style={{ display: 'block', width: '60%', margin: 'auto', }}
                    className='mb-3'
                    controlId="form-starting-amount"
                >
                    <Form.Label>
                        Starting Amount:
                    </Form.Label>

                    <Form.Control
                        className='mont-xbold'
                        type="text"
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
                </Form.Group>
                <Form.Group
                    className='form-inner-box starting-amount-box'
                    controlId="use-current-date"
                    style={useCurrentDateFormGroupStyle}
                >
                    <Form.Label
                        style={useCurrentDateLabelStyle}
                    >
                        Use Current Date as End Date:
                    </Form.Label>
                    <Form.Switch
                        type="switch"
                        id="custom-switch"
                        style={{
                            display: 'inline',
                            margin: 'auto',
                        }}
                        checked={useCurrentDate}
                        onChange={(e) => {
                            setUseCurrentDate(e.target.checked);
                        }}
                    />
                </Form.Group>
                <Form.Group
                    controlId="date-picker-form"
                    style={datePickerFormGroupStyle}
                >
                    <DatePicker
                        labelPrefix="Start"
                        deviceType={deviceType}
                        currentYear={currentYear}
                        currentZeroBasedMonth={currentZeroBasedMonth}
                        dateColumnWidth={dateColumnWidth}
                        formLabelStyle={formLabelStyle}
                        formCellStyle={formCellStyle}
                        zeroBasedMonth={startZeroBasedMonth}
                        setZeroBasedMonth={setStartZeroBasedMonth}
                        year={startYear}
                        setYear={setStartYear}
                    />
                    {
                        !useCurrentDate && (
                            <DatePicker
                                deviceType={deviceType}
                                labelPrefix="End"
                                currentYear={currentYear}
                                currentZeroBasedMonth={currentZeroBasedMonth}
                                dateColumnWidth={dateColumnWidth}
                                formLabelStyle={formLabelStyle}
                                formCellStyle={formCellStyle}
                                zeroBasedMonth={endZeroBasedMonth}
                                setZeroBasedMonth={setEndZeroBasedMonth}
                                year={endYear}
                                setYear={setEndYear}
                            />
                        )
                    }
                </Form.Group>
                <div
                    style={{
                        width: '100%',
                        display: 'block',
                    }}>
                    <Button
                        className='default-button'
                        onClick={async () => {
                            await getRequestToApi({
                                startingAmount,
                                fromYear: startYear,
                                toYear: endYear,
                                fromMonth: startZeroBasedMonth,
                                toMonth: endZeroBasedMonth,
                            });

                            setShowForm(false);
                            setShowResult(true);
                        }}
                    >SUBMIT</Button>
                </div>
            </Form >
        </div >
    )
}

export default StartingAmountForm;
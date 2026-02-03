import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DeviceDetector from '../../util/DeviceDetector';
import { getNameOfMonth } from '../../util/formulas';
import { COLORS } from '../../constants';
import {
    getHistoricalCpi,
    adjustFigureWithInflation,
} from '../../util/formulas';

let tableStyle: React.CSSProperties = {
    border: 'none',
    textAlign: 'center',
    margin: 'auto',
};

let formStyle: React.CSSProperties = {
    display: 'inline',
    color: COLORS.FLAME,
    backgroundColor: COLORS.SUNNY,
    border: `2px solid ${COLORS.BRICK}`,
    textAlign: 'center',
    fontSize: '2.4rem',
    height: '5.5rem',
}
let monthFormStyle: React.CSSProperties = {
    ...formStyle,
    float: 'left',
    // width: '14rem',
    width: '100%',
}
let yearFormStyle: React.CSSProperties = {
    ...formStyle,
    float: 'left',
    // width: '10rem',
    width: '80%',
}
let amountEntryStyle: React.CSSProperties = {
    border: 'none',
    paddingLeft: '0.5rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
};

let monthEntryStyle: React.CSSProperties = {
    border: 'none',
    paddingLeft: '0.5rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
}

let yearEntryStyle: React.CSSProperties = {
    border: 'none',
    paddingLeft: '0.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingRight: '1rem',
}

let formLabelStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '.7rem'
}

let buttonStyle: React.CSSProperties = {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.FLAME,
    border: `2px solid ${COLORS.BRICK}`,
    width: '6rem',
}

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

const StartingAmountForm = ({
    width,
    startingAmount,
    setStartingAmount,
    startZeroBasedMonth,
    setStartZeroBasedMonth,
    startYear,
    setStartYear,
    endYear,
    endZeroBasedMonth,
    setNowDollars,
    setThenDollars,
    setShowResult,
    setShowForm,
}: {
    width: number,
    startingAmount: number,
    setStartingAmount: (amount: number) => void,
    startZeroBasedMonth: number,
    setStartZeroBasedMonth: (month: number) => void,
    startYear: number,
    setStartYear: (year: number) => void,
    endYear: number,
    endZeroBasedMonth: number,
    setNowDollars: (dollars: number) => void,
    setThenDollars: (dollars: number) => void,
    setShowResult: (show: boolean) => void,
    setShowForm: (show: boolean) => void,
}) => {
    const setMonthName = React.useState('month')[1];

    const deviceType = DeviceDetector();
    // console.log(`deviceType : ${deviceType}`)

    if (deviceType === 'Mobile') {
        console.log(`MOBILE -- width is : ${width}`)
        amountEntryStyle = {
            ...amountEntryStyle,
        }

        monthEntryStyle = {
            ...monthEntryStyle,
        }

        yearEntryStyle = {
            ...yearEntryStyle,
            width: '100%',
        }

        formStyle = {
            ...formStyle,
            fontSize: '.8rem',
            height: '2rem',
            border: '1px solid white',
            width: '100%'
        }

        monthFormStyle = {
            ...monthFormStyle,
            fontSize: '.8rem',
            height: '2rem',
            border: '1px solid white',
            width: '100%'
        }

        yearFormStyle = {
            ...yearFormStyle,
            fontSize: '.8rem',
            height: '2rem',
            border: '1px solid white',
            width: '100%'
        }
    }
    const amountFormControl = (
        <Form.Control
            style={{
                ...formStyle,
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
    const selectMonthForm = (
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
            style={monthFormStyle}
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
    const selectYearForm = (
        <Form.Select
            className='mont-xbold'
            id="YearInput"
            value={startYear}
            onChange={
                (e) => {
                    setStartYear(parseInt(e.target.value, 10));
                }}
            style={{
                ...yearFormStyle,
            }}
        >
            {getYearArray(endYear).map((yr) => (
                <option value={yr} key={`year_${yr}`}>{yr}</option>
            ))}
        </Form.Select>
    )
    return (
        <>
            <Row
                style={tableStyle}
            >
                {(deviceType === 'Mobile') ? null : (
                    <Col
                        colSpan={1}
                    >
                        &nbsp;
                    </Col>
                )
                }
                <Col
                    style={{
                        ...amountEntryStyle,
                    }}
                    colSpan={3}
                >
                    {
                        (deviceType === "Mobile") ? (
                            <>
                                <Form.Label
                                    style={formLabelStyle}
                                >Starting Amount</Form.Label>
                                {amountFormControl}
                            </>
                        ) : (
                            <FloatingLabel
                                className='mont-semibold'
                                style={{
                                    color: COLORS.BRICK,
                                }}
                                label="Starting Amount:"
                            >
                                {amountFormControl}
                            </FloatingLabel>
                        )
                    }
                </Col>
                <Col
                    style={{
                        ...monthEntryStyle,
                    }}
                    colSpan={1}
                >
                    {
                        (deviceType === "Mobile") ? (
                            <>
                                <Form.Label
                                    style={formLabelStyle}
                                >Start Month:</Form.Label>
                                {selectMonthForm}
                            </>
                        ) : (
                            <FloatingLabel
                                className='mont-semibold'
                                style={{
                                    color: COLORS.BRICK,
                                }}
                                label="StartMonth:"
                            >
                                {selectMonthForm}
                            </FloatingLabel>
                        )
                    }
                </Col>
                <Col
                    className='yearEntry'
                    style={yearEntryStyle}
                    colSpan={2}
                >
                    {
                        (deviceType === "Mobile") ? (
                            <>
                                <Form.Label
                                    style={formLabelStyle}
                                >
                                    Start Year:
                                </Form.Label>
                                {selectYearForm}
                            </>
                        ) : (
                            <FloatingLabel
                                className='mont-semibold'
                                style={{
                                    color: COLORS.BRICK,
                                }}
                                label="Start Year:"
                            >
                                {selectYearForm}
                            </FloatingLabel>
                        )
                    }
                </Col>
                {(deviceType === 'Mobile') ? null : (
                    <Col
                        colSpan={1}
                    >
                        &nbsp;
                    </Col>
                )
                }
            </Row>
            <Row>
                <Col>
                    &nbsp;
                </Col>
                <Col>
                    &nbsp;
                </Col>
                <Col
                    style={{
                        paddingRight: '1.3rem',
                    }}
                >
                    <Button
                        style={buttonStyle}
                        onClick={() => {
                            setShowResult(true);
                            setShowForm(false);
                        }}
                    >SUBMIT</Button>
                </Col>
            </Row>
        </>

    )
}

export default StartingAmountForm;
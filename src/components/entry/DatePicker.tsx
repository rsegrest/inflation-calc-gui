import * as React from 'react';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { getNameOfMonth } from '../../util/formulas';
import {
    defaultInputStyle,
    defaultDropdownStyle,
    defaultFormLabelStyle,
    defaultButtonStyle,
} from '../constants/style';

const getYearArray = (currentYear: number) => {
    const yearArray = [];
    for (let i = currentYear; i > 1913; i -= 1) {
        yearArray.push(i)
    }
    return yearArray;
}
export const DatePicker = (props: {
    dateColumnWidth: string,
    formLabelStyle: React.CSSProperties,
    formCellStyle: React.CSSProperties,
    // selectMonthForm: (zeroBasedMonth: number, setZeroBasedMonth: (month: number) => void) => React.ReactNode,
    // selectYearForm: (year: number, setYear: (year: number) => void) => React.ReactNode,
    zeroBasedMonth: number,
    setZeroBasedMonth: (month: number) => void,
    year: number,
    setYear: (year: number) => void,
}) => {
    let dropdownStyle = defaultDropdownStyle;
    const setMonthName = React.useState('month')[1];
    const selectMonthForm = (zeroBasedMonth: number, setZeroBasedMonth: (month: number) => void) => (
        <Form.Select
            className='mont-xbold'
            id="startMonthInput"
            value={zeroBasedMonth}
            onChange={
                (e) => {
                    setZeroBasedMonth(parseInt(e.target.value, 10));
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
    const selectYearForm = (
        year: number,
        setYear: (year: number) => void
    ) => (
        <Form.Select
            className='mont-xbold'
            id="YearInput"
            value={year}
            onChange={
                (e) => {
                    setYear(parseInt(e.target.value, 10));
                }}
            style={dropdownStyle}
        >
            {getYearArray(year).map((yr) => (
                <option value={yr} key={`year_${yr}`}>{yr}</option>
            ))}
        </Form.Select>
    )
    const {
        dateColumnWidth,
        formLabelStyle,
        formCellStyle,
        // selectMonthForm,
        // selectYearForm,
        zeroBasedMonth,
        setZeroBasedMonth,
        year,
        setYear,
    } = props;

    return (<div
        className='form-inner-box end-date-box'
        style={{
            // border: '1px solid blue',
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
                {selectMonthForm(zeroBasedMonth, setZeroBasedMonth)}
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
                {selectYearForm(year, setYear)}
            </div>
        </div>
    </div>)
}
export default DatePicker;



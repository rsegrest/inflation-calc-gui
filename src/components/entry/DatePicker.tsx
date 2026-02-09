import * as React from 'react';
import { Form } from 'react-bootstrap';
import { getNameOfMonth } from '../../util/formulas';

const getYearArray = (currentYear: number) => {
    const yearArray = [];
    for (let i = currentYear; i > 1913; i -= 1) {
        yearArray.push(i)
    }
    console.log(`currentYear : ${currentYear}`)
    console.log(`yearArray : ${yearArray}`)
    return yearArray;
}
export const DatePicker = (props: {
    deviceType: string,
    currentYear: number,
    currentZeroBasedMonth: number,
    dateColumnWidth: string,
    formLabelStyle: React.CSSProperties,
    formCellStyle: React.CSSProperties,
    zeroBasedMonth: number,
    setZeroBasedMonth: (month: number) => void,
    year: number,
    setYear: (year: number) => void,
    labelPrefix: string,
}) => {
    const setMonthName = React.useState('month')[1];
    const {
        deviceType,
        dateColumnWidth,
        zeroBasedMonth,
        setZeroBasedMonth,
        year,
        setYear,
        labelPrefix,
    } = props;
    let dateColWidth = dateColumnWidth;
    if (deviceType === 'Mobile') {
        dateColWidth = '100%';
    }
    let outerStyle: React.CSSProperties = {
        display: 'inline-block',
        width: dateColWidth,
        margin: 'auto',
        padding: '1rem',
    }
    if (labelPrefix === 'End') {
        outerStyle = {
            ...outerStyle,
            float: 'right',
            // marginRight: '1.5rem',
        }
    }

    if (deviceType === 'Mobile') {
        outerStyle = {
            ...outerStyle,
            width: '100%',
            padding: '0',
            margin: '0',
        }
    }
    let groupStyle: React.CSSProperties = {
        width: '100%',
        display: 'inline-block',
        margin: 'auto',
    }
    let selectStyle: React.CSSProperties = {
        width: '10rem',
        margin: 'auto',
        display: 'block',
    }
    let labelStyle: React.CSSProperties = {
        ...groupStyle,
        textAlign: 'center',
    }
    if (deviceType === 'Mobile') {
        selectStyle = {
            ...selectStyle,
            width: '100%',
        }
    }
    return (
        <div
            style={outerStyle}
        >
            <Form.Group
                className='mb-3 form-inner-box end-date-box'
                style={groupStyle}
            >
                <Form.Label
                    className='mont-semibold'
                    style={labelStyle}
                >
                    {`${labelPrefix} Month: `}
                </Form.Label>
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
                    style={selectStyle}
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
                <Form.Label
                    className='mont-semibold'
                    style={labelStyle}
                >
                    {`${labelPrefix} Year: `}
                </Form.Label>
                <Form.Select
                    className='mont-xbold'
                    id="YearInput"
                    value={year}
                    onChange={
                        (e) => {
                            setYear(parseInt(e.target.value, 10));
                        }}
                    style={selectStyle}
                >
                    {getYearArray(props.currentYear).map((yr) => (
                        <option value={yr} key={`year_${yr}`}>{yr}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    )
}
export default DatePicker;



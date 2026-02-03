import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SpendingPower from './SpendingPower';
import LostValue from './LostValue';
import InflationRate from './InflationRate';
import { getNameOfMonth } from '../../util/formulas';
import DeviceDetector from '../../util/DeviceDetector';

let centerTheBoxStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    right: '0',
    textAlign: 'center',
    verticalAlign: 'middle',
} as React.CSSProperties;

let middle51style = {
    width: '51%',
    margin: 'auto',
    verticalAlign: 'middle',
} as React.CSSProperties;

let centerBottomStyle = {
    textAlign: 'left',
    verticalAlign: 'bottom',
    width: '15rem',
} as React.CSSProperties;

const ResultLayout = ({
    width,
    nowDollars,
    thenDollars,
    startZeroBasedMonth,
    startYear,
    inflationRate,
    lostValue,
    timePeriodInMonths,
    // setNowDollars,
    // setThenDollars,
    // setShowResult,
    // setShowForm,
}: {
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
    // setShowResult: (show: boolean) => void,
    // setShowForm: (show: boolean) => void,
}) => {
    const deviceType = DeviceDetector();
    if (deviceType === 'Mobile') {
        delete centerBottomStyle.width;
    }
    return (
        <Container>
            <Row
                className='text-center'
            >
                <Col
                    sm={4}
                // style={{
                //     width: '40%',
                // }}
                // className='text-center'
                // style={middle51style}
                >
                    <SpendingPower
                        width={width}
                        nowDollars={nowDollars}
                        thenDollars={thenDollars}
                        startZeroBasedMonth={startZeroBasedMonth}
                        startYear={startYear}
                    />
                </Col>
                <Col
                    sm
                    // className='text-center'
                    style={centerBottomStyle as React.CSSProperties}
                >
                    <InflationRate
                        width={width}
                        inflationRate={inflationRate}
                        lostValue={lostValue}
                        startMonth={getNameOfMonth(startZeroBasedMonth)}
                        startYear={startYear}
                    />
                </Col>
                <Col
                    sm={4}
                    colSpan={2}
                    style={centerTheBoxStyle as React.CSSProperties}
                >
                    <LostValue
                        width={width}
                        lostValue={lostValue}
                        timePeriodInMonths={timePeriodInMonths}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default ResultLayout;
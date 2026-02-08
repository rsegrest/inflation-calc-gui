import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { titleStyle, subTitleStyle, latestDateStyle } from "./constants/style";
import { getNameOfMonth } from '../util/formulas';

const InflationHeader = ({ width, latestDateWithData }: { width: number, latestDateWithData: { month: number, year: number } }) => {
    let headerFontSize = '5rem';
    let subHeaderFontSize = '2.5rem';
    if (width < 800) {
        headerFontSize = `${(Math.floor(width * .1))}px`;
        subHeaderFontSize = `${(Math.floor(width * .05))}px`;
    }

    return (
        <div>
            <Row
                className='mont-xbold'
                style={{
                    ...titleStyle,
                    fontSize: headerFontSize,
                } as React.CSSProperties}
            >
                <Col>
                    Inflation Devastation!
                </Col>
            </Row>
            <Row
                className='mont-semibold'
                style={{
                    ...subTitleStyle,
                    fontSize: subHeaderFontSize,
                } as React.CSSProperties}
            >
                <Col>
                    How inflation destroys
                </Col>
            </Row>
            <Row
                className='mont-semibold'
                style={{
                    ...latestDateStyle,
                } as React.CSSProperties}
            >
                <Col>
                    {`Latest CPI Data: ${getNameOfMonth(latestDateWithData.month)}, ${latestDateWithData.year}`}
                </Col>
            </Row>
        </div>
    )
}

export default InflationHeader;
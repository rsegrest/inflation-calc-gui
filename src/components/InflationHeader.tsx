import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { defaultTitleStyle, subTitleStyle, latestDateStyle } from "./constants/style";
import { getNameOfMonth } from '../util/formulas';
// import COLORS from './constants/colors';

const InflationHeader = ({ width, deviceType, latestDateWithData }: { width: number, deviceType: string, latestDateWithData: { month: number, year: number } }) => {
    let headerFontSize = '3.5rem';
    let subHeaderFontSize = '1.2rem';
    let titleStyle = defaultTitleStyle;
    if (deviceType === 'Mobile') {
        headerFontSize = `${(Math.floor(width * .1))}px`;
        subHeaderFontSize = `${(Math.floor(width * .05))}px`;
        titleStyle = {
            ...defaultTitleStyle,
            marginLeft: '0',
            marginRight: '0',
        }
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
                    See how inflation affects your income and savings
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
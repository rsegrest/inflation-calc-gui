import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { COLORS } from "../constants";

const titleStyle = {
    fontSize: '5rem',
    marginTop: '10%',
    textAlign: 'center',
    color: COLORS.FLAME,
    border: 'none',
}

const subTitleStyle = {
    textAlign: 'center',
    color: COLORS.SAFFRON,
    marginBottom: '5%',
    border: 'none',
}

const InflationHeader = ({ width }: { width: number }) => {
    console.log(`Inflation Header : ${width}`)
    let headerFontSize = '5rem';
    let subHeaderFontSize = '2.5rem';
    if (width < 800) {
        headerFontSize = `${(Math.floor(width * .1))}px`;
        subHeaderFontSize = `${(Math.floor(width * .05))}px`;
    }

    return (
        <>
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
                    // width,
                } as React.CSSProperties}
            >
                <Col>
                    How inflation destroys
                </Col>
            </Row>
        </>
    )
}

export default InflationHeader;
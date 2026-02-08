import { COLORS } from '../constants/colors';
import DeviceDetector from '../../util/DeviceDetector';

let boxStyle: React.CSSProperties = {
    background: COLORS.SAFFRON, // saffron
    border: '5px solid black',
    borderRadius: '18px',
    width: '15rem',
    textAlign: 'center',
    padding: '1.2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
}

let largeType: React.CSSProperties = {
    color: COLORS.FLAME,
    fontSize: '3rem',
}

let minorEmphasis: React.CSSProperties = {
    color: COLORS.FLAME,
    fontSize: '1.2rem'
}

const InflationRate = ({
    // width,
    inflationRate,
    lostValue,
    startMonth,
    startYear,
}: {
    // width?: number,
    inflationRate: number,
    lostValue: number,
    startMonth: string,
    startYear: number,
}) => {
    const deviceType = DeviceDetector();
    // let boxWidth = '20rem';
    // let fontSize = 2.4;
    // let boxFloat = 'right';
    if (deviceType === 'Mobile') {
        // fontSize = 1.2;
        // boxWidth = '14rem';
        // boxFloat = 'center';
        boxStyle = {
            ...boxStyle,
            width: '14rem',
            marginTop: '1rem',
            marginBottom: '1rem',
        }
        largeType = {
            ...largeType,
            fontSize: '2.4rem',
        }
    }
    return (
        <div style={boxStyle}>
            <div
                className='mont-medium'
                style={{
                    color: COLORS.BRICK,
                }}
            >
                Total Inflation Rate
            </div>
            <div
                className='mont-xbold'
                style={largeType}
            >
                {inflationRate.toLocaleString()}%
            </div>
            <div
                className='mont-medium'
                style={{
                    color: COLORS.BRICK,
                }}
            >
                <span
                    className='mont-bold'
                    style={minorEmphasis}
                >$1</span> today now buys as much as:
            </div>
            <div
                className='mont-xbold'
                style={largeType}
            >
                {Math.floor((1 - (lostValue / 100)) * 100)}¢
            </div>
            <div
                className='mont-medium'
                style={{
                    color: COLORS.BRICK,
                }}
            >
                did in <span
                    className='mont-bold'
                    style={minorEmphasis}
                >{startMonth} {startYear}</span>
            </div>
        </div>
    )
}
export default InflationRate;
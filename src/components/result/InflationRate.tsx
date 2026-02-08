import { COLORS } from '../constants/colors';
import DeviceDetector from '../../util/DeviceDetector';
import { lightTextColorDefault, boxStyleDefault, largeTypeDefault, minorEmphasisDefault } from '../constants/style';

const InflationRate = ({
    inflationRate,
    lostValue,
    startMonth,
    startYear,
}: {
    inflationRate: number,
    lostValue: number,
    startMonth: string,
    startYear: number,
}) => {
    const deviceType = DeviceDetector();
    let boxStyle = boxStyleDefault;
    let largeType = largeTypeDefault;
    let minorEmphasis = minorEmphasisDefault;
    // let boxWidth = '20rem';
    // let fontSize = 2.4;
    // let boxFloat = 'right';
    if (deviceType === 'Mobile') {
        // fontSize = 1.2;
        // boxWidth = '14rem';
        // boxFloat = 'center';
        boxStyle = {
            ...boxStyle,
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
                style={lightTextColorDefault}
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
                style={lightTextColorDefault}
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
                style={lightTextColorDefault}
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
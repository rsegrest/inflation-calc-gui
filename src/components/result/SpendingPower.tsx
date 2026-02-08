import { COLORS } from '../constants/colors';
import { getNameOfMonth } from '../../util/formulas';
import DeviceDetector from '../../util/DeviceDetector';
import { boxStyleDefault, lightTextColorDefault } from '../constants/style';

let boxStyle = boxStyleDefault;

const SpendingPower = ({
    // width,
    nowDollars,
    thenDollars,
    startZeroBasedMonth,
    startYear,
}: {
    // width?: number,
    nowDollars: number,
    thenDollars: number,
    startZeroBasedMonth: number,
    startYear: number,
}) => {
    const deviceType = DeviceDetector();

    let boxWidth = '29%';
    let fontSize = 2.4;
    let marginTop = '0';
    let divStyle = {
        float: 'left',
        background: '#F4C430', // saffron
        border: '5px solid black',
        borderRadius: '18px',
        width: boxWidth,
        marginTop,
        padding: '.6rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
    }
    if (deviceType === 'Mobile') {

        fontSize = 1.2;
        divStyle = {
            ...divStyle,
            marginTop: '1rem',
        }
    }
    return (
        <div
            style={boxStyle as React.CSSProperties}
        >
            <div
                className='mont-medium'
                style={lightTextColorDefault}
            >
                It would now take
            </div>
            <div
                className='mont-xbold'
                style={{
                    fontSize: `${fontSize}rem`,
                    color: COLORS.FLAME
                }}
            >
                ${nowDollars.toLocaleString()}
            </div>
            <div
                className='mont-medium'
                style={lightTextColorDefault}
            >
                dollars today<br />
                to buy as much as
            </div>
            <div
                className='mont-xbold'
                style={{
                    fontSize: `${fontSize}rem`,
                    color: COLORS.FLAME,
                }}
            >
                ${thenDollars.toLocaleString()}
            </div>
            <div
                className='mont-medium'
                style={lightTextColorDefault}
            >
                would buy in
            </div>
            <div
                className='mont-bold'
                style={{
                    fontSize: `${fontSize * .75}rem`,
                    color: COLORS.FLAME
                }}
            >
                {getNameOfMonth(startZeroBasedMonth)} {startYear}
            </div>
        </div>
    )
}
export default SpendingPower;
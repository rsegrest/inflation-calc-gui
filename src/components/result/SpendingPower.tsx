import { COLORS } from '../../constants';
import { getNameOfMonth } from '../../util/formulas';
import DeviceDetector from '../../util/DeviceDetector';

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

    let boxWidth = '20rem';
    let fontSize = 2.4;
    let boxFloat = 'right';
    let marginTop = '0';
    let divStyle = {
        float: boxFloat,
        background: '#F4C430', // saffron
        border: '5px solid black',
        borderRadius: '18px',
        width: boxWidth,
        marginTop,
        padding: '1.2rem',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
    if (deviceType === 'Mobile') {

        fontSize = 1.2;
        divStyle = {
            ...divStyle,
            width: '14rem',
            float: 'center',
            marginTop: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    }
    return (
        <div style={divStyle as React.CSSProperties}>
            <div
                className='mont-medium'
                style={{
                    color: COLORS.BRICK
                }}
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
                style={{
                    color: COLORS.BRICK
                }}
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
                style={{
                    color: COLORS.BRICK
                }}
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
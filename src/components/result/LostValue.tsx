import { COLORS } from '../../constants';
import DeviceDetector from '../../util/DeviceDetector';

let boxStyle = {
    background: COLORS.SAFFRON,
    border: '5px solid black',
    borderRadius: '18px',
    width: '15rem',
    textAlign: 'center',
    marginLeft: '0',
    marginRight: 'auto',
    verticalAlign: 'middle',
    padding: '1.4rem',
};

let lostValueBox = {
    backgroundColor: COLORS.FLAME,
    color: COLORS.SUNNY,
    fontSize: '3rem',
    border: 'solid #FF5733 2px',
    borderRadius: '0.3rem',
    paddingLeft: '0.2rem',
    paddingRight: '0.2rem',
    marginBottom: '0.5rem',
    minWidth: '50%',
};

const smallType = {
    color: COLORS.BRICK,
    margin: '-.3rem',
};

const hotType = {
    fontSize: '1.2rem',
    color: COLORS.FLAME
};

const lostType = {
    color: COLORS.FLAME,
    marginTop: '-.3rem',
    fontSize: '1.4rem',
    marginBottom: '.6rem'
};

const LostValue = ({
    width,
    lostValue,
    timePeriodInMonths
}) => {

    const deviceType = DeviceDetector();

    const numYears = Math.floor(timePeriodInMonths / 12);
    const plusMonths = timePeriodInMonths % 12;
    if (deviceType === 'Mobile') {
        boxStyle = {
            ...boxStyle,
            width: '14rem',
            marginLeft: 'auto',
            marginTop: '0',
        }
    }
    return (
        <div style={boxStyle}>
            <div
                className='mont-medium'
                style={{
                    ...smallType,
                    padding: 0,
                }}
            >
                Your
            </div>
            <div
                className='mont-xbold'
                style={lostType}
            >
                $$$
            </div>
            <div
                style={smallType}
            >
                have
            </div>
            <div
                className='mont-xbold'
                style={lostType}
            >
                LOST
            </div>
            <div
                className='mont-xbold'
                style={lostValueBox}
            >
                {lostValue}%
            </div>
            <div
                style={smallType}
            >
                of their value in
            </div>
            <div
                className='mont-bold'
                style={hotType}
            >
                {numYears} years, {plusMonths} months
            </div>
        </div>
    )
}
export default LostValue;
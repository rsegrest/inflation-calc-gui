import { COLORS } from './colors';

export let boxStyleDefault: React.CSSProperties = {
    background: COLORS.SLATE,
    float: 'left',
    border: '5px solid black',
    borderRadius: '18px',
    width: '29%',
    textAlign: 'center',
    padding: '.6rem',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
}

export let lightTextColorDefault: React.CSSProperties = {
    color: COLORS.WHITE,
}

export let darkTextColorDefault: React.CSSProperties = {
    color: COLORS.SLATE,
}

export let largeTypeDefault: React.CSSProperties = {
    color: COLORS.FLAME,
    fontSize: '3rem',
}

export let minorEmphasisDefault: React.CSSProperties = {
    color: COLORS.FLAME,
    fontSize: '1.2rem'
}

export const defaultTitleStyle: React.CSSProperties = {
    fontSize: '4rem',
    // marginTop: '10%',
    textAlign: 'center',
    color: COLORS.VERMILLION,
    border: 'none',
}



export const subTitleStyle: React.CSSProperties = {
    textAlign: 'center',
    color: COLORS.SLATE,
    border: 'none',
}

export const latestDateStyle: React.CSSProperties = {
    textAlign: 'center',
    color: COLORS.BLUE,
    border: 'none',
    fontSize: '0.8rem',
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
}

export const defaultFormStyle: React.CSSProperties = {
    color: COLORS.SLATE,
    backgroundColor: COLORS.WHITE,
    border: `2px solid ${COLORS.BLUE}`,
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '1.4rem',
    height: '3.5rem',
}
export const defaultInputStyle: React.CSSProperties = {
    ...defaultFormStyle,
    margin: 'auto',
    marginBottom: '2rem',
}
export const defaultDropdownStyle: React.CSSProperties = {
    ...defaultFormStyle,
    display: 'block',
    margin: 'auto',
}

export const defaultFormLabelStyle: React.CSSProperties = {
    color: COLORS.SLATE,
    fontSize: '.9rem',
    display: 'block',
    margin: 'auto',
}


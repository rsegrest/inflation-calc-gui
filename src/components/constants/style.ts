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


export const defaultTableStyle: React.CSSProperties = {
    border: 'none',
    textAlign: 'center',
    margin: 'auto',
};
export const titleStyle = {
    fontSize: '5rem',
    marginTop: '10%',
    textAlign: 'center',
    color: COLORS.VERMILLION,
    border: 'none',
}

export const subTitleStyle = {
    textAlign: 'center',
    color: COLORS.SLATE,
    border: 'none',
}

export const latestDateStyle = {
    textAlign: 'center',
    color: COLORS.BLUE,
    // color: 'black',
    border: 'none',
    fontSize: '1rem',
    marginBottom: '1rem',
}

export const defaultFormStyle: React.CSSProperties = {
    display: 'block',
    color: COLORS.SLATE,
    backgroundColor: COLORS.WHITE,
    border: `2px solid ${COLORS.BLUE}`,
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '1.4rem',
    height: '3.5rem',
    width: '10rem',
}
export const defaultInputStyle: React.CSSProperties = {
    ...defaultFormStyle,
    display: 'block',
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

export const defaultButtonStyle: React.CSSProperties = {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    backgroundColor: COLORS.SLATE,
    color: COLORS.WHITE,
    border: `2px solid ${COLORS.BLUE}`,
    minWidth: '8rem',
    maxWidth: '12rem',
    padding: '0.5rem',
    marginTop: '1rem',
}

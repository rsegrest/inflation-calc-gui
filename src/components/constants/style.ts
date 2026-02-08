import { COLORS } from './colors';

export const defaultTableStyle: React.CSSProperties = {
    border: 'none',
    textAlign: 'center',
    margin: 'auto',
};
export const titleStyle = {
    fontSize: '5rem',
    marginTop: '10%',
    textAlign: 'center',
    color: COLORS.FLAME,
    border: 'none',
}

export const subTitleStyle = {
    textAlign: 'center',
    color: COLORS.SAFFRON,
    marginBottom: '5%',
    border: 'none',
}

export const defaultFormStyle: React.CSSProperties = {
    display: 'block',
    color: COLORS.FLAME,
    backgroundColor: COLORS.SUNNY,
    border: `2px solid ${COLORS.BRICK}`,
    textAlign: 'center',
    fontSize: '1.4rem',
    height: '3.5rem',
    width: '10rem',
    marginBottom: '1rem',
}
export const defaultInputStyle: React.CSSProperties = {
    ...defaultFormStyle,
    display: 'block',
    margin: 'auto',
}
export const defaultDropdownStyle: React.CSSProperties = {
    ...defaultFormStyle,
    display: 'block',
    margin: 'auto',
}

export const defaultFormLabelStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '.7rem',
}

export const defaultButtonStyle: React.CSSProperties = {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.FLAME,
    border: `2px solid ${COLORS.BRICK}`,
    width: '8rem',
    padding: '0.5rem',
    marginTop: '1rem',
}

import { COLORS } from './colors';

// TODO : Move to style constants
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
    float: 'left',
    width: '10rem',
}
export const defaultDropdownStyle: React.CSSProperties = {
    ...defaultFormStyle,
    display: 'block',
    float: 'left',
    width: '10rem',
}
// export const defaultMonthFormStyle: React.CSSProperties = {
//     ...defaultFormStyle,
//     display: 'block',
//     float: 'left',
//     width: '10rem',
// }
// export const defaultYearFormStyle: React.CSSProperties = {
//     ...defaultFormStyle,
//     display: 'block',
//     float: 'left',
//     width: '10rem',
// }
// export const defaultAmountEntryStyle: React.CSSProperties = {
//     border: 'none',
//     paddingLeft: '0.5rem',
//     paddingRight: '1rem',
//     paddingTop: '0.5rem',
//     paddingBottom: '0.5rem',
// };

// export const defaultMonthEntryStyle: React.CSSProperties = {
//     border: 'none',
//     paddingLeft: '0.5rem',
//     paddingRight: '1rem',
//     paddingTop: '0.5rem',
//     paddingBottom: '0.5rem',
// }

// export const defaultYearEntryStyle: React.CSSProperties = {
//     border: 'none',
//     paddingLeft: '0.5rem',
//     paddingTop: '0.5rem',
//     paddingBottom: '0.5rem',
//     paddingRight: '1rem',
// }

export const defaultFormLabelStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '.7rem',
    width: '20rem',
}

export const defaultButtonStyle: React.CSSProperties = {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.FLAME,
    border: `2px solid ${COLORS.BRICK}`,
    width: '6rem',
}

// export const mobileYearEntryStyle = {
//     ...defaultYearEntryStyle,
//     width: '100%',
// }

export const mobileFormStyle = {
    ...defaultFormStyle,
    fontSize: '.8rem',
    height: '2rem',
    border: '1px solid white',
    width: '100%'
}

export const mobileInputStyle = {
    ...defaultInputStyle,
    fontSize: '.8rem',
    height: '2rem',
    border: '1px solid white',
    width: '100%'
}

export const mobileDropdownStyle = {
    ...defaultDropdownStyle,
    fontSize: '.8rem',
    height: '2rem',
    border: '1px solid white',
    width: '100%'
}

// export const mobileMonthFormStyle = {
//     ...defaultMonthFormStyle,
//     fontSize: '.8rem',
//     height: '2rem',
//     border: '1px solid white',
//     width: '100%'
// }

// export const mobileYearFormStyle = {
//     ...defaultYearFormStyle,
//     fontSize: '.8rem',
//     height: '2rem',
//     border: '1px solid white',
//     width: '100%'
// }


export const mobileTableStyle: React.CSSProperties = {
    ...defaultTableStyle,
    width: '100%',
}

// export const mobileAmountEntryStyle: React.CSSProperties = {
//     ...defaultAmountEntryStyle,
//     width: '100%',
// }

// export const mobileMonthEntryStyle: React.CSSProperties = {
//     ...defaultMonthEntryStyle,
//     width: '100%',
// }

export const mobileFormLabelStyle: React.CSSProperties = {
    ...defaultFormLabelStyle,
    fontSize: '.7rem',
}

export const mobileButtonStyle: React.CSSProperties = {
    ...defaultButtonStyle,
    width: '100%',
}
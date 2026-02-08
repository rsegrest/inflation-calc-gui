import { defaultFormStyle } from "./style";
import { defaultInputStyle } from "./style";
import { defaultDropdownStyle } from "./style";
import { defaultTableStyle } from "./style";
import { defaultFormLabelStyle } from "./style";
import { defaultButtonStyle } from "./style";

export const mobileFormStyle = {
    ...defaultFormStyle,
    fontSize: '.8rem',
    height: '2rem',
    border: '1px solid white',
    width: '100%',
    margin: 'auto',
}

export const mobileInputStyle = {
    ...defaultInputStyle,
    fontSize: '1.2rem',
    height: '2.6rem',
    border: '1px solid white',
    width: '100%',
    margin: 'auto',
}

export const mobileDropdownStyle = {
    ...defaultDropdownStyle,
    fontSize: '1.2rem',
    height: '2.6rem',
    border: '1px solid white',
    width: '100%'
}


export const mobileTableStyle: React.CSSProperties = {
    ...defaultTableStyle,
    width: '100%',
}


export const mobileFormLabelStyle: React.CSSProperties = {
    ...defaultFormLabelStyle,
    fontSize: '.7rem',
}

export const mobileButtonStyle: React.CSSProperties = {
    ...defaultButtonStyle,
    width: '100%',
}
import { CPI_DATA } from '../data/cpidata'

// calculateCompoundInterest: CI = P x (1 + r/n)^nt
// futureValueOfASeries : FV = PMT x (((1 + r/n)^nt - 1) / (r/n))
// totalAmount : T = CI + FV

// P = Principal investment amount
// PMT = Additional payment per period
// r = Annual rate of interest
// n = Compound frequency per year
// t = Investment time in years

export const getHistoricalCpi = (year:number, month:number = 0) => {
    const cpiDataString = JSON.stringify(CPI_DATA);
    const cpiData = JSON.parse(cpiDataString);
    const cpiYearDataArray = cpiData[year.toString()];
    const cpiMonthData = cpiYearDataArray[month.toString()];
    return cpiMonthData;
}

export const expressAsPercentage = (figure:number, digits = 2) => {
    return (figure).toFixed(digits)+'%' ;
}

export const expressAsDollars = (figure:number) => {
    return '$'+(figure).toFixed(2) ;
}

export const calculateInflationRate = (startCpi:number, endCpi:number) => {
    return Math.round(((endCpi - startCpi) / startCpi) * 10000)/100;
}

export const calculateLossPercentage = (startCpi:number, endCpi:number) => {
    return (Math.round((((endCpi-startCpi)/endCpi)*10000)))/100;
}

export const adjustFigureWithInflation = (amount:number, fromFigure:number, toFigure:number) => {
    const inflatedFigure = (amount / fromFigure) * toFigure;
    return Math.round(inflatedFigure);
}

export const calculateTimespanMonths = (startYear:number, startMonth:number, endYear:number, endMonth:number) => {
    let totalMonths = 0;
    totalMonths = endMonth - startMonth;
    totalMonths += ((endYear - startYear) * 12);
    return totalMonths;
}

export const getLatestMonthWithData = (currentMonth:number, year:number) => {
    let latestMonth = currentMonth;
    let latestYear = year;
    while (getHistoricalCpi(latestYear,latestMonth) === null) {
        latestMonth -= 1;
        if (latestMonth < 0) {
            latestYear -= 1;
            latestMonth = 11;
        }
    }
    return latestMonth;
}

export const getPresentCpi = () => {
    let currentMonth = 0;
    const currentYear = getCurrentYearInt();
    return getHistoricalCpi(currentYear, currentMonth);
}

export const getCurrentYearInt = ():number => {
    return parseInt(getCurrentYearString());
}

export const getCurrentYearString = ():string => {
    return new Date().getFullYear().toString();
}

export const getYearRange = ():number[] => {
    const yearArray:number[] = [];
    const currentYear = parseInt(getCurrentYearString());
    for (let i = currentYear; i >= 1913; i -= 1) {
        yearArray.push(i);
    }
    return yearArray;
}

export const getMonths = () => {
    const monthArray = [
        { moName: 'January', moNum: 0 },
        { moName: 'February', moNum: 1 },
        { moName: 'March', moNum: 2 },
        { moName: 'April', moNum: 3 },
        { moName: 'May', moNum: 4 },
        { moName: 'June', moNum: 5 },
        { moName: 'July', moNum: 6 },
        { moName: 'August', moNum: 7 },
        { moName: 'September', moNum: 8 },
        { moName: 'October', moNum: 9 },
        { moName: 'November', moNum: 10 },
        { moName: 'December', moNum: 11 },
    ];
    return monthArray;
}

export const getNameOfMonth = (monthNum:number) => {
    console.log(`getNameOfMonth : ${monthNum}, type is ${typeof monthNum}`)
    switch(monthNum) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
        default:
            return 'Not a Month';
    }
}

export const lostValueOverTime = ({
    fromYear,
    fromMonth = 0,
    toYear,
    toMonth = 0
}: {
    fromYear: number,
    fromMonth?: number,
    toYear: number,
    toMonth?: number
}) => {
    const valueArray = [];
    const firstCpiValue = getHistoricalCpi(fromYear, fromMonth);
    for (let i = fromYear; i <= toYear; i += 1) {
        const thisCpi = getHistoricalCpi(i, toMonth);
        valueArray.push({
            year: i,
            cpi: thisCpi,
            value: (firstCpiValue / thisCpi),
        })
    }
    return valueArray;
}

// const fromFigure = getHistoricalCpi(2019,2);
// const toFigure = getHistoricalCpi(2022,0);
// const inflationRate = calculateInflationRate(fromFigure, toFigure);
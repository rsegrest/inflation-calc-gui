import axios from "axios";
import type ReturnData from '../dataInterface/ReturnData.interface';

export const testApi = () => {
    axios.get('http://127.0.0.1:5000/')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}

export const connectToApi = () => {
    axios.get('http://127.0.0.1:5000/cpi/1000/2022/2025')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}


export const getRequestToApi = async ({ startingAmount, fromYear, toYear, fromMonth, toMonth }: { startingAmount: number, fromYear: number, toYear: number, fromMonth: number, toMonth: number }) => {
    const url = `http://127.0.0.1:5000/cpi?starting_amount=${startingAmount}&from_year=${fromYear}&to_year=${toYear}&from_month=${fromMonth}&to_month=${toMonth}`;
    console.log(url);
    return axios.get<ReturnData>(url)
        .then(response => {
            return response;
        });
}
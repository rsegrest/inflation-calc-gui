import axios from "axios";

export const getRequestToApi = async ({ startingAmount, fromYear, toYear, fromMonth, toMonth }: { startingAmount: number, fromYear: number, toYear: number, fromMonth: number, toMonth: number }) => {
    const url = `http://127.0.0.1:5000/cpi?starting_amount=${startingAmount}?from_year=${fromYear}?to_year=${toYear}?from_month=${fromMonth}?to_month=${toMonth}`;
    console.log(url);
    return axios.get(url)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
        })
}
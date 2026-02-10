import axios from "axios";

const PROTOCOL = import.meta.env.VITE_USE_HTTPS ? "https" : "http";
const PORT = import.meta.env.VITE_PORT || 5000;
const API_URL = `${PROTOCOL}://${import.meta.env.VITE_IP_ADDRESS}:${PORT}` || `${PROTOCOL}://localhost:${PORT}`;


export const getRequestToApi = async ({ startingAmount, fromYear, toYear, fromMonth, toMonth }: { startingAmount: number, fromYear: number, toYear: number, fromMonth: number, toMonth: number }) => {
    const url = `${API_URL}/cpi?starting_amount=${startingAmount}?from_year=${fromYear}?to_year=${toYear}?from_month=${fromMonth}?to_month=${toMonth}`;
    return axios.get(url)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
        })
}
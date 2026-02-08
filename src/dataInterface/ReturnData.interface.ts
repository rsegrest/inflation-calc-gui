export interface ReturnData {
    end_month: number;
    end_year: number;
    historical_end_cpi: number;
    historical_start_cpi: number;
    inflation_rate: number; 
    latest_data_month: number;
    latest_data_year: number;
    lost_value: number;
    now_dollars: number;
    start_month: number;
    start_year: number;
    starting_amount: number;
    time_period_in_months: number;
}
export type { ReturnData as default };


export interface Rates {
    [rates: string]: string
}

export interface DropdownItem {
    value: string,
    name: string
}

export interface Response {
    "result": string,
    "provider": string,
    "documentation": string,
    "terms_of_use": string,
    "time_last_update_unix": number,
    "time_last_update_utc": string,
    "time_next_update_unix": number,
    "time_next_update_utc": string,
    "time_eol_unix": number,
    "base_code": string,
    "rates": Currencies
  }

export interface Currencies {
        [key: string] : number
}


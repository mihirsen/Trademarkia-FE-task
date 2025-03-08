// List Data
interface Hit {
  _id: string;
  _index: string;
  _score: number;
  sort: (string | number)[];
  _source: {
    registration_number: string;
    registration_date: number;
    filing_date: number;
    status_date: number;
    renewal_date: number;
    date_type: string;
    status_code: number;
    status_type: string;
    search_bar: {
      attorneys: string;
      law_firm: string;
      mark_identification: string;
      owner: string;
    };
    starting_letter: {
      attorney: string;
      law_firm: string;
      mark_name: string;
      owner: string;
    };
    mark_identification: string;
    law_firm: string;
    law_firm_cleaned: string;
    attorney_name: string;
    attorney_name_cleaned: string;
    current_owner: string;
    current_owner_cleaned: string;
    mark_description_code: string[];
    mark_description_description: string[];
    first_use_anywhere_date: number;
    class_codes: string[];
    country: string;
    owner_location?: {
      lat: number;
      lon: number;
    };
    mark_status_key: number;
    is_lrapc?: boolean;
  };
}
interface Totle {
  relation: string;
  value: number;
}
export interface Trademark {
  hits: Hit[];
  total: Totle;
}
interface Attorney {
  doc_count: number;
  key: string;
}
export interface Aggregations {
  buckets: Attorney[];
}

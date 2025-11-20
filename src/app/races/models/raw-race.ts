interface RawRace {
  circuit_name: string;
  country: string;
  event_date: string;
  location: string;
  round: number;
  short_name: string;
  event_format: string;
  sessions: { local_date: string; utc_date: string; name: string }[];
}

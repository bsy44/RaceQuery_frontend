import { Session } from './session';

export interface RaceModel {
  circuit_name: string;
  country: string;
  eventDate: string;
  location: string;
  round: number;
  gpName: string;
  eventFormat: string;
  isFinished: boolean;
  sessions: Session[];
}

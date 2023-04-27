export type Reservation = {
  name: string;
  begin_time: string;
  end_time: string;
};

export type SystemMonitorRawSystem = {
  display_name: string;
  tas_name: string;
  hostname: string;
  system_type: string;
  timestamp: string;
  online: boolean;
  // values may not be included in the TAP response if systems are down/unreachable
  reachable?: boolean;
  queues_down?: boolean;
  load?: number;
  running?: number;
  waiting?: number;
  in_maintenance?: boolean;
  next_maintenance?: string;
  reservations?: [Reservation];
};

export type SystemQueue = {
  display_name: string;
  tas_name: string;
  hostname: string;
  system_type: string;
  timestamp?: string;
  queues?: {[queueName: string]: JobsQueue};
};

export type JobsQueue = {
  down?: boolean;
  hidden?: boolean;
  load?: number;
  free?: number;
  running?: number;
  waiting?: number;

};

export { useSystemMonitor, useSystemQueue } from './useSystemMonitor';

export const rawSystemMonitorOutput = {
  "Longhorn": {
    "display_name": "Longhorn",
    "tas_name": "longhorn3",
    "hostname": "longhorn.tacc.utexas.edu",
    "system_type": "COMPUTE",
    "timestamp": "2022-11-07T14:30:02.709924+00:00",
    "online": true,
    "reachable": true,
    "queues_down": false,
    "load": 0.5865,
    "running": 13,
    "waiting": 6,
    "in_maintenance": false,
    "next_maintenance": null,
    "reservations": []
  },
  "Stampede2": {
    "display_name": "Stampede2",
    "tas_name": "stampede4",
    "hostname": "stampede2.tacc.utexas.edu",
    "system_type": "COMPUTE",
    "timestamp": "2022-11-07T14:30:06.059382+00:00",
    "online": true,
    "reachable": true,
    "queues_down": false,
    "load": 0.5965,
    "running": 412,
    "waiting": 437,
    "in_maintenance": false,
    "next_maintenance": null,
    "reservations": [
      {
        "name": "float_dev",
        "begin_time": "2022-11-07T10:31:15-06:00",
        "end_time": "2023-11-07T10:31:15-06:00"
      }
    ]
  },
  "Maverick2": {
    "display_name": "Maverick2",
    "tas_name": "maverick3",
    "hostname": "maverick2.tacc.utexas.edu",
    "system_type": "COMPUTE",
    "timestamp": "2022-11-07T14:30:15.071987+00:00",
    "online": true,
    "reachable": true,
    "queues_down": false,
    "load": 0.2,
    "running": 6,
    "waiting": 0,
    "in_maintenance": false,
    "next_maintenance": null,
    "reservations": []
  },
  "Frontera": {
    "display_name": "Frontera",
    "tas_name": "frontera",
    "hostname": "frontera.tacc.utexas.edu",
    "system_type": "COMPUTE",
    "timestamp": "2022-11-07T14:30:21.414811+00:00",
    "online": true,
    "reachable": true,
    "queues_down": false,
    "load": 0.971,
    "running": 365,
    "waiting": 247,
    "in_maintenance": false,
    "next_maintenance": null,
    "reservations": [
      {
        "name": "DAOS",
        "begin_time": "2021-06-09T15:32:33-05:00",
        "end_time": "2024-01-25T12:00:00-06:00"
      },
      {
        "name": "HPC_SI_day4",
        "begin_time": "2022-11-10T11:00:00-06:00",
        "end_time": "2022-11-10T17:30:00-06:00"
      },
      {
        "name": "float+dev",
        "begin_time": "2022-11-07T10:30:26-06:00",
        "end_time": "2023-11-07T10:30:26-06:00"
      }
    ]
  },
  "Lonestar6": {
    "display_name": "Lonestar6",
    "tas_name": "lonestar6",
    "hostname": "ls6.tacc.utexas.edu",
    "system_type": "COMPUTE",
    "timestamp": "2022-11-07T14:30:28.787394+00:00",
    "online": true,
    "reachable": true,
    "queues_down": false,
    "load": 0.6007,
    "running": 161,
    "waiting": 38,
    "in_maintenance": false,
    "next_maintenance": null,
    "reservations": []
  }
};

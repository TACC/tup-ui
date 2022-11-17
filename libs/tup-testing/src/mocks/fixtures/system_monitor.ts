export const rawSystemMonitorOutput = { 
  "Longhorn": 
  { 
    "display_name": "Longhorn",
    "tas_name": "longhorn3", 
    "hostname": "longhorn.tacc.utexas.edu", 
    "system_type": "COMPUTE", 
    "timestamp": "2022-11-17T15:05:02.978925+00:00", 
    "online": true, 
    "reachable": true, 
    "queues_down": false, 
    "load": 0.7885, 
    "running": 12, 
    "waiting": 0, 
    "in_maintenance": false, 
    "next_maintenance": null, 
    "reservations": [] }, 
  "Stampede2": 
  { 
    "display_name": "Stampede2", 
    "tas_name": "stampede4", 
    "hostname": "stampede2.tacc.utexas.edu", 
    "system_type": "COMPUTE", 
    "timestamp": "2022-11-17T15:05:06.310530+00:00", 
    "online": true, 
    "reachable": true, 
    "queues_down": false, 
    "load": 0.7267, 
    "running": 667, 
    "waiting": 235, 
    "in_maintenance": false, 
    "next_maintenance": null, 
    "reservations": [
      { 
        "name": "float_dev", 
        "begin_time": "2022-11-17T11:06:16-06:00", 
        "end_time": "2023-11-17T11:06:16-06:00" 
      }
    ] 
  }, 
  "Maverick2": 
  { 
    "display_name": "Maverick2", 
    "tas_name": "maverick3", 
    "hostname": "maverick2.tacc.utexas.edu", 
    "system_type": "COMPUTE", 
    "timestamp": "2022-11-17T15:05:16.064818+00:00", 
    "online": true, 
    "reachable": true, 
    "queues_down": false, 
    "load": 0.1, 
    "running": 3,
    "waiting": 0, 
    "in_maintenance": false, 
    "next_maintenance": null, 
    "reservations": [] 
  }, 
  "Lonestar6":
  { 
    "display_name": "Lonestar6", 
    "tas_name": "lonestar6", 
    "hostname": "ls6.tacc.utexas.edu", 
    "system_type": "COMPUTE", 
    "timestamp": "2022-11-17T15:05:22.508783+00:00", 
    "online": true, 
    "reachable": true, 
    "queues_down": false, 
    "load": 0.8814, 
    "running": 208, 
    "waiting": 105, 
    "in_maintenance": false, 
    "next_maintenance": null, 
    "reservations": [
      {
        "name": "additional_gpus_testing", 
        "begin_time": "2022-11-07T16:58:34-06:00", 
        "end_time": "2022-12-31T00:00:00-06:00" 
      }, 
      {
        "name": "MPI_testing", 
        "begin_time": "2022-11-16T11:13:00-06:00", 
        "end_time": "2022-12-31T00:00:00-06:00" 
      }
    ]
  }, 
  "Frontera":
  {
    "display_name": "Frontera", 
    "tas_name": "frontera", 
    "hostname": "frontera.tacc.utexas.edu", 
    "system_type": "COMPUTE", 
    "timestamp": "2022-11-17T15:05:26.152479+00:00", 
    "online": true, 
    "reachable": true, 
    "queues_down": false, 
    "load": 0.9693, 
    "running": 522, 
    "waiting": 389, 
    "in_maintenance": false, 
    "next_maintenance": null, 
    "reservations": [
      { 
        "name": "DAOS", 
        "begin_time": "2021-06-09T15:32:33-05:00", 
        "end_time": "2024-01-25T12:00:00-06:00" 
      }, 
      { 
        "name": "float+dev", 
        "begin_time": "2022-11-17T11:05:37-06:00", 
        "end_time": "2023-11-17T11:05:37-06:00" 
      }
    ] 
  } 
};

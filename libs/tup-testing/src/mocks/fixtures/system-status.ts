export const rawSystemMonitorOutput = [
  {
    display_name: 'Stampede2',
    tas_name: 'stampede4',
    hostname: 'stampede2.tacc.utexas.edu',
    system_type: 'COMPUTE',
    timestamp: '2022-11-21T21:35:03.189706+00:00',
    online: true,
    reachable: true,
    queues_down: false,
    load: 0.83,
    running: 655,
    waiting: 196,
    in_maintenance: false,
    next_maintenance: null,
    reservations: [
      {
        name: 'float_dev',
        begin_time: '2022-11-21T17:36:14-06:00',
        end_time: '2023-11-21T17:36:14-06:00',
      },
    ],
  },
  {
    display_name: 'Longhorn',
    tas_name: 'longhorn3',
    hostname: 'longhorn.tacc.utexas.edu',
    system_type: 'COMPUTE',
    timestamp: '2022-11-21T21:35:14.019409+00:00',
    online: true,
    reachable: true,
    queues_down: false,
    load: 0.625,
    running: 18,
    waiting: 0,
    in_maintenance: false,
    next_maintenance: null,
    reservations: [
      {
        name: 'Retirement-2022-11-24',
        begin_time: '2022-11-24T09:00:00-06:00',
        end_time: '2023-02-01T19:39:00-06:00',
      },
    ],
  },
  {
    display_name: 'Maverick2',
    tas_name: 'maverick3',
    hostname: 'maverick2.tacc.utexas.edu',
    system_type: 'COMPUTE',
    timestamp: '2022-11-21T21:35:21.348912+00:00',
    online: true,
    reachable: true,
    queues_down: false,
    load: 0.0667,
    running: 2,
    waiting: 0,
    in_maintenance: false,
    next_maintenance: null,
    reservations: [],
  },
  {
    display_name: 'Lonestar6',
    tas_name: 'lonestar6',
    hostname: 'ls6.tacc.utexas.edu',
    system_type: 'COMPUTE',
    timestamp: '2022-11-21T21:35:17.411427+00:00',
    online: true,
    reachable: true,
    queues_down: false,
    load: 0.8093,
    running: 243,
    waiting: 0,
    in_maintenance: false,
    next_maintenance: '2022-12-06T08:00:00-06:00',
    reservations: [
      {
        name: 'additional_gpus_testing',
        begin_time: '2022-11-07T16:58:34-06:00',
        end_time: '2022-12-31T00:00:00-06:00',
      },
      {
        name: 'MPI_testing',
        begin_time: '2022-11-16T11:13:00-06:00',
        end_time: '2022-12-31T00:00:00-06:00',
      },
    ],
  },
  {
    display_name: 'Frontera',
    tas_name: 'frontera',
    hostname: 'frontera.tacc.utexas.edu',
    system_type: 'COMPUTE',
    timestamp: '2022-11-21T21:35:27.647101+00:00',
    online: true,
    reachable: true,
    queues_down: true,
    load: 0.9437000000000001,
    running: 441,
    waiting: 191,
    in_maintenance: false,
    next_maintenance: null,
    reservations: [
      {
        name: 'DAOS',
        begin_time: '2021-06-09T15:32:33-05:00',
        end_time: '2024-01-25T12:00:00-06:00',
      },
      {
        name: 'float+dev',
        begin_time: '2022-11-21T17:35:33-06:00',
        end_time: '2023-11-21T17:35:33-06:00',
      },
    ],
  },
];

export const mockSystemStatus = [
  {
    "display_name": "Frontera",
    "tas_name": "frontera",
    "hostname": "frontera.tacc.utexas.edu",
    "system_type": "COMPUTE",
    "timestamp": "2023-07-14T18:50:18.476296+00:00",
    "queues": [
        {
            "name": "development",
            "down": false,
            "hidden": false,
            "load": 0.9333333333333333,
            "free": 24,
            "running": 17,
            "waiting": 7
        },
        {
            "name": "flex",
            "down": false,
            "hidden": false,
            "load": 0.9725181598062954,
            "free": 227,
            "running": 16,
            "waiting": 0
        },
        {
            "name": "large",
            "down": false,
            "hidden": false,
            "load": 0.9736513486513486,
            "free": 211,
            "running": 3,
            "waiting": 8
        },
        {
            "name": "normal",
            "down": false,
            "hidden": false,
            "load": 0.9736513486513486,
            "free": 211,
            "running": 135,
            "waiting": 558
        },
        {
            "name": "nvdimm",
            "down": false,
            "hidden": false,
            "load": 0.5,
            "free": 8,
            "running": 3,
            "waiting": 0
        },
        {
            "name": "rtx",
            "down": false,
            "hidden": false,
            "load": 0.7976190476190477,
            "free": 17,
            "running": 34,
            "waiting": 0
        },
        {
            "name": "rtx-dev",
            "down": false,
            "hidden": false,
            "load": 0.16666666666666666,
            "free": 5,
            "running": 0,
            "waiting": 0
        },
        {
            "name": "small",
            "down": false,
            "hidden": false,
            "load": 0.9629629629629629,
            "free": 8,
            "running": 116,
            "waiting": 21
        }
    ]
}
]

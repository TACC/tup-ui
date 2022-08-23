export const systemList = [
  {
    hostname: 'frontera.tacc.utexas.edu',
    display_name: 'Frontera',
    ssh: {
      type: 'ssh',
      status: true,
      timestamp: '2022-08-23T18:57:01Z',
    },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-23T18:57:01Z',
    },
    status_tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-23T19:00:01.544Z',
      },
      ssh: {
        type: 'ssh',
        status: true,
        timestamp: '2022-08-23T18:57:01.879Z',
      },
    },
    resource_type: 'compute',
    jobs: {
      running: 219,
      queued: 407,
      other: 164,
    },
    load_percentage: 99,
    cpu_count: 472200,
    cpu_used: 468976,
    is_operational: true,
  },
  {
    hostname: 'lonestar6.tacc.utexas.edu',
    display_name: 'Lonestar6',
    ssh: {
      type: 'ssh',
      status: true,
      timestamp: '2022-08-23T18:57:01Z',
    },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-23T18:57:01Z',
    },
    status_tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-23T19:00:01.671Z',
      },
      ssh: {
        type: 'ssh',
        status: true,
        timestamp: '2022-08-23T18:57:01.989Z',
      },
    },
    resource_type: 'compute',
    jobs: {
      running: 248,
      queued: 192,
      other: 19,
    },
    load_percentage: 86,
    cpu_count: 72928,
    cpu_used: 62720,
    is_operational: true,
  },
  {
    hostname: 'stampede2.tacc.utexas.edu',
    display_name: 'Stampede2',
    ssh: {
      type: 'ssh',
      status: true,
      timestamp: '2022-08-22T15:18:02Z',
    },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-22T15:18:02Z',
    },
    status_tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-22T15:18:02.359Z',
      },
      ssh: {
        type: 'ssh',
        status: true,
        timestamp: '2022-08-22T15:18:02.366Z',
      },
    },
    resource_type: 'compute',
    jobs: {
      running: 497,
      queued: 266,
      other: 107,
    },
    load_percentage: 92,
    cpu_count: 1223040,
    cpu_used: 1131856,
    is_operational: false,
  },
  {
    hostname: 'maverick2.tacc.utexas.edu',
    display_name: 'Maverick2',
    resource_type: 'compute',
    jobs: {
      running: 15,
      queued: 2,
      other: 0,
    },
    load_percentage: 85,
    cpu_count: 748,
    cpu_used: 636,
  },
  {
    hostname: 'longhorn.tacc.utexas.edu',
    display_name: 'Longhorn',
    ssh: {
      type: 'ssh',
      status: true,
      timestamp: '2022-08-23T18:57:02Z',
    },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-23T18:57:02Z',
    },
    status_tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-23T18:57:02.262Z',
      },
      ssh: {
        type: 'ssh',
        status: true,
        timestamp: '2022-08-23T18:57:02.266Z',
      },
    },
    resource_type: 'compute',
    jobs: {
      running: 11,
      queued: 3,
      other: 1,
    },
    load_percentage: 46,
    cpu_count: 16000,
    cpu_used: 7360,
    is_operational: true,
  },
];

export const systemListRaw = {
  'lonestar6.tacc.utexas.edu': {
    hostname: 'lonestar6.tacc.utexas.edu',
    displayName: 'Lonestar6',
    ssh: {
      type: 'ssh',
      status: true,
      timestamp: '2022-08-23T19:00:01Z',
    },
    tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-23T19:00:01.671Z',
      },
      ssh: {
        type: 'ssh',
        status: true,
        timestamp: '2022-08-23T19:00:01.673Z',
      },
    },
    timestamp: '2022-08-23T19:00:02.927Z',
    jobs: {
      running: 248,
      queued: 192,
      other: 19,
    },
    totalCpu: 72928,
    usedCpu: 60672,
    load: 0.8319438350153576,
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-23T19:00:01Z',
    },
  },
  'frontera.tacc.utexas.edu': {
    hostname: 'frontera.tacc.utexas.edu',
    displayName: 'Frontera',
    tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-23T19:00:01.544Z',
      },
      ssh: {
        type: 'ssh',
        status: true,
        timestamp: '2022-08-23T19:00:01.546Z',
      },
    },
    timestamp: '2022-08-23T18:57:05.066Z',
    jobs: {
      running: 219,
      queued: 407,
      other: 164,
    },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-23T19:00:01Z',
    },
    ssh: {
      type: 'ssh',
      status: true,
      timestamp: '2022-08-23T19:00:01Z',
    },
    totalCpu: 472200,
    usedCpu: 468976,
    load: 0.9931723845828039,
  },
  'stampede2.tacc.utexas.edu': {
    hostname: 'stampede2.tacc.utexas.edu',
    displayName: 'Stampede2',
    tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-11T17:39:02.746Z',
      },
      ssh: {
        type: 'ssh',
        status: true,
        timestamp: '2022-08-11T17:39:02.750Z',
      },
    },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-11T17:39:02Z',
    },
    ssh: {
      type: 'ssh',
      status: true,
      timestamp: '2022-08-11T17:39:02Z',
    },
    timestamp: '2022-08-11T17:39:10.954Z',
    jobs: {
      running: 570,
      queued: 598,
      other: 158,
    },
    totalCpu: 1223040,
    usedCpu: 1119776,
    load: 0.9155677655677655,
  },
  'longhorn.tacc.utexas.edu': {
    timestamp: '2022-08-23T19:00:02.094Z',
    hostname: 'longhorn.tacc.utexas.edu',
    displayName: 'Longhorn',
    jobs: {
      running: 11,
      queued: 3,
      other: 1,
    },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-23T19:00:02Z',
    },
    totalCpu: 16000,
    usedCpu: 7360,
    load: 0.46,
    ssh: {
      type: 'ssh',
      status: true,
      timestamp: '2022-08-23T19:00:02Z',
    },
    tests: {
      ssh: {
        type: 'ssh',
        status: true,
        timestamp: '2022-08-23T19:00:02.047Z',
      },
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-23T19:00:02.042Z',
      },
    },
  },
  'maverick2.tacc.utexas.edu': {
    timestamp: '2022-08-23T19:00:02.962Z',
    hostname: 'maverick2.tacc.utexas.edu',
    displayName: 'Maverick2',
    jobs: {
      running: 15,
      queued: 2,
      other: 0,
    },
    totalCpu: 748,
    usedCpu: 636,
    load: 0.8502673796791443,
  },
};

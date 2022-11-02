export const rawSystemMonitorOutput = {
  'lonestar6.tacc.utexas.edu': {
    hostname: 'lonestar6.tacc.utexas.edu',
    displayName: 'Lonestar6',
    ssh: { type: 'ssh', status: true, timestamp: '2022-08-24T00:54:02Z' },
    tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-24T00:54:02.111Z',
      },
      ssh: { type: 'ssh', status: true, timestamp: '2022-08-24T00:54:02.114Z' },
    },
    timestamp: '2022-08-24T00:54:03.509Z',
    jobs: { running: 320, queued: 189, other: 5 },
    totalCpu: 72928,
    usedCpu: 67200,
    load: 0.9214567792891619,
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-24T00:54:02Z',
    },
  },
  'frontera.tacc.utexas.edu': {
    hostname: 'frontera.tacc.utexas.edu',
    displayName: 'Frontera',
    tests: {
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-24T00:54:02.153Z',
      },
      ssh: { type: 'ssh', status: true, timestamp: '2022-08-24T00:54:02.155Z' },
    },
    timestamp: '2022-08-24T00:54:10.093Z',
    jobs: { running: 263, queued: 520, other: 160 },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-24T00:54:02Z',
    },
    ssh: { type: 'ssh', status: true, timestamp: '2022-08-24T00:54:02Z' },
    totalCpu: 472200,
    usedCpu: 463600,
    load: 0.9817873782295637,
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
      ssh: { type: 'ssh', status: true, timestamp: '2022-08-11T17:39:02.750Z' },
    },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-11T17:39:02Z',
    },
    ssh: { type: 'ssh', status: true, timestamp: '2022-08-11T17:39:02Z' },
    timestamp: '2022-08-11T17:39:10.954Z',
    jobs: { running: 570, queued: 598, other: 158 },
    totalCpu: 1223040,
    usedCpu: 1119776,
    load: 0.9155677655677655,
  },
  'longhorn.tacc.utexas.edu': {
    timestamp: '2022-08-24T00:54:02.782Z',
    hostname: 'longhorn.tacc.utexas.edu',
    displayName: 'Longhorn',
    jobs: { running: 11, queued: 3, other: 2 },
    heartbeat: {
      type: 'heartbeat',
      status: true,
      timestamp: '2022-08-24T00:54:02Z',
    },
    totalCpu: 16000,
    usedCpu: 7200,
    load: 0.45,
    ssh: { type: 'ssh', status: true, timestamp: '2022-08-24T00:54:02Z' },
    tests: {
      ssh: { type: 'ssh', status: true, timestamp: '2022-08-24T00:54:02.578Z' },
      heartbeat: {
        type: 'heartbeat',
        status: true,
        timestamp: '2022-08-24T00:54:02.574Z',
      },
    },
  },
  'maverick2.tacc.utexas.edu': {
    timestamp: '2022-08-24T00:54:02.576Z',
    hostname: 'maverick2.tacc.utexas.edu',
    displayName: 'Maverick2',
    jobs: { running: 16, queued: 1, other: 0 },
    totalCpu: 748,
    usedCpu: 428,
    load: 0.5721925133689839,
  },
};

export const systemMonitorOutput = [
  {
    hostname: 'frontera.tacc.utexas.edu',
    display_name: 'Frontera',
    isOperational: true,
    loadPercentage: 98.17873782295638,
    jobs: {
      running: 263,
      queued: 520,
      other: 160,
    },
  },
  {
    hostname: 'stampede2.tacc.utexas.edu',
    display_name: 'Stampede2',
    isOperational: true,
    loadPercentage: 91.55677655677655,
    jobs: {
      running: 570,
      queued: 598,
      other: 158,
    },
  },
  {
    hostname: 'maverick2.tacc.utexas.edu',
    display_name: 'Maverick2',
    isOperational: true,
    loadPercentage: 57.21925133689839,
    jobs: {
      running: 16,
      queued: 1,
      other: 0,
    },
  },
  {
    hostname: 'longhorn.tacc.utexas.edu',
    display_name: 'Longhorn',
    isOperational: true,
    loadPercentage: 45,
    jobs: {
      running: 11,
      queued: 3,
      other: 2,
    },
  },
];

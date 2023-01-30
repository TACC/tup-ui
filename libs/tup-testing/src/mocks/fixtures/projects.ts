export const mockProjectsOutput = [
  {
    id: 59184,
    title: 'JAR TUP Development Project',
    description:
      'Development project for testing PI-specific endpoints in the redesigned user portal.',
    chargeCode: 'STA22002',
    gid: 825495,
    source: null,
    primaryFieldID: 42,
    secondaryFieldID: 0,
    typeId: 0,
    pi: {
      id: 87943,
      username: 'jarosenb',
      role: null,
      firstName: 'Jake',
      middleInitial: '',
      lastName: 'Rosenberg',
      email: 'jrosenberg@tacc.utexas.edu',
      vislabTrained: false,
      staff: false,
    },
    allocations: [
      {
        id: 90474,
        start: '2022-10-31T00:00:00',
        end: '2023-09-30T00:00:00',
        type: null,
        total: 10,
        used: 0,
        resource: 'Lonestar6',
        status: 'Active',
        storageQuota: 0,
        myUsage: 0,
        storageUsed: 0,
        justification: 'Admin-created allocation.',
        computeRequested: 10,
        storageRequested: 0,
        memoryRequested: 0,
        increases: [],
      },
    ],
    role: 'Delegate',
    users: null,
  },
];

export const MockProjectUsers = [
  {
    id: 1418897,
    username: 'jarosenb',
    role: 'PI',
    firstName: 'Jake',
    middleInitial: null,
    lastName: 'Rosenberg',
    email: 'jrosenberg@tacc.utexas.edu',
    vislabTrained: null,
    staff: null,
  },
  {
    id: 1418898,
    username: 'vg5726',
    role: 'Standard',
    firstName: 'Vanessa',
    middleInitial: null,
    lastName: 'Gonzalez',
    email: 'vgonzalez@tacc.utexas.edu',
    vislabTrained: null,
    staff: null,
  },
  {
    id: 1419485,
    username: 'smassie',
    role: 'Delegate',
    firstName: 'Sophia',
    middleInitial: null,
    lastName: 'Massie',
    email: 'sophia.massie@austin.utexas.edu',
    vislabTrained: null,
    staff: null,
  },
];

export const mockProjectUsage = {
  allocationId: 90474,
  usage: [
    { username: 'jarosenb', usage: 5 },
    { username: 'smassie', usage: 0.01 },
    { username: 'vg5726', usage: 0 },
  ],
};

export const mockProjectFieldOfScience = [
  {
    id: 42,
    depth: 1,
    name: 'Center Systems Staff (STA)',
  },
];

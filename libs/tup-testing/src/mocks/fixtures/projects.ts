export const mockProjectsOutput = [
  {
    id: 59184,
    title: 'JAR TUP Development Project',
    description:
      'Development project for testing PI-specific endpoints in the redesigned user portal.',
    chargeCode: 'STA22002',
    gid: 825495,
    source: null,
    fieldId: 42,
    secondaryFieldId: 0,
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

export const mockProjectPubs = [
  {
    id: 7852,
    authors:
      'Elizabeth Litvina, Amy Adams, Alison Barth, Marcel Bruchez, James Carson, Jason E Chung, Kristin B D',
    title:
      'BRAIN initiative: cutting-edge tools and resources for the community',
    yearPublished: 2019,
    publisher: 'Society for Neuroscience',
    url: 'https://doi.org/10.1523/JNEUROSCI.1169-19.2019',
    venue: 'Journal of Neuroscience',
    userCitedTacc: true,
  },
];

export const mockProjectGrants = [
  {
    id: 7416,
    title:
      'NeuroNex Technology Hub: Enhanced resolution for 3DEM analysis of synapses across brain regions and taxa',
    fundingAgency: 'NSF',
    field: 'Neuroscience Program',
    piName: 'Kristen Harris',
    awardNumber: '1707356',
    awardAmount: 9650000.0,
    start: '2017-08-01T00:00:00',
    end: '2022-07-31T00:00:00',
    nsfStatusCode: 'Awarded   ',
    grantNumber: null,
    fieldId: 115,
  },
  {
    id: 7417,
    title:
      'NeuroNex: Enabling Identification and Impact of Synaptic Weight in Functional Networks',
    fundingAgency: 'NSF',
    field: 'Neuroscience Program',
    piName: 'Kristen Harris',
    awardNumber: '2014862',
    awardAmount: 17500000.0,
    start: '2020-08-15T00:00:00',
    end: '2025-07-31T00:00:00',
    nsfStatusCode: 'Awarded   ',
    grantNumber: null,
    fieldId: 115,
  },
];

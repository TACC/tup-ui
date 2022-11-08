export const rawActiveProjectsOutput = {
    'activeProject1': {
        id: 0,
        title: "Fake Title",
        description: "string",
        chargeCode: "string",
        gid: 0,
        source: "string",
        fieldId: 0,
        secondaryFieldId: 0,
        typeId: 0,
        pi: {
            id: 0,
            username: "fake username",
            role: "string",
            firstName: "string",
            middleInitial: "string",
            lastName: "string",
            email: "string",
            vislabTrained: true,
            staff: true
          },
        allocations: {
            id: 0,
            start: "2022-11-07T19:29:28.962Z",
            end: "2022-11-07T19:29:28.962Z",
            type: "string",
            total: 0,
            used: 0,
            resource: "string",
            status: "string",
            storageQuota: 0,
            myUsage: 0,
            storageUsed: 0,
            justification: "string",
            computeRequested: 0,
            storageRequested: 0,
            memoryRequested: 0,
            increases: {
                id: 0,
                allocationId: 0,
                susRequested: 0,
                susGranted: 0,
                justification: "string",
                decisionSummary: "string"
                }
            },
          role: "string",
          users: {
            id: 0,
            username: "string",
            role: "string",
            firstname: "string",
            middleInitial: "string",
            lastName: "string",
            email: "string",
            vislabTrained: true,
            staff: true
          }
    },
  };
  
  export const activeProjectsOutput = [
    {
      id: 0,
      project_title: "Fake Title",
      principle_investigator: {username: "fake username"},
      allocations: { id: 0 }
    },
  ];
  
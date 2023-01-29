from django.views.generic.base import TemplateView

def get_latest_articles(count = 5):
  recent_articles = [
    {
      "ID": "107433",
      "Updates": None,
      "Author": "Matthew Edeker",
      "PostedDate": "2023-01-28T13:18:24.247000",
      "AnnouncementDate": "2023-01-28T00:00:00",
      "ArchiveDate": "2023-07-28T00:00:00",
      "Title": "Stampede2 Status Saturday 28 January 2023",
      "Subtitle": None,
      "WebTitle": "Stampede2 Status Saturday 28 January 2023",
      "Content": "Stampede2 is currently experiencing issues with the /scratch filesystem and queues will remain down for a prolonged duration as the issues are investigated. Please submit any questions you may have via the TACC User Portal. https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107432",
      "Updates": None,
      "Author": "Mark Brueschke",
      "PostedDate": "2023-01-18T15:47:57.833000",
      "AnnouncementDate": "2023-01-18T00:00:00",
      "ArchiveDate": "2023-07-18T00:00:00",
      "Title": "January 2023 Texascale Days",
      "Subtitle": None,
      "WebTitle": "January 2023 Texascale Days",
      "Content": "Frontera is currently reserved for Texascale Days - very large scale runs of at least half system size (3500 - 4096 nodes) or full system size (7000 - 8192 nodes) this week. All production queues with the exception of the rtx and nvdimm queues are reserved for Texascale Days until Sunday, January 22nd at 09:00 (CST)."
    },
    {
      "ID": "107431",
      "Updates": None,
      "Author": "mark brueschke",
      "PostedDate": "2023-01-10T08:07:53.313000",
      "AnnouncementDate": "2023-01-10T00:00:00",
      "ArchiveDate": "2023-07-10T00:00:00",
      "Title": "Lonestar6 Scratch Cleanup 1/10/23",
      "Subtitle": None,
      "WebTitle": "Lonestar6 Scratch Cleanup 1/10/23",
      "Content": "Lonestar6 scratch file system usage has steadily increased over the production life of the system and has now reached thresholds for active maintenance (near 90%).We request that all users remove any unused, old, and duplicate data from their scratch directory as soon as possible. We would also like to remind users to read the policies on /scratch usage in the user guide and keep in mind that offering filesystems with no quotas will always require active clean-up. We're hoping for assistance from the Ls6 user community with that clean-up. If a significant reduction of data is not observed over the coming days, we will proceed to remove old data on behalf of users. Please also note that actively attempting to avoid the purge processes is behavior that will be monitored for, is extremely unfair on other Ls6 users, and will result in account suspension. We thank you in advance for your understanding and thank you to all users who are pro-actively managing their data usage.Please submit any questions you may have via the TACC User Portal.https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107430",
      "Updates": None,
      "Author": "mark brueschke",
      "PostedDate": "2023-01-04T08:03:24.523000",
      "AnnouncementDate": "2023-01-04T00:00:00",
      "ArchiveDate": "2023-07-04T00:00:00",
      "Title": "Corral Maintenance Tuesday 17 & 24 January 2023",
      "Subtitle": None,
      "WebTitle": "Corral Maintenance Tuesday 17 & 24 Jan 2023",
      "Content": "From 9AM to 10AM (CST) January 17th and again on January 24th 2023, users may experience a brief interruption in direct access to Corral on data.tacc.utexas.edu, gridftp.corral.tacc.utexas.edu and secure.corral.tacc.utexas.edu, as we prepare for background software updates. Similar brief interruptions may be experienced on virtual machines with Corral mounts.Users who experience interruptions during this time are requested to retry their operations after the maintenance preparation period ends.Please submit any questions you may have via the TACC User Portal. https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107429",
      "Updates": None,
      "Author": "mark brueschke",
      "PostedDate": "2023-01-04T07:37:51.827000",
      "AnnouncementDate": "2023-01-04T00:00:00",
      "ArchiveDate": "2023-07-04T00:00:00",
      "Title": "Frontera Maintenance Tuesday 17 January 2023",
      "Subtitle": None,
      "WebTitle": "Frontera Maintenance Tuesday 17 January 2023",
      "Content": "Frontera will not be available from 8 AM to 7:30 PM (CST) on Tuesday, 17 January 2023. System maintenance will be performed during this time.Please submit any questions you may have via the TACC User Portal. https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107428",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102917",
            "PostedDate": "2022-12-16T15:01:01",
            "Content": "Lonestar6 is back in full production. Queues have been opened and disruption to the SCRATCH filesystem should now resolved."
          },
          {
            "ID": "102916",
            "PostedDate": "2022-12-15T19:13:05.787000",
            "Content": "Lonestar6 will be in an extended emergency maintenance. There will be a disruption to jobs and the SCRATCH filesystem."
          }
        ]
      },
      "Author": "Alex Ferrier",
      "PostedDate": "2022-12-15T16:36:00.650000",
      "AnnouncementDate": "2022-12-15T00:00:00",
      "ArchiveDate": "2023-06-15T00:00:00",
      "Title": "Lonestar6 Down - 15 December 2022 4:33PM CST",
      "Subtitle": None,
      "WebTitle": "Lonestar6 Down - 15 December 2022 4:33PM CST",
      "Content": "Lonestar6 is currently experiencing SCRATCH filesystem issues. Queues have been closed and you may see delayed activity while on SCRATCH. We are actively troubleshooting and working towards getting the system back into full production.Please submit any questions you may have via the TACC User Portal.\nhttps://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107427",
      "Updates": None,
      "Author": "Mark Brueschke",
      "PostedDate": "2022-12-06T12:07:29.227000",
      "AnnouncementDate": "2022-12-06T00:00:00",
      "ArchiveDate": "2023-06-06T00:00:00",
      "Title": "TACC Network Maintenance Sunday January 8th 2023",
      "Subtitle": None,
      "WebTitle": "TACC Network Maintenance Sunday January 8th",
      "Content": "Network maintenance will be carried out between 10:00 AM and 4:00 PM (CST) on Sunday, January 8th. Access to all TACC systems will be unavailable during this time. Jobs will continue to run, but users will have no access to TACC services and systems until the upgrade is complete. Please submit any questions you may have via the TACC User Portal. https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107426",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102919",
            "PostedDate": "2022-12-18T15:09:23.800000",
            "Content": "Ranch has returned to production at this time."
          },
          {
            "ID": "102918",
            "PostedDate": "2022-12-17T17:31:38.160000",
            "Content": "Maintenance has been extended. TACC will post when maintenance has been concluded. "
          }
        ]
      },
      "Author": "Mark Brueschke",
      "PostedDate": "2022-12-06T11:25:47.787000",
      "AnnouncementDate": "2022-12-06T00:00:00",
      "ArchiveDate": "2023-06-06T00:00:00",
      "Title": "Ranch Maintenance Saturday 17 December 2022",
      "Subtitle": None,
      "WebTitle": "Ranch Maintenance Saturday 17 December 2022",
      "Content": "Ranch will not be available from 7:00 AM until 6:00 PM (CST) on Saturday, 17 December 2022. Facility maintenance will be performed during this time. Please submit any questions you may have via the TACC User Portal.https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107425",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-12-05T11:32:27.157000",
      "AnnouncementDate": "2022-12-05T00:00:00",
      "ArchiveDate": "2023-06-05T00:00:00",
      "Title": "Out of operation: Learn.tacc to be replaced",
      "Subtitle": None,
      "WebTitle": "Learn.tacc to be replaced",
      "Content": "Good morning. After several years, the Learn.tacc site has experienced recent technical difficulties, and is no longer functional. A new webpage for learning resources will be available after the holidays. Until then, we will be using other means to show and manage upcoming training opportunities. Stay tuned for announcements like these as well as our Twitter feed, which will be our interim means to distribute training information and registration links. Please check out TACC's YouTube channel for recordings of past training events: https://www.youtube.com/@texasadvancedcomputingcent1015/videosThank you for your patience and we apologize for the inconvenience. - TACC Staff"
    },
    {
      "ID": "107424",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102915",
            "PostedDate": "2022-12-08T14:26:02.903000",
            "Content": "Gitlab upgrade finished.Please submit any further questions you may have via the TACC User Portal.https://portal.tacc.utexas.edu/tacc-consulting"
          }
        ]
      },
      "Author": "Mark Brueschke",
      "PostedDate": "2022-12-01T10:42:09.820000",
      "AnnouncementDate": "2022-12-01T00:00:00",
      "ArchiveDate": "2023-06-01T00:00:00",
      "Title": "Gitlab Maintenance Thursday 8 December 2022",
      "Subtitle": None,
      "WebTitle": "Gitlab Maintenance Thursday 8 December 2022",
      "Content": "Gitlab will be unavailable from 8:00AM through 5:00PM (CST) on Thursday, 8 December for maintenance and updates.If you have any questions or concerns about the transition please reach out to us here: https://portal.tacc.utexas.edu/tacc-consulting."
    },
    {
      "ID": "107423",
      "Updates": None,
      "Author": "Alex Ferrier",
      "PostedDate": "2022-11-29T16:56:27.757000",
      "AnnouncementDate": "2022-11-29T00:00:00",
      "ArchiveDate": "2023-05-29T00:00:00",
      "Title": "Maverick2 Maintenance 6 December 2022",
      "Subtitle": None,
      "WebTitle": "Maverick2 Maintenance 6 December 2022",
      "Content": "Maverick2 will be taking scheduled maintenance Tuesday, 6 December 2022. OS, software, and core package upgrades will be rolled out system wide.Please submit any questions you may have via the TACC User Portal.\nhttps://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107422",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102914",
            "PostedDate": "2022-12-05T12:47:31.233000",
            "Content": "Due to the issues with Learn.tacc and the need for an interim registration method, registration for Containers @ TACC (tomorrow from 10 AM - 4 PM CST) has been extended through today at 3:00PM CST. To register for the Containers @ TACC tutorial, please fill out the form at this link: https://forms.gle/ao2TyvMmaRfzNZCEA IMPORTANT: If you registered previously through Learn.tacc and not the form above, please fill it out so we may provide you with links for the course and ensure your account is set to participate in labs. Thank you for your patience, and we are sorry for this inconvenience. Happy learning!"
          },
          {
            "ID": "102913",
            "PostedDate": "2022-11-30T13:57:11.937000",
            "Content": "Our apologies; We are in the process of implementing changes, and Learn.TACC -- our go-to registration site for TACC's free learning opportunities -- has been un-usable. To register for the Containers @ TACC tutorial, please fill out the form at this link: https://forms.gle/ao2TyvMmaRfzNZCEA IF YOU REGISTERED FOR THIS TUTORIAL ALREADY, we still need for you to fill out the form (it is very short) in order to provide you with links for the course via email and ensure you are able to take part in labs. This is because information from the original registration option on Learn.TACC has been rendered inaccessible. Thank you for your patience, and we are sorry for this inconvenience. Happy learning! \n"
          }
        ]
      },
      "Author": "Lauren Gant",
      "PostedDate": "2022-11-28T10:40:19.030000",
      "AnnouncementDate": "2022-11-28T00:00:00",
      "ArchiveDate": "2023-05-28T00:00:00",
      "Title": "Registration link: Containers@TACC - Tues. 12/6 10AM-4PM CST!",
      "Subtitle": None,
      "WebTitle": "Free tutorial: Containers @ TACC",
      "Content": "Containers @ TACC Software containers are an important common currency for portable and reproducible computing. Learn best practices on building, using, and sharing Docker and Singularity containers in this hands-on workshop. Also learn how to run those containers on TACC HPC systems, including MPI and GPU aware containers.\nTuesday, December 6th 10:00 AM - 4:00 PM CSTRegister for this free tutorial here: https://learn.tacc.utexas.edu/"
    },
    {
      "ID": "107421",
      "Updates": None,
      "Author": "Mark Brueschke",
      "PostedDate": "2022-11-22T07:44:29.397000",
      "AnnouncementDate": "2022-11-22T00:00:00",
      "ArchiveDate": "2023-05-22T00:00:00",
      "Title": "Longhorn Retirement Monday November 28 2022",
      "Subtitle": None,
      "WebTitle": "Longhorn Retirement Monday November 28 2022",
      "Content": "After three years in production, Longhorn is being retired at TACC and will be unavailable after Monday November 28 2022.The Longhorn queues will close for the final time at 9:00 AM (CST) on Thursday, November 24 2022. No jobs will be accepted that run past that date and time.Login nodes will remain available for data transfers through Monday, November 28 2022.All system access will be disabled beginning on Tuesday, November 29 2022. All TACC users with allocations on Longhorn are eligible to transfer to either Lonestar6 or Frontera. TACC staff are available to help with transitioning both allocations and workflows. Please submit a consulting ticket with the subject \"Longhorn Transition\" for more information about requesting allocations on Lonestar6 or Frontera. In preparation for retirement, TACC staff have already made an administrative backup of data on Longhorn’s home and scratch filesystems on November 18 2022. Any data created after that date will not have been included in the backups. To access your data, please open a consulting ticket. These backups will only be available until February 28 2023 - please reach out for assistance as soon as possible. If you need to back up additional data that has not been captured by the administrative backup (i.e. data that has been generated since November 18 2022), please refer to the Longhorn User Guide section on rsync.  If you have any questions or concerns about the transition please reach out to us here: https://portal.tacc.utexas.edu/tacc-consulting."
    },
    {
      "ID": "107419",
      "Updates": None,
      "Author": "Tim Cockerill",
      "PostedDate": "2022-11-14T12:12:03.803000",
      "AnnouncementDate": "2022-11-14T00:00:00",
      "ArchiveDate": "2023-01-31T00:00:00",
      "Title": "Upcoming Frontera allocations opportunities",
      "Subtitle": None,
      "WebTitle": "Upcoming Frontera allocations opportunities",
      "Content": "Please note there are two upcoming opportunities to submit proposals for Frontera allocations. -- Pathways/LSCP submission window Nov 15 – Dec 15, 2022 for allocations starting March 1, 2023.-- LRAC submission window Dec 1, 2022 – Jan 15, 2023 for allocation starting April 1, 2023. Pathways allocations are awarded four times a year and have a maximum of 250,000 node-hours, while LRAC allocations are only awarded once a year and have a maximum of 5,000,000 node hours. LSCP allocations, awarded four times a year, are unique in that they support a large and typically multi-institutional community of users working on the same research topic, who collectively justify the need for this scale of HPC resource but individually would not.  Visit the links below for further detail on the types of allocations available, proposal content requirements, request submission windows, award start dates, and how to request a Startup allocation:https://frontera-portal.tacc.utexas.edu/allocations/https://frontera-portal.tacc.utexas.edu/allocations/policy We strongly recommend utilizing a Startup allocation for benchmarking and performance analysis of your code, which is required for your LRAC, Pathways, or LSCP proposals. Request reviewers always prefer to see benchmarks and performance information from Frontera rather than other systems. We also encourage you to watch the recorded webinar “Writing a Successful Frontera Proposal with Scaling and Performance Reporting” https://www.youtube.com/watch?v=6rQcUU5X_GQ Please submit a ticket if you have any questions regarding Frontera allocations processes.https://portal.tacc.utexas.edu/tacc-consulting/-/consult/tickets/create Best regards,The Frontera Allocations Team "
    },
    {
      "ID": "107418",
      "Updates": None,
      "Author": "Mark Brueschke",
      "PostedDate": "2022-11-01T10:48:10.757000",
      "AnnouncementDate": "2022-11-01T00:00:00",
      "ArchiveDate": "2023-05-01T00:00:00",
      "Title": "Lonestar6 Emergency Maintenance Tuesday 1 November 2022",
      "Subtitle": None,
      "WebTitle": "Lonestar6 Emergency Maintenance Tuesday 1 Nov",
      "Content": "Lonestar6 has an issue with a cooling subsystem causing us to operate with a reduced node count until the fault can be resolved. We anticipate that all services will remain up, however available nodes in the normal queue will be reduced and therefore queue times impacted. We will post an updated timeline for return to full production as soon as that data is available.Please submit any questions you may have via the TACC User Portal. https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107417",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102911",
            "PostedDate": "2022-10-27T12:00:01.717000",
            "Content": "MFA service has been restored"
          }
        ]
      },
      "Author": "Mark Brueschke",
      "PostedDate": "2022-10-27T11:06:31.820000",
      "AnnouncementDate": "2022-10-27T00:00:00",
      "ArchiveDate": "2023-04-27T00:00:00",
      "Title": "MFA Generation Unavailable October 27 2022",
      "Subtitle": None,
      "WebTitle": "MFA Generation Unavailable October 27 2022",
      "Content": "The MFA Generation function in the TACC User Portal is currently unavailable. The web support team is aware and working to restore service as soon as possible. We will update TACC user news as soon as the issue is resolved. "
    },
    {
      "ID": "107415",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102910",
            "PostedDate": "2022-10-21T13:14:28.680000",
            "Content": "The filesystem (/work) is restored.Please submit any questions you may have via the TACC User Portal. https://portal.tacc.utexas.edu/tacc-consulting"
          }
        ]
      },
      "Author": "Mark Brueschke",
      "PostedDate": "2022-10-21T12:29:41.987000",
      "AnnouncementDate": "2022-10-21T00:00:00",
      "ArchiveDate": "2023-04-21T00:00:00",
      "Title": "Stockyard Emergency Maintenance October 21 2022",
      "Subtitle": None,
      "WebTitle": "Stockyard Emergency Maintenance October 21 20",
      "Content": "Stockyard filesystem (/work) is having an issue that's causing it to go through multiple failover cycles. Admins are attempting to identify the cause and restore the service as quickly as possible."
    },
    {
      "ID": "107414",
      "Updates": None,
      "Author": "Matthew Edeker",
      "PostedDate": "2022-10-17T13:08:16.870000",
      "AnnouncementDate": "2022-10-17T00:00:00",
      "ArchiveDate": "2023-04-17T00:00:00",
      "Title": "Stockyard Status Monday 17 October 2022",
      "Subtitle": None,
      "WebTitle": "Stockyard Status Monday 17 October 2022",
      "Content": "Stockyard (/work) experienced an outage between approximately 11am (CDT) and 12:45pm (CDT). Jobs that were using specific targets that were impacted during the event will have been impacted. Please submit any questions you may have via the TACC User Portal. https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107413",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102912",
            "PostedDate": "2022-11-01T18:31:33.183000",
            "Content": "Ranch downtime is going to run long tonight.  Hoping to be back to full Production by midnight.Please submit any questions you may have via the TACC User Portal.https://portal.tacc.utexas.edu/tacc-consulting"
          }
        ]
      },
      "Author": "Matthew Edeker",
      "PostedDate": "2022-10-17T09:53:02.280000",
      "AnnouncementDate": "2022-10-17T00:00:00",
      "ArchiveDate": "2023-04-17T00:00:00",
      "Title": "Ranch Storage Expansion Tuesday, 1 November 2022",
      "Subtitle": None,
      "WebTitle": "Ranch Storage Expansion Tuesday, 1 November ",
      "Content": "Ranch will be undergoing tape storage expansion from 9:00 AM (CDT) until 9:00 PM on Tuesday, 1 November 2022. Ranch will be up for data ingestion but unavailable for data recovery during this time. Users will be delayed in reading their older data off of tape during this downtime.Please submit any questions you may have via the TACC User Portal.https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107411",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102906",
            "PostedDate": "2022-10-15T09:07:34.950000",
            "Content": "Stampede2 is back in production. Emergency maintenance has ended."
          },
          {
            "ID": "102905",
            "PostedDate": "2022-10-14T14:40:24.923000",
            "Content": "Stampede2 emergency maintenance is ongoing. Admins will continue working to restore service as soon as possible. We will update User News when the machine is returned to service. Thank you for your patience."
          }
        ]
      },
      "Author": "Alex Ferrier",
      "PostedDate": "2022-10-13T21:19:36.600000",
      "AnnouncementDate": "2022-10-13T00:00:00",
      "ArchiveDate": "2023-04-13T00:00:00",
      "Title": "Stampede2 emergency maintenance beginning now",
      "Subtitle": None,
      "WebTitle": "Stampede2 emergency maintenance beginning now",
      "Content": "Stampede2 is currently experiencing a file system outage.  The system will be unavailable while emergency maintenance is performed.  Queues will be closed during this time.We will be able to update with an estimated recovery when we're further along in the restoration.Please submit any questions you may have via the TACC User Portal.\nhttps://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107410",
      "Updates": None,
      "Author": "Mark Brueschke",
      "PostedDate": "2022-10-12T15:35:04.230000",
      "AnnouncementDate": "2022-10-12T00:00:00",
      "ArchiveDate": "2023-04-12T00:00:00",
      "Title": "Longhorn Maintenance Thursday October 13 2022",
      "Subtitle": None,
      "WebTitle": "Longhorn Maintenance Thursday October 13 2022",
      "Content": "Longhorn will be unavailable from 7:00 AM (CDT) on Thursday, October 13 through 8:00 PM (CDT) Friday, October 14 for system maintenance.Please submit any questions you may have via the TACC User Portal.https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107409",
      "Updates": None,
      "Author": "Mark Brueschke",
      "PostedDate": "2022-10-10T13:12:36.427000",
      "AnnouncementDate": "2022-10-10T00:00:00",
      "ArchiveDate": "2023-04-10T00:00:00",
      "Title": "Frontera Maintenance Tuesday 25 October 2022",
      "Subtitle": None,
      "WebTitle": "Frontera Maintenance Tuesday 25 October 2022",
      "Content": "Frontera will not be available from 8 AM to 7:30 PM (CDT) on Tuesday, 25 October 2022. System maintenance will be performed during this time.Please submit any questions you may have via the TACC User Portal. https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107408",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102909",
            "PostedDate": "2022-10-19T08:14:48.783000",
            "Content": "Maintenance has ended as of 8:00 AM (CDT) and Lonestar6 is back in full production."
          },
          {
            "ID": "102908",
            "PostedDate": "2022-10-18T18:58:57.983000",
            "Content": "Maintenance has been extended to 10 pm CDT."
          }
        ]
      },
      "Author": "Matthew Edeker",
      "PostedDate": "2022-10-06T15:23:55.897000",
      "AnnouncementDate": "2022-10-06T00:00:00",
      "ArchiveDate": "2023-04-06T00:00:00",
      "Title": "Lonestar6 Maintenance Tuesday 18 October 2022",
      "Subtitle": None,
      "WebTitle": "Lonestar6 Maintenance Tuesday 18 October 2022",
      "Content": "Lonestar6 will not be available from 8:00 AM to 8:00 PM (CDT) on Tuesday 18 October 2022. System maintenance will be performed during this time. Please submit any questions you may have via the TACC User Portalhttps://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107406",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-09-30T15:11:46.160000",
      "AnnouncementDate": "2022-09-30T00:00:00",
      "ArchiveDate": "2023-03-30T00:00:00",
      "Title": "Upcoming: TACC Talk Minis, Applied Parallel Programming Institute",
      "Subtitle": None,
      "WebTitle": "Upcoming: TACC Talk Minis, APP Institute",
      "Content": "Upcoming: TACC Talk Minis free, approximately 15 minutes, always on MondaysHow to Submit and Cancel JobsMonday, October 3rd from 1:00-1:15 PM CST Ever wonder how researchers and TACC staff submit and cancel their jobs on the TACC systems? Watch TACC staffer Jack Gaither demonstrate the proper use of the Slurm Workload Manager on TACC systems in this quick tutorial. We will begin promptly at 1:00; the zoom will open about 10 minutes prior.\nhttps://utexas.zoom.us/j/98584556424 Intro to PyLauncher Monday, October 10th from 11:00-11:15 AM CSTThe PyLauncher is a python-based parametric job launcher, that is, a utility for executing many small jobs in parallel. On many batch-based cluster computers this is a better strategy than submitting many small individual small jobs. Join TACCster Victor Eijkhout for this quick tutorial.  We will begin promptly at 11:00; the zoom will open about 10 minutes prior.\nhttps://utexas.zoom.us/j/96702048669 So You Can SSH - Now what? About Tacc_info Monday, October 10th from 1:00-1:15 AM CST When first arriving on a TACC login node via SSH (as a follow-on from our previous tutorial: How to SSH, now on our YouTube channel) we discuss the details of the information presented by the system and what services, software and resources are available. Join TACCster Nick Thorne for this quick tutorial. We will begin promptly at 1:00; the zoom will open about 10 minutes prior.\nhttps://utexas.zoom.us/j/98584556424 Check out previous tutorials on TACC's YouTube here:  https://www.youtube.com/playlist?list=PLzhN9aXRlmXNoEKgqWKsHQJk0eYnBAhHBUpcoming TACC Institute: Applied Parallel Programming (Virtual Only) 4-Session Series: Thursdays 10:00 AM - 4:00 PM CST October 20 | October 27 | November 3 | November 10 Led by TACC's high performance computing experts, learn how to code parallel applications using OpenMP and MPI, profile and optimize sequential and parallel applications, debug parallel software, and develop software for many-core architectures, and more. $299 Academic | $299 STAR Partner | $499 Industry   REGISTER HERE: https://cvent.utexas.edu/event/45f601b7-7e19-43d3-9d3c-5088c5d0d3e0/summary"
    },
    {
      "ID": "107405",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-09-30T12:48:12.363000",
      "AnnouncementDate": "2022-09-30T00:00:00",
      "ArchiveDate": "2023-03-30T00:00:00",
      "Title": "Short Courses in Bioinformatics and Biocomputing: UT's Center for Biomedical Research Support",
      "Subtitle": None,
      "WebTitle": "Courses in Bioinformatics and Biocomputing",
      "Content": "UT's Center for Biomedical Research Support offers short courses in bioinformatics and biocomputing. We are pleased to announce the following roster for the Fall 2022 semester: October 07 Introduction to Unix October 19 Introduction to Next Generation Sequencing October 21 Introduction to RNA-Seq October 28 Advanced Bash Scripting November 04 Introduction to Python November 09 Introduction to R November 16 Data Visualization using R December 02 Intermediate Python To read the detailed short course descriptions and to register visit: https://research.utexas.edu/cbrs/classes/short-courses/fall-2022-semester/ Courses are $50 and can be paid via IDT with a UT account, or credit card. All courses will be taught in person on campus this year.\n"
    },
    {
      "ID": "107404",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102904",
            "PostedDate": "2022-10-11T15:28:11.670000",
            "Content": "Ranch is back in production as of 2:00 PM CDT. Software maintenance was performed during the maintenance."
          }
        ]
      },
      "Author": "Mark Brueschke",
      "PostedDate": "2022-09-28T14:39:13.837000",
      "AnnouncementDate": "2022-09-28T00:00:00",
      "ArchiveDate": "2023-03-28T00:00:00",
      "Title": "Ranch Maintenance Tuesday October 11th 2022",
      "Subtitle": None,
      "WebTitle": "Ranch Maintenance Tuesday October 11th 2022",
      "Content": "Ranch will not be available from 8:00 AM until 5:00 PM (CDT) on Tuesday, October 11 2022. System maintenance will be performed during this time. Please submit any questions you may have via the TACC User Portal.https://portal.tacc.utexas.edu/tacc-consulting"
    },
    {
      "ID": "107403",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-09-07T10:37:25.013000",
      "AnnouncementDate": "2022-09-07T00:00:00",
      "ArchiveDate": "2023-03-07T00:00:00",
      "Title": "Starting Soon: TACC Institutes - spots available",
      "Subtitle": None,
      "WebTitle": "TACC Institutes - starting soon",
      "Content": "Good morning! Spots are still available in the following Institutes: HPC Leadership, Applied Parallel Programming, and Machine Learning. \nDetails and registration links below: HPC Leadership Institute in Cooperation with Microsoft (In-Person Only) September 12-14 The High Performance Computing (HPC) Leadership Institute is specifically tailored to managers and decision makers who are using, or considering using, HPC within their organizations. It is also applicable to those with a real opportunity to make this career step in the near future. Topics covered will include procurement considerations, pricing and capital expenditures, operating expenditures, and cost/benefit analysis of adding HPC to a company's or institution's R&D portfolio. A broad scope of HPC is covered from department scale clusters to the largest supercomputers, modeling and simulation to non-traditional use cases, and more. We encourage attendees from diverse backgrounds and underrepresented communities. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/hpc-leadership Machine Learning Institute at TACC (Virtual Only) 5-Day Series: Monday October 3 - Friday October 7 10:00 AM - 4:00 PM CST Want to gain more insight from your data? Is analyzing datasets too much for your favorite spreadsheet? Considering using machine learning to improve insights? Spend a week with TACC's data analysis experts learning about the latest tools and techniques for analyzing and processing your Big Data problems. Try your hand at state of the art machine learning technologies and algorithms with guided hands-on exercises. Spend time one-on-one with our data analysis staff talking about your own projects and goals, and hear about the latest tools and research in Big Data. REGISTER HERE: https://cvent.utexas.edu/event/383706cb-95da-4694-9f11-881ec8cac169/summary Applied Parallel Programming Institute at TACC (Virtual Only) 4-Session Series: Thursdays \nOctober 20 | October 27 | November 3 | November 10 10:00 AM - 4:00 PM CST Led by TACC's high performance computing experts, learn how to code parallel applications using OpenMP and MPI, profile and optimize sequential and parallel applications, debug parallel software, and develop software for many-core architectures, and more. REGISTER HERE: https://cvent.utexas.edu/event/45f601b7-7e19-43d3-9d3c-5088c5d0d3e0/summary"
    },
    {
      "ID": "107401",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-09-06T09:54:13.680000",
      "AnnouncementDate": "2022-09-06T00:00:00",
      "ArchiveDate": "2023-03-06T00:00:00",
      "Title": "TACCSTER: Register by Friday 9/9!",
      "Subtitle": None,
      "WebTitle": "TACCSTER: Registration is open!",
      "Content": "TACC Symposium for Texas Researchers - September 28-30, 2022  The last chance to register for the TACC Symposium for Texas Researchers (TACCSTER) is Friday September 9th. TACCSTER will be held on September 28-30, 2022, in person in the ACB building on the J.J. Pickle Research Campus (PRC) of The University of Texas at Austin. TACCSTER is a meeting of scientists, engineers and scholars from across the state who use, and would like to use, the Texas Advanced Computing Center (TACC) to advance their research goals. Researchers from across the country are welcome to attend. This meeting will be an opportunity for you to: Hear invited speakers from a broad range of disciplines Visit 40+ posters from institutions all over Texas\nNetwork with your fellow TACC users and researchers Learn new and useful computing skills from a variety of tutorials Find out information about the latest TACC systems and services  To register and for more information please visit: https://www.tacc.utexas.edu/taccster  Please contact taccster@tacc.utexas.edu if you have any questions."
    },
    {
      "ID": "107399",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-08-22T17:45:00.633000",
      "AnnouncementDate": "2022-08-22T00:00:00",
      "ArchiveDate": "2023-02-22T00:00:00",
      "Title": "Spots available: TACC Institutes",
      "Subtitle": None,
      "WebTitle": "Register now: CS Institutes at TACC",
      "Content": "Good afternoon! Spots are still available in the following Institutes: Scientific Visualization (begins soon!), HPC Leadership, Applied Parallel Programming, and Machine Learning. Details and registration links below: Scientific Visualization Institute at TACC (Virtual Only) *DATE SHIFT* \n4-Session Series: Wednesdays 10:00-1:00 CST August 24 | August 31 | September 7 | September 14 | September 21  TACC's visualization experts will provide instruction on how to generate rich, informative visualizations from your simulation results and data sets. Get started with VisIt and Paraview among other technologies, to learn the basics of developing interesting and worthwhile geographic and information visualizations. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/scientific-visualization HPC Leadership Institute in Cooperation with Microsoft (In-Person Only) September 12-14 The High Performance Computing (HPC) Leadership Institute is specifically tailored to managers and decision makers who are using, or considering using, HPC within their organizations. It is also applicable to those with a real opportunity to make this career step in the near future. Topics covered will include procurement considerations, pricing and capital expenditures, operating expenditures, and cost/benefit analysis of adding HPC to a company's or institution's R&D portfolio. A broad scope of HPC is covered from department scale clusters to the largest supercomputers, modeling and simulation to non-traditional use cases, and more. We encourage attendees from diverse backgrounds and underrepresented communities. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/hpc-leadership Machine Learning Institute at TACC (Virtual Only) 5-Day Series: Monday October 3 - Friday October 7 10:00 AM - 4:00 PM CST Want to gain more insight from your data? Is analyzing datasets too much for your favorite spreadsheet? Considering using machine learning to improve insights? Spend a week with TACC's data analysis experts learning about the latest tools and techniques for analyzing and processing your Big Data problems. Try your hand at state of the art machine learning technologies and algorithms with guided hands-on exercises. Spend time one-on-one with our data analysis staff talking about your own projects and goals, and hear about the latest tools and research in Big Data. REGISTER HERE: https://cvent.utexas.edu/event/383706cb-95da-4694-9f11-881ec8cac169/summary Applied Parallel Programming Institute at TACC (Virtual Only) 4-Session Series: Thursdays October 20 | October 27 | November 3 | November 10 10:00 AM - 4:00 PM CST  Led by TACC's high performance computing experts, learn how to code parallel applications using OpenMP and MPI, profile and optimize sequential and parallel applications, debug parallel software, and develop software for many-core architectures, and more. REGISTER HERE: https://cvent.utexas.edu/event/45f601b7-7e19-43d3-9d3c-5088c5d0d3e0/summary"
    },
    {
      "ID": "107398",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-08-22T17:43:45.037000",
      "AnnouncementDate": "2022-08-22T00:00:00",
      "ArchiveDate": "2023-02-22T00:00:00",
      "Title": "Spots available: TACC Institutes",
      "Subtitle": None,
      "WebTitle": "Register now: CS Institutes at TACC",
      "Content": "Good afternoon! Spots are still available in the following Institutes: Scientific Visualization (begins soon!), HPC Leadership, Applied Parallel Programming, and Machine Learning. Details and registration links below: Scientific Visualization Institute at TACC (Virtual Only) *DATE SHIFT* \n4-Session Series: Wednesdays 10:00-1:00 CST August 24 | August 31 | September 7 | September 14 | September 21  TACC's visualization experts will provide instruction on how to generate rich, informative visualizations from your simulation results and data sets. Get started with VisIt and Paraview among other technologies, to learn the basics of developing interesting and worthwhile geographic and information visualizations. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/scientific-visualization HPC Leadership Institute in Cooperation with Microsoft (In-Person Only) September 12-14 The High Performance Computing (HPC) Leadership Institute is specifically tailored to managers and decision makers who are using, or considering using, HPC within their organizations. It is also applicable to those with a real opportunity to make this career step in the near future. Topics covered will include procurement considerations, pricing and capital expenditures, operating expenditures, and cost/benefit analysis of adding HPC to a company's or institution's R&D portfolio. A broad scope of HPC is covered from department scale clusters to the largest supercomputers, modeling and simulation to non-traditional use cases, and more. We encourage attendees from diverse backgrounds and underrepresented communities. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/hpc-leadership Machine Learning Institute at TACC (Virtual Only) 5-Day Series: Monday October 3 - Friday October 7 10:00 AM - 4:00 PM CST Want to gain more insight from your data? Is analyzing datasets too much for your favorite spreadsheet? Considering using machine learning to improve insights? Spend a week with TACC's data analysis experts learning about the latest tools and techniques for analyzing and processing your Big Data problems. Try your hand at state of the art machine learning technologies and algorithms with guided hands-on exercises. Spend time one-on-one with our data analysis staff talking about your own projects and goals, and hear about the latest tools and research in Big Data. REGISTER HERE: https://cvent.utexas.edu/event/383706cb-95da-4694-9f11-881ec8cac169/summary Applied Parallel Programming Institute at TACC (Virtual Only) 4-Session Series: Thursdays October 20 | October 27 | November 3 | November 10 10:00 AM - 4:00 PM CST  Led by TACC's high performance computing experts, learn how to code parallel applications using OpenMP and MPI, profile and optimize sequential and parallel applications, debug parallel software, and develop software for many-core architectures, and more. REGISTER HERE: https://cvent.utexas.edu/event/45f601b7-7e19-43d3-9d3c-5088c5d0d3e0/summary"
    },
    {
      "ID": "107397",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-08-22T17:43:11.350000",
      "AnnouncementDate": "2022-08-22T00:00:00",
      "ArchiveDate": "2023-02-22T00:00:00",
      "Title": "Spots available: TACC Institutes",
      "Subtitle": None,
      "WebTitle": "Register now: CS Institutes at TACC",
      "Content": "Good afternoon! Spots are still available in the following Institutes: Scientific Visualization (begins soon!), HPC Leadership, Applied Parallel Programming, and Machine Learning. Details and registration links below: Scientific Visualization Institute at TACC (Virtual Only) *DATE SHIFT* \n4-Session Series: Wednesdays 10:00-1:00 CST August 24  | August 31 | September 7 | September 14 | September 21 TACC's visualization experts will provide instruction on how to generate rich, informative visualizations from your simulation results and data sets. Get started with VisIt and Paraview among other technologies, to learn the basics of developing interesting and worthwhile geographic and information visualizations. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/scientific-visualization HPC Leadership Institute in Cooperation with Microsoft (In-Person Only) September 12-14 The High Performance Computing (HPC) Leadership Institute is specifically tailored to managers and decision makers who are using, or considering using, HPC within their organizations. It is also applicable to those with a real opportunity to make this career step in the near future. Topics covered will include procurement considerations, pricing and capital expenditures, operating expenditures, and cost/benefit analysis of adding HPC to a company's or institution's R&D portfolio. A broad scope of HPC is covered from department scale clusters to the largest supercomputers, modeling and simulation to non-traditional use cases, and more. We encourage attendees from diverse backgrounds and underrepresented communities. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/hpc-leadership Machine Learning Institute at TACC (Virtual Only) 5-Day Series: Monday October 3 - Friday October 7 10:00 AM - 4:00 PM CST Want to gain more insight from your data? Is analyzing datasets too much for your favorite spreadsheet? Considering using machine learning to improve insights? Spend a week with TACC's data analysis experts learning about the latest tools and techniques for analyzing and processing your Big Data problems. Try your hand at state of the art machine learning technologies and algorithms with guided hands-on exercises. Spend time one-on-one with our data analysis staff talking about your own projects and goals, and hear about the latest tools and research in Big Data. REGISTER HERE: https://cvent.utexas.edu/event/383706cb-95da-4694-9f11-881ec8cac169/summary Applied Parallel Programming Institute at TACC (Virtual Only) 4-Session Series: Thursdays October 20 | October 27 | November 3 | November 10 10:00 AM - 4:00 PM CST  Led by TACC's high performance computing experts, learn how to code parallel applications using OpenMP and MPI, profile and optimize sequential and parallel applications, debug parallel software, and develop software for many-core architectures, and more. REGISTER HERE: https://cvent.utexas.edu/event/45f601b7-7e19-43d3-9d3c-5088c5d0d3e0/summary"
    },
    {
      "ID": "107395",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102903",
            "PostedDate": "2022-08-24T09:55:22.707000",
            "Content": "The Stampede2 /home1 filesystem is back and system back in full operation."
          },
          {
            "ID": "102902",
            "PostedDate": "2022-08-23T18:08:57.510000",
            "Content": "The Stampede2 home filesystem remains partially offline with one of the four storage servers still unavailable.  The storage hardware has been repaired but now the filesystem checks to ensure consistency of the data is taking much longer than anticipated.  These filesystem checks need to complete before the system can be put back into full production so it will likely be some time Wednesday 8/24 before system is returned to service."
          },
          {
            "ID": "102901",
            "PostedDate": "2022-08-22T15:31:54.237000",
            "Content": "The Stampede2 home filesystem experienced a severe hardware error this morning on one of its four servers. The filesystem server is currently undergoing recovery and will remain offline until the recovery is complete.  Based on current status, estimating approximately 7:00 PM Central Time on Tuesday August 23rd before the system will resume production operations.  Users may experience session \"hangs\" when attempting to login or access files that reside on the offline server."
          }
        ]
      },
      "Author": "Mark Brueschke",
      "PostedDate": "2022-08-22T10:12:38.707000",
      "AnnouncementDate": "2022-08-22T00:00:00",
      "ArchiveDate": "2023-02-22T00:00:00",
      "Title": "Stampede2 Status August 22 2022",
      "Subtitle": None,
      "WebTitle": "Stampede2 Status August 22 2022",
      "Content": "Stampede2 is currently experiencing a filesystem outage, the system will be partially while emergency maintenance is underway. Queues are closed during this time."
    },
    {
      "ID": "107394",
      "Updates": None,
      "Author": "Tim Cockerill",
      "PostedDate": "2022-08-22T10:09:17.587000",
      "AnnouncementDate": "2022-08-22T00:00:00",
      "ArchiveDate": "2023-02-22T00:00:00",
      "Title": "UT System login disabled in TACC User Portal",
      "Subtitle": None,
      "WebTitle": "UT System login disabled in TACC User Portal",
      "Content": "We have removed the UT System/UT EID login from the TACC User Portal. Please use the TACC Account login, as we currently do not have a known timeline to be able to bring the UT System/UT EID login capability back to service. If you don’t know your TACC username or password, please go here portal.tacc.utexas.edu/password-reset"
    },
    {
      "ID": "107393",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-08-18T12:58:00.053000",
      "AnnouncementDate": "2022-08-18T00:00:00",
      "ArchiveDate": "2023-02-18T00:00:00",
      "Title": "Registration Open: 2022 TACC Institutes",
      "Subtitle": None,
      "WebTitle": "Register: 2022 TACC Institutes",
      "Content": "Good afternoon! Registration is now open for the following 2022 TACC Institutes: Scientific Visualization Institute at TACC 4-Session Series: Wednesdays 10:00-1:00 CST August 24 | August 31 | September 7 | September 14 TACC's visualization experts will provide instruction on how to generate rich, informative visualizations from your simulation results and data sets. Get started with VisIt and Paraview among other technologies, to learn the basics of developing interesting and worthwhile geographic and information visualizations. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/scientific-visualization HPC Leadership Institute in Cooperation with Microsoft and MITRE September 12-14In-Person Only, Full days The High Performance Computing (HPC) Leadership Institute is specifically tailored to managers and decision makers who are using, or considering using, HPC within their organizations. It is also applicable to those with a real opportunity to make this career step in the near future. Topics covered will include procurement considerations, pricing and capital expenditures, operating expenditures, and cost/benefit analysis of adding HPC to a company's or institution's R&D portfolio. A broad scope of HPC is covered from department scale clusters to the largest supercomputers, modeling and simulation to non-traditional use cases, and more. We encourage attendees from diverse backgrounds and underrepresented communities. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/hpc-leadership Machine Learning Institute at TACC 5-Day Series: Monday October 3 - Friday October 7 10:00 AM - 4:00 PM CST Want to gain more insight from your data? Is analyzing datasets too much for your favorite spreadsheet? Considering using machine learning to improve insights? Spend a week with TACC's data analysis experts learning about the latest tools and techniques for analyzing and processing your Big Data problems. Try your hand at state of the art machine learning technologies and algorithms with guided hands-on exercises. Spend time one-on-one with our data analysis staff talking about your own projects and goals, and hear about the latest tools and research in Big Data. REGISTER HERE: https://cvent.utexas.edu/event/383706cb-95da-4694-9f11-881ec8cac169/summary Applied Parallel Programming Institute at TACC 4-Session Series: Thursdays 10:00 AM - 4:00 PM CST October 20 | October 27 | November 3 | November 10 Led by TACC's high performance computing experts, learn how to code parallel applications using OpenMP and MPI, profile and optimize sequential and parallel applications, debug parallel software, and develop software for many-core architectures, and more. REGISTER HERE: https://cvent.utexas.edu/event/45f601b7-7e19-43d3-9d3c-5088c5d0d3e0/summary\n"
    },
    {
      "ID": "107392",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-08-10T14:03:40.457000",
      "AnnouncementDate": "2022-08-10T00:00:00",
      "ArchiveDate": "2023-02-10T00:00:00",
      "Title": "TACC Symposium for Texas Researchers (TACCSTER)",
      "Subtitle": None,
      "WebTitle": "TACCSTER - Registration is now open",
      "Content": "TACC Symposium for Texas Researchers September 28-30, 2022 We are pleased to announce the fifth annual TACC Symposium for Texas Researchers (TACCSTER) being held on September 28-30, 2022, in person in the ACB building on the J.J. Pickle Research Campus (PRC) of The University of Texas at Austin. TACCSTER is a meeting of scientists, engineers and scholars from across the state who use, and would like to use, the Texas Advanced Computing Center (TACC) to advance their research goals. Researchers from across the country are welcome to attend. This meeting will be an opportunity for you to: - Showcase your ongoing research involving TACC resources - Learn new and useful computing skills from a variety of tutorials - Network with other TACC users / researchers - Hear information about the latest TACC systems and services To register and for more information please visit: https://www.tacc.utexas.edu/taccster\n\nPlease contact taccster@tacc.utexas.edu if you have any questions.\n"
    },
    {
      "ID": "107391",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-08-09T11:51:31.870000",
      "AnnouncementDate": "2022-08-09T00:00:00",
      "ArchiveDate": "2023-02-09T00:00:00",
      "Title": "TACC Institutes - registration open",
      "Subtitle": None,
      "WebTitle": "Institutes at TACC: registration open",
      "Content": "Hello everyone! The following opportunities are now live:TAPIS Days at TACC (Virtual, FREE) August 19th \nLearn about the tools necessary to build more complex workflows and techniques to ensure your runtime environment is reproducible and flexible. Use virtual machines and containers to develop and execute scientific workflows in the cloud with the ability to expand to large-scale systems. REGISTER HERE: https://learn.tacc.utexas.edu/ Scientific Visualization (Virtual)August 24 - September 14 – Wednesdays, 10:00-1:00 CST TACC's visualization experts will provide instruction on how to generate rich, informative visualizations from your simulation results and data sets. Get started with VisIt and Paraview among other technologies, to learn the basics of developing interesting and worthwhile geographic and information visualizations REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/scientific-visualization HPC Leadership Institute in Cooperation with Microsoft and MITRE (In Person Only) September 12-14 In-Person Only\nThe High Performance Computing (HPC) Leadership Institute is specifically tailored to managers and decision makers who are using, or considering using, HPC within their organizations. It is also applicable to those with a real opportunity to make this career step in the near future. Topics covered will include procurement considerations, pricing and capital expenditures, operating expenditures, and cost/benefit analysis of adding HPC to a company's or institution's R&D portfolio. A broad scope of HPC is covered from department scale clusters to the largest supercomputers, modeling and simulation to non-traditional use cases, and more. We encourage attendees from diverse backgrounds and underrepresented communities. REGISTER HERE: https://www.tacc.utexas.edu/education/professionals/tacc-institutes/hpc-leadership COMING SOON: Applied Parallel Programming Fall, Dates TBDLearn from TACC's high performance computing experts how to code parallel applications using OpenMP and MPI, profile and optimize sequential and parallel applications, debug parallel software, and develop software for many-core architectures, and more. Machine Learning Foundations Fall, Dates TBDWant to gain more insight from your data? Is analyzing datasets too much for your favorite spreadsheet? Considering using machine learning to improve insights? Spend a week with TACC's data analysis experts learning about the latest tools and techniques for analyzing and processing your Big Data problems. Try your hand at using R, Jupyter notebooks, Hadoop, and Spark with guided hands-on exercises, spend time one-on-one with our data analysis staff talking about your own projects and goals, and hear about the latest tools and research in Big Data.\n\n\n"
    },
    {
      "ID": "107390",
      "Updates": {
        "AnnouncementUpdate": [
          {
            "ID": "102900",
            "PostedDate": "2022-08-09T17:09:11.930000",
            "Content": "Multi-Factor Authentication via SMS for TACC resources has been restored."
          }
        ]
      },
      "Author": "Mark Brueschke",
      "PostedDate": "2022-08-09T10:59:02.900000",
      "AnnouncementDate": "2022-08-09T00:00:00",
      "ArchiveDate": "2023-02-09T00:00:00",
      "Title": "Multi-Factor Authentication via SMS Status 8/9/2022",
      "Subtitle": None,
      "WebTitle": "Multi-Factor Authentication via SMS Status",
      "Content": "Multi-Factor Authentication via SMS for TACC resources is currently out of service, administrators are working to correct the problem.  App based tokens will continue to work.  Thanks for your patience."
    },
    {
      "ID": "107389",
      "Updates": None,
      "Author": "Lauren Gant",
      "PostedDate": "2022-08-03T11:15:08.600000",
      "AnnouncementDate": "2022-08-03T00:00:00",
      "ArchiveDate": "2023-02-03T00:00:00",
      "Title": "TAPIS Days at TACC - Aug 19th, 10am-4pm CST",
      "Subtitle": None,
      "WebTitle": "TAPIS Days at TACC ",
      "Content": "TAPIS Days at TACC - Aug 19th, 10am-4pm CST Learn about the tools necessary to build more complex workflows and techniques to ensure your runtime environment is reproducible and flexible. Use virtual machines and containers to develop and execute scientific workflows in the cloud with the ability to expand to large-scale systems. Go here to register: https://learn.tacc.utexas.edu/"
    }
  ]
  latest_articles = recent_articles[:count]

  return latest_articles

class UserNewsView(TemplateView):
  template_name = 'user_news/user_news.html'

  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['latest_articles'] = get_latest_articles(5)
    return context

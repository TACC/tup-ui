export type UserNewsResponse = {
  ID: string;
  Updates: {
    AnnouncementUpdate: { ID: string; PostedDate: string; Content: string }[];
  };
  Author: string;
  PostedDate: string;
  AnnouncementDate: string;
  ArchiveDate: string;
  Title: string;
  Subtitle: string;
  WebTitle: string;
  Content: string;
};

export { default as useUserNews } from './useUserNews';

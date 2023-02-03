import { UseQueryResult } from '@tanstack/react-query';
import { ProjectFieldOfScience } from '.';
import { useGet } from './requests';

// Query to retrieve the user's active projects.
const useProjectScienceField = (): UseQueryResult<ProjectFieldOfScience[]> => {
  const query = useGet<ProjectFieldOfScience[]>({
    endpoint: '/projects/fields',
    key: ['projects/fields'],
  });
  return query;
};

export default useProjectScienceField;

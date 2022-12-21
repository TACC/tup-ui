import React from 'react';
import { Section } from '@tacc/core-components';
import { ProjectsSummaryListing } from '../projects';
import { AllocationsTable } from '../allocations';

// const ProjectsLayout: React.FC = () => {
//   return (
//     <Section
//       header="Projects & Allocations"
//       content={
//         <table >
//           <tbody>
//             <td >
//               <ProjectsSummaryListing />
//               <AllocationsTable />
//             </td>
//           </tbody>
//         </table>
//       }
//     />
//   );
// };

const ProjectsLayout: React.FC = () => {
  return (
    <Section
      header="Projects & Allocations"
      content={
        <div>
          <ProjectsSummaryListing />
          <AllocationsTable />
        </div>
      }
    />
  );
};
<<<<<<< HEAD

// const ProjectsLayout: React.FC = () => {
//   return (
//     <Section
//       header="Projects & Allocations"
//       content={
//         <table >
//           <tbody>
//             <td >
//               <ProjectsSummaryListing />
//               <AllocationsTable />
//             </td>
//           </tbody>
//         </table>
//       }
//     />
//   );
// };


=======
>>>>>>> 4a8ee85 (tup-374-format-changes)
export default ProjectsLayout;

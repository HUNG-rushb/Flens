// import React, { useMemo } from 'react';

// const CoursesTableData = ({
//   titles,
//   body,
//   handleClickEdit,
//   PencilSquare,
//   handleClickRemove,
//   XSquare,
// }) => {
//   return useMemo(
//     () => (
//       <table>
//         <thead>
//           <tr>
//             {titles.map((title, index) => {
//               return <td key={index}>{title}</td>;
//             })}
//           </tr>
//         </thead>
//         <tbody>
//           {body.map((item, index) => {
//             return (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{item.coursesName}</td>
//                 <td> {item.createDate} </td>
//                 <td> {item.status} </td>
//                 <td> {item.attendants} </td>
//                 <td>
//                   <PencilSquare
//                     id="edit-icon"
//                     size={30}
//                     color="green"
//                     onClick={() => handleClickEdit(item)}
//                   />
//                 </td>
//                 <td>
//                   <XSquare
//                     id="remove-icon"
//                     size={30}
//                     color="red"
//                     onClick={() => handleClickRemove(item)}
//                   />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     ),
//     [body, handleClickEdit, handleClickRemove, titles]
//   );
// };

// export default CoursesTableData;

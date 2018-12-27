import React from 'react';
const DataTable = props => {
   return (
      <table>
         <thead>
            <tr>
               {props.cols.map(col =>
                  <th key={col.name}>{col.header}</th>
               )}
            </tr>
         </thead>
         <tbody>
            {props.rows.map(row =>
               <tr key={row.id}>
                   {props.cols.map(col =>
                       <td key={col.name}>{row[col.name]}</td>
                   )}
               </tr>
            )}
         </tbody>
      </table>
  );
}
export default DataTable;
const ChangeToTable = ({ data, columns, onRowClick }) => {
     return (
     <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
               {columns.map((column) => (
               <th
               key={column.accessor}
               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
               >
               {column.Header}
               </th>
               ))}
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
               <tr
               key={index}
               onClick={() => onRowClick(row)}
               className="hover:bg-gray-100 cursor-pointer"
               >
               {columns.map((column) => (
               <td
                    key={column.accessor}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
               >
                    {row[column.accessor]}
               </td>
               ))}
               </tr>
          ))}
          </tbody>
     </table>
     );
     }

     //what is thead and tbody?
     // The `<thead>` element is used to group the header content in an HTML table.
     // The `<tbody>` element is used to group the body content in an HTML table.

export default ChangeToTable;
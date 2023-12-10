/* eslint-disable react/prop-types */
import "./TableRow.scss";

export default function TableRow({ tableRow, tableColumns }) {
  let columns = tableColumns;

  let rowClick = tableRow.rowClick ? tableRow.rowClick : () => { };
  return (
    <tr
      className="table-row"
    >
      {tableRow &&
        columns.map((dataCell, i) => {
          let cellKey = columns[i];
          // row click on all td except the options td
          if (i === columns.length - 1) {
            return (
              <td className="table-data-cell w-20" key={`${cellKey}-${i}`}>
                {tableRow[dataCell]}
              </td>
            );
          } else {
            return (
              <td className="table-data-cell" key={`${cellKey}-${i}`} onClick={() => { rowClick(); }}>
                {tableRow[dataCell]}
              </td>
            );
          }
        })}
    </tr>
  );
}

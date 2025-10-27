import "./Table.css";

function Table({ headers = [], rows = [], emptyMessage = "No records found" }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, i) => <tr key={i}>{row}</tr>)
          ) : (
            <tr>
              <td colSpan={headers.length} className="empty-row">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

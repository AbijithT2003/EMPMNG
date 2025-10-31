import "./Table.css";

function Table({
  headers = [],
  rows = [],
  emptyMessage = "No records found",
  loading = false,
}) {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i} className={header.className}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={headers.length} className="table-loading">
                  Loading...
                </td>
              </tr>
            ) : rows.length > 0 ? (
              rows.map((row, i) => <tr key={i}>{row}</tr>)
            ) : (
              <tr>
                <td colSpan={headers.length} className="table-empty">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

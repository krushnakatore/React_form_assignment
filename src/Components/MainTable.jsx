import { Table } from "./Table";

import "./Form.css";

export const MainTable = () => {
  return (
    <>
      <table className="customers">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Salary</th>
          <th>Marriage Status</th>
          <th>Department</th>
        </tr>
        <tr>
          <Table />
        </tr>
      </table>
    </>
  );
};

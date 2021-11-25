import React from "react";
import styled from "styled-components";
const MessageRow = styled.tr`
  text-align:center
  vertical-align: middle;
  font-size: 18px;
  font-weight: bold;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #000000;
    color: white;
  }
`;

const ListTable = ({ columns, data }) => {
  return (
    <React.Fragment>
      <Table border="0" data-testid="applicants-table">
        <thead>
          <tr>
            {columns?.length &&
              columns.map((column, index) => <th key={index}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((applicant, index) => (
              <tr key={index}>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>{applicant.age}</td>
                <td>{applicant.year_of_experience}</td>
                <td>{applicant.position_applied}</td>
                <td>{applicant.application_date}</td>
                <td>{applicant.status}</td>
              </tr>
            ))
          ) : (
            <MessageRow>
              <td colSpan="7">No items found</td>
            </MessageRow>
          )}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default ListTable;

import React from 'react';
import { styles } from './styles';

const memberList = [
  { id: 1, name: 'jessica williams', email: 'j.williams@test.com', status: 'active' },
  { id: 2, name: 'aaron williams', email: 'a.williams@test.com', status: 'inactive' },
  { id: 3, name: 'mistly williams', email: 'm.williams@test.com', status: 'active' },
];

const renderMember = m => (
  <tr style={styles.tr}>
    <td style={styles.td}>{m.name}</td>
    <td style={styles.td}>{m.email}</td>
    <td style={styles.td}>{m.status}</td>
  </tr>
);

const Overview = () => (
  <div>
    <p>Overview</p>
    <div className="row" style={styles.tableBox}>
      <div className="col-md-10">
        <table className="table" style={styles.table}>
          <thead>
            <th style={styles.tableTitle} colSpan="3">
              <h4>2018 Spring CSA Membership List</h4>
            </th>
          </thead>
          <tr style={{ ...styles.tr, ...styles.headerRow }}>
            <td style={styles.headers}>Name</td>
            <td style={styles.headers}>Email</td>
            <td style={styles.headers}>Status</td>
          </tr>
          <tbody>
            { memberList.map(m => (renderMember(m))) }
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Overview;

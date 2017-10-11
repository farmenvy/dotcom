const lightGrey = '#bbbbbb';
const lighterGrey = '#e3e3e3';
const lightestGrey = '#FCFCFC';

export const styles = {
  tableBox: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  table: {
    border: `1px solid ${lighterGrey}`,
    padding: '5px',
  },
  tableTitle: {
    padding: '20px',
  },
  tr: {
    textAlign: 'left',
  },
  headerRow: {
    backgroundColor: lightestGrey,
    borderTop: `1px solid ${lighterGrey}`,
  },
  headers: {
    padding: '20px',
    textTransform: 'uppercase',
    fontSize: '12px',
    color: lightGrey,
    letterSpacing: '2',
  },
  td: {
    padding: '10px 20px',
    textTransform: 'capitalize',
  },
};

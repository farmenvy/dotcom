const white = '#ffffff';
const darkGrey = '#273142';

export const styles = {
  sideBar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
    background: 'red',
    backgroundColor: 'red',
  },
  logo: {
    width: '122px',
    textAlign: 'right',
    margin: '20px 0px 0px 15px',
  },
  listGroup: {
    width: '200px',
    borderRadius: '0px',
    backgroundColor: darkGrey,
    boxShadow: 'none',
  },
  listGroupItems: {
    borderRadius: '0px',
    backgroundColor: darkGrey,
    color: white,
    border: 'none',
    textAlign: 'left',
  },
};

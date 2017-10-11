import glamorous from 'glamorous';

const mediaQueries = {
  tablet: '@media only screen and (max-width: 992px)',
};

export const MyStyledDiv = glamorous.div({
  fontSize: 20,
  textAlign: 'center',
});

export const Background = glamorous.div({
  background: 'linear-gradient(to right bottom, #ffffff 50%, #32B989 50%)',
  height: 'auto',
  [mediaQueries.tablet]: {
    background: '#32B989',
  },
});

export const Layout = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignContent: 'center',
  minHeight: '100vh',
  [mediaQueries.tablet]: {
    height: 'auto',
  },
});

export const Copy = glamorous.p({
  color: '#ffffff',
  textAlign: 'left',
});

export const ImgBox = glamorous.div({
  [mediaQueries.tablet]: {
    background: '#ffffff',
    padding: '40px 0px 40px 0px',
  },
});

export const CopyBox = glamorous.div({
  [mediaQueries.tablet]: {
    background: '#32B989',
    padding: '20px',
  },
});

export const Header = glamorous.p({
  textAlign: 'left',
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: 'bold',
});

export const Logo = glamorous.img({
  maxWidth: '340px',
  width: '100%',
  [mediaQueries.tablet]: {
    maxWidth: '250px',
  },
});

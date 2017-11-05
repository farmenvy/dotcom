import styled from 'styled-components';

export { default as Input } from './input';

export const Button = styled.button`
  width: 170px;
  height: 45px;
  border-radius: 5px;
  background-color: #33658a;
  color: #fff;
  font-weight: bold;
  border: none;
  outline: none;
`;

export const Row = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

export const Col = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

export const Card = styled.div`
  background: #ffffff;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.24);
  margin: 8px 0 8px 0;
  padding: 8px 30px;
`;

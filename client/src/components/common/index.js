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
  background-color: papayawhip;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Col = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

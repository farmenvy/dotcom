import styled from 'styled-components';

export { default as Input } from './input';
export { default as Card } from './card';

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
  display: flex;
  justify-content: space-between;
`;

export const Col = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 24px;
  padding-top: 16px;
  margin-bottom: 12px;
  font-weight: 400px;
`;

export const CardContainer = styled.div`
  margin: 20px;
`;

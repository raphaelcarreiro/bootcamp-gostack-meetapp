import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  height: 300px;
  flex-direction: row;
  margin-bottom: 20px;

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;
    cursor: pointer;

    h2 {
      margin-top: 15px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  input {
    display: none;
  }

  img {
    max-width: 100%;
    height: 300px;
    display: block;
  }
`;

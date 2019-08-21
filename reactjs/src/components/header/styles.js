import styled from 'styled-components';

export const Container = styled.div`
  height: 70px;
  background: #000;
  padding: 0 10px;
`;

export const Content = styled.div`
  display: flex;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  nav {
    display: flex;
    align-items: center;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  flex-direction: row;

  div {
    text-align: right;
    margin-right: 20px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  button {
    border: none;
    background: #d44059;
    color: #fff;
    padding: 0 16px;
    border-radius: 4px;
  }
`;

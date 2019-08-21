import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 50px auto;
`;

export const Content = styled.div`
  color: #fff;
  ul {
    margin-top: 30px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: #fff;
  }

  button {
    height: 44px;
    background: #d44059;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 15px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }
`;

export const MeetupList = styled(Link)`
  display: flex;
  padding: 20px 35px;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.25);
  align-items: center;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 10px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: 30px;
    }
  }
`;

export const MeetupTitle = styled.div`
  size: 26px;
  font-weight: bold;
`;

import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 50px auto;
  color: #fff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 30px 0;
  }

  > div {
    display: flex;
    align-items: center;

    span {
      svg {
        margin-right: 5px;
      }

      color: #ccc;
      display: inline-flex;
      font-size: 12px;
      align-items: center;
      min-width: 170px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  button {
    height: 40px;
    background: #3b9eff;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 15px;
    transition: background 0.2s;
    margin-right: 10px;

    &:hover {
      background: ${darken(0.03, '#3b9eff')};
    }
  }

  button + button {
    height: 40px;
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

export const ImageWrapper = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  height: 300px;
  width: 100%;
  position: relative;
  border-radius: 4px;
  justify-content: center;
  align-items: center;

  > img {
    height: 300px;
    border-radius: 4px;
  }
`;

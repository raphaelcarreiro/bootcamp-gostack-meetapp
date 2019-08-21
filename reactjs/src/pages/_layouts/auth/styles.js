import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(#22202c, #402845);
`;

export const Content = styled.div`
  max-width: 315px;
  width: 100%;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      padding: 0 15px;
      height: 50px;
      border: none;
      margin: 10px 0 0;
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;

      &::placeholder {
        color: #fff;
        opacity: 0.4;
      }
    }

    span {
      color: #f94d6a;
      align-self: flex-start;
      font-size: 12px;
      margin-top: 5px;
    }

    button {
      border: 0;
      background: #f94d6a;
      color: #fff;
      height: 50px;
      border-radius: 4px;
      transition: background 0.6s;
      margin: 10px 0 0;

      &:hover:enabled {
        background: ${darken(0.06, '#f94d6a')};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  a {
    color: #fff;
    font-size: 16px;
    margin-top: 30px;
    opacity: 0.6;
    display: inline-block;

    &:hover {
      opacity: 1;
    }
  }
`;

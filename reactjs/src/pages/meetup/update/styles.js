import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      color: #fff;
      margin: 10px 0 0;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    input {
      height: 44px;
      padding: 0 15px;
    }

    span {
      color: #d44059;
      font-size: 12px;
      margin: 5px 0 0 3px;
    }

    textarea {
      height: 150px;
      padding: 15px;
    }

    > button {
      margin: 15px 0 0;
      height: 44px;
      background: #d44059;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      padding: 0 25px;
      transition: background 0.2s;
      align-self: center;

      &:hover:enabled {
        background: ${darken(0.03, '#d44059')};
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  height: 300px;
  width: 100%;
  position: relative;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  > img {
    height: 300px;
    border-radius: 4px;
    cursor: pointer;
  }

  > div {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    button {
      border: none;
      background: transparent;
      border-radius: 4px;
      justify-content: center;
      align-items: center;
      display: flex;
      padding: 5px;
    }
  }

  &:hover {
    > div {
      display: flex;
    }
  }
`;

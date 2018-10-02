import { css } from "emotion"

export const container = css`
  position: relative;
`

export const checkBox = css`
  position: absolute;
  opacity: 1;
  margin: 0;
  padding: 0;
  width: 18px;
  height: 18px;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
  & + div {
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.25s;
    border-radius: 3px;
    color: #fff;
    z-index: 1;
    position: relative;
    margin: 0;
    padding: 0;
    width: 15px;
    height: 15px;
    border: solid 1px #0005;
    transform: rotate(0deg);
  }
  &:checked + div {
    transform: rotate(360deg);
    border: solid 1px #008fd8;
    background: #008fd8;
  }
`

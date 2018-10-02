import { css } from "emotion"

export const container = css`
  width: 100%;
  position: relative;
`

export const input = css`
  border: none;
  border-bottom: solid 1px #0004;
  width: 100%;
  &:focus {
    & + .popOver {
      transform: scale3d(1, 1, 1);
    }
  }
`

export const popOverCont = css`
  position: absolute;
  display: flex;
  padding: 10px;
  transition: 0.125s;
  z-index: 100;
  transform: scale3d(0, 1, 0);
  background: #fff;
  border: solid 1px #0002;
  &:hover {
    transform: scale3d(1, 1, 1);
  }
  text-align: center;
`

export const btn = css`
  width: 95px;
  height: 34px;
  border-radius: 5px;
  border: none;
  color: white;
  background: #008fd8;
  margin: 10px;
  cursor: pointer;
  &.cancel {
    border: solid 1px rgba(218, 218, 218, 0.79);
    background: white;
    color: #333333;
  }
`
export const updateCancel = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const calanderClass = css`
  border: none;
`

export const timeCont = css`
  display: flex;
  width: 150px;
  height: 100%;
  text-align: left;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 20px;
`

export const timeBtn = css`
  width: 39.9px;
  height: 36px;
  border-radius: 2px;
  background-color: #008fd8;
  border: solid 1px #008fd8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`

export const timeBtnCont = css`
  justify-content: center;
  font-size: xx-large;
  display: flex;
`

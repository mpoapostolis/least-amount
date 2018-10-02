import { css } from "emotion"

export const container = css`
  position: relative;
`

export const labelKlass = css`
  color: #6a6a6a;
  cursor: pointer;
  user-select: none;
`

export const popOver = css`
  position: absolute;
  transform: scale3d(0, 1, 0);
  width: inherit;
  transition: 0.125s;
  border: solid 1px rgb(200, 200, 200);
  box-shadow: rgba(26, 26, 29, 0.3) 0px 15px 46px -10px;
  background: white;
  z-index: 99999999;
  max-height: 300px;
  overflow-y: auto;
  &.active {
    transform: scale3d(1, 1, 1);
  }
  &.right {
    right: 0px;
  }

  &.left {
    left: 0px;
  }

  &.top {
    top: 20px;
  }
  &.bottom {
    bottom: 20px;
  }
`

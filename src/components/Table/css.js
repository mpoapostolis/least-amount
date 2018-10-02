import { css } from "emotion"

export const containers = css`
  width: 100%;
  font-size: small;
  color: #6b6b6b;
`

export const topFilters = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  flex-wrap: wrap;
  border-bottom: solid 1px #0001;
  font-size: small;
`

export const bottomFilters = css`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;
`

export const table = css`
  width: 100%;
  &.loading {
    filter: opacity(50%)
  }
`

export const loader = css`
  position: absolute;
  left: 50%;
  top: 45%;
  width: 60px;
  height: 60px;
  display: none;
  opacity: 1;
  &.loading {
    display: block;
  }
`

export const row = css`
  width: 100%;
  height: 63px;
`

export const col = css`
  text-align: left;
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
`

export const menuItem = css`
  min-width: 150px;
  padding: 15px;
  user-select: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  outline: none;
  background: #fff;
  border-bottom: solid 1px #0002;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  cursor: pointer;
`

export const displayClass = css`
  white-space: pre-line;
  font-size: small;
  display: flex;
  align-items: center;
  width: 150px;
  margin: 20px;
  label {
    margin-left: 15px;
  }
`

export const footFiltersCont = css`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  flex-direction: row-reverse;
`

export const footFilterItems = css`
  display: flex;
  justify-content: space-around;
`

export const tableFilter = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin: 0 30px 0 30px;
  &.no-margin {
    margin: 0;
  }
`

export const offsetCont = css`
  justify-content: space-between;
  display: flex;
  align-items: center;
  min-width: 120px;
`

export const offsetArrow = css`
  cursor: pointer;
  user-select: none;
  &.disable {
    opacity: 0.2;
    cursor: not-allowed;
  }
`

export const sortDisplayCont = css`
  display: flex;
`

export const input = css`
  border: solid 1px #0002;
  transition: all 0.125s;
  padding: 5px;
  height: 20px;
  width: 150px;
  border-radius: 4px;
  &:focus {
    width: 250px;
  }
`

export const optionKlass = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  border-bottom: solid 1px #0002;
  min-width: 75px;
  padding: 15px;
  &:hover {
    background: #0001;
  }
  &.sort {
    width: 200px;
  }
`

export const clear = css`
  color: #b7b7b7;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`

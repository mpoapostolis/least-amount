import React, { PureComponent } from "react"
import { checkBox } from "./css"

/**
 *
 * @prop {function} onChage
 * @prop {Boolean} checked
 */
class CheckBox extends PureComponent {
  render() {
    const { onChange, checked, id } = this.props
    return (
      <div>
        <input
          {...this.props}
          id={id}
          checked={checked}
          onChange={onChange}
          className={checkBox}
          type="checkbox"
        />
        <div>✔</div>
      </div>
    )
  }
}
export default CheckBox

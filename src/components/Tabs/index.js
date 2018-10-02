import React, { PureComponent } from "react"
import * as styles from "./css"

/**
 * @prop {String} active
 * @prop {String[]} tabsArr
 * @prop {Function} setActive // (activeTab:string) => whatever
 * @prop {String} extraClass
 */
class Tabs extends PureComponent {
  activateTab = ({ currentTarget }) => {
    const { setActive } = this.props
    const textContent = currentTarget.textContent
    const active = textContent
    this.setState({ active })
    setActive(active)
  }

  isActive = tab => {
    const { active } = this.props
    return tab === active ? "active" : ""
  }

  render() {
    const { tabsArr = [], extraClass = "" } = this.props
    const { tabs, btn, tabsCont } = styles

    return (
      <div className={tabsCont}>
        <div className={`${tabs} ${extraClass}`}>
          {tabsArr.map((name, key) => (
            <button
              key={key}
              onClick={this.activateTab}
              className={`${btn} ${this.isActive(name) ? "active" : ""}`}>
              {name}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default Tabs

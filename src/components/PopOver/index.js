import React, { PureComponent } from "react"
import { container, labelKlass, popOver } from "./css"
import Transition from "react-transition-group/Transition"

/**
 * @param {HTMLElement[]} children
 * @param {boolean} active
 * @param {HTMLElemnt} node
 * @param {function} handleClose
 */
function AnimationWrapper(props) {
  const { active, positionY, positionX } = props
  return (
    <Transition in={active} timeout={200}>
      {state => {
        let klassName = popOver
        switch (state) {
          case "entering":
            break
          case "entered":
            klassName += " active"
            break

          case "exiting":
            break

          default:
            klassName = ""
            break
        }
        return state === "exited" ? null : (
          <div className={`${klassName} ${positionX} ${positionY}`}>
            {props.children}
          </div>
        )
      }}
    </Transition>
  )
}
/**
 *
 */
class PopOver extends PureComponent {
  state = { active: false }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClickOutside, false)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside, false)
  }

  handleClickOutside = ({ target }) => {
    if (!this.node.contains(target)) this.setState({ active: false })
  }

  componentDidUpdate(nextProps) {
    if (nextProps.label !== this.props.label) {
      this.setState({ active: false })
    }
  }

  popOver = () => this.setState({ active: !this.state.active })

  setRef = node => {
    this.node = node
  }

  render() {
    const { label } = this.props
    const { active } = this.state
    const rect = this.node ? this.node.getBoundingClientRect() : {}
    const { innerHeight, innerWidth } = window
    const positionY = rect.y + 400 > innerHeight ? "bottom" : "top"
    const positionX = rect.x + 400 > innerWidth ? "right" : "left"
    return (
      <div ref={this.setRef} className={container}>
        <label onClick={this.popOver} className={labelKlass}>
          {label} 🞃
        </label>
        <AnimationWrapper
          positionX={positionX}
          positionY={positionY}
          active={active}>
          {this.props.children}
        </AnimationWrapper>
      </div>
    )
  }
}

export default PopOver

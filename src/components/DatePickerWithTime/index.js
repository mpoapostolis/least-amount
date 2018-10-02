import React, { PureComponent } from "react"
import { format } from "date-fns"
import Calendar from "react-calendar"
import setHours from "date-fns/set_hours"
import setMinutes from "date-fns/set_minutes"
import {
  container,
  timeBtnCont,
  timeBtn,
  calanderClass,
  popOverCont,
  input,
  timeCont
} from "./css"

/**
 * @prop {function} handleChange
 * @prop {String} Label
 */
class DatePickerWithTime extends PureComponent {
  state = {
    date: undefined,
    hours: 0,
    minutes: 0
  }

  handleRange = ({ currentTarget }) => {
    const type = currentTarget.getAttribute("keyname")
    const selectedDate = this.state.date || new Date()
    const { value } = currentTarget
    const date =
      type === "hours"
        ? setHours(selectedDate, value)
        : setMinutes(selectedDate, value)
    this.setState({ [type]: +value, date })
    this.refs.audio.currentTime = 0
    this.refs.audio.play()
    this.props.handleChange(date)
  }

  handleDate = date => {
    this.setState({ date, hours: 0, minutes: 0 })
    this.props.handleChange(date)
  }

  showTime = time => (time < 10 ? `0${time}` : time)

  render() {
    const { date, hours, minutes } = this.state
    const displayDate = date ? format(date, "D MMM YYYY, HH:mm") : undefined
    return (
      <div className={container}>
        <audio ref="audio" src="/sounds/tick.mp3" />
        <input
          defaultValue={displayDate}
          placeholder={this.props.label || "DD/MM/YYYY, HH:mm"}
          className={input}
          type="text"
        />
        <div className={`${popOverCont} popOver`}>
          <div>
            <h3>Date</h3>
            <Calendar onChange={this.handleDate} className={calanderClass} />
          </div>
          <div>
            <h3>Time</h3>
            <div className={timeCont}>
              <div className={timeBtnCont}>
                <div className={timeBtn}>{this.showTime(hours)}</div>:
                <div className={timeBtn}>{this.showTime(minutes)}</div>
              </div>
              <div>
                <label>Hours</label>
                <input
                  onChange={this.handleRange}
                  keyname={"hours"}
                  min={0}
                  max={23}
                  value={hours}
                  type="range"
                />
              </div>
              <div>
                <label>Minute</label>
                <input
                  onChange={this.handleRange}
                  keyname={"minutes"}
                  min={0}
                  max={59}
                  value={minutes}
                  type="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DatePickerWithTime

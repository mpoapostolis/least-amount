import React, { PureComponent } from "react"
import PopOver from "../PopOver"
import Calendar from "react-calendar"
import queryString from "../../utils/query-string"
import { format } from "date-fns"
import { css } from "emotion"

const calendarClass = css`
  border: none;
`

const cont = css`
  display: flex;
  align-items: center;
  i {
    color: #b7b7b7;
    margin-left: 5px;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
`

class DatePicker extends PureComponent {
  state = {
    dates: [undefined, undefined],
    active: false
  }

  componentDidMount() {
    const fromDate = this.defaultFilterValue("from")
    const toDate = this.defaultFilterValue("to")
    const dates = [fromDate, toDate].map(e => (e ? new Date(+e) : undefined))
    this.setState({ dates })
  }

  updateParams = obj => {
    const { fetchData } = this.props
    const { replace } = this.props.history
    const { search } = this.props.history.location

    // update URL params
    const urlParamsObj = queryString.parse(search)
    const urlParamsStr = queryString.stringify(
      Object.assign({}, urlParamsObj, obj)
    )
    replace({ search: urlParamsStr })
    fetchData(urlParamsStr)
  }

  defaultFilterValue = key => {
    const search = this.props.history.location.search.replace(/\?/g, "")
    return queryString.parse(search)[key]
  }

  handleChange = dates => {
    const [fromDate, toDate] = dates
    this.updateParams({
      dateFrom: fromDate.getTime(),
      dateTo: toDate.getTime()
    })
    this.setState({ dates })
  }

  f = date => format(new Date(date), "D MMM YYYY")

  clear = () =>
    this.setState(s => {
      const dates = [undefined, undefined]
      this.updateParams({ dateFrom: undefined, dateTo: undefined })
      return { dates }
    })

  render() {
    const { dates } = this.state
    const [fromDate, toDate] = dates
    const msg =
      fromDate && toDate
        ? `Dates: (${this.f(fromDate)} - ${this.f(toDate)})`
        : "Date: (from - to)"
    const showHide = dates.filter(e => e).length
    return (
      <div className={cont}>
        <PopOver label={msg}>
          <Calendar
            className={calendarClass}
            calander
            selectRange
            onChange={this.handleChange}
            value={dates}
          />
        </PopOver>
        {showHide ? <i onClick={this.clear}>clear</i> : void 0}
      </div>
    )
  }
}

export default DatePicker

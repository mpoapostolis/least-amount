import React, { Component } from "react"
import queryString from "../../utils/query-string"
import Checkbox from "../CheckBox"
import PopOver from "../PopOver"
import I18N from "../../I18n"

import {
  footFilterItems,
  footFiltersCont,
  offsetCont,
  clear,
  offsetArrow,
  tableFilter,
  bottomFilters,
  containers,
  displayClass,
  table,
  row,
  col,
  sortDisplayCont,
  optionKlass
} from "./css"

const selectFromRows = [1, 2, 3, 4, 5, 10, 15, 20, 25]

/**
 * @prop {string} type
 * @prop {function} renderer
 * @prop {string} keyName
 * @prop {Object} obj
 */
function Render({ type, renderer, keyName, obj, t }) {
  switch (type) {
    case "renderer":
      return renderer(obj, t)
    default:
      return keyName ? t(obj[keyName]) : null
  }
}

/**
 *@prop {Object[]} sortByArr
 *@prop {Object} history
 *@prop {Object} dataInfo
 *@prop {Object[]} tableConf
 *@prop {function} fetchData
 */

class Table extends Component {
  constructor(props) {
    super(props)
    const { tableConf = [] } = props
    const state = {
      sortLabel: "",
      popOver: null,
      showCol: new Array(tableConf.length).fill(true),
      tableConf
    }
    this.state = state
  }

  componentDidMount() {
    const defaultParams = `?limit=10`
    const { fetchData, sortByArr } = this.props
    const { replace } = this.props.history
    const search = this.props.history.location.search.replace(/\?/g, "")
    if (!search) replace({ search: defaultParams })
    if (search.match(/sort/g)) {
      const sortLabel = sortByArr.find(
        obj => obj.value === queryString.parse(search).sort
      ).name
      this.setState({ sortLabel })
    }
    fetchData(search.replace(/\?/g, ""))
  }

  handleChangeOffset = ({ currentTarget }) => {
    const { offset, total, limit } = this.props.dataInfo
    const direction = +currentTarget.getAttribute("offset")
    const maxPages = limit > total ? 1 : Math.ceil(total / limit)
    const newOffset = offset + direction
    const isValid = newOffset > -1 && newOffset < maxPages
    if (isValid) this.updateParams({ offset: newOffset })
  }

  handleChangeLimit = limit => {
    this.updateParams({ limit, offset: 0 })
  }

  handleChangeOrder = (sort, sortLabel) => {
    this.setState({ sortLabel })
    this.updateParams({ sort })
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

  /************************************** Filter table col *************************************/
  toggleCol = evt => {
    const index = parseInt(evt.target.id.slice(-1), 10)
    const { showCol } = this.state
    showCol.splice(index, 1, !showCol[index])
    this.setState({ showCol })
  }

  defaultFilterValue = key => {
    const search = this.props.history.location.search.replace(/\?/g, "")
    return queryString.parse(search)[key]
  }

  render() {
    const {
      dataInfo: { data = [], total, loading, limit, offset },
      sortByArr
    } = this.props
    const { showCol, sortLabel } = this.state
    const currentPage = offset
    const maxPages = limit > total ? 1 : Math.ceil(total / limit)
    const tableConf = this.props.tableConf.filter((_, i) => showCol[i])
    const isLoading = loading ? "loading" : ""

    const names = this.props.tableConf.map(({ name }) => name)

    return (
      <I18N.Consumer>
        {t => (
          <div className={containers}>
            <div className={bottomFilters}>
              <div>
                {total} {t("entries")}
              </div>
              <div className={sortDisplayCont}>
                <div className={tableFilter}>
                  <PopOver label={`${t("Sort By")} ${sortLabel}`}>
                    {sortByArr.map(({ name, value }, key) => (
                      <div
                        onClick={() => this.handleChangeOrder(value, name)}
                        className={`${optionKlass} sort`}
                        key={key}>
                        {t(name)}
                      </div>
                    ))}
                  </PopOver>
                  {Boolean(sortLabel) ? (
                    <i
                      onClick={() => this.handleChangeOrder(undefined, "")}
                      className={clear}>
                      clear
                    </i>
                  ) : null}
                </div>
                <PopOver label={t("Display")}>
                  {names.map((name, i) => (
                    <div className={displayClass} key={i}>
                      <Checkbox
                        onChange={this.toggleCol}
                        id={`${window.location.pathname}-check-box-${i}`}
                        checked={showCol[i]}
                      />
                      <label>{name}</label>
                    </div>
                  ))}
                </PopOver>
              </div>
            </div>

            <table className={`${table} ${isLoading}`}>
              {/* <table className={table}> */}
              <thead className={row}>
                <tr>
                  {tableConf.map(({ name }, key) => (
                    <th className={col} key={key}>
                      {t(name)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((obj, rowKey) => (
                  <tr key={rowKey} className={row}>
                    {tableConf.map((conf, colKey) => (
                      <td key={colKey} className={col}>
                        <Render t={t} {...conf} obj={obj} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={footFiltersCont}>
              <div className={footFilterItems}>
                <div className={tableFilter}>
                  <PopOver label={`${t("Row per page")} ${limit}`}>
                    {selectFromRows.map((value, key) => (
                      <div
                        className={optionKlass}
                        onClick={() => this.handleChangeLimit(+value)}
                        key={key}>
                        {t(value)}
                      </div>
                    ))}
                  </PopOver>
                </div>
                <div className={offsetCont}>
                  <div
                    offset={-1}
                    onClick={this.handleChangeOffset}
                    className={`${offsetArrow} ${
                      currentPage === 0 ? "disable" : ""
                    }`}>
                    ❮
                  </div>
                  <div>
                    {t("Page")} <b>{currentPage + 1}</b> {t("of")}
                    <b>{maxPages}</b>
                  </div>
                  <div
                    offset={1}
                    onClick={this.handleChangeOffset}
                    className={`${offsetArrow} ${
                      currentPage + 1 === maxPages ? "disable" : ""
                    }`}>
                    ❯
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </I18N.Consumer>
    )
  }
}

export default Table

// /** @jsx jsx */
import { SetStateAction, useEffect, useState } from 'react'
import { jsx } from '@emotion/react'
import { CSSObject } from '@emotion/serialize'
import moment, { Moment } from 'moment'
import * as chrono from 'chrono-node'

import Select, { GroupProps, OptionProps, components as SelectComponents } from 'react-select'
import DatePicker from "react-datepicker"

interface DateOption {
  date: Moment
  display?: string
}
// { value: 'Today', label: 'Today' },
// { value: 'Last 48 hours', label: 'Last 48 hours' },
// { value: 'Last 7 days', label: 'Last 7 days' },
// { value: 'Last 14 days', label: 'Last 14 days' },
// { value: 'Last 30 days', label: 'Last 30 days' },
// { value: 'Date range', label: 'Date range' },

const createOptionForDate = (d: Moment | Date) => {
  const date = moment.isMoment(d) ? d : moment(d)
  return {
    date,
    value: date.toDate(),
    label: date.calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Last 48 hours]',
      nextWeek: '[Last 7 days]',
      lastDay: '[Last 14 days]',
      lastWeek: '[Last 30 days]',
      sameElse: 'Do MMMM YYYY',
    }),
  }
}

interface CalendarGroup {
  label: string
  options: readonly DateOption[]
}

const defaultOptions: (DateOption | CalendarGroup)[] = [
  'Today',
  'Last 48 hours',
  'Last 7 days',
  'Last 14 days',
  'Last 30 days',
  'Data range',
].map((i) => createOptionForDate(chrono.parseDate(i)))


const createCalendarOptions = (date = new Date()) => {
  const daysInMonth = Array.apply(null, Array(moment(date).daysInMonth())).map(
    (x, i) => {
      const d = moment(date).date(i + 1)
      return { ...createOptionForDate(d), display: 'calendar' }
    }
  )
  return {
    label: moment(date).format('dd MM'),
    options: daysInMonth,
  }
}

defaultOptions.push(createCalendarOptions())
console.log(defaultOptions);

const Group = (props: GroupProps<DateOption, false>) => {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column' as 'column',
    border: 'none',
  }
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEnd, setIsOpenEnd] = useState(false)

  const handleChange = (e: any) => {
    setIsOpen(!isOpen)
    setStartDate(e)
  }
  const handleChangeEnd = (e: any) => {
    setIsOpenEnd(!isOpenEnd)
    setEndDate(e)
  }
  const handleClick = (e: any) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }
  const handleClickEnd = (e: any) => {
    e.preventDefault()
    setIsOpenEnd(!isOpenEnd)
  }
  // const { Heading, getStyles, children, label, headingProps, cx, theme, selectProps } = props
  return (
    <div aria-label='' style={groupStyles}>
      <button className="example-custom-input" onClick={handleClick}>
        {moment(startDate).format("DD-MM-yyyy")}
      </button>

      <button className="example-custom-input" onClick={handleClickEnd}>
        {moment(endDate).format("DD-MM-yyyy")}
      </button>

      <div >
        {isOpen && (
          <DatePicker selected={startDate} onChange={handleChange} inline />
        )}
      </div>
      <div>
        {isOpenEnd && (
          <DatePicker selected={endDate} onChange={handleChangeEnd} inline />
        )}
      </div>
    </div>
  )
}

// const Option = (props: OptionProps<DateOption, false>) => {
//   return <SelectComponents.Option {...props} />
// }

interface DatePickerProps {
  value: DateOption | any
  readonly onChange: (value: DateOption | null) => void
  setState: any
}

const DatePickerWrap = (props: DatePickerProps) => {

  const [options, setОptions] = useState([
    { value: 'Today', label: 'Today' },
    { value: 'Last 48 hours', label: 'Last 48 hours' },
    { value: 'Last 7 days', label: 'Last 7 days' },
    { value: 'Last 14 days', label: 'Last 14 days' },
    { value: 'Last 30 days', label: 'Last 30 days' },
    { value: 'Date range', label: 'Date range' },
  ])

  const handleInputChange = (value: string) => {
    setОptions([
      { value: 'Today', label: 'Today' },
      { value: 'Last 48 hours', label: 'Last 48 hours' },
      { value: 'Last 7 days', label: 'Last 7 days' },
      { value: 'Last 14 days', label: 'Last 14 days' },
      { value: 'Last 30 days', label: 'Last 30 days' },
      { value: 'Date range', label: 'Date range' },
    ])
  }
  const { value } = props
  return (
    <Select<DateOption, false>
      {...props}
      components={{ Group }}
      filterOption={null}
      isMulti={false}
      isOptionSelected={(o, v) => v.some((i) => i.date.isSame(o.date, 'day'))}
      minMenuHeight={100}
      maxMenuHeight={800}
      onChange={props.onChange}
      onInputChange={handleInputChange}
      options={options as any}
      value={value}
    />
  )
}

interface State {
  readonly value: DateOption | null
}

const Experimental = () => {

  const [state, setState] = useState<any>(defaultOptions)

  const handleChange = (value: any) => {
    setState(value)
  }

  const { label } = state
  const displayValue = label && label ? label.toString() : 'null'
  return (
    <div>
      <pre>Value: {displayValue}</pre>
      <DatePickerWrap value={state} onChange={handleChange} setState={setState} />
    </div>
  )
}

export default Experimental

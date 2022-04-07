// /** @jsx jsx */
import { SetStateAction, useEffect, useState } from 'react'
import { jsx } from '@emotion/react'
import { CSSObject } from '@emotion/serialize'
import moment, { Moment } from 'moment'
import * as chrono from 'chrono-node'
import { css } from '@emotion/react'

import Select, { GroupProps, OptionProps, components as SelectComponents } from 'react-select'
import DatePicker from "react-datepicker"

interface DateOption {
  date: Moment
  label: string
  display?: string
}
// { value: 'Today', label: 'Today' },
// { value: 'Last 48 hours', label: 'Last 48 hours' },
// { value: 'Last 7 days', label: 'Last 7 days' },
// { value: 'Last 14 days', label: 'Last 14 days' },
// { value: 'Last 30 days', label: 'Last 30 days' },
// { value: 'Date range', label: 'Date range' },

const createOptionForDate = (data: string | Moment) => {
  console.log('Data: ', data)
  return {
    value: data,
    label: data,
  }
}

interface CalendarGroup {
  label: string
  options: readonly DateOption[]
}

const defaultOptions: (DateOption | CalendarGroup | any)[] = [
  'Today',
  'Last 48 hours',
  'Last 7 days',
  'Last 14 days',
  'Last 30 days',
].map(item => createOptionForDate(item))


const createCalendarOptions = (date = new Date()) => {
  const daysInMonth = Array.apply(null, Array(moment(date).daysInMonth())).map(
    (x, i) => {
      const d = moment(date).date(i + 1)
      return { ...createOptionForDate(d), display: 'calendar' }
    }
  )
  return {
    label: moment(date).format('MMMM YYYY'),
    options: daysInMonth,
  }
}

defaultOptions.push(createCalendarOptions())

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'space-between',
  flexDirection: 'column' as 'column',
  border: 'none',
}

const Group = (props: GroupProps<DateOption, false>) => {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())


  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEnd, setIsOpenEnd] = useState(false)
  const [isOpenRange, setIsOpenRange] = useState(false)

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

  const handleClickRange = (e: any) => {
    e.preventDefault()
    setIsOpenRange(!isOpenRange)
  }

  const { label } = props
  return (
    <div aria-label={label as string} style={groupStyles}>

      <div onClick={handleClickRange}>
        Date range
      </div>

      {
        isOpenRange && <div>
          <button onClick={handleClick}>
            {moment(startDate).format("DD-MM-yyyy")}
          </button>

          <button onClick={handleClickEnd}>
            {moment(endDate).format("DD-MM-yyyy")}
          </button>
        </div>
      }
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center'}}>

        {isOpen && (
          <DatePicker selected={startDate} onChange={handleChange} inline />
        )}
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
// const Option = (props: OptionProps<DateOption, false>) => {
//   const {
//     children,

//     innerRef,
//     innerProps,
//   } = props;
//   return (
//     <div
//       ref={innerRef}
//       {...innerProps}
//       >
//       <button>Test</button>
//       {children}
//     </div>
//   );
// };
const InputBoxWithText = (props: OptionProps<DateOption, false>) => {
  return <button > Test</button>
}

interface DatePickerProps {
  value: DateOption | any
  readonly onChange: (value: DateOption | null) => void
  setState: any
}

const DatePickerWrap = (props: DatePickerProps) => {

  const [options, setОptions] = useState<any>(defaultOptions)

  const handleInputChange = (value: string) => {
    setОptions(defaultOptions)
  }
  const { value } = props

  return (
    <Select<DateOption, false>
      {...props}
      // // @ts-ignore
      // components={{ Input: InputBoxWithText, Group }}
      components={{ Group }}

      filterOption={null}
      isMulti={false}
      minMenuHeight={100}
      maxMenuHeight={800}
      onChange={props.onChange}
      onInputChange={handleInputChange}
      options={options}
      value={value}
    />
  )
}

interface State {
  readonly value: DateOption | null
}

const Experimental = () => {

  const [state, setState] = useState(defaultOptions[0] as DateOption)

  console.log('Options: ', state)

  const handleChange = (value: any) => {
    setState(value)
  }

  const { label } = state
  const displayValue = label && label ? label.toString() : 'null'
  return (
    <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', padding: '500px' }}>
      <pre>Value: {displayValue}</pre>
      <DatePickerWrap value={state} onChange={handleChange} setState={setState} />
    </div>
  )
}

export default Experimental

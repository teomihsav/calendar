import { CSSProperties, useState } from 'react'
import moment, { Moment } from 'moment'

import Select, { GroupProps } from 'react-select'
import DatePicker from "react-datepicker"

import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"

interface DateOption {
  date: Moment
  label: string
  display?: string
}

const createOptionForDate = (data: string | Moment) => {
  return {
    value: data,
    label: data,
  }
}

const defaultOptions: (DateOption | any)[] = [
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


const Group = (props: GroupProps<DateOption, false>) => {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEnd, setIsOpenEnd] = useState(false)
  const [isOpenRange, setIsOpenRange] = useState(false)

  const handleChange = (e: any) => {

    setIsOpen(true)
    setStartDate(e)
  }
  const handleChangeEnd = (e: any) => {

    setIsOpenEnd(true)
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

  const useHover = (styleOnHover: CSSProperties, styleOnNotHover: CSSProperties = {}) => {
    const [style, setStyle] = useState(styleOnNotHover)

    const onMouseEnter = () => setStyle(styleOnHover)
    const onMouseLeave = () => setStyle(styleOnNotHover)

    return { style, onMouseEnter, onMouseLeave }
  }
  const hover = useHover({ backgroundColor: "#cbd8e7" })
  const hoverEnd = useHover({ backgroundColor: "#cbd8e7" })
  const hoverRange = useHover({ backgroundColor: "#cbd8e7" })

  return (
    <div>
      <div onClick={handleClickRange} {...hoverRange} >
        <span style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', margin: '8px' }}>Date range {isOpenRange ? <AiFillCaretUp /> : <AiFillCaretDown />} </span>
      </div>
      <div>
        {
          isOpenRange &&
          <div>
            <div onClick={handleClick} {...hover} >
              <span style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', margin: '8px' }}>Start Date {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />} </span>
            </div>

            {
              isOpen && (
                <div>
                  <div style={{ margin: '10px', alignContent: 'start' }} >
                    <hr></hr>
                    {moment(startDate).format("DD-MM-yyyy") as string}
                    <hr></hr>
                  </div>
                  <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    isClearable inline
                  />

                </div>
              )
            }

            <div onClick={handleClickEnd} {...hoverEnd}  >
              <span style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', margin: '8px' }}>End Date {isOpenEnd ? <AiFillCaretUp /> : <AiFillCaretDown />} </span>
            </div>

            {
              isOpenEnd && (
                <div>
                  <div style={{ margin: '10px', alignContent: 'start' }} >
                    <hr></hr>
                    {moment(endDate).format("DD-MM-yyyy") as string}
                  </div>
                  <hr></hr>
                  <DatePicker
                    selected={endDate}
                    onChange={handleChangeEnd}
                    isClearable inline
                  />
                </div>
              )
            }

          </div>
        }
      </div>
    </div>
  )
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
    <div style={{ padding: '100px', width: '280px' }}>
      <Select<DateOption, false>
        {...props}
        // // @ts-ignore
        // components={{ Input: InputBoxWithText, Group }}
        components={{ Group }}
        closeMenuOnSelect={false}
        filterOption={null}
        isMulti={false}
        minMenuHeight={100}
        maxMenuHeight={1000}
        onChange={props.onChange}
        onInputChange={handleInputChange}
        options={options}
        value={value}
      />
    </div>
  )
}

const Experimental = () => {

  const [state, setState] = useState(defaultOptions[0] as DateOption)

  const handleChange = (value: any) => {
    setState(value)
  }

  return (
    <div style={{ display: "flex", justifyContent: 'center' }}>
      <DatePickerWrap value={state} onChange={handleChange} setState={setState} />
    </div>
  )
}

export default Experimental

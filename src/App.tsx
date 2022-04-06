import React, { useState } from 'react'

import Select, { } from 'react-select'
import DatePicker from "react-datepicker"

import Test from './components/TestA'

import './App.css'
import "react-datepicker/dist/react-datepicker.css"

const App = () => {

  const [startDate, setStartDate] = useState(new Date())
  const [openDate, setOpenDate] = useState(false)


  const Option = (props: any) => {
    return (
      <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
    )
  }
  const onClickHandler = (event: any) => {
    console.log(event.value)
  }
  return (
    <div className='App'>
      <Test />
    </div>
  )
}

export default App

const optionsDateRange = [
  { value: 'Date range', label: 'Date range' },
  { value: 'Start Date', label: 'Start Date' },
  { value: 'End Date', label: 'End Date' }
]
const options = [

  { value: 'Today', label: 'Today' },
  { value: 'Last 48 hours', label: 'Last 48 hours' },
  { value: 'Last 7 days', label: 'Last 7 days' },
  { value: 'Last 14 days', label: 'Last 14 days' },
  { value: 'Last 30 days', label: 'Last 30 days' },
  { value: 'Date range', label: 'Date range' },
  // {value: 'Start Date', label: 'Start Date'},
  // {value: 'End Date', label: 'End Date'}
]
import React, { useState } from "react"

import Select, { StylesConfig, components, OptionProps } from "react-select"
import DatePicker from "react-datepicker"
import moment, { Moment } from "moment"

import { AiFillCaretUp, AiFillCaretDown, AiOutlineDelete } from "react-icons/ai"
import "react-datepicker/dist/react-datepicker.css"
import './Option.css'

import { options } from "./data"

interface DateOption {
    displayName: string
    options: string
    date: Moment;
    value: Date;
    label: string;
    display?: string;
  }

const Option = (props: OptionProps<DateOption, false>) => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [isOpenEnd, setIsOpenEnd] = useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenRange, setIsOpenRange] = useState(false)

    const handleChange = (e: React.SetStateAction<Date | any>) => {
        setIsOpen(true)
        setStartDate(e)
    }
    const handleChangeEnd = (e: React.SetStateAction<Date | any>) => {
        setIsOpenEnd(true)
        setEndDate(e)
    }

    const handleClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }
    const handleClickEnd = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsOpenEnd(!isOpenEnd)
    }

    const handleClickRange = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsOpenRange(!isOpenRange)
    }

    const { children } = props

    if (children === "Data Range") {
        return (
            <components.Option {...props}>
                <div style={{ cursor: 'pointer' }}>
                    <div onClick={handleClickRange}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 11px 9px 9px', color: 'black' }}>
                            {children} {isOpenRange ? <AiFillCaretUp color='grey' /> : <AiFillCaretDown color='grey' />}
                        </span>
                    </div>
                    <div>
                        {isOpenRange && (
                            <div style={{ background: 'white' }}>

                                <span style={{ display: "flex", alignItems: 'center', color: 'black' }}>
                                    <div onClick={handleClick} >
                                        <span style={{ display: "flex", padding: "0px", color: 'black', background: 'white' }}>
                                            <input
                                                className={isOpen ? 'inputWithDeleteButton' : 'input'}
                                                placeholder='Start Date'
                                                
                                                value={isOpen ? moment(startDate).format("MMM DD, yyyy") : 'Start Date'}
                                            />
                                            <span style={{ margin: '10px' }}>
                                                {isOpen ? <AiFillCaretUp color='#347174' /> : <AiFillCaretDown color='grey' />}
                                            </span>
                                        </span>
                                    </div>
                                    {
                                        isOpen &&
                                        <span onClick={() => setStartDate( null as any)} style={{ margin: '0px 10px 0px 0px' }}>
                                            <AiOutlineDelete color='grey' />
                                        </span>
                                    }
                                </span>
                                <div style={{ height: "2px", background: "grey", margin: "0px 10px 10px 10px", color: "grey" }}  > </div>

                                {isOpen && (
                                    <div >
                                        <div>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={handleChange}
                                                isClearable
                                                inline
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* --- */}

                                <span style={{ display: "flex", alignItems: 'center', color: 'black', }}>
                                    <div onClick={handleClickEnd} >
                                        <span style={{ color: 'black', background: 'white' }}>
                                            <input
                                                className={isOpenEnd ? 'inputWithDeleteButton' : 'input'}
                                                placeholder='End Date'
                                                value={isOpenEnd ? moment(endDate).format("MMM DD, yyyy") : 'End Date'}
                                            />
                                            <span style={{ margin: '10px' }}>
                                                {isOpenEnd ? <AiFillCaretUp color='#347174' /> : <AiFillCaretDown color='grey' />}
                                            </span>
                                        </span>
                                    </div>
                                    {
                                        isOpenEnd &&
                                        <span onClick={() => setEndDate("" as unknown as Date)} style={{ margin: '0px 10px 0px 0px' }}>
                                            <AiOutlineDelete color='grey' />
                                        </span>
                                    }
                                </span>
                                <div style={{ height: "2px", background: "grey", margin: "0px 10px 10px 10px", color: "grey" }}  > </div>

                                {isOpenEnd && (
                                    <div >
                                        <div>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={handleChangeEnd}
                                                isClearable
                                                inline
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </components.Option >
        )
    } else {
        return <components.Option {...props}><span style={{ display: 'flex', padding: '9px', color: 'black' }}>{children}</span></components.Option>
    }
}

const Opt = () => {

    const colourStyles: StylesConfig<true> = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected, }) => {
            return {
                backgroundColor: isDisabled ? undefined : isSelected ? '#e0e8f3' : isFocused ? '#f0f6ff' : undefined,
                fontWeight: isSelected ? '600' : isFocused ? '600' : '500',
            }
        },
    }

    return (

        <div style={{ position: 'relative', width: '242px', background: '#fff', fontWeight: '400' }}>
            <Select
                // menuIsOpen
                components={{ Option: Option }}
                closeMenuOnSelect={false}
                options={options as []}
                placeholder="Today"
                minMenuHeight={200}
                maxMenuHeight={1200}
                styles={colourStyles as object}
            />
        </div>
    )
}

export default Opt
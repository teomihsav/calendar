import React, { useState } from "react"

import Select, { StylesConfig, components, OptionProps } from "react-select"
import DatePicker from "react-datepicker"
import moment from "moment"

import { AiFillCaretUp, AiFillCaretDown, AiOutlineDelete } from "react-icons/ai"
import "react-datepicker/dist/react-datepicker.css"
import './Option.css'

import { options } from "./data"

interface DateOption {
    displayName: string
    options: string
    value: Date
    label: string
    display?: string
    moment: Date
}

const Option: React.FC<OptionProps<DateOption>> = (props) => {

    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [endDate, setEndDate] = useState<Date | undefined>(new Date())
    const [isOpenEnd, setIsOpenEnd] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenRange, setIsOpenRange] = useState<boolean>(false)
    const [stateDate, setStateDate] = useState<boolean>(false)
    const [stateDateEnd, setStateDateEnd] = useState<boolean>(false)

    const handleChange = (e: Date) => {
        setIsOpen(true)
        setStartDate(e)
    }
    const handleChangeEnd = (e: Date) => {
        setIsOpenEnd(true)
        setEndDate(e)
    }

    const handleClick = () => {
        setIsOpen(!isOpen)
        setStateDate(true)
    }
    const handleClickEnd = () => {
        setIsOpenEnd(!isOpenEnd)
        setStateDateEnd(true)
    }

    const handleClickRange = () => {
        setIsOpenRange(!isOpenRange)
    }
    const handleDeleteStart = () => {
        setStartDate(undefined)
    }
    const handleDeleteEnd = () => {
        setEndDate(undefined)
    }

    const { children } = props

    if (children === "Data Range") {
        return (
            <components.Option {...props}>
                <div className='pointer'>
                    <div onClick={handleClickRange}>
                        <span className='openRange'>
                            {children} {isOpenRange ? <AiFillCaretUp color='grey' /> : <AiFillCaretDown color='grey' />}
                        </span>
                    </div>
                    <div>
                        {isOpenRange && (
                            <div className='backGround'>

                                <span className='displayInnerOption'>
                                    <div onClick={handleClick} >
                                        <span className='displayInnerOptionChvron'>
                                            <input
                                                className={isOpen ? 'inputWithDeleteButton' : 'input'}
                                                placeholder='Start Date'
                                                value={
                                                    isOpen ?
                                                        (
                                                            moment(String(startDate)).isValid() ? moment(String(startDate)).format('MMM DD, YYYY') : ' '
                                                        )
                                                        :
                                                        (
                                                            stateDate ? moment(String(startDate)).format('MMM DD, YYYY') : 'Start Date'
                                                        )
                                                }
                                            />
                                            <span className='someMargin'>
                                                {isOpen ? <AiFillCaretUp color='#347174' /> : <AiFillCaretDown color='grey' />}
                                            </span>
                                        </span>
                                    </div>
                                    {
                                        isOpen &&
                                        <span onClick={handleDeleteStart} >
                                            <AiOutlineDelete color='grey' />
                                        </span>
                                    }
                                </span>
                                <div className='addLine' > </div>

                                {isOpen && (
                                    <div >
                                        <div>
                                            <DatePicker
                                                selected={startDate as Date}
                                                onChange={handleChange}
                                                isClearable
                                                inline
                                            />
                                        </div>
                                    </div>
                                )}

                                <span className='displayInnerOption'>
                                    <div onClick={handleClickEnd} >
                                        <span>
                                            <input
                                                className={isOpenEnd ? 'inputWithDeleteButton' : 'input'}
                                                placeholder='End Date'
                                                value={isOpenEnd ? moment(String(endDate)).isValid() ? moment(String(endDate)).format('MMM DD, YYYY') : ' ' :
                                                    stateDateEnd ? moment(String(endDate)).format('MMM DD, YYYY') : 'End Date'
                                                }
                                            />
                                            <span className='someMargin'>
                                                {isOpenEnd ? <AiFillCaretUp color='#347174' /> : <AiFillCaretDown color='grey' />}
                                            </span>
                                        </span>
                                    </div>
                                    {
                                        isOpenEnd &&
                                        <span onClick={handleDeleteEnd} >
                                            <AiOutlineDelete color='grey' />
                                        </span>
                                    }
                                </span>
                                <div className='addLine'  > </div>

                                {isOpenEnd && (
                                    <div >
                                        <div>
                                            <DatePicker
                                                selected={endDate as Date}
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
        return <components.Option {...props}><span className='options'>{children}</span></components.Option>
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

        <div className='select'>
            <Select
                // For tests
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
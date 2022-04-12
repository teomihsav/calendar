import React, { useState } from "react"

import Select, { StylesConfig, components, GroupBase, OptionProps } from "react-select"
import styled from "styled-components"

import DatePicker from "react-datepicker"
import moment from "moment"

import { options } from "./data"
import "react-datepicker/dist/react-datepicker.css"

import { AiFillCaretUp, AiFillCaretDown, AiOutlineDelete } from "react-icons/ai"

import './Option.css'

const renderNestedOption = (props: JSX.IntrinsicAttributes & OptionProps<unknown, boolean, GroupBase<unknown>>, label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, nestedOptions: { displayName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }[]) => {
    const { innerProps, selectOption } = props

    return (
        <div className="nested-optgroup">
            <div
                style={{
                    color: "grey",
                    paddingLeft: "10px"
                }}
            >
                {label}
            </div>
            {nestedOptions.map((nestedOption: { displayName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }, i: React.Key | null | undefined) => {

                return (
                    <components.Option {...props} key={i} >
                        {nestedOption.displayName}
                    </components.Option>
                )
            })}
        </div>
    )
}

const Option = (props: any) => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [isOpenEnd, setIsOpenEnd] = useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenRange, setIsOpenRange] = useState(false)

    const handleChange = (e: any) => {
        setIsOpen(true)
        setStartDate(e)
    }
    const handleChangeEnd = (e: any) => {
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

    const handleClickRange = (e: any) => {
        e.preventDefault()
        setIsOpenRange(!isOpenRange)
    }

    const { children, data } = props
    const nestedOptions = data.options
    if (nestedOptions) {
        const label = data.displayName
        return renderNestedOption(props, label, nestedOptions)
    }

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
                                        <span onClick={() => setStartDate("" as unknown as Date)} style={{ margin: '0px 10px 0px 0px' }}>
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
    // const customStyles = {
    //     option: (provided: any) => ({
    //         ...provided,
    //         //   borderBottom: '1px dotted pink',
    //         // color: state.isSelected ? 'black' : 'black',
    //         // backgroundColor: '#e0e8f3',
    //         padding: 0,
    //     }),
    // }
    const colourStyles: StylesConfig<true> = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected, }) => {
            return {
                backgroundColor: isDisabled ? undefined : isSelected ? '#e0e8f3' : isFocused ? '#f0f6ff' : undefined,
                fontWeight:  isSelected ? '600' : isFocused ? '600' : undefined,
                paddingBottom: '0px',
                justifyContent: 'space-around',
                color: 'green'
            }
        },
    }

    return (

        <div style={{ position: 'relative', width: '242px', background: '#fff', fontWeight: '400'}}>
            <Select
                menuIsOpen
                components={{ Option }}
                closeMenuOnSelect={false}
                options={options as []}
                placeholder="Today"
                minMenuHeight={200}
                maxMenuHeight={1200}
                styles={colourStyles}
            // onInputChange={handleInputChange}
            // value={value}
            />
        </div>
    )
}

export default Opt
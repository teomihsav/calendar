import React, { CSSProperties, ReactNode, useState } from "react"

import Select, { components, GroupBase, OptionProps } from "react-select"
import DatePicker from "react-datepicker"
import moment, { Moment } from "moment"

import { options } from "./data"
import "react-datepicker/dist/react-datepicker.css"
import {
    AiFillCaretUp,
    AiFillCaretDown,
    AiOutlineDelete
} from "react-icons/ai"

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

    const useHover = (
        styleOnHover: CSSProperties,
        styleOnNotHover: CSSProperties = {}
    ) => {
        const [style, setStyle] = useState(styleOnNotHover)

        const onMouseEnter = () => setStyle(styleOnHover)
        const onMouseLeave = () => setStyle(styleOnNotHover)

        return { style, onMouseEnter, onMouseLeave }
    }
    const hover = useHover({ backgroundColor: "#cbd8e7" })
    const hoverEnd = useHover({ backgroundColor: "#cbd8e7" })
    const hoverRange = useHover({ backgroundColor: "#cbd8e7" })

    const { children, data } = props
    const nestedOptions = data.options
    if (nestedOptions) {
        const label = data.displayName
        return renderNestedOption(props, label, nestedOptions)
    }

    if (children === "Data Range") {
        return (
            <components.Option {...props}>
                <div style={{}}>
                    <div onClick={handleClickRange}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', padding: '9px', color: 'black' }}>
                            {children} {isOpenRange ? <AiFillCaretUp /> : <AiFillCaretDown />}
                        </span>
                    </div>
                    <div>
                        {isOpenRange && (
                            <div style={{ background: 'white' }}>
                                <div onClick={handleClick} {...hover}>
                                    <span
                                        style={{ display: "flex", justifyContent: "space-between", padding: "9px", color: 'black', background: 'white' }} >
                                        Start Date
                                        {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
                                    </span>
                                </div>

                                {isOpen && (
                                    <div style={{ backgroundColor: 'white' }} >

                                        <div
                                            style={{ height: "2px", background: "lightGrey", margin: "10px", color: "lightGrey" }}  >
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", padding: "9px", background: 'white', color: 'black' }} >
                                            {moment(startDate).isValid() ? moment(startDate).format("DD-MM-yyyy") : "00-00-0000"}
                                            <div onClick={() => setStartDate("" as unknown as Date)}>
                                                <AiOutlineDelete />
                                            </div>
                                        </div>

                                        <div
                                            style={{ height: "2px", background: "lightGrey", margin: "10px", color: "lightGrey" }} >
                                        </div>

                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleChange}
                                            isClearable
                                            inline
                                        />

                                    </div>
                                )}

                                <div onClick={handleClickEnd} {...hoverEnd}>
                                    <span style={{ display: "flex", justifyContent: "space-between", padding: "9px", color: 'black', background: 'white' }} >
                                        End Date
                                        {isOpenEnd ? <AiFillCaretUp /> : <AiFillCaretDown />}
                                    </span>
                                </div>

                                {isOpenEnd && (
                                    <div >
                                        <div
                                            style={{ height: "2px", background: "lightGrey", margin: "10px", color: "lightGrey" }}  >
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", padding: "9px", margin: "8px", backgroundColor: 'white', color: 'black' }} >
                                            {moment(endDate).isValid() ? moment(endDate).format("DD-MM-yyyy") : "00-00-0000"}
                                            <div onClick={() => setEndDate("" as unknown as Date)}>
                                                <AiOutlineDelete />
                                            </div>
                                        </div>
                                        <div
                                            style={{ height: "2px", background: "lightGrey", margin: "10px", color: "lightGrey" }} >
                                        </div>
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
            </components.Option>
        )
    } else {
        return <components.Option {...props}><span style={{ display: 'flex', padding: '9px', color: 'black' }}>{children}</span></components.Option>
    }
}

const Opt = () => {
    const customStyles = {
        option: (provided: any) => ({
            ...provided,
            //   borderBottom: '1px dotted pink',
            // color: state.isSelected ? 'black' : 'black',
            // background: 'lightGrey',
            padding: 0,
        }),
    }

    return (

        <div style={{  padding: '100px', width: '242px', background: '#fff', }}>
            <Select
                components={{ Option }}
                closeMenuOnSelect={false}
                options={options}
                placeholder="Today"
                minMenuHeight={100}
                maxMenuHeight={1000}
                styles={customStyles}
            // onInputChange={handleInputChange}
            // value={value}
            />
        </div>
    )
}

export default Opt
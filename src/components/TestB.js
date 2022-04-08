
import Select, {components} from 'react-select'

const options = [
    { value: "a", label: "A", tooltip: "yellow" },
    { value: "b", label: "B", tooltip: "orange" },
    { value: "c", label: "C", tooltip: "blue" },
]

function getTooltip(value) {
    return options.find(x => x.value === value).tooltip
}

/* A custom option component as an example */
const Option = (props) => {
    console.log('Props: ', props)
    return (
        <components.Option {...props}>
            <div data-tip={getTooltip(props.value)}>
                {props.label}
            </div>
        </components.Option>
    )
}

const TestB = () => {

    /* Pass the custom component to <Select> */
    return (
        <Select options={options} components={{ Option }} />
    )
}

export default TestB
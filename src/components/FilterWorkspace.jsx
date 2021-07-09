import { isNotEmpty } from "./Helper"

const FilterWorkspace = (props) => {
    return (
        <div className="filter-box">
            <div className="filter-box-header">{props.header}</div>
            {props.data.map((data, index) => {
                if(isNotEmpty(data['value'])){
                    return (
                        <div key={index} className="row m-0">
                        <span 
                            className = "filter-value"
                            onClick={()=>props.handleFilterChange(props.header,data['value'])}
                            >
                            {data['value']}
                        </span>
                        <span className ="filter-value filter-value-count">{data['count']}</span>
                        </div>
                        )
                }
            })}
        </div>
    )
}

export default FilterWorkspace;
import LitmusBloxLogo from './LitmusBloxLogo'
import Select from 'react-select'
const Header = (props) => {
    return(
        <nav className="navbar navbar-expand-lg header row">
            <div className="col-lg-2"><LitmusBloxLogo/></div>
            <div className="col-lg-1"></div>
            <div className="col-lg-1 m-0 p-0 header-dropdown">
            <Select
                options = {[
                    { value: 'Key Skills', label: 'Key Skills' },
                    { value: 'Resume', label: 'Resume' },
                  ]}
                defaultValue={{ value: 'Key Skills', label: 'Key Skills' }}
                onChange = {props.handlekeys}
              />
            </div>
            <form className="form-line header col-lg-8" onSubmit={props.handleSubmit}>
                <input className="form-control m-2" type="search" placeholder="Search" aria-label="search" onChange={props.handleSearchData} disabled = {props.disabledInput} />
                {/* <input className="form-control m-2" type="search" placeholder="All" aria-label="search" disabled = {props.disabledInput}  />
                <input className="form-control m-2" type="search" placeholder="Exclude" aria-label="search" disabled = {props.disabledInput}  /> */}
                <button className="btn btn-light m-2" style={{height: '38px'}} type="submit" onClick={props.handleSubmit}>Search</button>
            </form>
        </nav>
    )
}
export default Header;
import logo from '../images/logo-white.svg'
const LitmusBloxLogo = () => (
    <div id="logo" className="logo img-fluid " style={{ float: 'left'}}>
        <a href='#' onClick={e => e.preventDefault()}> <img src={logo} width="162px" height="35px" alt="Litmusblox Logo" style={{cursor:"initial"}}/></a>
    </div>
);

export default LitmusBloxLogo;
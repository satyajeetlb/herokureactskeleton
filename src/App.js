import './App.css';
import SearchWorkspace from './components/SearchWorkspace'
import PageNotFound from './components/PageNotFound'
import { HashRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    // <HashRouter>
    //   <Switch>
    //   <Route
    //   exact 
    //   path='/'
    //   component = {SearchWorkspace}
    //   />
    //   <Route 
    //   path='/search'
    //   component = {SearchWorkspace}
    //   />
    //   <Route path={"*"} component={PageNotFound} />
    //   </Switch>
    // </HashRouter>
    <div>
      <SearchWorkspace/>
    </div>
  );
}

export default App;

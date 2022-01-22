import Login from "./Components/Login";
import './main.css'
import Home from "./Components/Home";
import {Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Route exact path='/' render={() => <Home/>}/>
        <Route path='/login' render={() =>  <Login/>}/>
    </div>
  )
}

export default App;

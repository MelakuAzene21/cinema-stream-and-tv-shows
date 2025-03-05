import { BrowserRouter as Router,Switch,Route }  from "react-router-dom"
import Home from "./component/Home"
import Header from "./component/Header"
import Footer from "./component/Footer"
import MovieDetail from "./component/MovieDetail"
import PageNotFound from "./component/PageNotFound"

export default function App(){
    return(
        <div className="app">
  <Router>
       <Header/>
    <div className="container">
      <Switch>
                        <Route path="/" exact component={Home} />

    <Route path="/movie/:id"  component={MovieDetail} />
                        <Route component={PageNotFound} />
                        
     </Switch>
                </div>
                <Footer/>
</Router>

        </div>
    )
}

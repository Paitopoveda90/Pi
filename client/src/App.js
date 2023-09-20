import { Route, BrowserRouter} from "react-router-dom"

import Create from './views/create/createviews';
import Detail from './views/detail/detailViews';
import Home from './views/home/homeviews';
import Landing from "./views/landing/landingViews";



function App() {
  return (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:id" component={Detail} />
      <Route path="/create" component={Create} />
    </div>
  </BrowserRouter>
  );
}

export default App;

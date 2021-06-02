import "./App.css";
import '../src/index.scss'
import routes from './routes'
import Header from './Component/Header'
import "./App.scss";


function App() {
  return (
    <div className="App">
<Header/>
      {routes}
    </div>
  );
}

export default App;

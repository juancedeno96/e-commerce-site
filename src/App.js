import "./App.css";
import '../src/index.scss'
import routes from './routes'
import Header from './Component/Header'

function App() {
  return (
    <div className="App">
<Header/>
      {routes}
    </div>
  );
}

export default App;

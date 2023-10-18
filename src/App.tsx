import RoutesController from './routes/RoutesController';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RoutesController/>
      </BrowserRouter>
    </div>
  );
}

export default App;

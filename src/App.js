import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './component/Homepage';
import Header from './component/Header';
import RecordCreate from './component/RecordCreate';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/create-record",
      element: <RecordCreate />
    }
  ]);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;

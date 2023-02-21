import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './component/Homepage';
import Header from './component/Header';
import RecordCreate from './component/RecordCreate';
import RecordCreateWithType from './component/RecordCreateWithType';
import RecordView from './component/RecordView';
import RecordEdit from './component/RecordEdit';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/create-record",
      element: <RecordCreate />
    },
    {
      path: "/create-record/:typeId",
      element: <RecordCreateWithType />
    },
    {
      path: "/view-records",
      element: <RecordView />
    },
    {
      path: "/record/:typeId/edit/:id",
      element: <RecordEdit />
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

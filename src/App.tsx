import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/task/new" element={<CreateTask />}></Route>
        <Route path="/task/:id" element={<UpdateTask />}></Route>
      </Routes>
    </>
  );
};
export default App;

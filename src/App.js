import './App.css';
import './colors.css'
import { Header } from './components';
import { Route, Routes } from 'react-router-dom';
import { Home, PageNotFound, ProtectedPages, TasksPage, SignIn, SignUp } from "./pages"
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TasksProvider } from "./contexts/TasksContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider>
          <Header />
          <div className='main'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route element={<ProtectedPages />}>
                <Route path='/tasks' element={<TasksProvider><TasksPage /></TasksProvider>} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </div>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;

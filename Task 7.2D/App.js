import logo from './logo.svg';
import './App.css';
import Header from "./components/Header.jsx"
import PostType from './components/PostType';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/Article.css"
import "react-toastify/dist/ReactToastify.css"
import HeaderImage from './components/HeaderImage';
import { Route ,BrowserRouter,Routes} from 'react-router-dom';
import FindQues from './pages/FindQues';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-bootstrap';
import Navbar from './components/Navbar';
function App() {
  return (
   <div>
    <Navbar></Navbar>
      <div className='alignment'>
      <h1 className='first text-center'>DISCUSSION FORUM</h1>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<PostType ques></PostType>}></Route>
        <Route path="/find" element={<FindQues></FindQues>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
    </div>
  );
}
export default App;

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './layouts/Header.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

export default function App() {

    return (<BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/sign-in"} element={<SignIn/>}/>
                <Route path={"/sign-up"} element={<SignUp/>}/>
                <Route path={"/about"} element={<About/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/create-listing"} element={<CreateListing/>}/>
                </Route>
                <Route path={"*"} element={<PageNotFound/>}/>

            </Routes>
        </BrowserRouter>

    );
}
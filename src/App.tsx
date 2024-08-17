import Menu from "./components/Menu.tsx";
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer.tsx";
import "./assets/App.css"

function App() {

  return (
    <>
    <Menu />
        <Outlet />
    <Footer />
    </>
  )
}

export default App

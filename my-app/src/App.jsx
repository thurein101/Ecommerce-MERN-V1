import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
    
      <NavBar />

      {/* Main content grows */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;

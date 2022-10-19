import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ChatScreen, WelcomeScreen } from "./components";

function hasJWT() {
  let flag = false;

  //check user has JWT token
  localStorage.getItem("token") ? flag=true : flag=false
 
  return flag
}

function App() {

  return (
    <section className="w-[480px] h-full mx-auto flex flex-col py-4">
      {hasJWT() ? <ChatScreen /> : <WelcomeScreen />}
    </section>
  );
}

export default App;
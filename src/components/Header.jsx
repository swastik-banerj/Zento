import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {

  const {toggleSidebar} = useContext(TodoContext);

  return (
      <div className="flex bg-white shadow-md px-6 py-3 items-center justify-between">
        <h1 className=" text-3xl m-5 p-2 font-bold text-gray-800">Zento </h1>
        <button className=" block md:hidden text-2xl" onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </button>
      </div>
  )
};

export default Header;

import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {

  const { toggleSidebar } = useContext(TodoContext);

  return (
    <div className="flex bg-white shadow-md px-6 py-3 items-center justify-between">
      <div>
        <div className="flex items-center gap-3 m-5 p-2">
          <h1 className="text-3xl font-bold text-gray-800">Zento</h1>
          <video
            width="40"
            height="40"
            preload="none"
            className="rounded-full"
            style={{
              background:
                "transparent url('https://cdn-icons-png.flaticon.com/512/16059/16059983.png') 50% 50% / cover no-repeat"
            }}
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://cdn-icons-mp4.flaticon.com/512/16059/16059983.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <button className=" block md:hidden text-2xl" onClick={toggleSidebar}>
        <GiHamburgerMenu />
      </button>
    </div>
  )
};

export default Header;

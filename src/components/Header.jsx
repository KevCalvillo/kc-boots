/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Exit from "@/ui/icons/Exit";
import LogIn from "@/ui/icons/LogIn";
import { saludarPorHora } from "@/lib/utils";

export default function Header() {
  const { user, setUser } = useAuth();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Categorías", path: "/categories" },
    { name: "Información", path: "/about" },
  ];
  return (
    <div className="flex items-center transition-all duration-500 text-white p-4 shadow-4xl mx-15 my-10 rounded-[40px]">
      <img src="/logo.webp" className="h-15" />
      <ul className="flex space-x-6 text-[30px] drop-shadow-2xl ml-5">
        {navLinks.map((link) => (
          <li
            key={link.path}
            className="transition-transform duration-300 hover:scale-105"
          >
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
      {user && (
        <span className="ml-auto text-4xl">{saludarPorHora(user.name)}</span>
      )}

      <input
        type="text"
        placeholder="Search..."
        className="ml-auto mr-10 p-2 px-5 rounded-4xl text-xl text-white bg-[#2c2c2c85] border-none outline-none w-60 hover:scale-105 transition-transform duration-300"
      />
      {user ? (
        <button onClick={() => setUser(null)}>
          <Exit className="w-8 h-8" />
        </button>
      ) : (
        <button>
          <LogIn className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Header() {
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Categorías", path: "/categories" },
    { name: "Información", path: "/about" },
  ];
  return (
    //bg-[#46593f]
    <div className="flex items-center bg-[#1b1b1b38] hover:bg-[#1b1b1bad] transition-all duration-500 text-white p-4 shadow-4xl mx-15 my-10 rounded-[40px]">
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
      <input
        type="text"
        placeholder="   Search..."
        className="ml-auto mr-10 p-2 rounded-4xl text-xl text-white bg-[#2c2c2c85] border-none outline-none w-60 hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}

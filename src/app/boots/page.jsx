'use client';
import React from "react";
import BootCard from "../../components/BootCard";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

function AllBoots() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-black to-transparent z-10"></div>
      <div className="relative z-20 w-full h-full flex flex-col">
        <Header />
        <h1 className="z-20 text-[4rem] font-bold text-center text-white mb-10">
          Nuestras Botas
        </h1>
        <div className="p-2 pb-15 pt-10 flex justify-center items-center z-20">
          <div className="grid grid-cols-4 gap-8">
            {products.map((bota) => (
              <BootCard key={bota.id} bota={bota} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBoots;

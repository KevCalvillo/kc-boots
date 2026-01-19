export default function BootCard({bota}){
  return(
    <div className="bg-[#e2e2e2a9] shadow-xl  rounded-3xl p-5 flex justify-center items-center flex-col text-xl hover:scale-102 transition-transform duration-300">
              <img src={bota.imageUrl} className="h-40 w-60 rounded-2xl mb-4" />
              <h1 className="font-bold">{bota.title}</h1>
              <strong>$ {bota.price} USD</strong>
              <button className="bg-[#42763f] text-white hover:bg-[#335331] hover:scale-105  transition-all duration-300 rounded-2xl px-3 py-1 mt-2">Comprar</button>
            </div>  
  )
}
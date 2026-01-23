import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calcularNivelPassword(password) {
  let puntos = 0;
  if (password.length >= 8) puntos++;
  if (/\d/.test(password)) puntos++;
  if (/[@$!%*?&]/.test(password)) puntos++;
  return puntos;
}

export function saludarPorHora(name) {
  const ahora = new Date(); 
  const hora = ahora.getHours(); 
  let saludo; 

  if (hora < 12) {
    saludo = "¡Buenos días " + name + "!"; 
  } else if (hora < 19) {
    saludo = "¡Buenas tardes " + name + "!"; 
  } else {
    saludo = "¡Buenas noches " + name + "!"; 
  }

  return saludo;
}
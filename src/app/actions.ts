"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Acción para Iniciar Sesión de Hotel
export async function loginAction(email: string, pass: string) {
  const hotel = await prisma.hotel.findUnique({ where: { adminEmail: email } });
  
  if (!hotel || hotel.adminPassword !== pass) {
    throw new Error("Credenciales inválidas.");
  }
  
  // Guardamos el id en una cookie HttpOnly de forma encriptada (Simplificado para el demo)
  const cookieStore = await cookies();
  cookieStore.set("hotelId", hotel.id.toString(), { path: '/' });
  cookieStore.set("hotelName", hotel.nombre, { path: '/' });
  
  return { success: true, hotel: hotel.nombre };
}

// Acción para Registrar Hotel Nuevo
export async function registerHotelAction(data: any) {
  const existing = await prisma.hotel.findUnique({ where: { adminEmail: data.adminEmail } });
  if (existing) throw new Error("El email ya se encuentra registrado.");

  const hotel = await prisma.hotel.create({
    data: {
      nombre: data.nombre,
      habitaciones: parseInt(data.habitaciones) || 0,
      categoria: data.categoria,
      adminEmail: data.adminEmail,
      adminPassword: data.adminPassword, // En producción debería llevar un Hash (bcrypt)
    }
  });
  
  return { success: true, hotelId: hotel.id };
}

// Acción para cargar la operación diaria del Auditor
export async function logOperacionAction(data: any) {
  const cookieStore = await cookies();
  const hotelIdStr = cookieStore.get("hotelId")?.value;
  
  if (!hotelIdStr) throw new Error("No hay sesión activa.");
  const hotelId = parseInt(hotelIdStr);

  try {
    const op = await prisma.operacionDiaria.create({
      data: {
        fecha: new Date(new Date().setUTCHours(0,0,0,0)), 
        habitacionesVendidas: parseInt(data.occ) || 0,
        adrDiario: parseFloat(data.adr) || 0,
        nuevasReservas: parseInt(data.newRes) || 0,
        cancelaciones: parseInt(data.cancels) || 0,
        origenPredominante: data.origin,
        eventoAtractor: data.pacingEvent,
        hotelId: hotelId,
      }
    });
    return { success: true };
  } catch(e: any) {
    // Unique constraint failed validation
    if(e.code === 'P2002') return { error: "Ya se cargaron los datos de este hotel para la fecha actual." };
    throw new Error("Error interno al guardar: " + e.message);
  }
}

// Acción para obtener datos del Dashboard
export async function getDashboardDataAction() {
  const cookieStore = await cookies();
  const hotelIdStr = cookieStore.get("hotelId")?.value;
  
  if (!hotelIdStr) return { success: false, error: "No sesion" };
  const hotelId = parseInt(hotelIdStr);

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      operaciones: {
        orderBy: { fecha: 'desc' },
        take: 7
      }
    }
  });

  if (!hotel) return { success: false, error: "Hotel no encontrado" };

  return { 
    success: true, 
    hotelName: hotel.nombre,
    rooms: hotel.habitaciones,
    operaciones: hotel.operaciones 
  };
}

// Acción para Cerrar Sesión
export async function logoutAction() {
   const cookieStore = await cookies();
   cookieStore.delete("hotelId");
   cookieStore.delete("hotelName");
}

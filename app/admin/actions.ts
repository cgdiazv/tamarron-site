"use server";

import { cookies } from "next/headers";

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Credenciales seguras del lado del servidor
  if (username === "tamarron_admin" && password === "TamarronMarketing2026!") {
    const cookieStore = await cookies();
    
    // Guardamos una cookie de sesión segura por 7 días
    cookieStore.set("admin_session", "authenticated_tamarron_user", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    return { success: true };
  }

  return { success: false, error: "Credenciales incorrectas. Intente de nuevo." };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}
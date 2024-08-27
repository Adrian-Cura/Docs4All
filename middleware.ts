import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define rutas protegidas
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/createworkspace",
  "/workspace(.*)",
]);

// Define rutas para proyectos personales y organizacionales
const isUserProject = createRouteMatcher(["/workspace/personal/(.*)"]);
const isOrgProject = createRouteMatcher(["/workspace/org/(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect(); // Verifica que el usuario esté autenticado
  }

  const { userId, orgId } = auth(); // Obtiene el userId y orgId del usuario autenticado
  const currentUrl = req.nextUrl.pathname; // Obtiene la ruta actual

  // Lógica para proyectos personales
  if (isUserProject(req)) {
    const pathUserId = currentUrl.split("/")[3]; // Extrae el userId de la URL (/workspace/personal/userId)

    if (userId !== pathUserId) {
      return NextResponse.json(
        {
          message:
            "You do not have the necessary permissions to access this personal project",
        },
        { status: 403 }
      );
    }
  }

  // Lógica para proyectos organizacionales
  if (isOrgProject(req)) {
    const pathOrgId = currentUrl.split("/")[3]; // Extrae el orgId de la URL (/workspace/org/orgId)

    if (orgId !== pathOrgId) {
      return NextResponse.json(
        {
          message:
            "You do not have permission to access this organizational project. If you are part of the organization, please log in with your organizational account to gain access",
        },
        { status: 403 }
      );
    }
  }

  // Si el usuario tiene los permisos correctos, permite el acceso
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

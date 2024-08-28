"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useUser,
  useOrganizationList,
} from "@clerk/nextjs";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { PenLine } from "lucide-react";

interface OrganizationProps {
  id: string;
  name: string;
}

function Header() {
  const { user } = useUser();
  const { userMemberships } = useOrganizationList({
    userMemberships: true,
  });

  const saveUserData = useCallback(async () => {
    const userId = user?.id;
    if (!userId) return;

    // Crear un array para almacenar las organizaciones del usuario
    const currentOrganizations: OrganizationProps[] = [];

    // Rellenar el array con las organizaciones actuales del usuario
    userMemberships.data?.forEach((org) => {
      const isMemberOrgId = org.organization.id;
      if (isMemberOrgId) {
        currentOrganizations.push({
          name: org.organization.name,
          id: isMemberOrgId,
        });
      }
    });

    // Guardar los datos básicos del usuario (sin las organizaciones aún)
    await setDoc(
      doc(db, "userData", userId),
      {
        name: user?.fullName,
        avatar: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userId: userId,
      },
      { merge: true }
    );

    // Obtener la información del usuario desde Firebase
    const docRef = doc(db, "userData", userId);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) {
      const userInfo = userDoc.data();
      // Guardar las organizaciones existentes en Firebase
      const storedOrganizations = userInfo?.organization || [];

      // Filtrar las organizaciones que deben eliminarse
      const organizationsToRemove = storedOrganizations.filter(
        (org: OrganizationProps) =>
          !currentOrganizations.some((userOrg) => userOrg.id === org.id)
      );

      // Verificar si hay organizaciones para actualizar
      if (organizationsToRemove.length > 0 || currentOrganizations.length > 0) {
        const updatedOrganizations =
          currentOrganizations.length > 0 ? currentOrganizations : [];

        // Actualizar el documento en Firebase
        await updateDoc(docRef, { organization: updatedOrganizations });
      }
    } else {
      // Si el documento no existe, crea uno nuevo
      const updatedOrganizations =
        currentOrganizations.length > 0 ? currentOrganizations : [];

      await setDoc(
        docRef,
        { organization: updatedOrganizations },
        { merge: true }
      );
    }
  }, [user, userMemberships]);

  useEffect(() => {
    saveUserData();
  }, [user, userMemberships, saveUserData]);

  return (
    <div className=" flex justify-between shadow-sm px-2 sm:px-4 md:px-6 lg:px-8">
      <Link className="flex items-center justify-center" href="#">
        <PenLine className="h-6 w-6 text-primary" />
        <span className="sr-only">Docs4All</span>
      </Link>
      <button disabled={true}>
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/dashboard"}
          afterLeaveOrganizationUrl={"/dashboard"}
        />
      </button>
      <div className="p-3">
        <UserButton />
      </div>
    </div>
  );
}

export default Header;

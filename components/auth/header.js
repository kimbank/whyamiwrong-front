import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";

import ClientHeader from "@/components/shared/header";

export default function Header() {
  const user = verify(cookies().get("_TOKEN").value);
  
  if (user?.id) {
    return <ClientHeader auth_user={user} />;
  }
  
  return <ClientHeader />;
}
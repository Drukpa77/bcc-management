import { redirect } from "next/navigation";

export default function PlayersRedirect() {
  redirect("/admin/teams");
}

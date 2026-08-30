import { redirect } from "next/navigation";

export default function RegisterTeamRedirect() {
  redirect("/admin/teams");
}

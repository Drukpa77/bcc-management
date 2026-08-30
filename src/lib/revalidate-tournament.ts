import { revalidatePath, updateTag } from "next/cache";

export function revalidateTournament() {
  updateTag("tournament");
  revalidatePath("/", "layout");
  revalidatePath("/results");
  revalidatePath("/standings");
  revalidatePath("/bracket");
  revalidatePath("/fixtures");
  revalidatePath("/teams");
  revalidatePath("/competitions");
  revalidatePath("/admin", "layout");
}

// app/home/FetchBoards.js
import { createClient } from "@/utils/supabase/server";

export default async function FetchBoards() {
  console.log("running");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: boardData, error: boardError } = await supabase
    .from("boards")
    .select("*")
    .eq("userid", data.user.id);

  console.log(boardData);

  return { userId: data.user.id, boards: boardData || [] };
}

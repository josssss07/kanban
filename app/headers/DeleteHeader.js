import supabase from "../supabaseclient";
async function DeleteHeader(item) {
  const { data: header, error: headerError } = await supabase
    .from("headers")
    .delete()
    .eq("headerid", item.headerid);
  if (headerError) {
    throw new Error("Failed to delete header", headerError);
  }
}

export default DeleteHeader;

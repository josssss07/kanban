import supabase from "../supabaseclient";

async function updateHeaderTable(header) {
  const { data: updateHeader, error: updateError } = await supabase
    .from("headers")
    .update({ headername: header.headername })
    .eq("headerid", header.headerid);

  if (updateError) {
    throw new Error("Not able to update header table" , UpdateError);
  }
}

export default updateHeaderTable;

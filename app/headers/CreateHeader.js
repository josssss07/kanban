import supabase from "../supabaseclient";


async function insertNewHeader(item , boardDetails) {
    
    const { data: header, error: headerError } = await supabase
      .from("headers")
      .insert([{ headername: item.headername, boardid: boardDetails.id }]);
    if (headerError) {
      throw new Error(headerError);
    }
  }

 
export default insertNewHeader;
import { fetchTasks} from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    try{
        const task = await fetchTasks(params.headerid);
        return NextResponse.json({task}, {status:200});
    }
    catch(error){
        return NextResponse.json({error:"failed to fetch tasks"}, {status:500});
    }
}
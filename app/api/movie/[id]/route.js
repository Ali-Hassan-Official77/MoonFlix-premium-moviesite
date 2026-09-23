import { NextResponse } from "next/server";
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TOKEN = process.env.API_ACCESS_TOKEN;
const KEY = process.env.TMDB_API_KEY;
export async function GET(request,{params}){
 const url=new URL(`${BASE_URL}/movie/${params.id}`); url.searchParams.set("append_to_response","credits,videos,similar,release_dates,images"); url.searchParams.set("include_image_language","en,null");
 const headers={accept:"application/json"}; if(TOKEN) headers.Authorization=`Bearer ${TOKEN}`; else if(KEY) url.searchParams.set("api_key",KEY); else return NextResponse.json({error:"Missing TMDB credentials"},{status:500});
 try{const res=await fetch(url,{headers,next:{revalidate:1800}}); const data=await res.json(); return NextResponse.json(data,{status:res.status});}catch(e){return NextResponse.json({error:e.message},{status:502});}
}

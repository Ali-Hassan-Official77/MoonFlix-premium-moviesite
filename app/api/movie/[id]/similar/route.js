import { NextResponse } from "next/server";

const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TOKEN = process.env.API_ACCESS_TOKEN;

// GET /api/movie/27205/similar?page=2
// Kept as a thin dedicated endpoint (rather than reusing /api/genre) so the
// "More like this" section on the movie page can paginate independently.
export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);

  try {
    const res = await fetch(
      `${BASE_URL}/movie/${params.id}/similar?page=${page}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}`, accept: "application/json" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}

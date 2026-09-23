import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { tmdb } from "@/lib/tmdb";
export const revalidate = 1800;
export default async function HomePage() {
  const [trending, popular, topRated, upcoming, nowPlaying] = await Promise.all([tmdb.trending("week"),tmdb.popular(),tmdb.topRated(),tmdb.upcoming(),tmdb.nowPlaying()]);
  return <><Hero movies={trending?.results || []}/><div className="home-content"><MovieRow title="Trending this week" subtitle="The movies moving fastest across the world" movies={trending?.results}/><MovieRow title="In cinemas now" subtitle="Fresh releases worth putting on the big screen" movies={nowPlaying?.results}/><MovieRow title="Highest rated" subtitle="Stories audiences keep coming back to" movies={topRated?.results}/><MovieRow title="Popular right now" subtitle="The titles everyone is talking about" movies={popular?.results}/><MovieRow title="Coming soon" subtitle="Your next movie night starts here" movies={upcoming?.results}/></div></>;
}

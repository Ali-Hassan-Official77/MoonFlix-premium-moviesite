import { notFound } from "next/navigation";
import { Star, Clock, Calendar, Camera } from "lucide-react";
import { tmdb, tmdbImage } from "@/lib/tmdb";
import { formatYear, formatRuntime, formatRating, findTrailer, findCertification } from "@/lib/utils";
import MovieRow from "@/components/MovieRow";
import RatingBadge from "@/components/RatingBadge";
import TrailerButton from "@/components/TrailerButton";
import LikeButton from "@/components/LikeButton";
import Reveal from "@/components/Reveal";
export const revalidate=1800;
export async function generateMetadata({params}){try{const m=await tmdb.details(params.id);return{title:`${m.title} — MoonFlix`,description:m.overview?.slice(0,155)}}catch{return{title:"MoonFlix"}}}
export default async function MovieDetailPage({params}){
 let movie; try{movie=await tmdb.details(params.id)}catch{notFound()}
 const backdrop=tmdbImage(movie.backdrop_path,"original"),poster=tmdbImage(movie.poster_path,"w500"),cast=movie.credits?.cast?.slice(0,8)||[],director=movie.credits?.crew?.find(c=>c.job==="Director"),trailerKey=findTrailer(movie.videos),certification=findCertification(movie.release_dates), screenshots=(movie.images?.backdrops||[]).filter(x=>x.file_path!==movie.backdrop_path).slice(0,10);
 return <div className="detail-page"><section className="detail-backdrop">{backdrop&&<img src={backdrop} alt=""/>}<div/></section><div className="mx-auto max-w-7xl px-5 sm:px-8 -mt-24 sm:-mt-40 relative z-10 pb-20"><Reveal className="detail-main"><div className="detail-poster">{poster&&<img src={poster} alt={`${movie.title} poster`}/>}</div><div className="detail-copy">{movie.tagline&&<p className="detail-tagline">{movie.tagline}</p>}<h1>{movie.title}</h1><div className="detail-meta"><RatingBadge value={movie.vote_average}/><span><Calendar size={14}/>{formatYear(movie.release_date)}</span>{movie.runtime&&<span><Clock size={14}/>{formatRuntime(movie.runtime)}</span>}{certification&&<span>{certification}</span>}</div><div className="genre-pills">{movie.genres?.map(g=><span key={g.id}>{g.name}</span>)}</div><p className="detail-overview">{movie.overview}</p>{director&&<p className="director">Directed by <b>{director.name}</b></p>}<div className="detail-actions"><TrailerButton youtubeKey={trailerKey}/><LikeButton movie={movie} className="btn-ghost"><HeartIcon/> <span>Add to watch list</span></LikeButton></div></div></Reveal>
 {screenshots.length>0&&<Reveal className="screenshots" delay={.05}><div className="section-heading"><span><Camera size={17}/> Behind the scenes</span><p>Movie screenshots & stills</p></div><div className="screenshot-grid">{screenshots.map((s,i)=><div className={`shot shot-${i%4}`} key={s.file_path}><img src={tmdbImage(s.file_path,"w780")} alt={`${movie.title} still ${i+1}`} loading="lazy"/></div>)}</div></Reveal>}
 {cast.length>0&&<Reveal className="cast-section"><div className="section-heading"><span>CAST</span><p>The people behind the story</p></div><div className="cast-grid">{cast.map(p=><div key={p.credit_id}><div className="cast-img">{p.profile_path?<img src={tmdbImage(p.profile_path,"w342")} alt={p.name}/>:<span>—</span>}</div><b>{p.name}</b><small>{p.character}</small></div>)}</div></Reveal>}</div><MovieRow title="More like this" movies={movie.similar?.results}/></div>;
}
function HeartIcon(){return <span className="inline-heart">♡</span>}

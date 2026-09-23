export default function LoadingSkeleton({ count = 10 }) {
  return (
    <div className="movie-skeleton-grid" aria-label="Loading movies" aria-busy="true">
      {Array.from({length:count}).map((_,i)=><div className="movie-skeleton" key={i}>
        <div className="movie-skeleton-poster"><span/></div>
        <div className="space-y-3 p-3"><div className="skeleton-line w-4/5"/><div className="skeleton-line w-1/2"/><div className="skeleton-pill"/></div>
      </div>)}
    </div>
  );
}

function ShowDetailsMetaInfo({ showType, data }) {
  return (
    <>
      {/* Third row: Language, Release, Runtime, Budget, Status */}
      <div className="bg-dark-blue-900 flex w-full flex-col gap-4 rounded-xl px-6 py-4 shadow-lgjustify-center">
        {data.languages && (
          <p>
            🌐 Language: <i>{data.languages}</i>
          </p>
        )}

        {showType === "movie" && (
          <p>
            📅 Released: <i>{data.releaseDate ?? "Not available"}</i>
          </p>
        )}

        {showType === "tv" && (
          <div className="flex flex-col gap-1">
            <p>
              📅 First air date: <i>{data.releaseDate ?? "Not available"}</i>
            </p>
            <p>
              📅 Last air date: <i>{data.lastAirDate ?? "Not available"}</i>
            </p>
          </div>
        )}

        {showType === "movie" && (
          <p>
            🎬 Runtime: <i>{data.runtime} minutes</i>
          </p>
        )}

        {showType === "tv" && (
          <div className="flex flex-col gap-1">
            <span>
              📺 Seasons: <i>{data.seasons ?? "Not available"}</i>
            </span>
            <span>
              📺 Episodes: <i>{data.episodes ?? "Not available"}</i>
            </span>
          </div>
        )}

        <p>
          ⭐ Rating:
          <i>
            {data.voteAverage
              ? `  ${data.voteAverage.toFixed(1)} / 10`
              : "Movie not rated"}
          </i>
        </p>

        {data.status && (
          <p>
            🍿 Status:
            <i> {data.status}</i>
          </p>
        )}

        {data.budget && (
          <p>
            💰 Budget: <i>{data.budget}</i>
          </p>
        )}

        {data.revenue && (
          <p>
            📈 Revenue: <i>{data.revenue}</i>
          </p>
        )}
      </div>

      {/* Fourth Row: Production companies and countries */}
      <div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="bg-dark-blue-900 flex flex-col gap-1 rounded-xl p-4 md:flex-2/3">
            <p className="font-semibold">Production companies: </p>
            {data.productionCompanies.map((c) => (
              <span key={c.id} className="font-light">
                {c.name}
              </span>
            ))}
          </div>
          <div className="bg-dark-blue-900 flex flex-col gap-1 rounded-xl p-4 md:flex-1/3">
            <p className="font-semibold">Production countries: </p>
            {data.productionCountries.map((c) => (
              <span key={c.iso_3166_1} className="font-light">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowDetailsMetaInfo;

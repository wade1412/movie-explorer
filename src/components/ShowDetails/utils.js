const formatDate = (date) => {
  if (!date) {
    return "Release date unknown";
  }

  const newDate = new Date(date);
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(newDate);
};

export const mapShowDetails = (show) => {
  return {
    // Main info
    id: show.id,
    title: show.title || show.name || "Untitled",
    originalTitle: show.original_title || show.original_name,
    tagline: show.tagline || "",
    overview: show.overview || "No description available.",

    releaseDate: formatDate(show.release_date || show.first_air_date) || null,
    posterPath: show.poster_path,

    voteAverage: show.vote_average || null,

    status: show.status || null,

    // Arrays
    genres: show.genres || [],
    languages: (show.spoken_languages || []).map((l) => l.name).join(", "),
    productionCompanies: show.production_companies || [],
    productionCountries: show.production_countries || [],

    // Specific
    runtime: show.runtime || show.episode_run_time?.[0] || null,
    budget:
      show.budget && show.budget !== 0
        ? `$${show.budget.toLocaleString()}`
        : null,
    revenue:
      show.revenue && show.revenue !== 0
        ? `$${show.revenue.toLocaleString()}`
        : null,

    // Specific for TV
    lastAirDate: formatDate(show.last_air_date) || null,
  };
};

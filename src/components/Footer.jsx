function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-dark-blue-900 py-6 text-center text-sm text-dark-blue-200 font-light">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Назва та копірайт */}
        <p>© {currentYear} Movie Explorer. Educational portfolio project.</p>

        <p className="text-xs text-dark-blue-400 max-w-md sm:text-right">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

function MoreMovies({ loadMore }) {
  return (
    <section className="more-movies">
      <button type="button" className="more-movies__button" onClick={loadMore}>
        Еще
      </button>
    </section>
  );
}

export default MoreMovies;
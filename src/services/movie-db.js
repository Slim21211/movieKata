export default class MovieDB {
  urlMovie = 'https://api.themoviedb.org/3/search/movie?';
  _apiKey = 'd0c34b2999c270173aff6d9801767b47';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNGIyOTk5YzI3MDE3M2FmZjZkOTgwMTc2N2I0NyIsInN1YiI6IjY0YjNmOTI0MGJiMDc2MDE0ZTRmMmEyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.smiXMifnv4HmsnIh7ihS1dERxyp_QXb3rKuevMbl1E8',
    },
  };

  async getApiFilms(page, title) {
    const response = await fetch(`${this.urlMovie}query=${title}&page=${page}`, this.options);

    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }

  async getGenres() {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list', this.options);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return await data;
  }

  async getSessionId() {
    const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', this.options);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return await data.guest_session_id;
  }

  async addRating(movie_id, session_id, value) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${this._apiKey}&guest_session_id=${session_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value }),
      }
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
  }

  async getRatedMovies(session_id, page) {
    const response = await fetch(`
    https://api.themoviedb.org/3/guest_session/${session_id}/rated/movies?api_key=${this._apiKey}&page=${page}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }
}

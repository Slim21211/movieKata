export default class MovieDB {
  urlMovie = new URL('https://api.themoviedb.org/3/');
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
    const url = new URL('search/movie?', this.urlMovie);
    url.searchParams.set('query', title);
    url.searchParams.set('page', page);
    const response = await fetch(url, this.options);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }

  async getGenres() {
    const url = new URL('genre/movie/list', this.urlMovie);
    const response = await fetch(url, this.options);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return await data;
  }

  async getSessionId() {
    const url = new URL('authentication/guest_session/new', this.urlMovie);
    const response = await fetch(url, this.options);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return await data.guest_session_id;
  }

  async addRating(movie_id, value, session_id) {
    const url = new URL(`movie/${movie_id}/rating?`, this.urlMovie);
    url.searchParams.set('api_key', this._apiKey);
    url.searchParams.set('guest_session_id', session_id);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value }),
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
  }

  async getRatedMovies(session_id, page) {
    const url = new URL(`guest_session/${session_id}/rated/movies?`, this.urlMovie);
    url.searchParams.set('api_key', this._apiKey);
    url.searchParams.set('page', page);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }
}

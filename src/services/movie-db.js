export default class MovieDB {
  url = 'https://api.themoviedb.org/3/search/movie?query=return&page=1';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGMzNGIyOTk5YzI3MDE3M2FmZjZkOTgwMTc2N2I0NyIsInN1YiI6IjY0YjNmOTI0MGJiMDc2MDE0ZTRmMmEyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.smiXMifnv4HmsnIh7ihS1dERxyp_QXb3rKuevMbl1E8',
    },
  };

  async getFilms() {
    const response = await fetch(this.url, this.options);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }

  getAllMovie() {
    return this.getFilms();
  }
}

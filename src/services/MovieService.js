import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies'
};

class MovieService extends ApiService {
  getMovies = () => {
    return this.apiClient.get(ENDPOINTS.MOVIES);
  };


  showMovie(id){
    return this.apiClient.get(`api/movies/${id}`);
  }
}

export const movieService = new MovieService();

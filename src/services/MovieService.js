import ApiService from './ApiService';
import { error } from 'util';

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

  updateLikeDislike(registerData){
    return this.apiClient.patch(`/api/movies/updateLikeDislike/${registerData.id}`, registerData);
  }

  updatePageVisited(registerData){
    return this.apiClient.patch(`/api/movies/${registerData.id}`, registerData);
  }

  getGenres(){
    return this.apiClient.get('/api/genres');
  }

  postComment(registerData){
    return this.apiClient.post('/api/comments', registerData);
  }

  getComments(id){
    return this.apiClient.get(`api/movies/getComments/${id}`);
  }
}




export const movieService = new MovieService();

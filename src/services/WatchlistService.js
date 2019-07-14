import ApiService from './ApiService';
import { error } from 'util';




class WatchlistService extends ApiService {

    createWatchlist(registerData){
        return this.apiClient.post('api/watchlists', registerData);
    }

    getWatchlists(){
        return this.apiClient.get('api/watchlists');
    }

    addToWatchlist(registeredData, watchlist_id){
        return this.apiClient.patch(`/api/watchlists/${watchlist_id}`, registeredData).catch(error);
    }

    showWatchlist(id){
        return this.apiClient.get(`/api/watchlists/${id}`);
    }

    removeMovieFromWatchlist(watchlist_id, movie_id){
        return this.apiClient.delete(`api/watchlists/${watchlist_id}/movies/${movie_id}`);
    }

    markAsWatchedUnwatched(movie_id){
        return this.apiClient.patch(`api/movies/${movie_id}/watched`);
    }

    deleteWatchlist(id){
        return this.apiClient.delete(`/api/watchlists/${id}`);
    }
}




export const watchlistService = new WatchlistService();
import { ApiResult } from '../../interfaces/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { ApiResult} from '../../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }


  // https://api.themoviedb.org/3/movie/550?api_key=b6e3b0809486bee91e300fd1ee7d67d7
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/popular?page=${page}&api_key=${environment.apiKey}`
    );
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }
}

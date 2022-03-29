import { MovieService } from './../../services/movie.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieSvc: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieSvc.getTopRatedMovies(this.currentPage).subscribe(
      (res) => {
        loading.dismiss();
        this.movies.push(...res.results);

        event?.target.complete();
        if(event) {
          event.target.disabled = res.totalPages === this.currentPage;
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }


  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}

import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  imports: [GifList],
  templateUrl: './search.component.html',
})
export default class SearchComponent {
  gifService = inject(GifService);
  // gifs = signal<Gif[]>([]);
  gifs = signal<Gif[][]>([]);

  onSearch(query: string) {
    // this.gifService.searchGifsByQuery(query).subscribe(response => this.gifs.set(response));
    // console.log(query);
    // this.gifs.set(this.gifService.searchingGifs());

    this.gifService.searchGifsByQuery(query).subscribe(response => {
      const subList: Gif[][] = [];
      let gifList: Gif[];

      for (let i: number = 0; i < response.length; i += 3)
        subList.push(response.slice(i, i + 3));

      this.gifs.set(subList);
    });
  }
}

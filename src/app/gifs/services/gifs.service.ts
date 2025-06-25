import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
    const gifs = localStorage.getItem('gifs-history');

    return gifs ? JSON.parse(gifs) : {};
}

@Injectable({ providedIn: 'root' })
export class GifService {
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    // searchingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(false);
    // searchingGifsLoading = signal(true);
    private trendingPage = signal(0);

    trendingGroup = computed<Gif[][]>(() => {
        const subList: Gif[][] = [];
        const gifs: Gif[] = this.trendingGifs();

        for (let i: number = 0; i < gifs.length; i += 3)
            subList.push(gifs.slice(i, i + 3));

        return subList;
    });

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    saveToLocalStorage = effect(() => {
        localStorage.setItem('gifs-history', JSON.stringify(this.searchHistory()));
    });

    constructor() {
        this.loadTrendingGifs();
    }

    loadTrendingGifs() {
        if (this.trendingGifsLoading()) return;

        this.trendingGifsLoading.set(true);

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 24,
                offset: this.trendingPage() * 24,
                rating: 'g',
            }
        }).subscribe(response => {
            // console.log(response);
            // response.data[0].images.original.url

            const gifs = GifMapper.mapGiphyItemArrayToGifArray(response.data);

            // console.log({ gifs });

            this.trendingGifsLoading.set(false);
            // this.trendingGifs.set(gifs);
            this.trendingGifs.update(prev => [ ...prev, ...gifs ]);
            this.trendingPage.update(prev => prev + 1);
        });
    }

    searchGifsByQuery(query: string): Observable<Gif[]> {
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                q: query,
                limit: 25,
                offset: 0,
                rating: 'g',
                lang: 'en',
                bundle: 'messaging_non_clips',
            }
        }).pipe(
            map(({ data }) => data),
            map(response => GifMapper.mapGiphyItemArrayToGifArray(response)),
            tap(items => {
                this.searchHistory.update(prev => ({ ...prev, [query.toLocaleLowerCase()]: items, }))
            })
        );

        // .subscribe(response => {
        //     const gifs = GifMapper.mapGiphyItemArrayToGifArray(response.data);
        //     console.log(gifs);
        //     
        //     // this.searchingGifsLoading.set(false);
        //     this.searchingGifs.set(gifs);
        // });
    }

    getHistoryGifs(query: string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }
}

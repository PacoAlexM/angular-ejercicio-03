import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifList } from "../../components/gif-list/gif-list";
import { Gif } from '../../interfaces/gif.interface';

@Component({
    selector: 'gifs-history',
    imports: [GifList],
    templateUrl: './gifshistory.component.html',
})
export default class GifsHistory {
    gifService = inject(GifService);

    // query = inject(ActivatedRoute).params.subscribe(params => console.log({ params }));
    query = toSignal(inject(ActivatedRoute).params.pipe(
        map(param => param['query'])
    ));

    gifs = computed(() => {
        // return this.gifService.getHistoryGifs(this.query());

        const subList: Gif[][] = [];
        const gifList: Gif[] = this.gifService.getHistoryGifs(this.query());

        for (let i: number = 0; i < gifList.length; i += 3)
            subList.push(gifList.slice(i, i + 3));

        return subList;
    });
}

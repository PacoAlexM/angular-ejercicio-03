import { AfterViewInit, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
// import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';
// import { Gif } from '../../interfaces/gif.interface';

// const imageUrls: string[] = [
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg",
// ];

@Component({
  selector: 'app-trending',
  imports: [/*GifList*/],
  templateUrl: './trending.component.html',
})
export default class TrendingComponent implements AfterViewInit {
  // gifs = imageUrls;

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    // console.log(scrollDiv);

    if (!scrollDiv) return;

    const scrollTop: number = scrollDiv.scrollTop;
    const clientHeight: number = scrollDiv.clientHeight;
    const scrollHeight: number = scrollDiv.scrollHeight;
    const isAtBottom: boolean = scrollTop + clientHeight + 100 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) this.gifService.loadTrendingGifs();
  }

  // gifs = computed<Gif[][]>(() => {
  //   const subList: Gif[][] = [];
  //   const gifList: Gif[] = this.gifService.trendingGifs();
  //   
  //   for (let i: number = 0; i < gifList.length; i += 3)
  //     subList.push(gifList.slice(i, i + 3));
  // 
  //   return subList;
  // });
}

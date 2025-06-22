import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../services/gifs.service';

interface MenuOption {
    label: string;
    subLabel: string;
    route: string;
    icon: string;
}

@Component({
    selector: 'gifs-side-menu-options',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {
    gifService = inject(GifService);

    menuOptions: MenuOption[] = [
        {
            label: 'Trending',
            subLabel: 'Popular Gifs',
            icon: 'fa-solid fa-chart-line',
            route: '/dashboard/trending'
        },
        {
            label: 'Search',
            subLabel: 'Search Gifs',
            icon: 'fa-solid fa-magnifying-glass',
            route: '/dashboard/search'
        },
    ];
}

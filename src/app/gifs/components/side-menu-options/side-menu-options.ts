import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
    label: string;
    subLabel: string;
    route: string;
    icon: string;
}

@Component({
    selector: 'gifs-side-menu-options',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './side-menu-options.html'
})
export class SideMenuOptions {
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

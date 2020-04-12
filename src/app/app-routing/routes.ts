import {Routes} from '@angular/router';
import { ListComponent } from '../list/list.component';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component'
import { Movie } from '../shared/movie';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: 'home',component: HomeComponent
    },
    {
        path: 'list',component: ListComponent
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'about',component: AboutComponent
    },
    {
        path: 'contact', component: ContactComponent
    },
    {
        path: 'moviedetail/:id' , component: MovieDetailComponent
    },
    { path: '**', component: PageNotFoundComponent },
]
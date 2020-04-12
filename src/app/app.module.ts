import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule}  from '@angular/platform-browser/animations'
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppComponent } from './app.component';
import {MatListModule} from '@angular/material/list'
import {MatGridListModule} from '@angular/material/grid-list'
import 'hammerjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component'

import { HttpClientModule  } from '@angular/common/http'

import {MatSliderModule} from '@angular/material';

import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button';

import { MovieService } from './services/movie.service'
import {PromotionService} from './services/promotion.service'
import {LeaderService} from './services/leader.service'
import {ProcessHTTPMsgService} from './services/process-httpmsg.service'


import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule  } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component'

import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 

import {baseURL} from './shared/baseurl'
import { HttpModule } from '@angular/http'




import { ReactiveFormsModule } from '@angular/forms'; 
import {MatSelectModule} from '@angular/material/select'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HighlightDirective } from './directives/highlight.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MovieDetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
    PageNotFoundComponent
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule,
    HttpModule
    
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [MovieService,PromotionService,LeaderService,ProcessHTTPMsgService,
    {provide: 'BaseURL' , useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { UtilitiesModule } from './utilities/utilities.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';
import { UnauthorizedComponent } from './unauthorized.component';
import { FriendlyAnswerCountPipe } from './friendly-answer-count.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionDetailsComponent,
    AboutComponent,
    HomeComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    FriendlyAnswerCountPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UtilitiesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

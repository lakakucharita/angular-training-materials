import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsComponent } from './questions/questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';
import { UnauthorizedComponent } from './unauthorized.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questions/:id',
    component: QuestionDetailsComponent
  }, 
  {
    path: 'about',
    component: AboutComponent
  }, 
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }, 
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AppRoutingModule { }

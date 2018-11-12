import { NgModule } from '@angular/core';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseTestComponent } from './components/firebase-test/firebase-test.component';
import { TeamsComponent } from './components/teams/teams.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', component: TeamsComponent, canActivate: [AuthGuard]},
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'edit/:id', component: EditPersonComponent, canActivate: [AuthGuard]},
  { path: 'firebase-test', component: FirebaseTestComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

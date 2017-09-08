import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { ProjectsComponent } from './projects/projects.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NewComponent } from './projects/new/new.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { StatusComponent } from './status/status.component';
import {ProjectService} from "./project.service";
import {HttpModule, XHRBackend, RequestOptions} from "@angular/http";
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import {FormsModule} from "@angular/forms";
import {AlertService} from "./alert.service";
import {AuthHttpService} from "./auth-http.service";
import {AuthenticationService} from "./authentication.service";
import { ByTypePipe } from './projects/by-type.pipe';

const appRoutes: Routes = [
  {path:'', redirectTo:'projects', pathMatch:'full'},
  {path:'projects', component: ProjectsComponent},
  {path:'users', component: UsersComponent},
  {path:'status', component: StatusComponent},
  {path:'config', component: ConfigurationComponent},
  {path:'profile', component: ProfileComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    NewComponent,
    ProfileComponent,
    UsersComponent,
    ConfigurationComponent,
    StatusComponent,
    LoginComponent,
    AlertComponent,
    ByTypePipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    FormsModule
  ],
  providers: [
      ProjectService,
      AlertService,
    AuthenticationService,
      {
        provide: AuthHttpService,
        deps: [XHRBackend, RequestOptions],
        useFactory: HttpFactory
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpFactory(backend, options){
  return new AuthHttpService(backend, options);
}
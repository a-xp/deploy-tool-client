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
import {Broadcaster} from "./broadcaster";
import {ProfileService} from "./profile.service";
import { ViewComponent } from './projects/view/view.component';
import { ListComponent } from './projects/list/list.component';
import {BuildService} from "./build.service";
import {RunnerService} from "./runner.service";
import { BytesPipe } from './bytes.pipe';
import { TimePeriodPipe } from './time-period.pipe';
import {InstanceService} from "./instance.service";

const appRoutes: Routes = [
  {path:'', redirectTo:'projects', pathMatch:'full'},
  {path:'projects', component: ProjectsComponent,
    children:[
      {path:'', redirectTo:'list', pathMatch:'full'},
      {path:'list', component:ListComponent},
      {path:'new', component:NewComponent},
      {path:':code', component:ViewComponent}
    ]
  },
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
    ByTypePipe,
    ViewComponent,
    ListComponent,
    BytesPipe,
    TimePeriodPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    FormsModule
  ],
  providers: [
      Broadcaster,
      ProjectService,
      ProfileService,
      AlertService,
      AuthenticationService,
      {
        provide: AuthHttpService,
        deps: [XHRBackend, RequestOptions],
        useFactory: HttpFactory
      },
      BuildService,
      RunnerService,
      InstanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpFactory(backend, options){
  return new AuthHttpService(backend, options);
}
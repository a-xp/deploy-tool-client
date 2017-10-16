import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { ProjectsComponent } from './ui/projects/projects.component';
import { ProjectNewComponent } from './ui/projects/new/new.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ConfigurationComponent } from './ui/configuration/configuration.component';
import { StatusComponent } from './ui/status/status.component';
import {ProjectService} from "./project.service";
import { AlertComponent } from './ui/alert.component';
import {FormsModule} from "@angular/forms";
import {AlertService} from "./alert.service";
import {AuthenticationService} from "./authentication.service";
import { ByTypePipe } from './ui/projects/by-type.pipe';
import {Broadcaster} from "./broadcaster";
import {ProfileService} from "./profile.service";
import { ProjectViewComponent } from './ui/projects/view/view.component';
import { ProjectListComponent } from './ui/projects/list/list.component';
import {BuildService} from "./build.service";
import {RunnerService} from "./runner.service";
import { BytesPipe } from './bytes.pipe';
import { TimePeriodPipe } from './time-period.pipe';
import {InstanceService} from "./instance.service";
import {LoginComponent} from "./ui/login/login.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth-interceptor";
import {environment} from "../environments/environment";
import {MockInterceptor} from "./mock/MockInterceptor";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  {path:'', redirectTo:'projects', pathMatch:'full'},
  {path:'projects', component: ProjectsComponent,
    children:[
      {path:'', redirectTo:'list', pathMatch:'full'},
      {path:'list', component: ProjectListComponent},
      {path:'new', component: ProjectNewComponent},
      {path:':code', component: ProjectViewComponent}
    ]
  },
  {path:'users', component: UsersComponent},
  {path:'status', component: StatusComponent},
  {path:'config', component: ConfigurationComponent},
  {path:'profile', component: ProfileComponent},
  {path:'login', component:LoginComponent}
];

let providers = [
  Broadcaster,
  ProjectService,
  ProfileService,
  AlertService,
  AuthenticationService,
  BuildService,
  RunnerService,
  InstanceService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
if(environment.mock){
  providers.push({
    provide: HTTP_INTERCEPTORS,
    useClass: MockInterceptor,
    multi: true
  })
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectViewComponent,
    ProfileComponent,
    UsersComponent,
    ConfigurationComponent,
    StatusComponent,
    LoginComponent,
    AlertComponent,
    ByTypePipe,
    ProjectNewComponent,
    ProjectListComponent,
    BytesPipe,
    TimePeriodPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import { ProjectsComponent } from './ui/projects/projects.component';
import { ProjectNewComponent } from './ui/projects/new/new.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ConfigurationComponent } from './ui/configuration/configuration.component';
import { StatusComponent } from './ui/status/status.component';
import { AlertComponent } from './ui/alert.component';
import {FormsModule} from "@angular/forms";
import {AlertService} from "./alert.service";
import {AuthenticationService} from "./authentication.service";
import { ByTypePipe } from './ui/projects/by-type.pipe';
import {Broadcaster} from "./broadcaster";
import {ProfileService} from "./profile.service";
import { ProjectViewComponent } from './ui/projects/view/view.component';
import { ProjectListComponent } from './ui/projects/list/list.component';
import {RunnerService} from "./runner.service";
import { BytesPipe } from './bytes.pipe';
import { TimePeriodPipe } from './time-period.pipe';
import {LoginComponent} from "./ui/login/login.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth-interceptor";
import {environment} from "../environments/environment";
import {MockInterceptor} from "./mock/MockInterceptor";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from "@ngrx/store";
import { ProjectParamsComponent } from './ui/projects/project-params/project-params.component';
import {ProjectEffects} from "./store/process/ProjectEffects";
import {UiEffects} from "./store/process/UiEffects";


const appRoutes: Routes = [
  {path:'', redirectTo:'projects', pathMatch:'full'},
  {path:'projects', component: ProjectsComponent,
    children:[
      {path:'', redirectTo:'list', pathMatch:'full'},
      {path:'list', component: ProjectListComponent},
      {path:'new', component: ProjectNewComponent},
      {path:':code/params', component: ProjectParamsComponent},
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
  ProfileService,
  AlertService,
  AuthenticationService,
  RunnerService,
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
    TimePeriodPipe,
    ProjectParamsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({projects: ProjectEffects.projectReducer, currentProject: UiEffects.uiReducer}),
    EffectsModule.forRoot([ProjectEffects, UiEffects])
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

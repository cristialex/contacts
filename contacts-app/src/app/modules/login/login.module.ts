import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { LoginComponent } from './login-component/login.component';
import { LoginRoutingModule } from './login-routing.module';
@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRoutingModule, SharedModule],
})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { RegistrazioneComponent } from './component/registrazione/registrazione.component';

const routes: Routes = [
  {path: "users", component: UserComponent},
  {path: "registrazione", component: RegistrazioneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

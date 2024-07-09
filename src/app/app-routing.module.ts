import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { RegistrazioneComponent } from './component/registrazione/registrazione.component';
import { SchedaComponent } from './component/scheda/scheda.component';

const routes: Routes = [
  {path: "users", component: UserComponent},
  {path: "registrazione", component: RegistrazioneComponent},
  {path: "scheda", component: SchedaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

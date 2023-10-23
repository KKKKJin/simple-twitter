import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // ルートパスをホームにリダイレクト
  { path: 'home', component: HomeComponent }, // ホーム
  { path: 'account/:userId', component: AccountComponent } // アカウント画面
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

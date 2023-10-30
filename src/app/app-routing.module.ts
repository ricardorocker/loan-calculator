import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoanCalculatorComponent } from './views/loan-calculator/loan-calculator.component';
import { AboutComponent } from './views/about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loan-calculator', component: LoanCalculatorComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

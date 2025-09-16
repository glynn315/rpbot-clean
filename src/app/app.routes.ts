import { Routes } from '@angular/router';
import { Home } from './Views/home/home';
import { Panel } from './Views/panel/panel';
import { Typing } from './Views/Typing/typing';
import { Iqtest } from './Views/IQtest/iqtest';

export const routes: Routes = [
    {path:'',redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: Panel},
    {path:'typingTest', component: Typing},
    {path:'iqtest', component: Iqtest}
];

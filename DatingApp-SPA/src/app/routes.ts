import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

// angular router works on first match win
// due to this any wildcards should be placed at last
export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', //http://localhost:4200/members
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        canActivate: [AuthGuard],
      },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ],
  },
  // { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
  // { path: 'messages', component: MessagesComponent },
  // { path: 'lists', component: ListsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

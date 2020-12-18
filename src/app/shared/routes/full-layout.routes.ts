import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from 'app/banner/banner.component';
import { BrandComponent } from 'app/brand/brand.component';
import { CategoryComponent } from 'app/category/category.component';
import { OrderComponent } from 'app/order/order.component';
import { ProductComponent } from 'app/product/product.component';
import { UserComponent } from 'app/user/user.component';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('../../calendar/calendar.module').then(m => m.CalendarsModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsNg2Module)
  },
   {
    path: 'forms',
    loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('../../tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'datatables',
    loadChildren: () => import('../../data-tables/data-tables.module').then(m => m.DataTablesModule)
  },
  {
    path: 'uikit',
    loadChildren: () => import('../../ui-kit/ui-kit.module').then(m => m.UIKitModule)
  },
  {
    path: 'components',
    loadChildren: () => import('../../components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('../../cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'colorpalettes',
    loadChildren: () => import('../../color-palette/color-palette.module').then(m => m.ColorPaletteModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../../chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'chat-ngrx',
    loadChildren: () => import('../../chat-ngrx/chat-ngrx.module').then(m => m.ChatNGRXModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('../../inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'taskboard',
    loadChildren: () => import('../../taskboard/taskboard.module').then(m => m.TaskboardModule)
  },
  {
    path: 'taskboard-ngrx',
    loadChildren: () => import('../../taskboard-ngrx/taskboard-ngrx.module').then(m => m.TaskboardNGRXModule)
  },
  {
    path: 'player',
    loadChildren: () => import('../../player/player.module').then(m => m.PlayerModule)
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'banner',
    component: BannerComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'brand',
    component: BrandComponent
  },
];

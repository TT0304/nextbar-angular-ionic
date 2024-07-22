import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
   
   
 
   
 
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
   
  {
    path: 'register-completed',
    loadChildren: () => import('./register-completed/register-completed.module').then( m => m.RegisterCompletedPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('./tables/tables.module').then( m => m.TablesPageModule)
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./suppliers/suppliers.module').then( m => m.SuppliersPageModule)
  },
  {
    path: 'goods',
    loadChildren: () => import('./goods/goods.module').then( m => m.GoodsPageModule)
  },
  {
    path: 'waiters',
    loadChildren: () => import('./waiters/waiters.module').then( m => m.WaitersPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },

  {
    path: 'add-suppliers',
    loadChildren: () => import('./add-suppliers/add-suppliers.module').then( m => m.AddSuppliersPageModule)
  },
  {
    path: 'add-goods',
    loadChildren: () => import('./add-goods/add-goods.module').then( m => m.AddGoodsPageModule)
  },
  {
    path: 'add-waiter',
    loadChildren: () => import('./add-waiter/add-waiter.module').then( m => m.AddWaiterPageModule)
  },
  {
    path: 'add-customer',
    loadChildren: () => import('./add-customer/add-customer.module').then( m => m.AddCustomerPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },

  {
    path: 'add-supplier',
    loadChildren: () => import('./add-supplier/add-supplier.module').then( m => m.AddSupplierPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'report-detail',
    loadChildren: () => import('./report-detail/report-detail.module').then( m => m.ReportDetailPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'waiter-tables',
    loadChildren: () => import('./waiter-tables/waiter-tables.module').then( m => m.WaiterTablesPageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'homeconfig',
    loadChildren: () => import('./homeconfig/homeconfig.module').then( m => m.HomeconfigPageModule)
  },
  {
    path: 'racuni',
    loadChildren: () => import('./racuni/racuni.module').then( m => m.RacuniPageModule)
  },
  {
    path: 'racunidtl',
    loadChildren: () => import('./racunidtl/racunidtl.module').then( m => m.RacunidtlPageModule)
  },
  {
    path: 'orderdtl',
    loadChildren: () => import('./orderdtl/orderdtl.module').then( m => m.OrderdtlPageModule)
  },
  {
    path: 'rorder',
    loadChildren: () => import('./rorder/rorder.module').then( m => m.RorderPageModule)
  },


  
];
// 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WaiterArticlesPageRoutingModule } from "./waiter-articles-routing.module";

import { NgPipesModule } from "ngx-pipes";
import { OrderConfirmationPageModule } from "../order-confirmation/order-confirmation.module";
import { LongPressDirective } from "./long-press.directive";
import { NoteModalPage } from "./note-modal.page";
import { WaiterArticlesPage } from "./waiter-articles.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaiterArticlesPageRoutingModule,
    NgPipesModule,
    OrderConfirmationPageModule,
  ],
  declarations: [WaiterArticlesPage, LongPressDirective, NoteModalPage],
  entryComponents: [NoteModalPage],
})
export class WaiterArticlesPageModule {}

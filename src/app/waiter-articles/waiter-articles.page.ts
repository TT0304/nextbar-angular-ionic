import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { filter } from "lodash";
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper.service';
import { OrderConfirmationPage } from '../order-confirmation/order-confirmation.page';
import { HttpService } from '../providers/http.service';
import { NoteModalPage } from './note-modal.page';

@Component({
  selector: 'app-waiter-articles',
  templateUrl: './waiter-articles.page.html',
  styleUrls: ['./waiter-articles.page.scss'],
})
export class WaiterArticlesPage implements OnInit {
  user: any;
  data: any = [];
  mediaUrl: string;
  dataLoaded: boolean = false;
  env: any = {};
  skeleton: any[];
  search: string = ""
  removeItem: any;
  removeIndex: any;
  mediaPath: string = ""
  categories: any[];
  categories2: any[];
  selectedText2: string;
  selectedText: string;
  frm: any;
  artikli_id_kat1: string;
  artikli_id_kat2: string;
  stolovi_id: string;
  imeStola: string;
  type: any;
  orderId: any;
  notes: { [key: string]: string } = {}; // Object to store notes per article ID

  constructor(private helper: HelperService,
    private serviceCall: HttpService,
    private activatedRoute: ActivatedRoute,
    private nav: NavController,
    private navCtrl : NavController,
    private modalController: ModalController
  ) {
    this.user = this.helper.getUser();
    this.env = environment
  }

  ngOnInit() {
    this.skeleton = this.helper.getSkeletonItem();
    this.mediaPath = environment.mediaPath;
  }

  ionViewDidEnter() {
    this.getData();
    this.getCategories();

    this.activatedRoute.paramMap.subscribe((p: any) => {
      if (p.keys.length != 0) {
        this.stolovi_id = p.get("stolovi_id");
        this.imeStola = p.get("imeStola");
        this.type = p.get("type");
        this.orderId = p.get("id");
      }
    });
  }

  async getData() {
    let params: any = {
      cat_1: this.artikli_id_kat1,
      cat_2: this.artikli_id_kat2
    };

    this.dataLoaded = false;

    if (!this.artikli_id_kat1 || !this.artikli_id_kat2) return;

    await this.serviceCall.postData("Services/userCheck", { id: this.user.id }).subscribe(response => {
      console.log('Delete status response:', response);
  
      if (response && response.status === "success" && response.code === 200) {
        const deleteStatus = response.response[0]?.izbrisan; // Accessing izbrisan from the first item in the array
  
        if (deleteStatus === "1") {
          console.log('User is deleted. Navigating to login page...');
          this.navCtrl.navigateRoot("/login");
        } else {
          console.log('User is not deleted or delete status not confirmed.');
          // Handle other cases if needed
        }
      } else {
        console.error('Invalid response format or server error:', response);
        // Handle error scenarios
      }
    }, error => {
      console.error('Error fetching delete status:', error);
      // Handle error scenarios
    });

    this.serviceCall.getDetails("Artikli/getAllActiveArtikliCustom", params).subscribe(r => {
      console.log(r);
      this.dataLoaded = true;
      if (r.code == 200) {
        let _data = r.response;
        _data.forEach(e => {
          e.kategorije2_id = parseInt(e.kategorije2_id);
        });
        this.data = _data;
      } else {
        this.data = [];
      }
    })
  }

  getCategories() {
    this.serviceCall.getDetails("KategoriOne/getAllActiveKategorije", {}).subscribe(r => {
      console.log(r);
      if (r.code == 403) {
        this.categories = [];
        this.categories2 = [];
        this.selectedText2 = "";
      } else if (r.code == 200) {
        this.categories = r.response;
        this.categories2 = [];
        this.selectedText2 = "";
        this.artikli_id_kat1 = r.response[0].id;
      } else {
        this.categories = [];
        this.categories2 = [];
        this.selectedText2 = "";
      }
      this.selectedText2 = "";
    })
  }

  getCategories2() {
    this.selectedText2 = "";
    if (this.artikli_id_kat1) {
      this.serviceCall.getDetails("KategoriTwo/getAllActiveKategorije/" + this.artikli_id_kat1, {}).subscribe(r => {
        console.log(r);
        if (r.code == 403) {
          this.categories2 = []
        } else if (r.code == 200) {
          this.categories2 = r.response;
          this.artikli_id_kat2 = r.response[0].id;
        } else {
          this.categories2 = [];
        }
      })
    } else {
      this.categories2 = [];
      this.selectedText2 = "";
    }
  }

  updateSearch() {
    this.search = this.artikli_id_kat2;
    this.getData();
  }

  addQty(item) {
    item.kolacina++;
  }

  removeQty(item) {
    let qty = item.kolacina - 1;
    if (qty < 0) {
      item.kolacina = 0;
    } else {
      item.kolacina = qty;
    }
  }

  async submit() {
    let articles = filter(this.data, function (o) {
      return o.kolacina > 0
    })

    if (articles.length == 0) {
      this.helper.showToast("Please select at least one article", "danger")
      return;
    }

    // Prepare notes object
    let notesObj = {};
    articles.forEach(article => {
      if (this.notes[article.artikli_id]) {
        notesObj[article.artikli_id] = this.notes[article.artikli_id];
      }
    });

    let saveObj = {
      items: articles,
      stolovi_id: this.stolovi_id,
      konobar: this.user.id,
      orderId: this.orderId,
      type: this.type,
      note: notesObj // Include notes object here
    }
    console.log(saveObj);

    let loader = await this.helper.presentLoading();
    loader.present();

    this.serviceCall.postData("Artikli/finalize_order", saveObj).subscribe(r => {
      console.log(r);
      if (r.code == 403) {
        // handle error
      } else if (r.code == 200) {
        this.helper.showToast("Narudzbina zavrsena");
        loader.dismiss();
        this.nav.back();
      } else {
        // handle other responses
      }

    }, error => {
      loader.dismiss();
      // handle error
    });

  }

  async confirm() {
    let data = filter(this.data, function (d) {
      return d.kolacina > 0
    })

    const modal = await this.modalController.create({
      component: OrderConfirmationPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps:{
         "data": data,
          notes : this.notes
       }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data.isSaved) {
        console.log(dataReturned)
        this.notes = dataReturned.data.notes; // Update notes object
        this.submit();
      }
    });
    return await modal.present();
  }

  async openNoteModal(item) {
    const modal = await this.modalController.create({
      component: NoteModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        note: this.notes[item.artikli_id] || ''
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.notes[item.artikli_id] = dataReturned.data.note;
      }
    });

    return await modal.present();
  }

  // Add event listener for long press
  onLongPress(event, item) {
    this.openNoteModal(item);
  }
}

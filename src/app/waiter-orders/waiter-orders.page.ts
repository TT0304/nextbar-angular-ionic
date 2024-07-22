import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { sumBy, uniqBy } from 'lodash';
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';

@Component({
  selector: 'app-waiter-orders',
  templateUrl: './waiter-orders.page.html',
  styleUrls: ['./waiter-orders.page.scss'],
})
export class WaiterOrdersPage implements OnInit, OnDestroy {
  user: any;
  data: any[] = [];
  mediaUrl: string;
  dataLoaded = false;
  env: any = {};
  skeleton: any[];
  inputParams: any;
  stolovi_id: any;
  timer: any;
  grandTotal: any = 0;
  imeStola: any;

  constructor(
    private helper: HelperService,
    private serviceCall: HttpService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private navCtrl: NavController
  ) {
    this.user = this.helper.getUser();
    this.env = environment;
  }

  ngOnInit() {
    this.skeleton = this.helper.getSkeletonItem();

    this.activatedRoute.paramMap.subscribe((p: any) => {
      if (p.keys.length !== 0) {
        this.inputParams = p.params;
        this.stolovi_id = p.get('stolovi_id');
        this.imeStola = p.get('imeStola');
        this.getData();

        this.timer = setInterval(() => {
          console.log(new Date());
          this.getData();
        }, 30000);
      }
    });
  }

  ionViewDidEnter() {}

  ionViewWillEnter() {
    console.log('Entered');
  }

  ionViewDidLeave() {
    console.log('Leaving');
    clearInterval(this.timer);
    delete this.timer;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  async getData() {
    let params: any = {};

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

    this.serviceCall
      .getDetails(`Stolovi/getAllActiveStoloviOrderByOrderId/${this.stolovi_id}`, params)
      .subscribe((r) => {
        this.dataLoaded = true;
        if (r.code === 200) {
          let _data = r.response;
          this.grandTotal = sumBy(uniqBy(_data, 'order_id'), 'ukupno');
          this.data = _data;
        } else {
          this.data = [];
        }
      });
  }

  addNew() {
    let params: any = {
      stolovi_id: this.stolovi_id,
      imeStola: this.imeStola,
      type: 'insert',
    };
    this.helper.gotoPage('waiter-tables/waiter-articles', params);
  }

  async checkout(orderId: any, i: number) {
    let loader = await this.helper.presentLoading();
    loader.present();

    this.serviceCall
      .postData('Artikli/orderpostcheckout', { orderId: orderId, payAll: false, isFiscal: false })
      .subscribe((r) => {
        if (r.code === 200) {
          this.data = [];
          this.helper.showToast('Narudžbina naplaćena');
          this.getData();
        }
        loader.dismiss();
      });
  }

  async fiscalCharge(orderId: any, i: number) {
    let loader = await this.helper.presentLoading();
    loader.present();
    const printerName = localStorage.getItem("printer_name") || "";

    this.serviceCall
      .postData('Artikli/orderpostcheckout', { orderId: orderId, payAll: false, isFiscal: true, printerName: printerName })
      .subscribe((r) => {
        if (r.code === 200) {
          this.data = [];
          this.helper.showToast('Fiskalna naplata uspješna');
          this.getData();
        }
        loader.dismiss();
      });
  }

  async checkoutAll() {
    let loader = await this.helper.presentLoading();
    loader.present();

    const orderIds = this.data.map((item) => item.order_id);

    const payload = { orderId: orderIds, payAll: true, isFiscal: false };

    this.serviceCall.postData('Artikli/orderpostcheckout', payload).subscribe(
      (r) => {
        if (r.code === 200) {
          this.data = [];
          this.helper.showToast('Sve narudžbe su uspješno plaćene');
          this.getData();
        }
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
        this.helper.showToast('Obrada plaćanja za sve narudžbe nije uspjela');
        console.error('Error:', error);
      }
    );
  }

  async fiscalChargeAll() {
    let loader = await this.helper.presentLoading();
    loader.present();
    

    const orderIds = this.data.map((item) => item.order_id);
    const printerName = localStorage.getItem("printer_name") || "";

    const payload = { orderId: orderIds, payAll: true, isFiscal: true, printerName: printerName };

    this.serviceCall.postData('Artikli/orderpostcheckout', payload).subscribe(
      (r) => {
        if (r.code === 200) {
          this.data = [];
          this.helper.showToast('Fiskalna naplata svih narudžbi uspješna');
          this.getData();
        }
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
        this.helper.showToast('Obrada fiskalnog plaćanja za sve narudžbe nije uspjela');
        console.error('Error:', error);
      }
    );
  }
}

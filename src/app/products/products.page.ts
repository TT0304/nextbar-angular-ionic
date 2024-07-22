import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  user: any;
  data: any = [];
  mediaUrl: string;
  dataLoaded: boolean = false;
  env: any = {};
  skeleton: any[];
  search:string=""
  removeItem: any;
  removeIndex: any;
  mediaPath: string = ""
  suppliers: any;
  supplier: string = ""
  dt: string;
  type: string;
  dataAdded:boolean=false;

  constructor(private helper: HelperService,
    private serviceCall: HttpService,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
    ) {
  
    this.user = this.helper.getUser();
    this.env = environment
    let dt = new Date();
    this.dt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
  }

  ngOnInit() {
    this.skeleton = this.helper.getSkeletonItem();
    this.getSupplier();

  }

  ionViewDidEnter() {

    this.dataAdded = false;
    this.getData()

    this.activatedRoute.paramMap.subscribe((p: any) => {

      if (p.keys.length != 0) {
        this.type = p.get("type")
  

      }
    });




  }



  async getData() {

    let params: any = {r:Math.random()};

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

    this.serviceCall.getDetails("Artikli/getAllActiveArtikli", params).subscribe(r => {
      console.log(r);
      this.dataLoaded = true;
      if (r.code == 200) {
        if (r.response.length > 0) {

          let _data = []
          r.response.forEach(element => {
            let r = {
              id: element['artikli_id'],
              artikli_ime: element['artikli_ime'],
              artikli_cena: element['artikli_cena'],
              artikli_kolicina: element['artikli_kolicina'],
              artikli_kolicina2: element['artikli_kolicina2'],

              quantity: '',
            }
            _data.push(r);
          });
          this.data = _data
        }

      } else {
        this.data = [];


      }
    })
  }





  async getSupplier() {
    this.serviceCall.getDetails("Dobavljaci/getAllActiveDobavljaci", {}).subscribe(r => {
      if (r.code == 200) {
        this.suppliers = r.response;
      } else {
        this.suppliers = [];


      }
    })
  }




  async save() {


    if (this.supplier == '') {
      this.helper.showToast("Please select supplier");
      return false;
    }
    if (this.dt == '') {
      this.helper.showToast("Please select Date");
      return false;
    }

    let articles = []
    this.data.forEach(element => {
      let qty = parseInt(element.quantity);
      if (!isNaN(qty)) {
        articles.push(element);
      }
    });

    console.log(articles);
    if (articles.length == 0) {
      this.helper.showToast("Please add some quantity");
      return false;

    } else {

      let params = {
        "firme_id": this.supplier,
        "date": this.dt,
        "type": this.type,
        "artikli": articles
      }
      let loader =await this.helper.presentLoading();
      loader.present()
      this.serviceCall.postData("Ulazrobe/add_product", params).subscribe(r => {
        if (r.code == 200) {
          this.dataAdded=true;
        }
        loader.dismiss()
      })
    }


  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}

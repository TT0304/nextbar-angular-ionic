import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { MenuController, ModalController, NavController } from "@ionic/angular";
import { HelperService } from "../helper.service";
import { HttpService } from "../providers/http.service";

const { Storage } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  user: any;
  data: any = [];
  dataLoaded: boolean;
  gotovina: string;
  timer: any;
  id : number;

  constructor(
    private navCtrl: NavController,
    private helper: HelperService,
    private serviceCall: HttpService,
    public menuCtrl: MenuController,
    public modalController: ModalController
  ) {
    this.user = this.helper.getUser();
    console.log(this.user);
    this.menuCtrl.enable(true);
    let dt = new Date();
    this.gotovina =
      dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
  }
  openMenu() {
    console.log("sdaf");
    this.menuCtrl.enable(true, "custom");
    this.menuCtrl.open("custom");
  }
  ionViewDidEnter() {
    this.getData();

    this.timer = setInterval(() => this.getData(), 30000);
  }

  async getData() {
    let params = { gotovina: this.gotovina };

    if (this.user["prioritet"] == "Konobar") {
      params["id_konobara"] = this.user["id"];
    }


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
      .postData("stats/getAllActiveTables", params)
      .subscribe((r) => {
        console.log(r);
        this.dataLoaded = true;
        if (r.code == 200) {
          this.data = r.response;
        } else {
          this.data = [];
        }
      });
  }

  ionViewWillLeave() {
    clearInterval(this.timer);
  }
}

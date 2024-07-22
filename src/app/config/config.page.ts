import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { MenuController, NavController } from "@ionic/angular";
import * as $ from "jquery";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HelperService } from "../helper.service";
import { HttpService } from "../providers/http.service";
const { Storage } = Plugins;

@Component({
  selector: "app-config",
  templateUrl: "./config.page.html",
  styleUrls: ["./config.page.scss"],
})
export class ConfigPage implements OnInit {
  server_title: string;
  server: string;
  user: any;
  username: any;
  password: any;
  putvalue: any = 0;
  serverList: any = [];
  selectedPrinter: string;
  printerList: any[] = [];
  constructor(
    private helper: HelperService,
    private serviceCall: HttpService,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
    private http: HttpClient
  ) {
    this.loaddata();
  }

  ngOnInit() {
    // this.server = this.serviceCall.getCongiuration()
    this.loaddata();
    Storage.get({
      key: "configuration",
    }).then((s) => {
      if (s.value) {
        console.log(s.value);
        this.server = s.value;
        this.server_title = localStorage.getItem("server_title");
      }
    });
    this.loadPrinters();
  }

  loadPrinters() {
    this.serviceCall
      .getDetails("Services/getAllBluetoothPrinters", {})
      .subscribe(
        (response: any) => {
          if (response.code === 200) {
            this.printerList = response.response;
          }
        },

      );
  }

  loaddata() {
    var a = [];
    var b = JSON.parse(localStorage.getItem("server_list"));
    console.log(b);
    if (b != null) {
      if (b.length > 0) {
        var length = b.length;
        $.each(b, function (field, value) {
          console.log(field);
          let id = Number(field) + 1;
          a.push({ title: value[0], server: value[1], id: id });
        });
      }
      this.serverList = a;
    }
  }
  async save() {
    if (this.server.trim() == "") {
      this.helper.showToast("Molimo vas da unesete adresu servera");
      return false;
    }
    let loader = await this.helper.presentLoading();
    loader.present();
    let url = "http://" + this.server + environment.nextBarDomain;
    let checkStatusURL = url + "ping/status_check/osoblje";
    this.get(checkStatusURL).subscribe((r) => {
      if (r.code == 409) {
        this.helper.showToast(r.status);
      } else if (r.code == 200) {
        Storage.set({ key: "configuration", value: this.server }).then((s) => {
          localStorage.setItem("server_title", this.server_title);
          this.serviceCall.setConfiguration(url);
          if (this.putvalue == 0) {
            this.saveserverlist();
          }
          this.close();
        });
      }
      loader.dismiss();
    });
  }

  savePrinter() {
    localStorage.setItem("printer_name", this.selectedPrinter || "");
    if(!this.selectedPrinter){
      this.helper.showToast("pisač nije odabran")
    }
    else this.helper.showToast("ispravno spremljeno - " + this.selectedPrinter);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  close() {
    this.navCtrl.back();
  }

  get(url): Observable<any> {
    return this.http.get(url, {}).pipe(
      tap((_) => console.log("response received")),
      catchError(this.handleError("getDetails", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      this.helper.showToast("Cannot connect to server", "danger");
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  saveserverlist() {
    var a = [];
    var check = 0;
    var b = JSON.parse(localStorage.getItem("server_list"));
    var server = this.server;
    var server_title = this.server_title;
    var len = 1;
    if (b != null) {
      $.each(b, function (field, value) {
        let firststr = "" + value[1];
        let secstr = "" + server;
        var search = ".";
        var replaceWith = "";
        len = b.length;
        firststr = firststr.split(search).join(replaceWith);
        secstr = secstr.split(search).join(replaceWith);
        if (Number(firststr) == Number(secstr)) {
          value[0] = server_title;
          console.log(value[0]);
          a.push(value);
          check = 1;
        } else {
          check = 0;
          console.log("2" + value);
          a.push(value);
        }
      });
    }
    if (check == 0) {
      var a1 = [this.server_title, this.server];
      a.push(a1);
    }
    localStorage.setItem("server_list", JSON.stringify(a));
    this.loaddata();
  }
  addnewserver(sl: any) {
    this.server_title = sl.title;
    this.server = sl.server;
    this.putvalue = 1;
  }
  removeip(id) {
    var a = [];
    var b = this.serverList;
    var a1 = [];
    $.each(b, function (field, value) {
      console.log(value);
      console.log(id);
      if (Number(id) != Number(value.id)) {
        var a1 = [value.title, value.server, value.id];
        a.push(a1);
      }
    });
    console.log(a);
    localStorage.setItem("server_list", JSON.stringify(a));
    this.loaddata();
  }
  clearputvalue() {
    this.putvalue = 0;
  }
}

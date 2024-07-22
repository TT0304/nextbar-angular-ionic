import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HelperService } from '../helper.service';
import { HttpService } from '../providers/http.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  dt:any="";
   dataLoaded: boolean;
  data: any;
  periodicni: boolean=true;
  izvestaj: boolean=false;
  articlala_virman: boolean=false;
  storno_artikala: boolean;
  constructor(private navCtrl: NavController, private helper: HelperService,
    private serviceCall: HttpService,

  

     ) { 
 
 
     }

  ngOnInit() {
  }


 
 

}

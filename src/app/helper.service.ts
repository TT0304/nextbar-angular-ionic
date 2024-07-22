import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private user: any;
  private loggedInUser = new Subject<any>();


  constructor(public toastController: ToastController, private router: Router,public loadingController: LoadingController) {
 

    }

    async showToast(message,color="primary"){
      const toast = await this.toastController.create({
        message: message,
        duration: 4000,
        color:color
      });
      toast.present();
    }

    setUser(user){
      this.user = user;
      this.setLoggedInUser(user)

    }

    getUser(){
      return this.user;
    }

    gotoPage(page, params = {}){
      this.router.navigate([page,params])
    }


    async presentLoading(txt='Molimo sacekajte...') {
      const loading = await this.loadingController.create({
        message: txt
      });
      return loading;
    }

     validateAmount(fc: FormControl){
       const pattern = /^\d+$/;
      if(!pattern.test(fc.value)){
        return ({validateAmount: true});
      } else {
        return (null);
      }
    }



    getSkeletonItem(){
      let arr = [];
      for(let i=0; i<=10;i++){
        arr.push(i);
      }
      return arr;
    }



    setLoggedInUser(user){
      this.loggedInUser.next(user)
}

    getUserDetail(): Subject<any> {
      return this.loggedInUser;
  }

    
  }

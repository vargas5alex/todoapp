import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { RegisterPage } from '../register/register';
import { ListsPage } from '../lists/lists';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: string;
  public password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
  }

  public login(): void {
    const params = {
      email: this.email,
      password: this.password
    }
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.api.auth(params).subscribe((status: boolean) => {
      loading.dismiss();
      const toast = this.toastCtrl.create();
      if (status) {
        toast.setMessage('Usuario registrado con exito');
        toast.setDuration(1000);
        // camabiamos la pantalla que estamos viendo
        this.navCtrl.setRoot(ListsPage)
        } else {
        toast.setMessage('Error al registrar el usuario');
        toast.setDuration(3000);
      }
      toast.present();
    });
  }
  public register(): void {
    this.navCtrl.push(RegisterPage);
  }
}

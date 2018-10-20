import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { CreateListPage } from '../create-list/create-list';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {
  public lists: Array<any>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.refreshLists();
  }

  private refreshLists(): void {
    this.api.getLists().subscribe((response: any) => {
      this.lists = response.lists;
    });
  }

  public addList() {
    const modal = this.modalCtrl.create(CreateListPage)
    modal.present();
    modal.onDidDismiss(() => {
      this.refreshLists();
    });
  }
}

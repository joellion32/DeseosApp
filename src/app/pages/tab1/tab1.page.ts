import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private dataService: DataService, private router: Router,
  public alertController: AlertController) {}


  async agregarLista(){

    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs:[
        {
          name: 'Titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
           console.log('cancelar'); 
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{
            console.log(data); 
            if(data.Titulo.length === 0){
              return;
            }
            // crear la lista
            const listaId = this.dataService.AgregarLista(data.Titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`); 
           }
        }
      ],
    });

    await alert.present();
  }

}

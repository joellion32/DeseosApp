import { ListaItem } from './lista-item.model';

export class Lista{


id: number;  
titulo:string;
creada_en: Date;
terminada_en: Date;
terminada: boolean;
items: ListaItem[];

constructor(titulo:string){
this.titulo = titulo;
this.creada_en = new Date();
this.terminada = false;
this.items = [];

// para que el id se genere con el metodo date
this.id = new Date().getTime();
   
}

}
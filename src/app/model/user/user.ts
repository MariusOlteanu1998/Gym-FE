import { Scheda } from "../scheda/scheda";

export class User {
    id: number;
    nome: string;
    cognome: string;
    anno_nascita: string | Date; // Cambiato a string | Date
    email: string;
    password: string;
    cf: string;
    //scheda: Scheda[];
  
    constructor(
    id: number,
    nome: string, 
    cognome: string, 
    anno_nascita: string | Date, // Cambiato a string | Date
    email: string,
    password: string, 
    cf: string, 
    //scheda: Scheda[]
    ) 
    {
      this.id = id;
      this.nome = nome;
      this.cognome = cognome;
      this.anno_nascita = anno_nascita;
      this.email = email;
      this.password = password;
      this.cf = cf;
      //this.scheda = scheda;
    }
  }
  
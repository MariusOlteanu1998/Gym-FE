import { User } from "../user/user";

export class Scheda {
    id: number;
    data_creazione: Date;
    data_fine: Date;
    esercizi: string[];
    reps: string;
    recupero: string;
    users: User[];
  
    constructor(
      id: number,
      data_creazione: Date,
      data_fine: Date,
      esercizi: string[],
      reps: string,
      recupero: string,
      users: User[]
    ) 
    {
      this.id = id;
      this.data_creazione = data_creazione;
      this.data_fine = data_fine;
      this.esercizi = esercizi;
      this.reps = reps;
      this.recupero = recupero;
      this.users = users;
    }
  }
  
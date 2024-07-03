import { Component, OnInit } from '@angular/core';
import { Scheda } from 'src/app/model/scheda/scheda';
import { Router } from '@angular/router';
import { SchedaService } from 'src/app/service/scheda/scheda.service';

@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.css']
})
export class SchedaComponent implements OnInit {

  schede: Scheda[] = [];
  showForm: boolean = false;
  isUpdate: boolean = false;
  selectedScheda: Scheda = {
    id: 0,
    data_creazione: new Date(),
    data_fine: new Date(),
    esercizi: [],
    reps: '',
    recupero: '',
    users: []
  };

  constructor(private schedaService: SchedaService, private router: Router) { }

  ngOnInit(): void {
    this.loadSchede();
  }

  loadSchede() {
    this.schedaService.getAllScheda().subscribe(
      schede => {
        this.schede = schede;
      },
      error => {
        console.log('Error fetching schede: ', error);
      }
    );
  }

  deleteScheda(id: number) {
    this.schedaService.deleteScheda(id).subscribe(
      () => {
        console.log('Scheda deleted successfully');
        this.loadSchede();
      },
      error => {
        console.log('Error deleting scheda: ', error);
      }
    );
  }

  addScheda() {
    this.isUpdate = false;
    this.selectedScheda = {
      id: 0,
      data_creazione: new Date(),
      data_fine: new Date(),
      esercizi: [],
      reps: '',
      recupero: '',
      users: []
    };
    this.showForm = true;
  }

  updateScheda(scheda: Scheda) {
    this.isUpdate = true;
    this.selectedScheda = { ...scheda };
    // Potresti voler fare altre operazioni di preparazione qui, se necessario
    this.showForm = true;
  }

  onSubmit() {
    if (this.isUpdate) {
      this.schedaService.updateScheda(this.selectedScheda.id, this.selectedScheda).subscribe(
        () => {
          console.log('Scheda updated successfully');
          this.loadSchede();
          this.showForm = false;
        },
        error => {
          console.log('Error updating scheda: ', error);
        }
      );
    } else {
      this.schedaService.insertScheda(this.selectedScheda).subscribe(
        () => {
          console.log('Scheda added successfully');
          this.loadSchede();
          this.showForm = false;
        },
        error => {
          console.log('Error adding scheda: ', error);
        }
      );
    }
  }

  cancel() {
    this.showForm = false;
  }

  navigateToRegistration() {
    this.router.navigate(['/registrazione']);
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
}

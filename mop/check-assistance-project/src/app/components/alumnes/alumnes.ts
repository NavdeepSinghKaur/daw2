import { Component, inject } from '@angular/core';
import { Alumne } from './alumne/alumne';
import { alumnesList } from '../../shared/alumneList';
import { CreateAlumne } from './alumne/create-alumne/create-alumne';
import { NgStyle } from '@angular/common';
import { LocalstorageHandler } from '../../services/localstorage-handler';
import { AlumneModel } from '../../shared/alumne.model';



@Component({
  selector: 'app-alumnes',
  imports: [Alumne, CreateAlumne, NgStyle],
  templateUrl: './alumnes.html',
  styleUrl: './alumnes.css'
})
export class Alumnes {
  localstorageSrv: LocalstorageHandler;
  allAlumnes: AlumneModel[];
  filter: boolean | undefined;
  viewList: boolean = false;
  assistanceLists: any[];
  formattedAssistanceList: string[][] = [];

  constructor() {
    this.localstorageSrv = inject(LocalstorageHandler);
    this.allAlumnes = alumnesList;
    this.assistanceLists = this.localstorageSrv.getAssistanceList;

    this.assistanceLists.forEach(assistance => {
      
      let student: any[] = [];
      console.log(assistance[1]);
      student.push(`${assistance[0].substring(0, 4)}/${assistance[0].substring(4, 6)}/${assistance[0].substring(6, assistance[0].indexOf('_'))}`)
      assistance[1].forEach((studentData: any) => {
        if (studentData.isPresent == true) {
          student.push([studentData.name, 'Present']);
        } else if (studentData.isPresent == false) {
          student.push([studentData.name, 'Absent']);
        } else {
          student.push([studentData.name, 'none']);
        }
      });

      this.formattedAssistanceList.push(student);
    })
  }

  filterAlumne(filter: boolean | undefined) {
    this.filter = filter;
  }

  saveList() {
    this.localstorageSrv.saveList();
  }

  viewOlderLists() {
    this.viewList = !this.viewList;
  }
}

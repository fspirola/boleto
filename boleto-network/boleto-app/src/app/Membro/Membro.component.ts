/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MembroService } from './Membro.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-membro',
  templateUrl: './Membro.component.html',
  styleUrls: ['./Membro.component.css'],
  providers: [MembroService]
})
export class MembroComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  membroId = new FormControl('', Validators.required);
  nome = new FormControl('', Validators.required);
  assinatura = new FormControl('', Validators.required);
  cpfcnpj = new FormControl('', Validators.required);


  constructor(private serviceMembro: MembroService, fb: FormBuilder) {
    this.myForm = fb.group({
      membroId: this.membroId,
      nome: this.nome,
      assinatura: this.assinatura,
      cpfcnpj: this.cpfcnpj
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMembro.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.boleto.Membro',
      'membroId': this.membroId.value,
      'nome': this.nome.value,
      'assinatura': this.assinatura.value,
      'cpfcnpj': this.cpfcnpj.value
    };

    this.myForm.setValue({
      'membroId': null,
      'nome': null,
      'assinatura': null,
      'cpfcnpj': null
    });

    return this.serviceMembro.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'membroId': null,
        'nome': null,
        'assinatura': null,
        'cpfcnpj': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.boleto.Membro',
      'nome': this.nome.value,
      'assinatura': this.assinatura.value,
      'cpfcnpj': this.cpfcnpj.value
    };

    return this.serviceMembro.updateParticipant(form.get('membroId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceMembro.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceMembro.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'membroId': null,
        'nome': null,
        'assinatura': null,
        'cpfcnpj': null
      };

      if (result.membroId) {
        formObject.membroId = result.membroId;
      } else {
        formObject.membroId = null;
      }

      if (result.nome) {
        formObject.nome = result.nome;
      } else {
        formObject.nome = null;
      }

      if (result.assinatura) {
        formObject.assinatura = result.assinatura;
      } else {
        formObject.assinatura = null;
      }

      if (result.cpfcnpj) {
        formObject.cpfcnpj = result.cpfcnpj;
      } else {
        formObject.cpfcnpj = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'membroId': null,
      'nome': null,
      'assinatura': null,
      'cpfcnpj': null
    });
  }
}

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
import { BoletoService } from './Boleto.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-boleto',
  templateUrl: './Boleto.component.html',
  styleUrls: ['./Boleto.component.css'],
  providers: [BoletoService]
})
export class BoletoComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  boletoId = new FormControl('', Validators.required);
  codigoBarra = new FormControl('', Validators.required);
  dataVencimento = new FormControl('', Validators.required);
  pagadorPF = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  ifPagadora = new FormControl('', Validators.required);
  ifBeneficiario = new FormControl('', Validators.required);

  constructor(private serviceBoleto: BoletoService, fb: FormBuilder) {
    this.myForm = fb.group({
      boletoId: this.boletoId,
      codigoBarra: this.codigoBarra,
      dataVencimento: this.dataVencimento,
      pagadorPF: this.pagadorPF,
      status: this.status,
      ifPagadora: this.ifPagadora,
      ifBeneficiario: this.ifBeneficiario
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceBoleto.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.boleto.Boleto',
      'boletoId': this.boletoId.value,
      'codigoBarra': this.codigoBarra.value,
      'dataVencimento': this.dataVencimento.value,
      'pagadorPF': this.pagadorPF.value,
      'status': this.status.value,
      'ifPagadora': this.ifPagadora.value,
      'ifBeneficiario': this.ifBeneficiario.value
    };

    this.myForm.setValue({
      'boletoId': null,
      'codigoBarra': null,
      'dataVencimento': null,
      'pagadorPF': null,
      'status': null,
      'ifPagadora': null,
      'ifBeneficiario': null
    });

    return this.serviceBoleto.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'boletoId': null,
        'codigoBarra': null,
        'dataVencimento': null,
        'pagadorPF': null,
        'status': null,
        'ifPagadora': null,
        'ifBeneficiario': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.boleto.Boleto',
      'codigoBarra': this.codigoBarra.value,
      'dataVencimento': this.dataVencimento.value,
      'pagadorPF': this.pagadorPF.value,
      'status': this.status.value,
      'ifPagadora': this.ifPagadora.value,
      'ifBeneficiario': this.ifBeneficiario.value
    };

    return this.serviceBoleto.updateAsset(form.get('boletoId').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceBoleto.deleteAsset(this.currentId)
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

    return this.serviceBoleto.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'boletoId': null,
        'codigoBarra': null,
        'dataVencimento': null,
        'pagadorPF': null,
        'status': null,
        'ifPagadora': null,
        'ifBeneficiario': null
      };

      if (result.boletoId) {
        formObject.boletoId = result.boletoId;
      } else {
        formObject.boletoId = null;
      }

      if (result.codigoBarra) {
        formObject.codigoBarra = result.codigoBarra;
      } else {
        formObject.codigoBarra = null;
      }

      if (result.dataVencimento) {
        formObject.dataVencimento = result.dataVencimento;
      } else {
        formObject.dataVencimento = null;
      }

      if (result.pagadorPF) {
        formObject.pagadorPF = result.pagadorPF;
      } else {
        formObject.pagadorPF = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.ifPagadora) {
        formObject.ifPagadora = result.ifPagadora;
      } else {
        formObject.ifPagadora = null;
      }

      if (result.ifBeneficiario) {
        formObject.ifBeneficiario = result.ifBeneficiario;
      } else {
        formObject.ifBeneficiario = null;
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
      'boletoId': null,
      'codigoBarra': null,
      'dataVencimento': null,
      'pagadorPF': null,
      'status': null,
      'ifPagadora': null,
      'ifBeneficiario': null
      });
  }

}

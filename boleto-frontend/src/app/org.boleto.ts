import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.boleto{
   export class Boleto extends Asset {
      boletoId: string;
      codigoBarra: string;
      dataVencimento: string;
      pagadorPF: Membro;
      status: Status;
      ifPagadora: Membro;
      ifBeneficiario: Membro;
   }
   export enum Status {
      PEDENTE,
      PAGO,
   }
   export class Membro extends Participant {
      membroId: string;
      nome: string;
      assinatura: string;
      cpfcnpj: string;
   }
   export class RegistroBoleto extends Transaction {
      boleto: Boleto;
      ifBeneficiario: Membro;
      pagadorPF: Membro;
   }
   export class PagamentoBoleto extends Transaction {
      boleto: Boleto;
      ifPagadora: Membro;
   }
// }

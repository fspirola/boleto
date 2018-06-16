/**
 * Registra os boletos nos bancos
 * @param {org.boleto.RegistroBoleto} registroBoleto - Transação com o Boleto que será emitido por bancoemissor/IFBeneficario
 * @transaction
 */
function registrarBoleto(registroBoleto) {
    var boleto = registroBoleto.boleto;
    
    if (boleto.boletoId == '') {
      throw new Error('Não existe Boleto');
    }
   
    boleto.codigoBarra= (Math.random() * Date.now()*10000000).toString()+(Math.random() * Date.now()*10000000).toString()+"000000"; 
    var dias = 3;
    boleto.dataVencimento = new Date(Date.now() + dias*24*60*60*1000).toLocaleString();
    boleto.status = "PEDENTE";
    
    boleto.ifBeneficiario = registroBoleto.ifBeneficiario;
    boleto.pagadorPF = registroBoleto.pagadorPF;
  
    console.log('###Registrar Boleto ID ' + boleto.boletoId.toString());
    
    return getAssetRegistry('org.boleto.Boleto')
      .then(function(boletoRegistry) {
      return boletoRegistry.update(boleto);
    });
  }
  
  /**
   * Pagametno de boletos nos bancos
   * @param {org.boleto.PagamentoBoleto} pagamentoBoleto - Transação com o Boleto que será pago por bancoPagador/IFPagadora
   * @transaction
   */
  
  function pagarBoleto(pagamentoBoleto) {
    var boleto = pagamentoBoleto.boleto;
    console.log('###pagar Boleto ID ' + boleto.boletoId.toString());
    
    if (boleto.boletoId == '') {
      throw new Error('Não existe Boleto');
    }
    
    boleto.ifPagadora = pagamentoBoleto.ifPagadora;
    boleto.status = 'PAGO';
    
    return getAssetRegistry('org.boleto.Boleto')
      .then(function(boletoRegistry) {
      return boletoRegistry.update(boleto);
    });
  }
  
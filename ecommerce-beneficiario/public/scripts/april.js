$(document).ready(function() {
    $(".aceitar").click(function() {
        $("#modal").fadeIn();
        $("#modal").fadeIn("slow");
        $("#modal").fadeIn(3000);
        $("#mask").css("display", "block");
        $("#modal").css("display", "block");
        $("#fechar").click(function() {
            $("#modal").fadeOut();
            $("#modal").fadeOut("slow")
            $("#modal").fadeOut(3000)
            $("#modal").css("display", "none");
            $("#mask").css("display", "none");
        })
    });
    $("#mask").click(function() {
        $("#modal").fadeOut();
        $("#modal").fadeOut("slow")
        $("#modal").fadeOut(3000)
        $("#modal").css("display", "none");
        $("#modalBoleto").css("display", "none");
        $("#modalErro").css("display", "none");
        $("#loadingmessage").css("display", "none");
        $("#mask").css("display", "none");
        $("#linhaDig").text('');
        $("#dataVenc").text('');
        $("#valor").text('');
        $("#cpfPagador").text('');
        $("#nomePagador").text('');
        $("#cnpjBenef").text('');
        $("#nomeBenef").text('');
    });
    $("#addProposta").submit(function(event) {
        event.preventDefault();
        submeterProposta();
        $("#modal").fadeOut();
        $("#modal").fadeOut("slow");
        $("#modal").fadeOut(3000);
        $("#modal").css("display", "none");
        $("#mask").css("display", "block");
        // Clear the form.
        $('.nome').val('');
        $('.date').val('');
        $('.cpf').val('');
        $('.email').val('');
        $('.local').val('');
        $('input:checkbox').removeAttr('checked');
    });
    // $(document).ajaxStart(function () {
    //     $("#loading").show();
    // }).ajaxStop(function () {
    //     $("#loading").hide();
    // });
});

/**
 * Define a IF Beneficiária (que gerará o boleto de pagamento) e o valor da parcela
 */
function setIFBeneficiaria(ifB, valor) {
    $(".ifBeneficiaria").val(ifB);
    $(".valorParcela").val(valor);
    switch (ifB) {
        case 'bradesco':
            $("#ifBeneficiaria").text("Bradesco");
            break;
        case 'bancobrasil':
            $("#ifBeneficiaria").text("Banco do Brasil");
            break;
        case 'itau':
            $("#ifBeneficiaria").text("Itaú");
            break;
        case 'santander':
            $("#ifBeneficiaria").text("Santander");
            break;
        default:
            break;
    }

};

$(document).ready(function() {
    $('#mask').click(function() {
        $('#mask').css("display", "none");
        $('#modal').css("display", "none");
    })
});

var submeterProposta = function() {
    var form = $('#addProposta');
    var formData = $(form).serialize();
    $('#loadingmessage').show();
    $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData,
        timeout: 5000
    }).done(function(response) {
        //console.log(response);
        $('#loadingmessage').hide();
        $('#modalErro').hide();
        $('#modalBoleto').show();
        console.log(response);
        $("#linhaDig").text(response.linhaDigitavel);
        $("#dataVenc").text(response.dataVencimento);
        $("#valor").text('R$ ' + Number(response.valor).toFixed(2));
        $("#cpfPagador").text(response.cpfcnpjPagador);
        $("#nomePagador").text(response.nomePagador);
        $("#cnpjBenef").text(response.cnpjBeneficiario);
        $("#nomeBenef").text(response.nomeBeneficiario);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Erro: " + textStatus + "(" + errorThrown + ")");
        console.log(jqXHR);
        $('#loadingmessage').hide();
        $('#modalBoleto').hide();
        $('#modalErro').show();
        $("#modalErro").text('Oops! Um erro ocorreu e sua mensagem não pôde ser enviada.');
    });
};
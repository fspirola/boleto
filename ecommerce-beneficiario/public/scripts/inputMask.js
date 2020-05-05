  $(document).ready(function () { 
        var $data = $(".date");
        var $seuCampoCpf = $(".cpf");
        $seuCampoCpf.mask('000.000.000-00', {reverse: true});
        $data.mask('00/00/0000', {reverse: true});
    });
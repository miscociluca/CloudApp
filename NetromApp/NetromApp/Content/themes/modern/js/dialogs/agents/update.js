function UpdateAgentDialog($data) {
    var $anLegitimatie = $data.data.Anlegitimatie !== null ? $.dateFormat($data.data.Anlegitimatie) : '';
    var $dataValabilitate = $data.data.DataValabilitate !== null ? $.dateFormat($data.data.DataValabilitate) : '';
    var $IsActiveChecked = $data.data.Activ ? 'checked' : '';

    var form = $("<form/>",
                    {
                        id: "update_agent"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelMarca +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Marca" value="' + $data.data.Marca+'" class="form-control" id="Marca" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Nume" value="' + $data.data.Nume+'" class="form-control" id="Nume" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelFirstName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Prenume" value="' + $data.data.Prenume +'" class="form-control" id="Prenume" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIdType +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Tiplegitimatie" value="' + $data.data.Tiplegitimatie +'" class="form-control" id="Tiplegitimatie" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIdNumber +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Nrlegitimatie" value="' + $data.data.Nrlegitimatie +'" class="form-control" id="Nrlegitimatie" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIdYear +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Anlegitimatie" value="' + $anLegitimatie +'" class="form-control" id="Anlegitimatie" placeholder="_/_/___">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIdValability +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="DataValabilitate" value="' + $dataValabilitate +'" class="form-control" id="DataValabilitate" placeholder="_/_/___">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelAgencyName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="DenumireAgentie" value="' + $data.data.DenumireAgentie +'" class="form-control" id="DenumireAgentie" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelAgencyBossName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="NumeSefAgentie" value="' + $data.data.NumeSefAgentie +'" class="form-control" id="NumeSefAgentie" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelActiv +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="Activ" id="Activ" value="true" checked>' +
        "</div>" +
        "</div>" +

        "</div>";

    form.append(fieldset);


    $.showPageDialog($data.dialodTitle,
        form,
        {
            "close": {
                text: $data.dialogButtons.cancel,
                'class': 'btn btn_cancel',
                click: function () {
                    $(this).dialog("close");
                }
            },
            "ok": {
                text: $data.dialogButtons.save,
                type: "submit",
                'class': 'btn btn_save',
                click: function () {
                    $this = $(this);
                    if ($('#update_agent').valid()) {
                        var dataserialize = $("#update_agent").serialize();

                        $.post($data.postAction, dataserialize, function (data) {
                            var result = data.data;
                            var success = data.status;
                            if (success === 'OK') {
                                $data.row.data(result);
                                $($this).dialog('close');
                            } else {
                                $($this).dialog('close');
                            }
                        });

                    }
                }
            }
        },
        "update_dialog"
    );


    $("#Anlegitimatie").datepicker($.datepicker.regional['ro']);
    $("#DataValabilitate").datepicker($.datepicker.regional['ro']);

    $.validator.addMethod("noOnlySpace", function (value, element) {
        return value !== "" && ($.trim(value)).length != 0;
    });
    //$.validator.addMethod("checkExist", function (value, element) {
    //    var exists = true;
    //    $.each($data.datas, function (index, obj) {
    //        value = $.trim(value);
    //        if (value.toLowerCase() === obj.Name.toLowerCase() && value.toLowerCase() !== $data.data.Name.toLowerCase()) {
    //            $('.checked').remove();
    //            exists = false;
    //            return;
    //        }
    //    });
    //    if (exists && $('.checked').length === 0) {
    //        $(element).after('<i class="fa fa-check checked" aria-hidden="true"></i>');
    //    }
    //    return exists;
    //});

    $("[name='Activ']").bootstrapSwitch({
        state: $data.data.Activ,
        size: 'mini',
        onColor: 'success',
        onText: $data.active.on,
        offText: $data.active.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                return;
            }
            $(this).attr("value", 'false');
        }
    });


    $("#update_agent")
        .validate({
            rules: {
                Prenume: {
                    required: true,
                    noOnlySpace: true,
                    //checkExist: true,
                    maxlength: 50
                },
                Marca: {
                    required: true,
                    noOnlySpace: true,
                    //checkExist: true,
                    maxlength: 50
                },
                Nume: {
                    required: true,
                    noOnlySpace: true,
                    //checkExist: true,
                    maxlength: 50
                }
            },
            messages: {
                Nume: {
                    required: $data.validateMessage.Name,
                    noOnlySpace: $data.validateMessage.Name,
                    //checkExist: $data.validateMessage.ValidateAgentNameExist,
                    maxlength: $data.validateMessage.ValidateMaxLength
                },
                Prenume: {
                    required: $data.validateMessage.ValidateFirstName,
                    noOnlySpace: $data.validateMessage.Name,
                    //checkExist: $data.validateMessage.ValidateAgentNameExist,
                    maxlength: $data.validateMessage.ValidateMaxLength
                },
                Marca: {
                    required: $data.validateMessage.ValidateMark,
                    noOnlySpace: $data.validateMessage.Name,
                    //checkExist: $data.validateMessage.ValidateAgentNameExist,
                    maxlength: $data.validateMessage.ValidateMaxLength
                },
            }
        });
}

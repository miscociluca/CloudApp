function AddAgentDialog($data) {

    var form = $("<form/>",
                    {
                        id: "add_new_agent"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelMarca +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Marca" value="" class="form-control" id="Marca" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Nume" value="" class="form-control" id="Nume" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelFirstName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Prenume" value="" class="form-control" id="Prenume" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIdType +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Tiplegitimatie" value="" class="form-control" id="Tiplegitimatie" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIdNumber +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Nrlegitimatie" value="" class="form-control" id="Nrlegitimatie" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIdYear +
        "</label>" +
        '<div class="col-sm-9">' +   
        '<input type="text" name="Anlegitimatie" value="" class="form-control" id="Anlegitimatie" placeholder="_/_/___">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIdValability +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="DataValabilitate" value="" class="form-control" id="DataValabilitate" placeholder="_/_/___">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelAgencyName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="DenumireAgentie" value="" class="form-control" id="DenumireAgentie" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelAgencyBossName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="NumeSefAgentie" value="" class="form-control" id="NumeSefAgentie" placeholder="">' +
        "</div>" +
        "</div>" +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelActiv +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="Activ" id="Activ" value="False">' +
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
                    if ($('#add_new_agent').valid()) {

                        var dataserialize = $("#add_new_agent").serialize(),
                            $this = $(this);
                        var activ = $("#Activ").val();
                        dataserialize['Activ'] = activ;

                        $.post($data.postAction, dataserialize, function (data) {
                            var success = data.status;
                            var record = data.data;
                            if (success === 'OK') {

                                if (record.length==0) {
                                    $data.table.row.add(record);
                                }
                                else if (record.length >= 0) {
                                    $.each(record, function (index, value) {
                                        $data.table.row.add(value);
                                    });
                                }


                                $($this).dialog('close');
                                // system notify
                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.contentSuccess,
                                    type: 'success'
                                });
                                console.log("New agent was added");
                            } else {
                                $($this).dialog('close');
                                // system notify
                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.contentError,
                                    type: 'alert'
                                });
                            }
                        });
                    }
                }
            }
        },
        "add_agent_dialog"
    );

    $("[name='Activ']").bootstrapSwitch({
        state: false,
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


    $("#Anlegitimatie").datepicker($.datepicker.regional['ro']);
    $("#DataValabilitate").datepicker($.datepicker.regional['ro']);

    $.validator.addMethod("noOnlySpace", function (value, element) {
        return value !== "" && ($.trim(value)).length != 0;
    });
    //$.validator.addMethod("checkExist", function (value, element) {
    //    var exists = true;
    //    $.each($data.datas, function (index, obj) {
    //        value = $.trim(value);
    //        if (value.toLowerCase() === obj.Name.toLowerCase()) {
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

    $("#add_new_agent")
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

function AddAgentFromFileDialog($data) {

    var form = $("<form/>",
        {
            id: "add_new_agent_from_file"
        });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.ValidateFile +
        "</label>" +
        '<div class="col-sm-9" id="img_preview">' +
        '<span class="btn btn-default btn-file">' +
        '<i class="fa fa-cloud-upload" aria-hidden="true"></i>' +
        '<input type="file" name="Agent" id="Agent" data-error="#errorExtension" />' +
        '</span>' +
        '<div id="errorExtension"></div>' +
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
                    if ($('#add_new_agent_from_file').valid()) {

                        var dataserialize = $("#add_new_agent_from_file").serialize(),
                            $this = $(this);
                        var model = new FormData();
                        var file = document.getElementById('Agent');
                        model.append('fisier', file.files[0]);

                        $.ajax({
                            url: $data.postAction,
                            type: 'POST',
                            data: model,
                            processData: false,
                            contentType: false,
                            beforeSend: function () {
                                $.SavingPopup();
                            },
                            success: function (data) {
                                if (data.status === 'OK') {

                                    if (data.data.length == 0) {
                                        $data.table.row.addFirst($data.table, data.data, 1);
                                    }
                                    else if (data.data.length >= 0) {
                                        $.each(data.data, function (index, value) {
                                            $data.table.row.addFirst($data.table, value , 1);
                                        });
                                    }
                                   // $data.table.row.addFirst($data.table, data.data, 1);

                                    $($this).dialog('close');

                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });

                                    console.log("New agent was added");
                                } else {
                                    $($this).dialog('close');
                                    // error system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentError,
                                        type: 'alert'
                                    });
                                }
                            }
                        });


                    }
                }
            }
        },
        "add_agent_from_file_dialog"
    );
    $("#add_new_agent_from_file")
        .validate({
            rules: {
                Marca: {
                    required: true,
                    noOnlySpace: true,
                    //checkExist: true,
                    maxlength: 50
                }
            },
            messages: {
                Marca: {
                    required: $data.validateMessage.ValidateMark,
                    noOnlySpace: $data.validateMessage.Name,
                    //checkExist: $data.validateMessage.ValidateAgentNameExist,
                    maxlength: $data.validateMessage.ValidateMaxLength
                }
            }
        });

    // preview image after upload
    if (window.File && window.FileList && window.FileReader) {
        $("#Agent").on("change", function (e) {
            var files = e.target.files,
                filesLength = files.length;
            $(".pip").remove();
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    $("#img_preview").append('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

                    var file = e.target;
                    var fileExt = f.name.match(/\.(.+)$/)[1];
                    var acceptedExtension = ['csv','xls','xlsx'];//

                    if ($.inArray(fileExt, acceptedExtension) != -1) {
                        $("#img_preview").append('<div class="pip">' +
                            '<img class="imageThumb" src="../Content/DataTables/images/agent_upload.png" title="' + f.name + '" />' +
                            '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                            '</div>');
                        $(".remove").click(function () {
                            $(this).parent(".pip").remove();
                            $("#Agent").val("");
                        });
                        if ($('.pip').length > 0) {
                            $('.loading_img').remove();
                        };
                        return;
                    }
                    $('.loading_img').remove();
                });
                fileReader.readAsDataURL(f);
            }
        });
    }
}

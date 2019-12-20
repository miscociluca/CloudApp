function UpdateGroupDialog($data) {
    var $id = $data.data.Id;
    var $name = $data.data.Name;

    var form = $("<form/>",
                    {
                        id: "update_group"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<div class="col-sm-4">' +
        '<input type="hidden" name="Id" class="form-control" id="Id" value="' + $id + '" placeholder="">' +
        "</div>" +
        "</div>" +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="' + $name + '" class="form-control" id="Name" placeholder="">' +
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
                    if ($('#update_group').valid()) {
                        var dataserialize = $("#update_group").serialize();
                        dataserialize.Name = $.trim(dataserialize.Name);

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

    $.validator.addMethod("noOnlySpace", function (value, element) {
        return value !== "" && ($.trim(value)).length != 0;
    });
    $.validator.addMethod("checkExist", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            value = $.trim(value);
            if (value.toLowerCase() === obj.Name.toLowerCase() && value.toLowerCase() !== $data.data.Name.toLowerCase()) {
                $('.checked').remove();
                exists = false;
                return;
            }
        });
        if (exists && $('.checked').length === 0) {
            $(element).after('<i class="fa fa-check checked" aria-hidden="true"></i>');
        }
        return exists;
    });
    $("#update_group")
        .validate({
            rules: {
                Name: {
                    required: true,
                    noOnlySpace: true,
                    checkExist: true,
                    maxlength: 50
                }
            },
            messages: {
                Name: {
                    required: $data.validateMessage.Name,
                    noOnlySpace: $data.validateMessage.Name,
                    checkExist: $data.validateMessage.ValidateGroupNameExist,
                    maxlength: $data.validateMessage.ValidateMaxLength
                }
            }
        });
}

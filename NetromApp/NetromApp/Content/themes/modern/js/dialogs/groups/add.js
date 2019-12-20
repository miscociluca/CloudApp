function AddGroupDialog($data) {

    var form = $("<form/>",
                    {
                        id: "add_new_group"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<div class="col-sm-4">' +
        '<input type="hidden" name="Id" class="form-control" id="Id" placeholder="">' +
        "</div>" +
        "</div>" +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="" class="form-control" id="Name" placeholder="">' +
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
                    if ($('#add_new_group').valid()) {

                        var dataserialize = $("#add_new_group").serialize(),
                        $this = $(this);
                        dataserialize.Name = $.trim(dataserialize.Name);

                        $.post($data.postAction, dataserialize, function (data) {
                            var success = data.status;
                            var record = data.data;
                            if (success === 'OK') {
                                $data.table.row.addFirst($data.table, record, 1);
                                $($this).dialog('close');
                                // system notify
                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.contentSuccess,
                                    type: 'success'
                                });
                                console.log("New group was added");
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
        "add_group_dialog"
    );

    $.validator.addMethod("noOnlySpace", function (value, element) {
        return value !== "" && ($.trim(value)).length != 0;
    });
    $.validator.addMethod("checkExist", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            value = $.trim(value);
            if (value.toLowerCase() === obj.Name.toLowerCase()) {
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

    $("#add_new_group")
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

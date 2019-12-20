function UpdateValueListDialog($data) {

    var checked = $data.data.IsActive ? 'checked' : '';

    var form = $("<form/>",
                    {
                        id: "update_value_list"
                    });
    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<input type="hidden" name="Id" value="' + $data.data.Id + '">' +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="" /><span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIsActive +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="IsActive" value="' + $data.data.IsActive + '" ' + checked + ' />' +
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
                    if ($('#update_value_list').valid()) {
                        var dataserialize = $("#update_value_list").serializeObject()
                        $this = $(this);

                        $.ajax({
                            url: $data.postAction,
                            type: 'post',
                            dataType: 'json',
                            data: JSON.stringify(dataserialize),
                            contentType: "application/json; charset=utf-8",
                            beforeSend: function () {
                                $.SavingPopup();
                            },
                            success: function (data) {
                                if (data.status === 'OK') {
                                    var record = data.data;
                                    $data.row.data(record).draw(false);
                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                    console.log("Value list was updated");
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
        "update_value_list_dialog"
    );

    $.validator.addMethod("uniqueName", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (value !== $data.data.Name && value === obj.Name) {
                $('.checked').remove();
                exists = false;
                return;
            }
        });

        return exists;
    });

    $.validator.addMethod("noSpace", function (value, element) {
        return $.trim(value).length != 0;
    });

    $("#update_value_list")
        .validate({
            rules: {
                Name: {
                    required: true,
                    uniqueName: true,
                    noSpace: true,
                    maxlength: 50
                }
            },
            messages: {
                Name: {
                    required: $data.validateMessage.Name,
                    uniqueName: $data.validateMessage.UniqueName,
                    noSpace: $data.validateMessage.Name,
                    maxlength: $data.validateMessage.ValidateMaxLength
                }
            }
        });

    //
    $("[name='IsActive']").bootstrapSwitch({
        state: $data.data.IsActive,
        size: 'small',
        onColor: 'success',
        onText: $data.checkboxOnOff.on,
        offText: $data.checkboxOnOff.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                return;
            }
            $(this).attr("value", 'false');
        }
    });
}

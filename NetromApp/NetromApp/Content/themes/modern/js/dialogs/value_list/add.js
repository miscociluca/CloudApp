function AddValueListDialog($data) {

    var form = $("<form/>",
                    {
                        id: "add_new_value_list"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="" class="form-control" id="Name" placeholder=""><span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIsActive +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="IsActive" checked>' +
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
                    if ($('#add_new_value_list').valid()) {

                        var $this = $(this),
                            dataserialize = $("#add_new_value_list").serializeObject();

                        $.ajax({
                            url: $data.postAction,
                            type: 'post',
                            dataType: 'json',
                            data: JSON.stringify(dataserialize),
                            contentType: "application/json; charset=utf-8",
                            beforeSend: function() {
                                $.SavingPopup();
                            },
                            success: function (data) {
                                if (data.status === 'OK') {
                                    var record = data.data;
                                    $data.table.row.add(record).draw(false);

                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });

                                    $($this).dialog('close');
                                    console.log("New value was added");
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
        "add_new_value_list_dialog"
    );

    $.validator.addMethod("uniqueName", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (value === obj.Name) {
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

    $("#add_new_value_list")
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
        state: true,
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

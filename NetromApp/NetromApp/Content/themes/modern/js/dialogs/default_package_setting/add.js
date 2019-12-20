function AddPackageDefaultSettingDialog($data) {
    var form = $("<form/>",
                    {
                        id: "add_setting"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        // Name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="" class="form-control" id="Name" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // Description
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDescription +
        "</label>" +
        '<div class="col-sm-9">' +
        '<textarea name="Description"></textarea>' +
        "</div>" +
        "</div>" +
        // Type
        '<div class="form-group" id="type_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelType +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select id="settingType" name="ValueType"><option></option></select>' +
        '<span class="mandatory_field_list">*</span>' +
        '<input id="settingTypeValue" type="hidden" value="true" />' +
        "</div>" +
        "</div>" +
        // Is visible
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelVisible +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="IsVisible" id="IsVisible" value="false">' +
        "</div>" +
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

                    if ($('#add_setting').valid()) {
                        var inputs = $("#add_setting");
                        var dataserialize = inputs.serialize();

                        $.ajax({
                            url: $data.postAction,
                            type: 'POST',
                            data: dataserialize,
                            beforeSend: function () {
                                $.SavingPopup();
                            },
                            success: function (data) {
                                var success = data.status;
                                var record = data.data;
                                if (success === 'OK') {
                                    $data.table.row.add(record).draw(false);
                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                    console.log("New setting was added");
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
        "add_setting_dialog"
    );

    // GET setting type list
    $.ajax({
        url: $data.getSettingType,
        type: "GET",
        beforeSend: function () {
            //$this.after('<i class="fa fa-cog fa-spin fa-2x fa-fw" id="mini_loader"></i>');
        },
        complete: function () {
            //$('#mini_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    $("#settingType").append(
                        $("<option></option>")
                        .text(item.Name)
                        .val(item.Id)
                    );
                });
            }
        }
    });

    // show input by type
    $("#settingType").on("change", function (e) {
        var field, value, typeGroup;

        value = $(this).val();
        typeGroup = $('#type_group');

        $('#value_type_group').remove();
        switch (value) {
            case '0': // String
                field = '<input type="text" name="DefaultValue" />';
                break;
            case '1': // Integer
                field = '<input type="text" name="DefaultValue" />';
                break;
            case '2': // Float
                field = '<input type="text" name="DefaultValue" id="DateValue" />';
                break;
            case '3': // DateTime
                field = '<input type="text" name="DefaultValue" />';
                break;
            case '4': // Boolean
				field = '<input type="checkbox" name="DefaultValue" id="BoolValue" value="false" checked="checked">';
                break;
            default: // empty
                $('#value_type_group').remove();
                break;
        }

        if (!$.isEmpty(field)) {
            var template = '<div class="form-group" id="value_type_group">' +
            '<label class="col-sm-3 control-label">' +
            $data.label.LabelValue +
            "</label>" +
            '<div class="col-sm-9">' +
            field +
            '<span class="mandatory_field_list">*</span>' +
            "</div>" +
            "</div>";
            typeGroup.after(template);

            $("#DateValue").datepicker($.datepicker.regional[$currentCulture]);

			$("#BoolValue").bootstrapSwitch({
                state: false,
                size: 'mini',
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
    });

    $("#add_setting")
        .validate({
            rules: {
                Name: {
                    required: true,
                    maxlength: 50
                },
                ValueType: {
                    required: true
                },
                DefaultValue: {
                    required: true
                }
            },
            messages: {
                Name: {
                    required: $data.validateMessage.Name,
                    maxlength: $data.validateMessage.ValidateMaxLength
                },
                ValueType: {
                    required: $data.validateMessage.Type
                },
                DefaultValue: {
                    required: $data.validateMessage.Value
                }
            }
        });

    $("[name='IsVisible']").bootstrapSwitch({
        state: false,
        size: 'mini',
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
function UpdatePackageDefaultSettingDialog($data) {

    var $IsVisibleChecked = $data.data.IsVisible ? "checked" : "",
        $description = !$.isEmpty($data.data.Description) ? $data.data.Description : "";

    var form = $("<form/>",
                    {
                        id: "update_package_default_setting"
                    });

    var fieldset = "" +
        '<input type="hidden" name="Id" value="' + $data.data.Id + '">' +
        '<div class="form_block form-horizontal">' +
        // Name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // Description
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDescription +
        "</label>" +
        '<div class="col-sm-9">' +
        '<textarea name="Description">' + $description + '</textarea>' +
        "</div>" +
        "</div>" +
         //Type
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
        '<input type="checkbox" name="IsVisible" id="IsVisible" value="' + $data.data.IsVisible + '" ' + $IsVisibleChecked + '>' +
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

                    if ($('#update_package_default_setting').valid()) {
                        var inputs = $("#update_package_default_setting");
                        var dataserialize = inputs.serializeObject();
                        if ($("#BoolValue").attr('type') === 'checkbox') {
                            dataserialize.DefaultValue = $("#BoolValue:checked").length > 0 ? true : false;
                        }

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
                                    $data.row.data(record);
                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                    console.log("Component settings was updated");
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
        "update_package_default_setting_dialog"
    );

    //GET setting type list
    $.ajax({
        url: $data.getSettingType,
        type: "GET",
        beforeSend: function () {
            $('#settingType').after('<i class="fa fa-cog fa-spin fa-2x fa-fw" id="mini_loader"></i>');
        },
        complete: function () {
            $('#mini_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    var selected = $data.data.ValueType === item.Id ? "selected" : "";

                    $("#settingType").append('<option value="' + item.Id + '" ' + selected + '>' + item.Name + '</option>');
                });
            }
        }
    });

    var showControlByType = function (type, $data, isChanged) {
        var field,
            typeGroup = $('#type_group'),
            value = $data.data.DefaultValue;

        type = $.isNumeric(type) ? type.toString() : type;

        if (isChanged) {
            value = "";
        }

        $('#value_type_group').remove();
        switch (type) {
            case '0': // String
                field = '<input type="text" name="DefaultValue" value="' + value + '" />';
                break;
            case '1': // Integer
                field = '<input type="text" name="DefaultValue" value="' + value + '" />';
                break;
            case '2': // DateTime
                field = '<input type="text" name="DefaultValue" id="DateValue" value="' + value + '" />';
                break;
            case '3': // Float
                field = '<input type="text" name="DefaultValue" value="' + value + '" />';
                break;
            case '4': // Boolean
				var valueChecked = $data.data.DefaultValue === 'true' ? 'checked' : '';
                field = '<input type="checkbox" name="DefaultValue" id="BoolValue" ' + valueChecked + ' />';
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
				state: value === 'true' ? true : false,
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
    };

    // show input by type
    $("#settingType").on("change", function (e) {
        var type = $(this).val();
        showControlByType(type, $data, true);
    });
    showControlByType($data.data.ValueType, $data);

    $("#update_package_default_setting")
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
                    required: function () {
                        if ($data.data.ValueType == 4) {
                            return false;
                        }
                        return true;
                    }
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
        state: $data.data.IsVisible,
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
function UpdateValueListItemDialog($data) {

    // $currentCulture is set in _Layout header
    var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var form = $("<form/>",
                    {
                        id: "update_value_list_item"
                    });
    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group" id="input_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelText +
        "</label>" +
        '<div class="col-sm-9">';
    for (var i = 0; i < lang.length; i++) {
        var culture = lang[i].capitalize();
        var first_field_id = i === 0 ? 'firstFieldName' : '';
        var placeholder = culture === 'Ro' ? $data.label.LabelTextRo : $data.label.LabelTextEn;
        var value = !$.isEmpty($data.data.LanguageResource) && culture === 'Ro' ? $data.data.LanguageResource.Ro : $data.data.LanguageResource.En;
        // Language resource ro
        fieldset += '<input type="text" name="Text' + culture + '" class="form-control" id="' + first_field_id + '" placeholder="' + placeholder + '" value="' + $.nullToEmptyString(value) + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
        fieldset += i == 0 ? '<span class="mandatory_field">*</span>' : '';
    }
    fieldset += '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelValue +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="ValueId" class="form-control" id="ValueId" value="' + $data.data.ValueId + '" placeholder=""><span class="mandatory_field">*</span>' +
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
                    if ($('#update_value_list_item').valid()) {
                        $this = $(this);

                        var valueText, dataserialize, newObj;
                        dataserialize = $("#update_value_list_item").serializeObject();
                        valueText = $currentCulture === 'ro' ? dataserialize.TextRo : dataserialize.TextEn;

                        newObj = {
                            Id: $data.data.Id,
                            ValueText: valueText,
                            ValueId: dataserialize.ValueId,
                            LanguageResource: {
                                Id: $data.data.ValueTextResId,
                                Ro: dataserialize.TextRo,
                                En: dataserialize.TextEn
                            },
                            ValueTextResId: $data.data.ValueTextResId,
                            ValueListId: $data.valueListId
                        };

                        $.ajax({
                            url: $data.postAction,
                            type: 'post',
                            dataType: 'json',
                            data: JSON.stringify(newObj),
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
                                    console.log("Value was updated");
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

    $.validator.addMethod("uniqueNameRo", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (value !== $data.data.LanguageResource.Ro && value === obj.LanguageResource.Ro) {
                $('.checked').remove();
                exists = false;
                return;
            }
        });

        return exists;
    });

    $.validator.addMethod("uniqueNameEn", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (value !== $data.data.LanguageResource.En && value === obj.LanguageResource.En) {
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

    // validate
    if ($currentCulture === 'ro') {
        $("#update_value_list_item")
            .validate({
                rules: {
                    TextRo: {
                        required: true,
                        uniqueNameRo: true,
                        noSpace: true,
                        maxlength: 50
                    },
                    ValueId: {
                        required: true
                    }
                },
                messages: {
                    TextRo: {
                        required: $data.validateMessage.Text,
                        uniqueNameRo: $data.validateMessage.UniqueName,
                        noSpace: $data.validateMessage.Text,
                        maxlength: $data.validateMessage.ValidateMaxLength

                    },
                    ValueId: {
                        required: $data.validateMessage.Value
                    }
                }
            });
    }
    else {
        $("#update_value_list_item")
            .validate({
                rules: {
                    TextEn: {
                        required: true,
                        uniqueNameRo: true,
                        noSpace: true
                    },
                    ValueId: {
                        required: true
                    }
                },
                messages: {
                    TextEn: {
                        required: $data.validateMessage.Text,
                        uniqueNameEn: $data.validateMessage.UniqueName,
                        noSpace: $data.validateMessage.Text
                    },
                    ValueId: {
                        required: $data.validateMessage.Value
                    }
                }
            });
    }
}

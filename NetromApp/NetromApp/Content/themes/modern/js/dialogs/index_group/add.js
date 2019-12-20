function AddIndexGroupDialog($data) {

    // $currentCulture is set in _Layout header
    var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    var $position = ++$data.datas.length;

    var form = $("<form/>",
                    {
                        id: "add_new_group"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        // Name language resource ro
        '<div class="form-group" id="input_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">';
        for (var i = 0; i < lang.length; i++) {
            var culture = lang[i].capitalize();
            var label = $data.label.LabelNameEn;
            if (culture === 'Ro') {
                var label = $data.label.LabelNameRo;
            }

            fieldset += '<input type="text" name="Name' + culture + '" class="form-control" id="DisplayName' + culture + '" placeholder="' + label + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
            fieldset += i == 1 ? '<span class="mandatory_field">*</span>' : '';
        }
        fieldset += '</div>' +
        "</div>" +
        // Position
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelPosition +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Position" class="form-control" id="Position" value="' + $position + '" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
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

                        var dataserialize = $("#add_new_group").serializeObject(),
                        $this = $(this);
                        dataserialize['Name'] = $currentCulture === 'ro' ? dataserialize.NameRo : dataserialize.NameEn;

                        dataserialize['NameLanguageResource'] = {
                            Ro: dataserialize.NameRo,
                            En: dataserialize.NameEn
                        };

                        dataserialize['DocumentTypeId'] = $data.documentTypeId

                        $.ajax({
                            url: $data.postAction,
                            type: 'post',
                            dataType: 'json',
                            beforeSend: function () {},
                            complete: function () {},
                            data: JSON.stringify(dataserialize),
                            contentType: "application/json; charset=utf-8",
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
                                    console.log("New index group was added");
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
        "add_group_dialog"
    );

    $.validator.addMethod("noOnlySpace", function (value, element) {
        return value !== "" && ($.trim(value)).length != 0;
    });
	$.validator.addMethod("checkExistRo", function (value, element) {
		var exists = true;

		$.each($data.datas, function (index, obj) {
			if (!$.isEmpty(obj.NameLanguageResource)) {
				value = $.trim(value);
				if (value.toLowerCase() === obj.NameLanguageResource.Ro.toLowerCase()) {
					exists = false;
					return;
				}
			}
		});

		return exists;
	});
	$.validator.addMethod("checkExistEn", function (value, element) {
		var exists = true;
		$.each($data.datas, function (index, obj) {
			if (!$.isEmpty(obj.NameLanguageResource)) {
				value = $.trim(value);
				if (value.toLowerCase() === obj.NameLanguageResource.En.toLowerCase()) {
					exists = false;
					return;
				}
			}
		});

		return exists;
	});

    $("#add_new_group")
        .validate({
			rules: {
				NameRo: {
					required: true,
					noOnlySpace: true,
					maxlength: 50,
					checkExistRo: true
				},
				NameEn: {
					required: true,
					noOnlySpace: true,
					maxlength: 50,
					checkExistEn: true
				}
			},
			messages: {
				NameRo: {
					required: $data.validateMessage.Name,
					noOnlySpace: $data.validateMessage.Name,
					maxlength: $data.validateMessage.ValidateMaxLength,
					checkExistRo: $data.validateMessage.ValidateGroupNameExist
				},
				NameEn: {
					required: $data.validateMessage.Name,
					noOnlySpace: $data.validateMessage.Name,
					maxlength: $data.validateMessage.ValidateMaxLength,
					checkExistEn: $data.validateMessage.ValidateGroupNameExist
				}
			}
        });
}

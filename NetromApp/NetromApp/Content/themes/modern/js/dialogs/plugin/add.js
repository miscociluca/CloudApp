function AddPluginDialog($data) {

	var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

    var form = $("<form/>",
                    {
                        id: "add_new_plugin"
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
				label = $data.label.LabelNameRo;
			}
			
			fieldset += '<input type="text" name="Name' + culture + '" class="form-control" id="DisplayName' + culture + '" placeholder="' + label + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
			fieldset += i == 1 ? '<span class="mandatory_field">*</span>' : '';
		}
		fieldset += '</div>' +
		"</div>" +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelInterfaceName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="PluginInterface" value="" class="form-control" id="PluginInterface" placeholder=""><span class="mandatory_field">*</span>' +
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
                    if ($('#add_new_plugin').valid()) {
                        $this = $(this);

						var dataserialize = $("#add_new_plugin").serializeObject();
						dataserialize['NameLanguageResource'] = {
							Ro: dataserialize.NameRo,
							En: dataserialize.NameEn
						};

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
                                    $data.table.row.add(record).draw(false);
                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                    console.log("New plugin was added");
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
        "add_new_plugin_dialog"
    );

    $.validator.addMethod("uniqueInterface", function (value, element) {
        var exists = true;
		$.each($data.datas, function (index, obj) {
			if (value === obj.PluginInterface) {
                $('.checked').remove();
                exists = false;
                return;
            }
        });

        return exists;
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

    $("#add_new_plugin")
        .validate({
            rules: {
				NameRo: {
					required: true,
					maxlength: 50,
					checkExistRo: true
				},
				NameEn: {
					required: true,
					maxlength: 50,
					checkExistEn: true
				},
                PluginInterface: {
					required: true,
					uniqueInterface: true
                }
            },
            messages: {
                Name: {
					required: $data.validateMessage.Name,
					maxlength: $data.validateMessage.ValidateMaxLength,
					checkExistRo: $data.validateMessage.ValidateGroupNameExist
                },
                PluginInterface: {
					required: $data.validateMessage.InterfaceName,
					uniqueInterface: $data.validateMessage.UniqueName,
                }
            }
        });
}

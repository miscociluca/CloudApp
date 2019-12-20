function UpdateAnnexDialog($data) {
	console.log($data.data.NameLanguageResource)
	var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
    var checked = $data.data.IsRequired ? 'checked' : '';
    var form = $("<form/>",
                    {
                        id: "update_annex"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
		// Name language resource ro
		'<div class="form-group" id="input_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelName +
		"</label>" +
		'<div class="col-sm-9">'+
        '<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="" /><span class="mandatory_field">*</span>'; 
	    fieldset += '</div>' +
		"</div>" +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIsRequired +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" id="IsRequired" name="IsRequired" value="' + $data.data.IsRequired + '" ' + checked + ' />' +
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
                    if ($('#update_annex').valid()) {
                        $this = $(this);
                        var isRequired = false;
                        if ($("input[type=checkbox][name=IsRequired]:checked").val()) {
                            isRequired = true;
                        }
                        var dataserialize = $("#update_annex").serializeObject();
                        dataserialize['Id'] = $data.data.Id;
                        dataserialize['LastUpdated'] = new Date().toLocaleString();
                        dataserialize['IsRequired'] = isRequired;
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
                                    $data.row.data(record);
                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                    console.log("New annex was added");
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
        "update_annex_dialog"
    );



    $.validator.addMethod("noSpace", function (value, element) {
        return $.trim(value).length != 0;
    });

    $("#update_annex")
        .validate({
            rules: {
                Name: {
                    required: true,
                    noSpace: true,
                    maxlength: 50
                }
            },
            messages: {
                Name: {
                    required: $data.validateMessage.ValidateName,
                    noSpace: $data.validateMessage.ValidateName,
                    maxlength: $data.validateMessage.ValidateMaxLength
                }
            }
        });

}

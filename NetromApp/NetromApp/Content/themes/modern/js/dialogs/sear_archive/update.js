function UpdateArchiveDialog($data) {

    var form = $("<form/>",
                    {
						id: "update_seal_archive"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<div class="col-sm-4">' +
		'<input type="hidden" name="Id" class="form-control" id="Id" value="' + $data.data.Id + '" placeholder="">' +
        "</div>" +
        "</div>" +

		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelArchiveName +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="ArchiveName" class="form-control" id="ArchiveName" value="' + $data.data.ArchiveName + '" placeholder="">' +
		"</div>" +
		"</div>" +

		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelDisplayName +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="DisplayName" class="form-control" id="DisplayName" value="' + $data.data.DisplayName + '" placeholder="">' +
		"</div>" +
		"</div>" +

		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelURL +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="URL" class="form-control" value="' + $data.data.URL + '" id="URL" placeholder="">' +
		"</div>" +
		"</div>" +

		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelUsername +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="Username" class="form-control" id="Username" value="' + $data.data.Username + '" placeholder="">' +
		"</div>" +
		"</div>" +

		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelPassword +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="password" name="Password" class="form-control" id="Password" placeholder="">' +
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
					if ($('#update_seal_archive').valid()) {
						var dataserialize = $("#update_seal_archive").serialize(),
							$this = $(this);

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
        "update_seal_archive_dialog"
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

	$("#update_seal_archive")
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

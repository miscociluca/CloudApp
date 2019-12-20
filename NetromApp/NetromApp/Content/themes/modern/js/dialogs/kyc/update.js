function UpdateKYCDialog($data) {

	var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	var $position = !$.isEmpty($data.data.Position) ? $data.data.Position : '';

	var form = $("<form/>",
		{
			id: "update_kyc_field"
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
		var value = $data.data.Name.En;
		if (culture === 'Ro') {
			value = $data.data.Name.Ro;
		}

		fieldset += '<input type="text" name="Name' + culture + '" class="form-control" id="Name' + culture + '" value="' + $.nullToEmptyString(value) + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
		fieldset += i == 1 ? '<span class="mandatory_field">*</span>' : '';
	}
	fieldset += '</div>' +
		"</div>" +

		// Message language resource ro
		'<div class="form-group" id="input_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelMessage +
		"</label>" +
		'<div class="col-sm-9">';
	for (var i = 0; i < lang.length; i++) {
		var culture = lang[i].capitalize();
		var value = $data.data.Message.En;
		if (culture === 'Ro') {
			value = $data.data.Message.Ro;
		}

		fieldset += '<input type="text" name="Message' + culture + '" class="form-control" id="Message' + culture + '" value="' + $.nullToEmptyString(value) + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
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
		// type
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelType +
		"</label>" +
		'<div class="col-sm-9">' +
		'<select id="typeListSelect" name="Type"><option></option></select>' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
        "</div>" +

        // package type
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelPackageType +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select id="packageTypeSelect" name="PackageTypeId"><option></option></select>' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // packages
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelPackage +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select id="packageSelect" name="PackageId"><option></option></select>' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // package components
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelPackageComponent +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select id="packageComponentSelect" name="PackageComponentId"><option></option></select>' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        "</div>"+

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
					if ($('#update_kyc_field').valid()) {

						var dataserialize = $("#update_kyc_field").serializeObject(),
							$this = $(this);
                        var pos = $('#Position').val();
						dataserialize['Id'] = $data.data.Id;
						dataserialize['NameResId'] = $data.data.NameResId;
                        dataserialize['MessageResId'] = $data.data.MessageResId;
                        dataserialize['Position'] = pos;
                        dataserialize['PackageComponentId'] = $('#packageComponentSelect').val();
                        dataserialize['PackageId'] = $('#packageSelect').val();
                        dataserialize['PackageTypeId'] = $('#packageTypeSelect').val();

						dataserialize['Name'] = {
							Id: $data.data.NameResId,
							Ro: dataserialize.NameRo,
							En: dataserialize.NameEn
						};

						dataserialize['Message'] = {
							Id: $data.data.MessageResId,
							Ro: dataserialize.MessageRo,
							En: dataserialize.MessageEn
						};

						$.post($data.postAction, dataserialize, function (data) {
							var success = data.status;
							var record = data.data;
							if (success === 'OK') {
								$data.row.data(record);

								$($this).dialog('close');
								// system notify
								$.Notify({
									caption: $data.notify.title,
									content: $data.notify.contentSuccess,
									type: 'success'
								});
								console.log("New field was added");
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
		"update_kyc_field_dialog"
	);
    // GET groups list
    $.ajax({
        url: $data.getFieldType,
        type: "GET",
        beforeSend: function () {
            $('#typeListSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
        },
        complete: function () {
            $('#mini_group_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    var selected = !$.isEmpty($data.data.Type) && item.Value === $data.data.Type ? 'selected' : '';
                    $("#typeListSelect").append('<option value="' + item.Value + '" ' + selected + '>' + item.Key + '</option>');
                });
            }
        }
    });
    // GET packagetype
    $.ajax({
        url: $data.getPackageType,
        type: "GET",
        beforeSend: function () {
            $('#packageTypeSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
        },
        complete: function () {
            $('#mini_group_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    var selected = !$.isEmpty($data.data.PackageTypeId) && item.Id === $data.data.PackageTypeId ? 'selected' : '';
                    $("#packageTypeSelect").append('<option value="' + item.Id + '" ' + selected + '>' + item.Name + '</option>');
                });
            }
        }
    });
    // GET package
    $.ajax({
        url: $data.getPackage + '/' + $data.data.PackageTypeId,
        type: "GET",
        beforeSend: function () {
            $('#packageSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
        },
        complete: function () {
            $('#mini_group_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    var selected = !$.isEmpty($data.data.PackageId) && item.Id === $data.data.PackageId ? 'selected' : '';
                    $("#packageSelect").append('<option value="' + item.Id + '" ' + selected + '>' + item.Name + '</option>');
                });
            }
        }
    });

    // GET package component
    $.ajax({
        url: $data.getPackageComponent + '/' + $data.data.PackageId,
        type: "GET",
        beforeSend: function () {
            $('#packageComponentSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
        },
        complete: function () {
            $('#mini_group_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    var selected = !$.isEmpty($data.data.PackageComponentId) && item.Id === $data.data.PackageComponentId ? 'selected' : '';
                    $("#packageComponentSelect").append('<option value="' + item.Id + '" ' + selected + '>' + item.Name + '</option>');
                });
            }
        }
    });


    // package type value change
    $("#packageTypeSelect").change(function () {
        var packageTypeId = $("#packageTypeSelect").val();
        $('#packageSelect').find('option:not(:first)').remove();
        $('#packageComponentSelect').find('option:not(:first)').remove();

        // GET packagetype
        $.ajax({
            url: $data.getPackage + '/' + packageTypeId,
            type: "GET",
            beforeSend: function () {
                $('#packageSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
            },
            complete: function () {
                $('#mini_group_loader').remove();
            },
            success: function (data) {
                if (data.status === "OK") {
                    $.each(data.data, function (index, item) {
                        $("#packageSelect").append(
                            $("<option></option>")
                                .text(item.Name)
                                .val(item.Id)
                        );
                    });
                }
            }
        });
    });
    //for key like tab and arrows use
    $("#packageTypeSelect").keydown(function (e) {
        var code = e.keyCode || e.which;
        if (code === 9) {
            var packageTypeId = $("#packageTypeSelect").val();
            $('#packageSelect').find('option:not(:first)').remove();
            $('#packageComponentSelect').find('option:not(:first)').remove();

            // GET packagetype
            $.ajax({
                url: $data.getPackage + '/' + packageTypeId,
                type: "GET",
                beforeSend: function () {
                    $('#packageSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
                },
                complete: function () {
                    $('#mini_group_loader').remove();
                },
                success: function (data) {
                    if (data.status === "OK") {
                        $.each(data.data, function (index, item) {
                            $("#packageSelect").append(
                                $("<option></option>")
                                    .text(item.Name)
                                    .val(item.Id)
                            );
                        });
                    }
                }
            });
        }
    });


    // package value change
    $("#packageSelect").change(function () {
        var packageId = $(this).find(":selected").val();
        $('#packageComponentSelect').find('option:not(:first)').remove();

        // GET packagetype
        $.ajax({
            url: $data.getPackageComponent + '/' + packageId,
            type: "GET",
            beforeSend: function () {
                $('#packageComponentSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
            },
            complete: function () {
                $('#mini_group_loader').remove();
            },
            success: function (data) {
                if (data.status === "OK") {
                    $.each(data.data, function (index, item) {
                        $("#packageComponentSelect").append(
                            $("<option></option>")
                                .text(item.Name)
                                .val(item.Id)
                        );
                    });
                }
            }
        });
    });




	$("#update_kyc_field")
		.validate({
			rules: {
				Name: {
					required: true,
				},
				Message: {
					required: true,
				}
			},
			messages: {
				Name: {
					required: $data.validateMessage.Name,
				},
				Message: {
					required: $data.validateMessage.Message,
				}
			}
		});
}

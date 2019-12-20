function AddKYCDialog($data) {

	var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
	var $lastField = $data.datas.reverse()[0];
	var $positionField = !$.isEmpty($lastField) ? $lastField.Position : 0;
	var $position = ++$positionField;

	var form = $("<form/>",
		{
			id: "add_kyc_field"
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
		fieldset += '<input type="text" name="Name' + culture + '" class="form-control" id="Name' + culture + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
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
		fieldset += '<input type="text" name="Message' + culture + '" class="form-control" id="Message' + culture + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
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
		'<input type="text" name="Position" class="form-control" value="' + $position + '" id="Position" placeholder="">' +
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
		'<select id="packageTypeSelect" name="packageType"><option></option></select>' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
		"</div>" +
		// packages
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelPackage +
		"</label>" +
		'<div class="col-sm-9">' +
		'<select id="packageSelect" name="package"><option></option></select>' +
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
					if ($('#add_kyc_field').valid()) {

						var dataserialize = $("#add_kyc_field").serializeObject();
						var $this = $(this);

						dataserialize['PackageComponentId'] = $('#packageComponentSelect').val();
                        dataserialize['PackageId'] = $('#packageSelect').val();
                        dataserialize['PackageTypeId'] = $('#packageTypeSelect').val();

						dataserialize['Name'] = {
							Ro: dataserialize.NameRo,
							En: dataserialize.NameEn
						};

						dataserialize['Message'] = {
							Ro: dataserialize.MessageRo,
							En: dataserialize.MessageEn
						};

						$.post($data.postAction, dataserialize, function (data) {
							var success = data.status;
							var record = data.data;
							if (success === 'OK') {
								$data.table.row.addFirst($data.table, record, 1);
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
		"add_kyc_field_dialog"
	);

	// GET type list
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
					$("#typeListSelect").append(
						$("<option></option>")
							.text(item.Key)
							.val(item.Value)
					);
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
					$("#packageTypeSelect").append(
						$("<option></option>")
							.text(item.Name)
							.val(item.Id)
					);
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

	$("#add_kyc_field")
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

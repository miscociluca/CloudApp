function UpdatePackageSettingDialog($data) {
	var $IsVisibleChecked = $data.data.IsVisible ? "checked" : "",
		$description = !$.isEmpty($data.data.Description) ? $data.data.Description : "";

	var form = $("<form/>",
		{
			id: "update_package_setting"
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
		'<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="" disabled>' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
		"</div>" +
		// Description
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelDescription +
		"</label>" +
		'<div class="col-sm-9">' +
		'<textarea name="Description" disabled>' + $description + '</textarea>' +
		"</div>" +
		"</div>" +
		//Type
		'<div class="form-group" id="type_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelType +
		"</label>" +
		'<div class="col-sm-9">' +
		'<select id="settingType" name="ValueType" disabled><option></option></select>' +
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
			"ok": {
				text: $data.dialogButtons.save,
				type: "submit",
				'class': 'btn btn_save',
				click: function () {
					$this = $(this);

					if ($('#update_package_setting').valid()) {
						var inputs = $("#update_package_setting");
						var dataserialize = inputs.serializeObject();

						dataserialize['IdPackage'] = $data.data.IdPackage;
						dataserialize['Name'] = $data.data.Name;
						dataserialize['Description'] = $data.data.Name;
						dataserialize['ValueBool'] = $("#ValueBool").val();

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
									console.log("plugin settings was updated");
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
			},
			"close": {
				text: $data.dialogButtons.cancel,
				'class': 'btn btn_cancel',
				click: function () {
					$(this).dialog("close");
				}
			}
		},
		"update_package_setting_dialog"
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
					var selected = "";

					if (!$.isEmpty($data.data.ValueString) && item.Id == 0 ||
						!$.isEmpty($data.data.ValueInt) && item.Id == 1 ||
						!$.isEmpty($data.data.ValueDate) && item.Id == 2 ||
						!$.isEmpty($data.data.ValueFloat) && item.Id == 3 ||
						!$.isEmpty($data.data.ValueBool) && item.Id == 4) {
						selected = "selected";
					}

					$("#settingType").append('<option value="' + item.Id + '" ' + selected + '>' + item.Name + '</option>');
				});
			}
		}
	});

	var showControlByType = function (type, $data, isChanged) {
		var field,
			typeGroup = $('#type_group'),
			value = "";

		$('#value_type_group').remove();

		if (!$.isEmpty(type)) {
			switch (type) {
				case '0': // String
					field = '<input type="text" name="ValueString" value="' + value + '" />';
					break;
				case '1': // Integer
					field = '<input type="text" name="ValueInt" value="' + value + '" />';
					break;
				case '2': // DateTime
					field = '<input type="text" name="ValueDate" id="ValueDate" value="' + value + '" />';
					break;
				case '3': // Float
					field = '<input type="text" name="ValueFloat" value="' + value + '" />';
					break;
				case '4': // Boolean
					field = '<input type="checkbox" name="ValueBool" id="ValueBool" value="' + value + '" checked />';
					break;
				default: // empty
					$('#value_type_group').remove();
					break;
			}
		} else {
			if (!$.isEmpty($data.data.ValueString)) {
				// String
				value = $.isEmpty(type) ? $data.data.ValueString : value;
				field = '<input type="text" name="ValueString" value="' + value + '" />';
			} else if (!$.isEmpty($data.data.ValueInt)) {
				// Integer
				value = $.isEmpty(type) ? $data.data.ValueInt : value;
				field = '<input type="text" name="ValueInt" value="' + value + '" />';
			} else if (!$.isEmpty($data.data.ValueDate)) {
				// DateTime

				value = $.isEmpty(type) ? $data.data.ValueDate : value;
				field = '<input type="text" name="ValueDate" id="ValueDate" value="' + value + '" />';
			} else if (!$.isEmpty($data.data.ValueFloat)) {
				// Float
				value = $.isEmpty(type) ? $data.data.ValueFloat : value;
				field = '<input type="text" name="ValueFloat" value="' + value + '" />';
			} else if (!$.isEmpty($data.data.ValueBool)) {
				// Boolean
				value = $.isEmpty(type) ? $data.data.ValueBool : value;
				field = '<input type="checkbox" name="ValueBool" id="ValueBool" value="' + value + '" checked />';
			} else {
				$('#value_type_group').remove();
			}
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

			$("#ValueDate").datepicker($.datepicker.regional[$currentCulture]);

			$("#ValueBool").bootstrapSwitch({
				state: value,
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

	showControlByType(null, $data);

	$("#update_package_setting")
		.validate({
			rules: {
				Name: {
					required: true,
					maxlength: 50
				},
				ValueString: {
					required: true,
				},
				ValueInt: {
					required: true,
					number: true
				},
				ValueDate: {
					required: true,

				},
				ValueFloat: {
					required: true,
					number: true
				},
				ValueType: {
					required: true
				}
			},
			messages: {
				Name: {
					required: $data.validateMessage.Name,
					maxlength: $data.validateMessage.ValidateMaxLength
				},
				ValueString: {
					required: $data.validateMessage.Value
				},
				ValueInt: {
					required: $data.validateMessage.Value,
					number: $data.validateMessage.Number
				},
				ValueFloat: {
					required: $data.validateMessage.Value,
					number: $data.validateMessage.Number
				},
				ValueDate: {
					required: $data.validateMessage.Value
				},
				ValueType: {
					required: $data.validateMessage.Type
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
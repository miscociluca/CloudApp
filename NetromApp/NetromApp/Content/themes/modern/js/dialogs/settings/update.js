filesList = [];
function UpdateSettingDialog($data) {
	var description = !$.isEmpty($data.data.Description) ? $data.data.Description : '',
		$HasFileChecked = $data.data.HasFile ? 'checked' : '',
		$IsVisibleChecked = $data.data.IsVisible ? 'checked' : '',
		$IsSystemChecked = $data.data.IsSystem ? 'checked' : '',
		$disabled = $data.data.IsSystem ? 'disabled' : '',

		$FileRequiredChecked = $data.data.FileRequired ? 'checked' : '';
	
	var form = $("<form/>",
		{
			id: "update_system_setting"
		});

	var fieldset = "" +
		'<div class="form_block form-horizontal">' +
		// Name
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelName +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="" ' + $disabled + '>' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
		"</div>" +
		// Description
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelDescription +
		"</label>" +
		'<div class="col-sm-9">' +
		'<textarea name="Description">' + description + '</textarea>' +
		"</div>" +
		"</div>" +
		//Type
		'<div class="form-group" id="type_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelType +
		"</label>" +
		'<div class="col-sm-9">' +
        '<select id="settingType" name="settingType" '+$disabled +'><option></option></select>' +
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
		// Is System
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelIsSystem +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="checkbox" name="IsSystem" id="IsSystem" value="' + $data.data.IsSystem + '" ' + $IsSystemChecked + ' ' + $disabled + '>' +
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

					if ($('#update_system_setting').valid()) {
						var inputs = $("#update_system_setting"),
							valueFileTile = $("#settingType").val(),
							dataserialize = inputs.serializeObject(),
							model = new FormData();


						model.append('Id', $data.data.Id);
						model.append('Name', dataserialize.Name);
						model.append('Description', dataserialize.Description);
						model.append('ValueString', !$.isEmpty(dataserialize.ValueString) ? dataserialize.ValueString : null);
						model.append('ValueInt', !$.isEmpty(dataserialize.ValueInt) ? dataserialize.ValueInt : null);
						model.append('ValueDate', !$.isEmpty(dataserialize.ValueDate) ? dataserialize.ValueDate : null);
                        model.append('ValueFloat', !$.isEmpty(dataserialize.ValueFloat) ? dataserialize.ValueFloat : null);
                        model.append('ValuePassword', !$.isEmpty(dataserialize.ValuePassword) ? dataserialize.ValuePassword : null);
						model.append('IsVisible', $("#IsVisible").val());
						if ($("#BoolValue").attr('type') === 'checkbox') {
							model.append('ValueBool', $("#BoolValue:checked").length > 0 ? true : false);
						}
						model.append('HasFile', valueFileTile == 6 ? true : false);
						model.append('IsSystem', $data.data.IsSystem);

						if (filesList.length > 0 && valueFileTile == 6) {
							model.append('ValueFile', filesList[0]);
						}

						$.ajax({
							url: $data.postAction,
							type: 'POST',
							data: model,
							processData: false,
							contentType: false,
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
		"update_system_setting_dialog"
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
					if (!$.isEmpty($data.data.ValueString) && item.Id === 1 ||
						!$.isEmpty($data.data.ValueInt) && item.Id === 2 ||
						!$.isEmpty($data.data.ValueFloat) && item.Id === 3 ||
						!$.isEmpty($data.data.ValueDate) && item.Id === 4 ||
						!$.isEmpty($data.data.ValueBool) && item.Id === 5 ||
                        $data.data.HasFile && item.Id === 6 ||
                        !$.isEmpty($data.data.ValuePassword) && item.Id === 7) {
						selected = "selected";
					} else {
						selected = "";
					}
					$("#settingType").append('<option value="' + item.Id + '" ' + selected + '>' + item.Name + '</option>');
				});
			}
		}
	});

	//show input by type
	$("#settingType").on("change", function (e) {
		var value = $(this).val();
		showFieldByType($data, value);
	});

	//show addition field
	showFieldByType($data);

	// show upload if ValueFile is not null
	if ($data.data.HasFile) {
		showFileList($data);
		showUploadFile($data);
	}

	$.validator.addMethod("uniqueName", function (value, element) {
		var exists = true;

		$.each($data.datas, function (index, obj) {
			if (value !== $data.data.Name && value === obj.Name) {
				$('.checked').remove();
				exists = false;
				return;
			}
		});

		return exists;
	});
	
	$("#update_system_setting")
		.validate({
			rules: {
				Name: {
					required: true,
					maxlength: 50,
					uniqueName: true,
				},
				ValueType: {
					required: true
				},
				ValueString: {
					required: true
				},
				ValueInt: {
					required: true,
					number: true
				},
				ValueFloat: {
					required: true,
					number: true
                },
				ValueDate: {
					required: true
				},
				ContentFile: {
					required: true,
					extension: "pdf|htm|html|png|jpeg|jpg|gif"
				}
			},
			messages: {
				Name: {
					required: $data.validateMessage.Name,
					maxlength: $data.validateMessage.ValidateMaxLength,
					uniqueName: $data.validateMessage.UniqueName
				},
				ValueType: {
					required: $data.validateMessage.Type
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
				ContentFile: {
					required: $data.validateMessage.File,
					extension: $data.validateMessage.Extension
				},
				errorPlacement: function (error, element) {
					var placement = $(element).data('error');
					if (placement) {
						$(placement).append(error)
					} else {
						error.insertAfter(element);
					}
				}
			}
		});

	// checkbox control
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

	$("[name='IsSystem']").bootstrapSwitch({
		state: $data.data.IsSystem,
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
function showFieldByType($data, typeChanged) {
	var field,
		typeGroup,
		valueString = !$.isEmpty($data.data.ValueString) ? $data.data.ValueString : "",
		valueInt = !$.isEmpty($data.data.ValueInt) ? $data.data.ValueInt : "",
		valueDate = !$.isEmpty($data.data.ValueDate) ? new Date(parseInt($data.data.ValueDate.replace("/Date(", "").replace(")/", ""), 10)) : "",
		valueFloat = !$.isEmpty($data.data.ValueFloat) ? $data.data.ValueFloat : "",
        valueBool = !$.isEmpty($data.data.ValueBool) ? $data.data.ValueBool : "",
        valuePassword = !$.isEmpty($data.data.ValuePassword) ? $data.data.ValuePassword : "";

	typeGroup = $('#type_group');
	valueDate = $.datepicker.formatDate('dd.mm.yy', valueDate);

	$('#value_type_group').remove();
	if (!$.isEmpty(typeChanged)) {
		switch (typeChanged) {
			case '1':
				field = '<textarea name="ValueString"></textarea>';
				break;
			case '2':
				field = '<input type="text" name="ValueInt" />';
				break;
			case '3':
				field = '<input type="text" name="ValueFloat" />';
				break;
			case '4':
				field = '<input type="text" name="ValueDate" id="DateValue" />';
				break;
			case '5':
				field = '<input type="checkbox" name="ValueBool" id="BoolValue" />';
				break;
			case '6':
				field = '<div class="small_btn_file"><span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="ContentFile" id="ContentFile" data-error="#errorExtension" />' + $data.label.LabelUpload + '</span></div><div id="errorExtension"></div>' +
                    '<ul id="file_list"></ul>';
            case '7':
                field = '<input type="password" name="ValuePassword" />';
                break;

				break;
		}
	} else {
		if (!$.isEmpty(valueString) && !$data.data.HasFile) {
			field = '<textarea name="ValueString">' + valueString + '</textarea>';
		} else if (!$.isEmpty(valueInt)) {
			field = '<input type="text" name="ValueInt" value="' + valueInt + '" />';
        } else if (!$.isEmpty(valuePassword)) {
            field = '<input type="password" name="ValuePassword" value="' + valuePassword + '" />';
        } else if (!$.isEmpty(valueFloat)) {
			field = '<input type="text" name="ValueFloat" value="' + valueFloat + '" />';
		} else if (!$.isEmpty(valueDate)) {
			field = '<input type="text" name="ValueDate" id="DateValue" value="' + valueDate + '" />';
		} else if (!$.isEmpty(valueBool)) {
			var checked = valueBool ? "checked" : "";
			field = '<input type="checkbox" name="ValueBool" id="BoolValue"  value="' + valueBool + '" ' + checked + ' />';
		} else if ($data.data.HasFile) {
			field = '<div class="small_btn_file"><span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="ContentFile" id="ContentFile" data-error="#errorExtension" />' + $data.label.LabelUpload + '</span></div>' +
				'<ul id="file_list"></ul>';
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
		$("#DateValue").datepicker($.datepicker.regional[$currentCulture]);
		$("[name='ValueBool']").bootstrapSwitch({
			state: $data.data.ValueBool,
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

	// file upload
	if (window.File && window.FileList && window.FileReader) {
		$("#ContentFile").on("change", function (e) {
			var files = e.target.files,
				filesLength = files.length,
				file_name,
				file_type,
				file_extension,
				file,
				size,
				icon,
				li,
				fileExt,
				acceptedExtension;
			for (var i = 0; i < filesLength; i++) {
				file = files[i];
				full_file_name = file.name;
				file.extention;
				fileExt = file.name.match(/\.(.+)$/)[1];
				acceptedExtension = ['pdf', 'htm', 'html', 'png', 'jpeg', 'jpg', 'gif'];

				filesList.push(file);

				size = (file.size / (1024 * 1024)).toFixed(2);
				file_name = full_file_name.length > 20 ? full_file_name.substr(0, 20) + '...' : full_file_name;
				file_type = file_name.substring(file_name.lastIndexOf('.') + 1);

				icon = '<i class="fa fa-file-o" aria-hidden="true"></i>';
				$(".btn-file").after('<div class="loading_img"><div classr="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

				$("#file_list li").remove();
				if ($.inArray(fileExt, acceptedExtension) != -1) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var html = '<li title="' + full_file_name + '"><div class="title">' + file_name + '</div><div class="size">' + size + ' Mb</div><div class="extension_type">' + icon + '</div><div class="action"><a id="remove_file" data-file="' + file.name + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>';
						$('#file_list').append(html);
					}
					reader.readAsDataURL(file);
				}
				$(".loading_img").remove();
			}
		});
		$("body").on("click", "#remove_file", removeFile);
	}
	else {
		console.log("Your browser doesn't support to File API")
	}
}
function showUploadFile($data) {
	$(this).attr("value", 'true');
	var hasFileGroup = $("#hasfile_group");
	var template = '<div class="form-group" id="file_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelFile +
		"</label>" +
		'<div class="col-sm-9 small_btn_file">' +
		'<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="ContentFile" id="ContentFile" multiple />' + $data.label.LabelUpload + '</span>' +
		'<ul id="file_list"></ul>' +
		"</div>" +
		"</div>";
	hasFileGroup.after(template);
}

function showFileList($data) {
	filesList = [];
	var icon, li, size, file_type;

	var getFileBlob = function (url, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.responseType = "blob";
		xhr.addEventListener('load', function () {
			cb(xhr.response);
		});
		xhr.send();
	};
	var blobToFile = function (blob) {
		blob.lastModifiedDate = new Date();
		blob.name = "file";
		return blob;
	};
	var getFileObject = function (filePathOrUrl, cb) {
		getFileBlob(filePathOrUrl, function (blob) {
			cb(new File([blob], 'File'));
		});
	};

	getFileObject($data.getSettingValueFile + '/' + $data.data.Id, function (file) {
		filesList.push(file);

		file_type = file.name.substring(file.name.lastIndexOf('.') + 1)
		switch (file_type) {
			case 'pdf':
				icon = '<i class="fa fa-file-pdf-o" aria-hidden="true"></i>';
				break;
		}
		size = (file.size / (1024 * 1024)).toFixed(2);
		icon = '<i class="fa fa-file-o" aria-hidden="true"></i>';

		var html = '<li><div class="title">' + file.name + '.' + file.type + '</div><div class="size">' + size + ' Mb</div><div class="extension_type">' + icon + '</div><div class="action"><a id="remove_file" data-file="' + file.name + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>';
		$('#file_list').append(html);
	});
}
function removeFile(e) {
	var file = $(this).data("file");
	for (var i = 0; i < filesList.length; i++) {
		if (filesList[i].name === file) {
			filesList.splice(i, 1);
			break;
		}
	}
	$(this).parents('li').remove();
}
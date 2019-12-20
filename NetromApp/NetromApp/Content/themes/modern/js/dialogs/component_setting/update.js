var selListFile = "";
var filesList = [];
var componentResourceList = [];

function UpdateComponentSettingDialog($data) {
	var description = !$.isEmpty($data.data.Description) ? $data.data.Description : '';

	var $HasFileChecked = $data.data.HasFile ? 'checked' : '';
	var $IsVisibleChecked = $data.data.IsVisible ? 'checked' : '';
	var $FileRequiredChecked = $data.data.FileRequired ? 'checked' : '';
	var inputDisabled = $data.data.IsPluginSetting ? 'disabled' : '';

	var form = $("<form/>",
		{
			id: "update_component_setting"
		});

	var fieldset = "" +
		'<div class="form_block form-horizontal">' +
		// Name
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelName +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="" ' + inputDisabled + '>' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
		"</div>" +
		// Description
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelDescription +
		"</label>" +
		'<div class="col-sm-9">' +
		'<textarea name="Description" id="Description" ' + inputDisabled + '>' + description + '</textarea>' +
		"</div>" +
		"</div>" +
		// Type
		'<div class="form-group" id="type_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelType +
		"</label>" +
		'<div class="col-sm-9">' +
		'<select id="settingType" name="settingType" ' + inputDisabled + '><option></option></select>' +
		'<span class="mandatory_field_list">*</span>' +
		'<input id="settingTypeValue" type="hidden" value="true" />' +
		"</div>" +
		"</div>" +
		// HasFile
		'<div class="form-group" id="hasfile_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelHasFile +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="checkbox" name="HasFile" id="HasFile" value="' + $data.data.HasFile + '" ' + $HasFileChecked + '>' +
		"</div>" +
		"</div>" +
		// FileRequired
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelFileRequired +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="checkbox" name="FileRequired" id="FileRequired" ' + $FileRequiredChecked + ' checked>' +
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

					if ($('#update_component_setting').valid()) {
						var dataserialize = $("#update_component_setting").serializeObject(),
							model = new FormData(),
							hasFile = $("#HasFile").val();

						model.append('Id', $data.data.Id);
						model.append('Name', $('#Name').val());
						model.append('Description', $('#Description').val());
						model.append('ComponentId', $data.componentId);
						model.append('StringValue', !$.isEmpty(dataserialize.StringValue) ? dataserialize.StringValue : '');
						model.append('IntValue', !$.isEmpty(dataserialize.IntValue) ? dataserialize.IntValue : '');
						model.append('DateValue', !$.isEmpty(dataserialize.DateValue) ? dataserialize.DateValue : '');
						model.append('FloatValue', !$.isEmpty(dataserialize.FloatValue) ? dataserialize.FloatValue : '');
						model.append('BoolValue', $("#BoolValue").val());
						model.append('IsVisible', $("#IsVisible").val());
						model.append('FileRequired', $("#FileRequired").val());
						model.append('HasFile', hasFile);
                        model.append('IsPluginSetting', $data.data.IsPluginSetting);

                        console.log(filesList)
						if (hasFile === 'true' && filesList.length > 0) {
							$.each(filesList, function (index, value) {
								model.append('Files[' + index + ']', value);
							});
							model.append('ComponentResource', componentResourceList);
						}

						filesList = [];
						componentResourceList = [];

						$.ajax({
							url: $data.postAction,
							type: 'POST',
							data: model,
							processData: false,
							contentType: false,
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
		"update_component_setting_dialog"
	);

	// GET setting type list
	$.ajax({
		url: $data.getComponentSettingType,
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
					if (!$.isEmpty($data.data.StringValue) && item.Id == 1 ||
						!$.isEmpty($data.data.IntValue) && item.Id == 2 ||
						!$.isEmpty($data.data.FloatValue) && item.Id == 3 ||
						!$.isEmpty($data.data.DateValue) && item.Id == 4 ||
						!$.isEmpty($data.data.BoolValue) && item.Id == 5) {
						selected = "selected";
					}
					$("#settingType").append('<option value="' + item.Id + '" ' + selected + '>' + item.Name + '</option>');
				});
			}
		}
	});

	// show input by type
	$("#settingType").on("change", function (e) {
		var value = $(this).val();
		showFieldByType($data, value);
	});

	// show addition field
	showFieldByType($data);

	// show upload file if HasFile
	if ($data.data.HasFile) {
		showFileList($data);
		showUploadFile($data);
	}

	$.validator.addMethod("file_required", function (value, element) {
		var exists = true;

		if (filesList.length <= 0) {
			exists = false;
		}

		return exists;
	});

	$("#update_component_setting")
		.validate({
			rules: {
				Name: {
					required: true,
					maxlength: 50
				},
				settingType: {
					required: true
				},
				StringValue: {
					required: true
				},
				IntValue: {
					required: true,
					number: true
				},
				FloatValue: {
					required: true,
					number: true
				},
				DateValue: {
					required: true
				},
				ContentFile: {
					file_required: true,
					extension: "pdf|xml|doc|docx"
				}
			},
			messages: {
				Name: {
					required: $data.validateMessage.Name,
					maxlength: $data.validateMessage.ValidateMaxLength
				},
				settingType: {
					required: $data.validateMessage.Type
				},
				StringValue: {
					required: $data.validateMessage.Value
				},
				IntValue: {
					required: $data.validateMessage.Value,
					number: $data.validateMessage.Number
				},
				FloatValue: {
					required: $data.validateMessage.Value,
					number: $data.validateMessage.Number
				},
				DateValue: {
					required: $data.validateMessage.Value
				},
				ContentFile: {
					file_required: $data.validateMessage.File,
					extension: $data.validateMessage.Extension
				}
			}
		});

	// checkbox control
	$("[name='FileRequired']").bootstrapSwitch({
		state: $data.data.FileRequired,
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
	$("[name='HasFile']").bootstrapSwitch({
		state: $data.data.HasFile,
		size: 'mini',
		onColor: 'success',
		onText: $data.checkboxOnOff.on,
		offText: $data.checkboxOnOff.off,
		onSwitchChange: function (event, state) {
			if (state) {
				$(this).attr("value", true);
				if ($("#file_group").length > 0) {
					$("#file_group").show();
					return;
				}
				showUploadFile($data);
				return;
			}
			$("#file_group").hide();
			$(this).attr("value", false);
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
function showFieldByType($data, value) {
	var field, typeGroup;
	typeGroup = $('#type_group'),
		stringValue = !$.isEmpty($data.data.StringValue) ? $data.data.StringValue : "",
		intValue = !$.isEmpty($data.data.IntValue) ? $data.data.IntValue : "",
		floatValue = !$.isEmpty($data.data.FloatValue) ? $data.data.FloatValue : "",
		dateValue = !$.isEmpty($data.data.DateValue) ? $.dateFormat($data.data.DateValue, 'DD.MM.YYYY') : "",
		boolValue = !$.isEmpty($data.data.BoolValue) ? $data.data.BoolValue : "";

	if ($.isEmpty(value)) {
		if (!$.isEmpty($data.data.StringValue)) {
			value = '1';
		} else if (!$.isEmpty($data.data.IntValue)) {
			value = '2';
		} else if (!$.isEmpty($data.data.FloatValue)) {
			value = '3';
		} else if (!$.isEmpty($data.data.DateValue)) {
			value = '4';
		} else if (!$.isEmpty($data.data.BoolValue)) {
			value = '5';
		}
	}

	$('#value_type_group').remove();
	switch (value) {
		case '1': // String
			field = '<textarea name="StringValue" >' + stringValue + '</textarea>';
			break;
		case '2': // Integer
			field = '<input type="text" name="IntValue" value="' + intValue + '" />';
			break;
		case '3': // Float
			field = '<input type="text" name="FloatValue" value="' + floatValue + '" />';
			break;
		case '4': // DateTime
			field = '<input type="text" name="DateValue" id="DateValue" value="' + dateValue + '" />';
			break;
		case '5': // Boolean
            if ($.isEmpty(boolValue)) {
                boolValue = "false";
            }
            var checked = boolValue ? 'checked' : '';
			field = '<input type="checkbox" name="BoolValue" id="BoolValue"  value="' + boolValue + '" ' + checked + '>';
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
		$("[name='BoolValue']").bootstrapSwitch({
			state: boolValue,
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
}

function showUploadFile($data) {
	$(this).attr("value", 'true');
	var hasFileGroup = $("#hasfile_group");
	var template = '<div class="form-group" id="file_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelFile +
		"</label>" +
		'<div class="col-sm-9 small_btn_file">' +
		'<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="ContentFile" id="ContentFile" multiple />' + $data.label.LabelMultipleUpload + '</span>' +
		'<ul id="file_list"></ul>' +
		"</div>" +
		"</div>";
	hasFileGroup.after(template);

	// file upload
	if (window.File && window.FileList && window.FileReader) {
		$("#ContentFile").on("change", handleFileSelect);
		selListFile = $('#file_list');
		$("body").on("click", "#remove_file", removeFile);
	}
	else {
		console.log("Your browser doesn't support to File API")
	}
}

function handleFileSelect(e) {
	var files = e.target.files;
	var filesArr = Array.prototype.slice.call(files);
	filesArr.forEach(function (f) {
		if (f.type.match("image.*")) {
			return;
		}
		filesList.push(f);

		var full_file_name = f.name, file_name, file_type, file_extension = f.extention, size, icon, li;
		size = (f.size / (1024 * 1024)).toFixed(2);
		file_name = full_file_name.length > 20 ? full_file_name.substr(0, 20) + '...' : full_file_name;
		file_type = file_name.substring(file_name.lastIndexOf('.') + 1)
		switch (file_type) {
			case 'pdf':
				icon = '<i class="fa fa-file-pdf-o" aria-hidden="true"></i>';
				break;
			case 'doc':
				icon = '<i class="fa fa-file-word-o" aria-hidden="true"></i>';
				break;
			case 'docx':
				icon = '<i class="fa fa-file-word-o" aria-hidden="true"></i>';
				break;
			default:
				icon = '<i class="fa fa-file-o" aria-hidden="true"></i>';
				break;
		}

		$(".btn-file").after('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

		var reader = new FileReader();
		reader.onload = function (e) {
			$(".loading_img").remove();

			var html = '<li title="' + full_file_name + '"><div class="title">' + file_name + '</div><div class="size">' + size + ' Mb</div><div class="extension_type">' + icon + '</div><div class="action"><a id="remove_file" data-file="' + f.name + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>';
			selListFile.append(html);
		}
		reader.readAsDataURL(f);
	});

}

function showFileList($data) {
	if ($data.data.ComponentResource.length > 0) {
		filesList = [];
		$.each($data.data.ComponentResource, function (index, value) {
			componentResourceList.push(value);

			var full_file_name = value.Name, file_name, file_extension = value.FileType, icon, li, size;

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
				blob.name = full_file_name;
				return blob;
			};
			var getFileObject = function (filePathOrUrl, cb) {
				getFileBlob(filePathOrUrl, function (blob) {
					cb(new File([blob], full_file_name));
				});
			};

			getFileObject($data.getComponentResourceFile + '/' + value.Id, function (file) {
				console.log('Load resource by ID')
				filesList.push(file);

				file_name = full_file_name.length > 20 ? full_file_name.substr(0, 20) + '...' : full_file_name;
				size = (file.size / (1024 * 1024)).toFixed(2);

				switch (value.FileType) {
					case 'pdf':
						icon = '<i class="fa fa-file-pdf-o" aria-hidden="true"></i>';
						break;
					case 'doc':
						icon = '<i class="fa fa-file-word-o" aria-hidden="true"></i>';
						break;
					case 'docx':
						icon = '<i class="fa fa-file-word-o" aria-hidden="true"></i>';
						break;
					default:
						icon = '<i class="fa fa-file-o" aria-hidden="true"></i>';
						break;
				}

				var html = '<li title="' + full_file_name + '"><div class="title">' + file_name + '</div><div class="size">' + size + ' Mb</div><div class="extension_type">' + icon + '</div><div class="action"><a id="remove_file" data-file="' + full_file_name + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>';
				selListFile.append(html);
			});
			
		});
	}
}

function removeFile(e) {
	var file = $(this).data("file");
	for (var i = 0; i < filesList.length; i++) {
		if (filesList[i].name === file) {
			filesList.splice(i, 1);
			break;
		}
	}

	for (var i = 0; i < componentResourceList.length; i++) {
		if (componentResourceList[i].Name === file) {
			componentResourceList.splice(i, 1);
			break;
		}
	}

	$(this).parents('li').remove();
}
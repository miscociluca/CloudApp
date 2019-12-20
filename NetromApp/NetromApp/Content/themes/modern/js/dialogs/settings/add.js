var filesList = [];
function AddSettingDialog($data) {
    var form = $("<form/>",
                    {
                        id: "add_setting"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        // Name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="" class="form-control" id="Name" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // Description
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDescription +
        "</label>" +
        '<div class="col-sm-9">' +
        '<textarea name="Description"></textarea>' +
        "</div>" +
        "</div>" +
        // Type
        '<div class="form-group" id="type_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelType +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select id="settingType" name="settingType"><option></option></select>' +
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
        '<input type="checkbox" name="IsVisible" id="IsVisible" value="true">' +
        "</div>" +
		"</div>" +
		// Is System
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelIsSystem +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="checkbox" name="IsSystem" id="IsSystem" value="false">' +
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

                    if ($('#add_setting').valid()) {
                        var inputs = $("#add_setting");
                        var dataserialize = inputs.serializeObject();
                        var model = new FormData();
                        model.append('Name', dataserialize.Name);
                        model.append('Description', dataserialize.Description);
                        model.append('ValueString', !$.isEmpty(dataserialize.ValueString) ? dataserialize.ValueString : '');
                        model.append('ValueInt', !$.isEmpty(dataserialize.ValueInt) ? dataserialize.ValueInt : null);
                        model.append('ValueDate', !$.isEmpty(dataserialize.ValueDate) ? dataserialize.ValueDate : null);
                        model.append('ValueFloat', !$.isEmpty(dataserialize.ValueFloat) ? dataserialize.ValueFloat : null);
                        model.append('ValueBool', !$.isEmpty(dataserialize.ValueBool) ? dataserialize.ValueBool : null);
                        model.append('ValuePassword', !$.isEmpty(dataserialize.ValuePassword) ? dataserialize.ValuePassword : null);
                        model.append('IsVisible', $("#IsVisible").val());
						model.append('ValueFile', filesList[0]);
						model.append('IsSystem', $("#IsSystem").val());

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
                                    $data.table.row.add(record).draw(false);
                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                    console.log("New setting was added");
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
        "add_setting_dialog"
    );

    // GET setting type list
    $.ajax({
        url: $data.getSettingType,
        type: "GET",
        beforeSend: function () {
            //$this.after('<i class="fa fa-cog fa-spin fa-2x fa-fw" id="mini_loader"></i>');
        },
        complete: function () {
            //$('#mini_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    $("#settingType").append(
                        $("<option></option>")
                        .text(item.Name)
                        .val(item.Id)
                    );
                });
            }
        }
    });

    // show input by type
    $("#settingType").on("change", function (e) {
        var field, value, typeGroup;

        value = $(this).val();
        typeGroup = $('#type_group');

        $('#value_type_group').remove();
        switch (value) {
            case '1': // String
                field = '<textarea name="ValueString"></textarea>';
                break;
            case '2': // Integer
                field = '<input type="text" name="ValueInt" />';
                break;
            case '3': // Float
                field = '<input type="text" name="ValueFloat" />';
                break;
            case '4': // DateTime
                field = '<input type="text" name="ValueDate" id="DateValue" />';
                break;
            case '5': // Boolean
                field = '<input type="checkbox" name="ValueBool" id="BoolValue" value="false">';
                break;
            case '6': // File
                field = '<div class="small_btn_file"><span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="ContentFile" id="ContentFile" data-error="#errorExtension" />' + $data.label.LabelUpload + '</span></div><div id="errorExtension"></div>' +
                    '<ul id="file_list"></ul>';
                break;
            case '7':
                field = '<input type="text" name="ValuePassword" />';
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

            $("[name='ValueBool']").bootstrapSwitch({
                state: false,
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
                        file = files[i],
                        full_file_name = file.name,
                        filesList = [],
                        file.extention;

                        filesList.push(file);

                        size = (file.size / (1024 * 1024)).toFixed(2);
                        file_name = full_file_name.length > 20 ? full_file_name.substr(0, 20) + '...' : full_file_name;
                        file_type = file_name.substring(file_name.lastIndexOf('.') + 1);
                        fileExt = file.name.match(/\.(.+)$/)[1];
						acceptedExtension = ['pdf', 'htm', 'html', 'png', 'jpeg', 'jpg', 'gif'];

                        $(".btn-file").after('<div class="loading_img"><div classr="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

                        $("#file_list li").remove();
                        if ($.inArray(fileExt, acceptedExtension) != -1) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var html = '<li title="' + full_file_name + '"><div class="title">' + file_name + '</div><div class="size">' + size + ' Mb</div><div class="extension_type"><i class="fa fa-file-o" aria-hidden="true"></i></div><div class="action"><a id="remove_file" data-file="' + file.name + '"><i class="fa fa-times" aria-hidden="true"></i></a></div></li>';
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
    });

	$.validator.addMethod("uniqueName", function (value, element) {
		var exists = true;
		$.each($data.datas, function (index, obj) {
			if (value === obj.Name) {
				$('.checked').remove();
				exists = false;
				return;
			}
		});

		return exists;
	});

    $("#add_setting")
        .validate({
            rules: {
                Name: {
					required: true,
					uniqueName: true,
                    maxlength: 50
                },
                settingType: {
                    required: true
                },
                ValueString: {
                    required: true
                },
                ValueInt: {
                    required: true,
                    number: true
                },
                ValuePassword:{
                    required: true
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
                settingType: {
                    required: $data.validateMessage.Type
                },
                ValueString: {
                    required: $data.validateMessage.Value
                },
                ValueInt: {
                    required: $data.validateMessage.Value,
                    number: $data.validateMessage.Number
                },
                ValuePassword: {
                    required: $data.validateMessage.Value
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
                }
            },
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            }
        });

    $("[name='IsVisible']").bootstrapSwitch({
        state: false,
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
		state: false,
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

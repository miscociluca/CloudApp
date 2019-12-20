function AddPluginSettingDialog($data) {
    var filesList = [];

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
        '<select id="settingType" name="ValueType"><option></option></select>' +
        '<span class="mandatory_field_list">*</span>' +
        "</div>" +
        "</div>" +
        // File Required
        //'<div class="form-group">' +
        //'<label class="col-sm-3 control-label">' +
        //$data.label.LabelFileRequired +
        //"</label>" +
        //'<div class="col-sm-9">' +
        //'<input type="checkbox" name="FileRequired" id="FileRequired" value="false">' +
        //"</div>" +
        //"</div>" +
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
                    var $this = $(this);

                    if ($('#add_setting').valid()) {
                        var inputs = $("#add_setting"),
                            valueType,
                            defaultValue,
                            defaultValueFile = null,
                            file_type,
                            dataserialize = inputs.serializeObject();

                        switch (dataserialize.ValueType) {
                            case '0': // String
                                valueType = 0;
								defaultValue = $.htmlEncode(dataserialize.ValueString);
                                break;
                            case '1': // Integer
                                valueType = 1;
                                defaultValue = dataserialize.ValueInt;
                                break;
                            case '2': // DateTime
                                valueType = 2;
                                defaultValue = dataserialize.ValueDate;
                                break;
                            case '3': // Float
                                valueType = 3;
                                defaultValue = dataserialize.ValueFloat;

                                break;
                            case '4': // File
                                valueType = 0;
								defaultValue = filesList[0].name;
                                defaultValueFile = filesList[0];
								break;
							case '5': // Boolean
								valueType = 5;
								defaultValue = dataserialize.ValueBool;
								break;
                        }

                        file_type = !$.isEmpty(filesList[0]) ? filesList[0].name.substring(filesList[0].name.lastIndexOf('.') + 1) : null;

                        var model = new FormData();
                        model.append('Name', dataserialize.Name);
                        model.append('Description', dataserialize.Description);
                        model.append('FileRequired', false);
                        model.append('ValueType', valueType);
                        model.append('DefaultValue', defaultValue);
                        model.append('FileType', file_type);
                        model.append('PluginId', $data.pluginId);
                        model.append('FileContent', defaultValueFile);

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
            case '0': // String
                field = '<textarea name="ValueString"></textarea>';
                break;
            case '1': // Integer
                field = '<input type="text" name="ValueInt" />';
                break;
            case '2': // DateTime
                field = '<input type="text" name="ValueDate" id="DateValue" />';
                break;
            case '3': // Float
                field = '<input type="text" name="ValueFloat" />';
                break;
            case '4': // File
                field = '<div class="small_btn_file"><span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="ContentFile" id="ContentFile" data-error="#errorExtension" />' + $data.label.LabelUpload + '</span></div><div id="errorExtension"></div>' +
                    '<ul id="file_list"></ul>';
				break;
			case '5': // Boolean
				field = '<input type="checkbox" name="ValueBool" id="BoolValue" value="false">';
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
                        file = files[i];
                        full_file_name = file.name;
                        file.extention;
                        fileExt = file.name.match(/\.(.+)$/)[1];
                        acceptedExtension = ['pdf'];

                        filesList.push(file);

                        size = (file.size / (1024 * 1024)).toFixed(2);
                        file_name = full_file_name.length > 20 ? full_file_name.substr(0, 20) + '...' : full_file_name;
                        file_type = file_name.substring(file_name.lastIndexOf('.') + 1);

                        icon = '<i class="fa fa-file-pdf-o" aria-hidden="true"></i>';
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
    });

    $.validator.addMethod("unique", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            value = $.trim(value);
            if (value.toLowerCase() === obj.Name.toLowerCase()) {
                $('.checked').remove();
                exists = false;
                return;
            }
        });

        return exists;
    });
    console.log(12)
    $("#add_setting")
        .validate({
            rules: {
                Name: {
                    required: true,
                    maxlength: 50,
                    unique: true
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
                    extension: "pdf"
                }
            },
            messages: {
                Name: {
                    required: $data.validateMessage.Name,
                    maxlength: $data.validateMessage.ValidateMaxLength,
                    unique: $data.validateMessage.ValidateNameExist
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

    $("[name='FileRequired']").bootstrapSwitch({
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

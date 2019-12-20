var selListFile = "";
var filesList = [];

function AddComponentSettingDialog($data) {
    var form = $("<form/>",
                    {
                        id: "add_component_setting"
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
        // HasFile
        '<div class="form-group" id="hasfile_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelHasFile +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="HasFile" id="HasFile" value="false">' +
        "</div>" +
        "</div>" +
        // FileRequired
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelFileRequired +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="FileRequired" id="FileRequired">' +
        "</div>" +
        "</div>" +
        // Is visible
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelVisible +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="IsVisible" id="IsVisible" value="false">' +
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

                    if ($('#add_component_setting').valid()) {
                        var inputs = $("#add_component_setting"),
                            dataserialize = inputs.serializeObject(),
                            hasFile = $("#HasFile").val();

                        var model = new FormData();

                        model.append('Name', dataserialize.Name);
                        model.append('Description', dataserialize.Description);
                        model.append('ComponentId', $data.componentId);
                        model.append('StringValue', !$.isEmpty(dataserialize.StringValue) ? dataserialize.StringValue : null);
                        model.append('IntValue', !$.isEmpty(dataserialize.IntValue) ? dataserialize.IntValue : null);
                        model.append('DateValue', !$.isEmpty(dataserialize.DateValue) ? dataserialize.DateValue : null);
                        model.append('FloatValue', !$.isEmpty(dataserialize.FloatValue) ? dataserialize.FloatValue : null);
                        model.append('BoolValue', !$.isEmpty(dataserialize.BoolValue) ? dataserialize.BoolValue : null);
                        model.append('IsVisible', $("#IsVisible").val());
                        model.append('FileRequired', $("#FileRequired").val());
                        model.append('HasFile', hasFile);

                        if (hasFile === 'true') {
                            if (!$.isEmpty(filesList) && filesList.length > 0) {
                                $.each(filesList, function (index, value) {
                                    model.append('Files[' + index + ']', value);
                                });
                            }
                        }

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
                                    console.log("New package type was added");
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
        "add_component_setting_dialog"
    );

    // GET setting type list
    $.ajax({
        url: $data.getComponentSettingType,
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
                field = '<input type="text" name="StringValue" />';
                break;
            case '2': // Integer
                field = '<input type="text" name="IntValue" />';
                break;
            case '3': // Float
                field = '<input type="text" name="FloatValue" />';
                break;
            case '4': // DateTime
                field = '<input type="text" name="DateValue" id="DateValue" />';
                break;
            case '5': // Boolean
                field = '<input type="checkbox" name="BoolValue" id="BoolValue" value="false" checked="checked">';
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
			$("#BoolValue").bootstrapSwitch({
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
    });

    $("#add_component_setting")
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
                }
            }
        });
    //
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
    $("[name='HasFile']").bootstrapSwitch({
        state: false,
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
					console.log("Your browser doesn't support to File API");
                }

                return;
            }
            $(this).attr("value", false);
            $("#file_group").hide();
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
}
function handleFileSelect(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    if (filesArr.length > 0) {
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
                case 'xml':
                    icon = '<i class="fa fa-file-xml-o" aria-hidden="true"></i>';
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

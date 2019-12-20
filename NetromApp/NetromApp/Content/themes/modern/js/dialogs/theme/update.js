function UpdateThemeDialog($data) {
    var form = $("<form/>",
                    {
                        id: "update_theme"
                    });
    var filesList = [];

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        // Name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // Color
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelColor +
        "</label>" +
        '<div class="col-sm-9">' +
        '<div id="Color" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
          '<input type="text" name="Color" value="' + $data.data.Color + '" class="form-control">' +
          '<span class="input-group-addon"><i style="background-color: ' + $data.data.Color + ';"></i></span>' +
        '</div>' +
        "</div>" +
        "</div>" +
        // BackgroundColor
        '<div class="form-group" id="type_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelBackgroundColor +
        "</label>" +
        '<div class="col-sm-9">' +
        '<div id="BackgroundColor" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
          '<input type="text" name="BackgroundColor" value="' + $data.data.BackgroundColor + '" class="form-control">' +
          '<span class="input-group-addon"><i style="background-color: ' + $data.data.BackgroundColor + ';"></i></span>' +
        '</div>' +
        "</div>" +
        "</div>" +
         // Image
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelBackgroundImage +
        "</label>" +
        '<div class="col-sm-9" id="img_preview">' +
        '<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="Image" id="Image" data-error="#errorExtension"/></span>';
    if ($data.data.HasBackgroundImage) {

        fieldset += '<div class="pip">' +
                      '<img class="imageThumb" src="' + $data.getImageRender + '" />' +
                      '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                      '</div>';
    }
    fieldset += '<div id="errorExtension"></div>' +
    '</div>' +
    "</div>" +
    // HeaderBackgroundColor
    '<div class="form-group" id="type_group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelHeaderBackgroundColor +
    "</label>" +
    '<div class="col-sm-9">' +
    '<div id="HeaderBackgroundColor" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
      '<input type="text" name="HeaderBackgroundColor" value="' + $data.data.HeaderBackgroundColor + '" class="form-control">' +
      '<span class="input-group-addon"><i style="background-color: ' + $data.data.HeaderBackgroundColor + ';"></i></span>' +
    '</div>' +
    "</div>" +
    "</div>" +
    // HeaderColor
    '<div class="form-group" id="type_group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelHeaderColor +
    "</label>" +
    '<div class="col-sm-9">' +
    '<div id="HeaderColor" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
      '<input type="text" name="HeaderColor" value="' + $data.data.HeaderColor + '" class="form-control">' +
      '<span class="input-group-addon"><i style="background-color: #' + $data.data.HeaderColor + ';"></i></span>' +
    '</div>' +
    "</div>" +
    "</div>" +
    // CommandBarColor
    '<div class="form-group" id="type_group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelCommandBarColor +
    "</label>" +
    '<div class="col-sm-9">' +
    '<div id="CommandBarColor" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
      '<input type="text" name="CommandBarColor" value="' + $data.data.CommandBarColor + '" class="form-control">' +
      '<span class="input-group-addon"><i style="background-color: ' + $data.data.CommandBarColor + ';"></i></span>' +
    '</div>' +
    "</div>" +
    "</div>" +
    // CommandBarBackgroundColor
    '<div class="form-group" id="type_group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelCommandBarBackgroundColor +
    "</label>" +
    '<div class="col-sm-9">' +
    '<div id="CommandBarBackgroundColor" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
      '<input type="text" name="CommandBarBackgroundColor" value="' + $data.data.CommandBarBackgroundColor + '" class="form-control">' +
      '<span class="input-group-addon"><i style="background-color: ' + $data.data.CommandBarBackgroundColor + ';"></i></span>' +
    '</div>' +
    "</div>" +
    "</div>" +
    // Active
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelActive +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="checkbox" name="IsCurrent" id="IsCurrent" value="' + $data.data.IsCurrent + '">' +
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

                    if ($('#update_theme').valid()) {
                        var inputs = $("#update_theme");
                        var dataserialize = inputs.serializeObject();
                        var model = new FormData();
                        var file = document.getElementById('Image');
                        model.append('Id', $data.data.Id);
                        model.append('Name', dataserialize.Name);
                        model.append('Color', dataserialize.Color);
                        model.append('BackgroundColor', dataserialize.BackgroundColor);
                        model.append('HeaderBackgroundColor', dataserialize.HeaderBackgroundColor);
                        model.append('HeaderColor', dataserialize.HeaderColor);
                        model.append('CommandBarColor', dataserialize.CommandBarColor);
                        model.append('CommandBarBackgroundColor', dataserialize.CommandBarBackgroundColor);
                        model.append('IsCurrent', $("#IsCurrent").val());
                        model.append('HasBackgroundImage', $data.data.HasBackgroundImage);
                        model.append('TempBackgroundImage', file.files[0]);

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
                                    $data.table.ajax.reload(null, false);

                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                    console.log("New theme was added");
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
        "update_theme_dialog"
    );
    $.validator.addMethod("checkNameExists", function (value, element) {
        var exists = true;
        $.each($data.data2, function (index, obj) {
            if (value === obj.Name) {
                exists = false;
                return;
            }
        });
        return exists;
    });

    // preview image after upload
    if (window.File && window.FileList && window.FileReader) {
        $("#Image").on("change", function (e) {
            var files = e.target.files,
              filesLength = files.length;
            $(".pip").remove();
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    $("#img_preview").append('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

                    var file = e.target;
                    var fileExt = f.name.match(/\.(.+)$/)[1];
                    var acceptedExtension = ['jpg', 'jpeg', 'png'];

                    if ($.inArray(fileExt, acceptedExtension) != -1) {
                        $("#img_preview").append('<div class="pip">' +
                      '<img class="imageThumb" src="' + e.target.result + '" title="' + f.name + '" />' +
                      '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                      '</div>');
                        $(".remove").click(function () {
                            $(this).parent(".pip").remove();
                            $("#Image").val("");
                        });
                        if ($('.pip').length > 0) {
                            $('.loading_img').remove();
                        };
                        return;
                    }
                    $('.loading_img').remove();
                });
                fileReader.readAsDataURL(f);
            }
        });
    }
    else {
        console.log("Your browser doesn't support to File API")
    }

    $(".remove").click(function () {
        $(this).parent(".pip").remove();
        $("#Image").val("");
        $data.data.HasBackgroundImage = false;
    });

    $("#add_theme")
        .validate({
            rules: {
                Name: {
                    required: true,
                    checkNameExists: true,
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
                ValueFloat: {
                    required: true,
                    number: true
                },
                ValueDate: {
                    required: true
                },
                ContentFile: {
                    required: true,
                    extension: "pdf|png|jpeg|jpg|gif"
                }
            },
            messages: {
                Name: {
                    required: $data.validateMessage.Name,
                    checkNameExists: $data.validateMessage.ExistName,
                    maxlength: $data.validateMessage.ValidateMaxLength
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

    $("[name='IsCurrent']").bootstrapSwitch({
        state: $data.data.IsCurrent,
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

    // Color field
    $(function () {
        $("#Color").colorpicker({
            format: 'hex',
        });
    });

    // Background color field
    $(function () {
        $("#BackgroundColor").colorpicker({
            format: 'hex',
        });
    });

    // Command Bar Color field
    $(function () {
        $("#CommandBarColor").colorpicker({
            format: 'hex',
        });
    });

    // Command Bar Background Color field
    $(function () {
        $("#CommandBarBackgroundColor").colorpicker({
            format: 'hex',
        });
    });

    // Header Background Color field
    $(function () {
        $("#HeaderBackgroundColor").colorpicker({
            format: 'hex',
        });
    });

    // Header Color field
    $(function () {
        $("#HeaderColor").colorpicker({
            format: 'hex',
        });
    });

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
}

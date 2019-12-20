function AddSummaryDialog($data) {
    var datas = $data.datas,
        position;

    var getLastPosition = function (datas) {
        var sortByPosition = function SortByPosition(a, b) {
            var aPos = a.TileRenderDetail.Position;
            var bPos = b.TileRenderDetail.Position;
            return ((aPos < bPos) ? -1 : ((aPos > bPos) ? 1 : 0));
        };
        datas.sort(sortByPosition);

        var lastIndex = datas.length - 1;
        return datas[lastIndex].TileRenderDetail.Position;
    };

    position = !$.isEmpty($data.data) ? getLastPosition(datas) + 1 : datas.length + 1;

    // $currentCulture is set in _Layout header
    var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var form = $("<form/>",
                    {
                        id: "add_summary"
                    });
    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<div class="col-sm-4">' +
        '<input type="hidden" name="Id" class="form-control" id="Id" placeholder="">' +
        "</div>" +
        "</div>" +
        '<div class="form-group" id="input_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">';
    for (var i = 0; i < lang.length; i++) {
        var culture = lang[i].capitalize();
        var first_field_id = i === 0 ? 'firstFieldName' : '';
        var placeholder = culture === 'Ro' ? $data.label.LabelNameRo : $data.label.LabelNameEn;
        // Name language resource ro
        fieldset += '<div class="input_group"><input type="text" name="Name' + culture + '" class="form-control" id="' + first_field_id + '" placeholder="' + placeholder + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span><span class="mandatory_field">*</span></div>';
    }
    fieldset += '</div>' +
        '</div>' +
        '<div class="form-group" id="input_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDescription +
        "</label>" +
        '<div class="col-sm-9">';
    // Description
    for (var i = 0; i < lang.length; i++) {
        var culture = lang[i].capitalize();
        var label = culture === 'Ro' ? $data.label.LabelDescriptionRo : $data.label.LabelDescriptionEn;
        // Description language resource ro
        fieldset += '<textarea name="Description' + culture + '" class="form-control" id="Description' + culture + '" placeholder="' + label + '"></textarea><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
    }
    fieldset += "</div>" +
        "</div>" +
    // Image
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelImage +
    "</label>" +
    '<div class="col-sm-9" id="img_preview">' +
    '<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="Image" id="Image" /></span>' +
    "</div>" +
    "</div>" +
    // Position
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelPosition +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="Position" class="form-control" value="' + position + '" id="Position" placeholder="">' +
    '<span class="mandatory_field">*</span>' +
    "</div>" +
    "</div>" +
    // RowSpan/RowSpan
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelTileSize +
    "</label>" +
    '<div class="col-sm-9">' +
    '<div class="grid_container">' +
        '<div class="grid small">' +
            '<label>' +
            '<input type="radio" id="gridSize" name="gridSize" value="small" checked />' +
            '<div class="img"></div>' +
            '</label>' +
        '</div>' +
        '<div class="grid width">' +
            '<label>' +
            '<input type="radio" id="gridSize" name="gridSize" value="width" />' +
            '<div class="img"></div>' +
            '</label>' +
        '</div>' +
        '<div class="grid height">' +
            '<label>' +
            '<input type="radio" id="gridSize" name="gridSize" value="height" />' +
            '<div class="img"></div>' +
            '</label>' +
        '</div>' +
        '<div class="grid large">' +
            '<label>' +
            '<input type="radio" id="gridSize" name="gridSize" value="large" />' +
            '<div class="img"></div>' +
            '</label>' +
        '</div>' +
    '</div>' +
    '</div>' +
    "</div>" +
    // BgRgb
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelBgRgb +
    "</label>" +
    '<div class="col-sm-9">' +
    '<div id="BgRgb" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
          '<input type="text" name="BgRgb" value="#ffffff" class="form-control">' +
          '<span class="input-group-addon"><i style="background-color: #ffffff;"></i></span>' +
      '</div>' +
    "</div>" +
    "</div>" +
    // TitleBgRgb
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelTitleBgRgb +
    "</label>" +
    '<div class="col-sm-9">' +
    '<div id="TitleBgRgb" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
          '<input type="text" name="TitleBgArgb" value="#000000" class="form-control">' +
          '<span class="input-group-addon"><i style="background-color: #000000;"></i></span>' +
      '</div>' +
    "</div>" +
    "</div>" +
    // TitleShow
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelTitleShow +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="checkbox" name="ShowTitle" id="ShowTitle" value="true">' +
    "</div>" +
    "</div>" +
    "</div>";
    form.append(fieldset);

    $.showPageDialog(
        $data.dialodTitle,
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
                    if ($('#add_summary').valid()) {
                        var $this = $(this),
                            inputs = $("#add_summary"),
                            file = document.getElementById('Image'),
                            dataserialize = inputs.serializeObject(),
                            name,
                            description,
                            rowSpan,
                            colSpan,
                            model = new FormData();

                        name = $currentCulture === 'ro' ? dataserialize.NameRo : dataserialize.NameEn;
                        description = $currentCulture === 'ro' ? dataserialize.DescriptionRo : dataserialize.DescriptionEn;

                        switch ($('#gridSize:checked').val()) {
                            case 'small':
                                rowSpan = 1, colSpan = 1;
                                break;
                            case 'width':
                                rowSpan = 1, colSpan = 2;
                                break;
                            case 'height':
                                rowSpan = 2, colSpan = 1;
                                break;
                            case 'large':
                                rowSpan = 2, colSpan = 2;
                                break;
                        }

                        model.append('Name', name);
                        model.append('NameRo', dataserialize.NameRo);
                        model.append('NameEn', dataserialize.NameEn);
                        model.append('Description', description);
                        model.append('DescriptionRo', dataserialize.DescriptionRo);
                        model.append('DescriptionEn', dataserialize.DescriptionEn);
                        model.append('HasImage', false);
                        model.append('Image', file.files[0]);
                        model.append('Position', dataserialize.Position);
                        model.append('BgRgb', dataserialize.BgRgb.replace("#", ""));
                        model.append('TitleBgArgb', dataserialize.TitleBgArgb.replace("#", ""));
                        model.append('ShowTitle', $("#ShowTitle").val());
                        model.append('RowSpan', rowSpan);
                        model.append('ColSpan', colSpan);

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
                                    var row = $data.table.rows().nodes();
                                    $(row).addClass("col-lg-2 col-md-4 col-sm-6 col-xs-12");
                                    $(row).hover(function () {
                                        $('.action_block', this).slideDown("fast");
                                    }, function () {
                                        $('.action_block', this).slideUp("fast");
                                    });
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
            },
        },
        "add_summary_dialog"
    );


    // preview image after upload
    if (window.File && window.FileList && window.FileReader) {
        $("#Image").on("change", function (e) {
            var files = e.target.files,
              filesLength = files.length;
            $(".pip").remove();
            $("#img_preview").append('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    var file = e.target;
                    $("#img_preview").append('<div class="pip">' +
                      '<img class="imageThumb" src="' + e.target.result + '" title="' + file.name + '" />' +
                      '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                      '</div>');
                    $(".remove").click(function () {
                        $(this).parent(".pip").remove();
                        $("#Image").val("");
                    });
                    if ($('.pip').length > 0) {
                        $('.loading_img').hide();
                    };
                });
                fileReader.readAsDataURL(f);
            }
        });
    }
    else {
        console.log("Your browser doesn't support to File API")
    }

   // validate
    if ($currentCulture === 'ro') {
        $("#add_summary")
            .validate({
                rules: {
                    NameRo: {
                        required: true,
                        maxlength: 50
                    },
                    NameEn: {
                        required: true,
                        maxlength: 50
                    },
                    Position: {
                        required: true
                    }
                },
                messages: {
                    NameRo: {
                        required: $data.validateMessage.Name,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    NameEn: {
                        required: $data.validateMessage.Name,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    Position: {
                        required: $data.validateMessage.Position
                    }
                }
            });
    }
    else {
        $("#add_summary")
            .validate({
                rules: {
                    NameEn: {
                        required: true,
                        maxlength: 50
                    },
                    Position: {
                        required: true
                    }
                },
                messages: {
                    NameEn: {
                        required: $data.validateMessage.Name,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    Position: {
                        required: $data.validateMessage.Position
                    }
                }
            });
    }
    // IsVisible, IsReadonly, Required
    $("[name='ShowTitle']").bootstrapSwitch({
        state: true,
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

    // Bg rgba field
    $(function () {
        $("#BgRgb").colorpicker();
    });
    // title Bg rgba field
    $(function () {
        $("#TitleBgRgb").colorpicker();
    });
}

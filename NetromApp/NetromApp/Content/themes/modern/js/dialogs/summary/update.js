function UpdateSummaryDialog($data) {
    var form,
        icon_id,
        icon_name,
        icon_value,
        bgRgb,
        titleBgArgb,
        position,
        showTitle,
        hasImage,
        smallCheckbox = !$.isEmpty($data.datas.TileRenderDetail) && $data.datas.TileRenderDetail.ColSpan === 1 && $data.datas.TileRenderDetail.RowSpan === 1 ? 'checked' : '',
        widthCheckbox = !$.isEmpty($data.datas.TileRenderDetail) && $data.datas.TileRenderDetail.ColSpan === 2 && $data.datas.TileRenderDetail.RowSpan === 1 ? 'checked' : '',
        heightCheckbox = !$.isEmpty($data.datas.TileRenderDetail) && $data.datas.TileRenderDetail.ColSpan === 1 && $data.datas.TileRenderDetail.RowSpan === 2 ? 'checked' : '',
        largeCheckbox = !$.isEmpty($data.datas.TileRenderDetail) && $data.datas.TileRenderDetail.ColSpan === 2 && $data.datas.TileRenderDetail.RowSpan === 2 ? 'checked' : '';

    form = $("<form/>",
                    {
                        id: "update_summary"
                    });
    console.log($data.datas)
    // $currentCulture is set in _Layout header
    var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    icon_id = !$.isEmpty($data.datas.TileRenderDetail) && !$.isEmpty($data.datas.TileRenderDetail.Icons) ? $data.datas.TileRenderDetail.Icons.Id : '';
    icon_name = !$.isEmpty($data.datas.TileRenderDetail) && !$.isEmpty($data.datas.TileRenderDetail.Icons) ? $data.datas.TileRenderDetail.Icons.Name : '';
    icon_value = !$.isEmpty($data.datas.TileRenderDetail) && !$.isEmpty($data.datas.TileRenderDetail.Icons) ? $data.datas.TileRenderDetail.Icons.Code : '';
    position = !$.isEmpty($data.datas.TileRenderDetail) ? $data.datas.TileRenderDetail.Position : 1;
    showTitle = !$.isEmpty($data.datas.TileRenderDetail) ? $data.datas.TileRenderDetail.ShowTitle : false;
    bgRgb = !$.isEmpty($data.datas.TileRenderDetail) && !$.isEmpty($data.datas.TileRenderDetail.BgRgb) ? $data.datas.TileRenderDetail.BgRgb : 'ffffff';
    titleBgArgb = !$.isEmpty($data.datas.TileRenderDetail) && !$.isEmpty($data.datas.TileRenderDetail.TitleBgArgb) ? $data.datas.TileRenderDetail.TitleBgArgb : '000000';
    hasImage = !$.isEmpty($data.datas.TileRenderDetail) ? $data.datas.TileRenderDetail.HasImage : false;

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<div class="col-sm-4">' +
        "</div>" +
        "</div>" +
        // Name
        '<div class="form-group" id="input_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">';
    for (var i = 0; i < lang.length; i++) {
        var culture = lang[i].capitalize();
        var label = $data.label.LabelNameEn;
        var value = !$.isEmpty($data.datas.NameLanguageResource) && !$.isEmpty($data.datas.NameLanguageResource.En) ? $data.datas.NameLanguageResource.En : '';
        var first_field_id = i === 0 ? 'firstFieldName' : '';
        if (culture === 'Ro') {
            var label = $data.label.LabelNameRo;
            var value = !$.isEmpty($data.datas.NameLanguageResource) && !$.isEmpty($data.datas.NameLanguageResource.Ro) ? $data.datas.NameLanguageResource.Ro : '';
        }
        fieldset += '<div class="input_group"><input type="text" name="Name' + culture + '" value="' + $.nullToEmptyString(value) + '" class="form-control" id="' + first_field_id + '" placeholder="' + label + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span><span class="mandatory_field">*</span></div>';
    }
    fieldset += "</div>" +
    "</div>" +
    // Description
    '<div class="form-group" id="input_group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelDescription +
    "</label>" +
    '<div class="col-sm-9">';
    for (var i = 0; i < lang.length; i++) {
        var culture = lang[i].capitalize();
        var label = $data.label.LabelDescriptionEn;
        var value = !$.isEmpty($data.datas.DescriptionLanguageResource) && !$.isEmpty($data.datas.DescriptionLanguageResource.En) ? $data.datas.DescriptionLanguageResource.En : '';
        if (culture === 'Ro') {
            var label = $data.label.LabelDescriptionRo;
            var value = !$.isEmpty($data.datas.DescriptionLanguageResource) && !$.isEmpty($data.datas.DescriptionLanguageResource.Ro) ? $data.datas.DescriptionLanguageResource.Ro : '';
        }
        fieldset += '<textarea name="Description' + culture + '" class="form-control" id="Description' + culture + '" placeholder="' + label + '">' + value + '</textarea><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
    }
    fieldset += "</div>" +
       "</div>" +
    // Image
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelImage +
    "</label>" +
    '<div class="col-sm-9" id="img_preview">' +
    '<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="Image" id="Image" /></span>';
    if (hasImage) {
        fieldset += '<div class="pip">' +
                          '<img class="imageThumb" src="' + $data.getImageRender + '" />' +
                          '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                          '</div>';
    }
    fieldset += "</div>" +
    "</div>" +
    // Position
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelPosition +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="Position" value="' + position + '" class="form-control" value="17" id="Position" placeholder="">' +
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
            '<input type="radio" id="gridSize" name="gridSize" value="small" ' + smallCheckbox + ' />' +
            '<div class="img"></div>' +
            '</label>' +
        '</div>' +
        '<div class="grid width">' +
            '<label>' +
            '<input type="radio" id="gridSize" name="gridSize" value="width" ' + widthCheckbox + '/>' +
            '<div class="img"></div>' +
            '</label>' +
        '</div>' +
        '<div class="grid height">' +
            '<label>' +
            '<input type="radio" id="gridSize" name="gridSize" value="height" ' + heightCheckbox + '/>' +
            '<div class="img"></div>' +
            '</label>' +
        '</div>' +
        '<div class="grid large">' +
            '<label>' +
            '<input type="radio" id="gridSize" name="gridSize" value="large" ' + largeCheckbox + '/>' +
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
          '<input type="text" name="BgRgb" value="' + bgRgb + '" class="form-control">' +
          '<span class="input-group-addon"><i style="background-color: #' + bgRgb + ';"></i></span>' +
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
          '<input type="text" name="TitleBgArgb" value="' + titleBgArgb + '" class="form-control">' +
          '<span class="input-group-addon"><i style="background-color: #' + titleBgArgb + ';"></i></span>' +
      '</div>' +
    "</div>" +
    "</div>" +
    // TitleShow
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelTitleShow +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="checkbox" name="ShowTitle" id="ShowTitle" value="' + showTitle + '">' +
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
                    if ($('#update_summary').valid()) {
                        var $this = $(this),
                            rowSpan,
                            colSpan,
                            file = document.getElementById('Image'),
                            name,
                            description,
                            model = new FormData(),
                            dataserialize = $("#update_summary").serializeObject();
                            ;

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

                        model.append('Id', $data.datas.Id);
                        model.append('NameResId', $data.datas.NameResId);
                        model.append('Name', name);
                        model.append('NameRo', dataserialize.NameRo);
                        model.append('NameEn', dataserialize.NameEn);
                        model.append('Description', description);
                        model.append('DescriptionResId', $data.datas.DescriptionResId);
                        model.append('DescriptionRo', dataserialize.DescriptionRo);
                        model.append('DescriptionEn', dataserialize.DescriptionEn);
                        model.append('Position', dataserialize.Position);
                        model.append('TileRenderDetailId', $data.datas.TileRenderDetailId);
                        model.append('BgRgb', dataserialize.BgRgb.replace("#", ""));
                        model.append('TitleBgArgb', dataserialize.TitleBgArgb.replace("#", ""));
                        model.append('ShowTitle', $("#ShowTitle").val());
                        model.append('HasImage', hasImage);
                        model.append('RowSpan', rowSpan);
                        model.append('ColSpan', colSpan);
                        if (file.files.length != 0) {
                            model.append('Image', file.files[0]);
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
                                    $data.row.data(record);
                                    $data.table.ajax.reload(null, false); // user paging is not reset on reload
                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
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
        "update_summary_dialog"
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
                        $data.datas.TileRenderDetail.HasImage = false;
                        $("#Image").val("");
                    });
                    if ($('.pip').length > 0) {
                        $('.loading_img').hide();
                    };
                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
        console.log("Your browser doesn't support to File API")
    }
    $(".remove").click(function () {
        $(this).parent(".pip").remove();
        $("#Image").val("");
        $data.datas.TileRenderDetail.HasImage = false;
    });

    // validate
    if ($currentCulture === 'ro') {
        $("#update_summary")
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
        $("#update_summary")
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
        state: !$.isEmpty($data.datas.TileRenderDetail) ? $data.datas.TileRenderDetail.ShowTitle : false,
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
function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
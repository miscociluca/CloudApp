function AddPackageDialog($data) {
    var position;
    var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var getLastPosition = function (datas) {
        if (datas.length > 0) {
            var sortByPosition = function SortByPosition(a, b) {
                var aPos = a.TileRenderDetail.Position;
                var bPos = b.TileRenderDetail.Position;
                return ((aPos < bPos) ? -1 : ((aPos > bPos) ? 1 : 0));
            };
            datas.sort(sortByPosition);

            var lastIndex = datas.length - 1;
            return datas[lastIndex].TileRenderDetail.Position;
        }
        return 0;
    };

    position = getLastPosition($data.datas) + 1;

    var form = $("<form/>",
                    {
                        id: "add_package_form"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<div class="col-sm-4">' +
        '<input type="hidden" name="Id" class="form-control" id="Id" placeholder="">' +
        "</div>" +
        "</div>" +
        // Unique name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelUniqueName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" class="form-control" id="Name" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        '<i class="fa fa-info-circle info" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="' + $data.label.InfoMsgUniqueName + '"></i>' +
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
    '<span class="btn btn-default btn-file">' +
    '<i class="fa fa-cloud-upload" aria-hidden="true"></i>' +
    '<input type="file" name="Image" id="Image" data-error="#errorExtension" />' +
    '</span>' +
    '<div id="errorExtension"></div>' +
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
		// Title
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
          '<input type="text" name="BgRgb" value="#000000" class="form-control">' +
          '<span class="input-group-addon"><i style="background-color: #000000;"></i></span>' +
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
          '<input type="text" name="TitleBgArgb" value="#ffffff" class="form-control">' +
          '<span class="input-group-addon"><i style="background-color: #ffffff;"></i></span>' +
      '</div>' +
    "</div>" +
        "</div>" +



    // Access right
    '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelAccessRight +
        "</label>" +
        '<div class="col-sm-9">' +
        '<div class="form-group groups_container">' +
        '<div class="group_from">' +
        '<select multiple="multiple" id="move_from" class="form-control">' +
        '</select>' +
        '</div>' +
        '<div class="group_arrows text-center">' +
        '<button id="btnAllRight"><i class="fa fa-angle-double-right" aria-hidden="true"></i></button>' +
        '<button id="btnRight"><i class="fa fa-angle-right" aria-hidden="true"></i></button>' +
        '<button id="btnLeft"><i class="fa fa-angle-left" aria-hidden="true"></i></button>' +
        '<button id="btnAllLeft"><i class="fa fa-angle-double-left" aria-hidden="true"></i></button>' +
        '</div>' +
        '<div class="group_to">' +
        '<select multiple="multiple" id="move_to" class="form-control">' +
        '</select>' +
        '</div>' +
        '</div>' +
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
                    if ($('#add_package_form').valid()) {
                        var $this = $(this),
                            groups = $("#move_to option"),
                            inputs = $("#add_package_form"),
                            file = document.getElementById('Image'),
                            //fileIcon = document.getElementById('ImageIcon'),
							dataserialize = inputs.serializeObject(),
							rowSpan,
							colSpan,
                            description,
                            model = new FormData();

						switch ($('#gridSize:checked').val()) {
							case 'small':
								rowSpan = 2, colSpan = 2;
								break;
							case 'width':
								rowSpan = 2, colSpan = 4;
								break;
							case 'height':
								rowSpan = 4, colSpan = 2;
								break;
							case 'large':
								rowSpan = 4, colSpan = 4;
								break;
						}

                        description = $currentCulture === 'ro' ? dataserialize.DescriptionRo : dataserialize.DescriptionEn;
                        if (dataserialize.Position <= position) {
                        model.append('Name', dataserialize.Name);
                        model.append('NameRo', dataserialize.NameRo);
                        model.append('NameEn', dataserialize.NameEn);
                        model.append('Description', description);
                        model.append('DescriptionRo', dataserialize.DescriptionRo);
                        model.append('DescriptionEn', dataserialize.DescriptionEn);
                        model.append('PackageTypeId', $data.packageTypeId);
                        model.append('HasImage', false);
                        model.append('Image', file.files[0]);
                        //model.append('ImageIcon', fileIcon.files[0]);
                        model.append('Position', dataserialize.Position);
						model.append('RowSpan', rowSpan);
						model.append('ColSpan', colSpan);
                        model.append('IconId', dataserialize.IconId);
                        model.append('BgRgb', dataserialize.BgRgb);
                        model.append('TitleBgArgb', dataserialize.TitleBgArgb);
						model.append('ShowTitle', true);
						model.append('RowSpan', rowSpan);
						model.append('ColSpan', colSpan);

                        if (!$.isEmpty(groups) && groups.length != 0) {
                            $.each(groups, function (index, option) {
                                model.append('GroupsId[]', option.value);
                            });
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
                                    $data.table.ajax.reload(null, false);

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
                        else
                        {
                            $.Notify({
                                caption: $data.notify.title,
                                content: $data.notify.ValidatePosition + " " + position,
                                type: 'alert'
                            });
                        }
                    }
                }
            }
        },
        "add_package_form"
    );

    // get all groups
    $.ajax({
        url: $data.getActionGroups,
        type: 'get',
        success: function (data) {
            if (data.status === 'OK') {
                var datas = data.data;
                var element = $('#move_from');
                if (datas.length > 0) {
                    $.each(datas, function (key, value) {
                        element.append('<option value="' + datas[key].Id + '">' + datas[key].Name + '</option>');
                    });
                } else {
                    element.append('<i class="empty_block">' + $data.label.EmptyMsgNoUserGroup + '</i>');
                }
                listbox();
            }
        }
    });

    // get icons
    $.ajax({
        url: $data.getIcons,
        type: "GET",
        beforeSend: function () {
            //$this.after('<i class="fa fa-cog fa-spin fa-2x fa-fw" id="mini_loader"></i>');
        },
        complete: function () {
            //$('#mini_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                var iconsList = $("#imageIcon");
                iconsList.append('<li><a data-icon-id="">' + $data.label.LabelNoIcon + '</a></li>')
                $.each(data.data, function (index, item) {
                    var img_url = $data.getIconImage + '/' + item.Id;
                    iconsList.append('<li><a data-icon-id="' + item.Id + '"><img src="' + img_url + '" /></a></li>');
                });
                $("#imageIcon > li a").on('click', function () {
                    var iconId = $(this).data('icon-id');
                    var importBtn = $('.icon_import');
                    if (!$.isEmpty(iconId)) {
                        $('#IconId').val(iconId);
                        importBtn.hide();
                        var img_url = $data.getIconImage + '/' + iconId;
                        $('#btnIcon').html('<img src="' + img_url + '" /><span class="caret"></span>');
                    } else {
                        $('#IconId').val('');
                        $("#ImageIcon").val("");
                        $(".image_icon_preview").remove();
                        $('#btnIcon').html($data.label.LabelIcon + '<span class="caret"></span>');
                        importBtn.show();
                    }
                })
            }
        }
    });

    // preview image icon after upload
    if (window.File && window.FileList && window.FileReader) {
        $("#ImageIcon").on("change", function (e) {
            $('.loading_img').remove();
            var files = e.target.files,
              filesLength = files.length;
            $(".image_icon_preview").remove();
            $(".icon_import").append('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    $("#img_preview").append('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

                    var file = e.target;
                    var fileExt = f.name.match(/\.(.+)$/)[1];
                    var acceptedExtension = ['jpg', 'jpeg', 'png'];

                    if ($.inArray(fileExt, acceptedExtension) != -1) {
                        $(".icon_import").append('<div class="image_icon_preview">' +
                          '<img class="imageThumb" src="' + e.target.result + '" title="' + file.name + '" />' +
                          '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                          '</div>');
                        $(".remove").click(function () {
                            $(this).parent(".image_icon_preview").remove();
                            $("#ImageIcon").val("");
                        });
                        if ($('.image_icon_preview').length > 0) {
                            $('.loading_img').remove();
                        };
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

    $.validator.addMethod("noSpace", function (value, element) {
        return value.indexOf(" ") < 0 && value != "";
    });
    $.validator.addMethod("empty", function (value, element) {
        // remove success icon
        $('.checked').remove();
        return value !== "" ? true : false;
    });
    $.validator.addMethod("packageNameExists", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (value === obj.Name) {
                $('.checked').remove();
                exists = false;
                return;
            }
        });
        if (exists && $('.checked').length === 0) {
            $(element).after('<i class="fa fa-check checked" aria-hidden="true"></i>');
        }
        return exists;
    });
    // validate
    $("#add_package_form")
        .validate({
            rules: {
                Name: {
                    empty: true,
                    //noSpace: true,
                    packageNameExists: true,
                    maxlength: 50
                },
                NameRo: {
                    required: true,
                    maxlength: 50
                },
                NameEn: {
                    required: true,
                    maxlength: 50
                },
                Position: {
                    required: true,
                    number: true
                },
                Image: {
                    extension: "jpg|JPG|jpeg|JPEG|png|PNG"
                },
                ImageIcon: {
                    extension: "jpg|JPG|jpeg|JPEG|png|PNG"
                }
            },
            messages: {
                Name: {
                    empty: $data.validateMessage.UniqueName,
                    //noSpace: $data.validateMessage.InvalidUniqueName,
                    packageNameExists: $data.validateMessage.ExistUniqueName,
                    maxlength: $data.validateMessage.ValidateMaxLength
                },
                NameRo: {
                    required: $data.validateMessage.Name,
                    maxlength: $data.validateMessage.ValidateMaxLength
                },
                NameEn: {
                    required: $data.validateMessage.Name,
                    maxlength: $data.validateMessage.ValidateMaxLength
                },
                Position: {
                    required: $data.validateMessage.Position,
                    number: $data.validateMessage.Number
                },
                Image: {
                    extension: $data.validateMessage.Extension
                },
                ImageIcon: {
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
        $("#BgRgb").colorpicker({
            format: 'hex',
        });
    });
    // title Bg rgba field
    $(function () {
        $("#TitleBgRgb").colorpicker({
            format: 'hex',
        });
    });
    // tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

function AddPackageComponentDialog($data) {

    // $currentCulture is set in _Layout header
    var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    var position;
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
                       id: "add_package_component_form"
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
    // Plugins list
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelPlugin +
    "</label>" +
    '<div class="col-sm-9">' +
    '<select name="PluginId" id="plugin"><option></option></select>' +
    '<span class="mandatory_field_list">*</span>' +
    "</div>" +
    "</div>" +

'<div class="form-group" id="AnnexesName" style="display: none;">' +
'<label class="col-sm-3 control-label">' +
$data.label.LabelNameAnnex +
"</label>" +
'<div class="col-sm-9">' +
'<select name="UploadDocumentTypeId" id="annex"><option></option></select>' +
'<span class="mandatory_field_list">*</span>' +
"</div>" +
 "</div>" +


    // Image
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelImage +
    "</label>" +
    '<div class="col-sm-9" id="img_preview">' +
    '<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="Image" id="Image" data-error="#errorExtension" /></span>' +
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
    //// RowSpan
    //'<div class="form-group">' +
    //'<label class="col-sm-3 control-label">' +
    //$data.label.LabelRowSpan +
    //"</label>" +
    //'<div class="col-sm-9">' +
    //'<input type="text" name="RowSpan" class="form-control" value="2" id="RowSpan" placeholder="">' +
    //"</div>" +
    //"</div>" +
    //// ColSpan
    //'<div class="form-group">' +
    //'<label class="col-sm-3 control-label">' +
    //$data.label.LabelColSpan +
    //"</label>" +
    //'<div class="col-sm-9">' +
    //'<input type="text" name="ColSpan" class="form-control" value="2" id="ColSpan" placeholder="">' +
    //"</div>" +
    //"</div>" +
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
    // TitleShow
    //'<div class="form-group">' +
    //'<label class="col-sm-3 control-label">' +
    //$data.label.LabelComponentShow +
    //"</label>" +
    //'<div class="col-sm-9">' +
    //'<input type="checkbox" name="ShowTitle" id="ShowTitle" checked value="true">' +
    //"</div>" +
    //"</div>" +
    // Required
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelRequired +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="checkbox" name="Required" id="Required" checked value="true">' +
    "</div>" +
    "</div>" +
    // Document types
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelDocumentTypeAssociation +
    "</label>" +
    '<div class="col-sm-9">' +
    '<select name="DocumentTypeId" id="documentTypes"><option></option></select>' +
    '<span class="mandatory_field_list">*</span>' +
    "</div>" +
    "</div>" +
    

    // Access right
    '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelRoles +
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
        "</div>" +

        // Permissions
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelPermissions +
        "</label>" +
        '<div class="col-sm-9">' +
        '<div class="form-group groups_container">' +
        '<div class="group_from">' +
        '<select multiple="multiple" id="move_from2" class="form-control">' +
        '</select>' +
        '</div>' +
        '<div class="group_arrows text-center">' +
        '<button id="btnAllRight2"><i class="fa fa-angle-double-right" aria-hidden="true"></i></button>' +
        '<button id="btnRight2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>' +
        '<button id="btnLeft2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>' +
        '<button id="btnAllLeft2"><i class="fa fa-angle-double-left" aria-hidden="true"></i></button>' +
        '</div>' +
        '<div class="group_to">' +
        '<select multiple="multiple" id="move_to2" class="form-control">' +
        '</select>' +
        '</div>' +
        '</div>' +
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
                    if ($('#add_package_component_form').valid()) {
                        var $this = $(this),
                            inputs = $("#add_package_component_form"),
                            roles = $("#move_to option"),
                            permissions = $("#move_to2 option"),
                            file = document.getElementById('Image'),
                            dataserialize = inputs.serializeObject(),
                            name, description;

                        var model = new FormData();

                        name = $currentCulture === 'ro' ? dataserialize.NameRo : dataserialize.NameEn;
                        description = $currentCulture === 'ro' ? dataserialize.DescriptionRo : dataserialize.DescriptionEn;

                        model.append('Name', name);
                        model.append('NameRo', dataserialize.NameRo);
                        model.append('NameEn', dataserialize.NameEn);
                        model.append('Description', description);
                        model.append('DescriptionRo', dataserialize.DescriptionRo);
                        model.append('DescriptionEn', dataserialize.DescriptionEn);
                        model.append('HasImage', false);
                        model.append('Image', file.files[0]);
                        model.append('PluginId', dataserialize.PluginId);
                        model.append('UploadDocumentTypeId', dataserialize.UploadDocumentTypeId);
                        model.append('PackageId', $data.packageId);
                        model.append('Position', dataserialize.Position);
                        //model.append('RowSpan', dataserialize.RowSpan);
                        //model.append('ColSpan', dataserialize.ColSpan);
                        model.append('BgRgb', dataserialize.BgRgb);
                        model.append('TitleBgArgb', dataserialize.TitleBgArgb);
                        model.append('ShowTitle', true);
                        model.append('Required', $("#Required").val());
                        model.append('DocumentTypeId', dataserialize.DocumentTypeId);

                        if (!$.isEmpty(roles) && roles.length != 0) {
                            $.each(roles, function (index, option) {
                                model.append('RoleID[]', option.value);
                            });
                        }
                        if (!$.isEmpty(permissions) && permissions.length != 0) {
                            $.each(permissions, function (index, option) {
                                model.append('Permission_byte[]', option.value);
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
                }
            }
        },
        "add_package_component_form"
    );

    // get all roles
    $.ajax({
        url: $data.getUserRoles,
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
                    element.append('<i class="empty_block">' + $data.label.LabelEmptyMsgNoRole + '</i>');
                }
                listbox();
            }
        }
    });

    //get all permissions
    $.ajax({
        url: $data.getUserRoles,
        type: 'get',
        success: function (data) {
            var element = $('#move_from2');
            element.append('<option value="1">' + $data.label.LabelPermissionsVisible + '</option>');
            element.append('<option value="2">' + $data.label.LabelPermissionsReadOnly + '</option>');
            listbox2();
        }
    });


    // get all plugins
    $.ajax({
        url: $data.getAllPlugins,
        type: 'get',
        dataType: 'json',
        success: function (response) {
            if (response.status === 'OK') {
                datas = response.data;
                var element = $('#plugin');

                if (datas.length > 0) {
                    $.each(datas, function (key, value) {
                        element.append('<option value="' + value.Id + '" data-plugin-interface="' + value.PluginInterface +'">' + value.Name + '</option>');
                    });
                }
            }
        }
    });


    $("#plugin").change(function () {
        $("#AnnexesName").hide();
        var optiunePluginInterface = $("#plugin option:selected").data("plugin-interface");
       
        if (optiunePluginInterface === 'IPluginAttachments') {
            $("#AnnexesName").show();
        }
    });
    //get all annexes
    $.ajax({
        url: $data.getAllAnnexes,
        type: 'get',
        dataType: 'json',
        success: function (response) {
            if (response.status === 'OK') {
                datas = response.data;
                var element = $('#annex');

                if (datas.length > 0) {
                    $.each(datas, function (key, value) {
                        var selected = $data.datas.UploadDocumentTypeId == value.Id ? 'selected' : '';
                        element.append('<option value="' + value.Id + '" ' + selected + '>' + value.Name + '</option>');
                    });
                }
            }
        }
    });


    // get all document type
    $.ajax({
        url: $data.getAllDocumentsType,
        type: 'get',
        dataType: 'json',
        success: function (response) {
            if (response.status === 'OK') {
                datas = response.data;
                var element = $('#documentTypes');
                if (!$.isEmpty(datas) && datas.length > 0) {
                    $.each(datas, function (key, value) {
                        var valueName = $currentCulture === 'ro' ? value.NameLanguageResource.Ro : value.NameLanguageResource.En;
                        element.append('<option value="' + value.Id + '">' + valueName + '</option>');
                    });
                }
            }
        }
    });

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
                            $('.loading_img').hide();
                        };
                        return;
                    }
                    $('.loading_img').hide();
                });
                fileReader.readAsDataURL(f);
            }
        });
    }
    else {
        console.log("Your browser doesn't support to File API")
    }

    // validate
    $("#add_package_component_form")
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
                    required: true,
                    number: true
                },
                PluginId: {
                    required: true
                },
                DocumentTypeId: {
                    required: true
                },
                UploadDocumentTypeId: {
                    required: true
                },
                Image: {
                    extension: "jpg|JPG|jpeg|JPEG|png|PNG"
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
                    required: $data.validateMessage.Position,
                    number: $data.validateMessage.Number
                },
                PluginId: {
                    required: $data.validateMessage.Plugin
                },
                DocumentTypeId: {
                    required: $data.validateMessage.DocumentTypeId
                },
                UploadDocumentTypeId: {
                    required: true
                },
                Image: {
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

    // ShowTitle
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
    // Required
    $("[name='Required']").bootstrapSwitch({
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
}

function UpdatePackageComponentDialog($data) {
    var form, icon_id, icon_name, icon_value, bgRgb, titleBgArgb, description;

    form = $("<form/>",
                    {
                        id: "update_package_component"
                    });
    // $currentCulture is set in _Layout header
    var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    icon_id = !$.isEmpty($data.datas.TileRenderDetail.Icons) ? $data.datas.TileRenderDetail.Icons.Id : '';
    icon_name = !$.isEmpty($data.datas.TileRenderDetail.Icons) ? $data.datas.TileRenderDetail.Icons.Name : '';
    icon_value = !$.isEmpty($data.datas.TileRenderDetail.Icons) ? $data.datas.TileRenderDetail.Icons.Code : '';

    bgRgb = !$.isEmpty($data.datas.TileRenderDetail.BgRgb) ? $data.datas.TileRenderDetail.BgRgb : 'ffffff';
    titleBgArgb = !$.isEmpty($data.datas.TileRenderDetail.TitleBgArgb) ? $data.datas.TileRenderDetail.TitleBgArgb : '000000';

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
        var value = !$.isEmpty($data.datas.NameLanguageResource.En) ? $data.datas.NameLanguageResource.En : '';
        var first_field_id = i === 0 ? 'firstFieldName' : '';
        if (culture === 'Ro') {
            var label = $data.label.LabelNameRo;
            var value = !$.isEmpty($data.datas.NameLanguageResource.Ro) ? $data.datas.NameLanguageResource.Ro : '';
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
        var value = !$.isEmpty($data.datas.DescriptionLanguageResource) &&
            !$.isEmpty($data.datas.DescriptionLanguageResource.En) ? $data.datas.DescriptionLanguageResource.En : '';
        if (culture === 'Ro') {
            var label = $data.label.LabelDescriptionRo;
            var value = !$.isEmpty($data.datas.DescriptionLanguageResource) &&
                !$.isEmpty($data.datas.DescriptionLanguageResource.Ro) ? $data.datas.DescriptionLanguageResource.Ro : '';
        }
        fieldset += '<textarea name="Description' + culture + '" class="form-control" id="Description' + culture + '" placeholder="' + label + '">' + value + '</textarea><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
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
'<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="Image" id="Image" data-error="#errorExtension" /></span>';
    if ($data.datas.TileRenderDetail.HasImage) {

        fieldset += '<div class="pip">' +
                      '<img class="imageThumb" src="' + $data.getImageRender + '" />' +
                      '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                      '</div>';
    }
    fieldset += '<div id="errorExtension"></div>' +
"</div>" +
"</div>" +
// Position
'<div class="form-group">' +
'<label class="col-sm-3 control-label">' +
$data.label.LabelPosition +
"</label>" +
'<div class="col-sm-9">' +
'<input type="text" name="Position" value="' + $data.datas.TileRenderDetail.Position + '" class="form-control" value="17" id="Position" placeholder="">' +
'<span class="mandatory_field">*</span>' +
"</div>" +
"</div>" +
//// RowSpan
//'<div class="form-group">' +
//'<label class="col-sm-3 control-label">' +
//$data.label.LabelRowSpan +
//"</label>" +
//'<div class="col-sm-9">' +
//'<input type="text" name="RowSpan" value="' + $data.datas.TileRenderDetail.RowSpan + '" class="form-control" value="2" id="RowSpan" placeholder="">' +
//"</div>" +
//"</div>" +
//// ColSpan
//'<div class="form-group">' +
//'<label class="col-sm-3 control-label">' +
//$data.label.LabelColSpan +
//"</label>" +
//'<div class="col-sm-9">' +
//'<input type="text" name="ColSpan" value="' + $data.datas.TileRenderDetail.ColSpan + '" class="form-control" value="2" id="ColSpan" placeholder="">' +
//"</div>" +
//"</div>" +
// BgRgb
'<div class="form-group">' +
'<label class="col-sm-3 control-label">' +
$data.label.LabelBgRgb +
"</label>" +
'<div class="col-sm-9">' +
'<div id="BgRgb" class="col-lg-9 input-group colorpicker-component colorpicker-element">' +
      '<input type="text" name="BgRgb" value="' + bgRgb + '" class="form-control">' +
      '<span class="input-group-addon"><i style="background-color: ' + bgRgb + ';"></i></span>' +
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
      '<span class="input-group-addon"><i style="background-color: ' + titleBgArgb + ';"></i></span>' +
  '</div>' +
"</div>" +
"</div>" +
// TitleShow
//'<div class="form-group">' +
//'<label class="col-sm-3 control-label">' +
//$data.label.LabelComponentShow +
//"</label>" +
//'<div class="col-sm-9">' +
//'<input type="checkbox" name="ShowTitle" id="ShowTitle" value="' + $data.datas.TileRenderDetail.ShowTitle + '">' +
//"</div>" +
//"</div>" +
// Required
'<div class="form-group">' +
'<label class="col-sm-3 control-label">' +
$data.label.LabelRequired +
"</label>" +
'<div class="col-sm-9">' +
'<input type="checkbox" name="Required" id="Required" value="' + $data.datas.Required + '">' +
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
                    if ($('#update_package_component').valid()) {
                        var $this = $(this);
                        var roles = $("#move_to option");
                        var permissions = $("#move_to2 option");
                        var inputs = $("#update_package_component");
                        var file = document.getElementById('Image');
                        var dataserialize = inputs.serializeObject();
                        var name, description;

                        var model = new FormData();

                        name = $currentCulture === 'ro' ? dataserialize.NameRo : dataserialize.NameEn;
                        description = $currentCulture === 'ro' ? dataserialize.DescriptionRo : dataserialize.DescriptionEn;

                        model.append('Id', $data.datas.Id);
                        model.append('NameResId', $data.datas.NameResId);
                        model.append('Name', name);
                        model.append('NameRo', dataserialize.NameRo);
                        model.append('NameEn', dataserialize.NameEn);
                        model.append('Description', description);
                        model.append('DescriptionResId', $data.datas.DescriptionResId);
                        model.append('DescriptionRo', dataserialize.DescriptionRo);
                        model.append('DescriptionEn', dataserialize.DescriptionEn);
                        model.append('PluginId', dataserialize.PluginId);
                        model.append('UploadDocumentTypeId', dataserialize.UploadDocumentTypeId);
                        model.append('PackageId', $data.packageId);
                        model.append('Position', dataserialize.Position);
                        model.append('RowSpan', dataserialize.RowSpan);
                        model.append('ColSpan', dataserialize.ColSpan);
                        model.append('TileRenderDetailId', $data.datas.TileRenderDetailId);
                        model.append('BgRgb', dataserialize.BgRgb);
                        model.append('TitleBgArgb', dataserialize.TitleBgArgb);
                        model.append('ShowTitle', true);
                        model.append('Required', $("#Required").val());
                        model.append('HasImage', $data.datas.TileRenderDetail.HasImage);
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
                                    $data.table.ajax.reload(null, false);
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
            }
        },
        "update_package_component_dialog"
    );


   	// get ROLES

    $.ajax({
        url: $data.getUserRoles,
        type: 'get',
        success: function (data) {
            if (data.status === 'OK') {
                var datas = data.data;
                if (datas.length > 0) {
                    var roles = $data.datas.ComponentRights,
                        element_from = $('#move_from'),
                        element_to = $('#move_to'),
                        newRoles = [];

                    $.each(datas, function (i, item) {
                        var find = false;
                        $.each(roles, function (j, secondItem) {
                            if (item.Id == secondItem.RoleId) {
                                find = true;
                                return false;
                            }
                        });
                        if (!find) {
                            newRoles.push(item);
                        }
                    });

                    $.each(newRoles, function (key, value) {
                        element_from.append('<option value="' + value.Id + '">' + value.Name + '</option>');
                    });
                    $.each(roles, function (k, v) {
                        var roleName = $.lookup(datas, 'Id', v.RoleId);
                        element_to.append('<option value="' + v.RoleId + '">' + roleName.Name + '</option>');
                    });
                } else {
                    element_from.append('<i class="empty_block">' + $data.label.LabelEmptyMsgNoRole + '</i>');
                }
                listbox();
            }
        }
    });


    //get permissions
    $.ajax({
        url: $data.getUserRoles,
        type: 'get',
        success: function (data) {
            if (data.status === 'OK') {
                var datas = [1,2];//de adaugat in continuare
                if (datas.length > 0) {
                    var permissions = $data.datas.ComponentRights,
                        element_from = $('#move_from2'),
                        element_to = $('#move_to2'),
                        newPermissions = [];

                    $.each(datas, function (i, item) {
                        var find = false;
                        $.each(permissions, function (j, secondItem) {
                            if (secondItem.Permission_byte.indexOf(item) >= 0) {
                                find = true;
                                return false;
                            }
                        });
                        if (!find) {
                            newPermissions.push(item);
                        }
                    });

                    $.each(newPermissions, function (key, value) {
                        var optiune = "";
                        if (value==1) {
                            optiune = $data.label.LabelPermissionsVisible;
                        }
                        else if (value == 2) {
                            optiune = $data.label.LabelPermissionsReadOnly;
                        }
                        element_from.append('<option value="' + value + '">' + optiune + '</option>');
                    });
                    var Option1Used = false;
                    var Option2Used = false;
                    $.each(permissions, function (k, v) {
                        var permissionName = $.lookup(datas, 'Id', v.Permission_byte);
                        var optiune = "";
                        

                        if (v.Permission_byte.indexOf("1") >= 0 && v.Permission_byte.indexOf("2") >= 0) {
                            var optiune1 = $data.label.LabelPermissionsVisible;
                            var optiune2 = $data.label.LabelPermissionsReadOnly;
                            element_to.append('<option value="1">' + optiune1 + '</option>');
                            element_to.append('<option value="2">' + optiune2 + '</option>');
                            return false;
                        }
                        if (v.Permission_byte == "1" && !Option1Used){
                            optiune = $data.label.LabelPermissionsVisible;
                            element_to.append('<option value="' + v.Permission_byte + '">' + optiune + '</option>');
                            Option1Used = true;
                            return;
                        }
                        if (v.Permission_byte == "2" && !Option2Used) {
                            optiune = $data.label.LabelPermissionsReadOnly;
                            element_to.append('<option value="' + v.Permission_byte + '">' + optiune + '</option>');
                            Option2Used = true;
                            return;
                        }
                    });
                } 
                listbox2();
            }
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
                        var selected = $data.datas.PluginId == value.Id ? 'selected' : '';
                        element.append('<option value="' + value.Id + '" ' + selected + '" data-plugin-interface="' + value.PluginInterface + '">' + value.Name + '</option>');
                    });
                }
                var help = $data.datas.PluginId;
                $("#plugin").val(help);
               
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

                if (datas.length > 0) {
                    $.each(datas, function (key, value) {
                        var valueName = $currentCulture === 'ro' ? value.NameLanguageResource.Ro : value.NameLanguageResource.En;
                        var selected = $data.datas.DocumentTypeId == value.Id ? 'selected' : '';
                        element.append('<option value="' + value.Id + '" ' + selected + '>' + valueName + '</option>');
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
    } else {
        console.log("Your browser doesn't support to File API")
    }
    $(".remove").click(function () {
        $(this).parent(".pip").remove();
        $("#Image").val("");
        $data.datas.TileRenderDetail.HasImage = false;
    });

    // validate
    $("#update_package_component")
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


    // IsVisible, IsReadonly, Required
    $("[name='ShowTitle']").bootstrapSwitch({
        state: $data.datas.TileRenderDetail.ShowTitle,
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
        state: $data.datas.Required,
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
function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
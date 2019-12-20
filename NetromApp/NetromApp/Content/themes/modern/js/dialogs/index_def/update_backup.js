function UpdateIndexDefDialog_backup($data) {

    var $scriptShowValue = {
        ValidationScript: $data.data.ValidationScript != null ? 'block' : 'none',
        LoadScript: $data.data.LoadScript != null ? 'block' : 'none',
        VisibleScript: $data.data.VisibleScript != null ? 'block' : 'none',
        ReadonlyScript: $data.data.ReadonlyScript != null ? 'block' : 'none'
    };

    $data.data = nullToString($data.data);

    var form = $("<form/>",
                    {
                        id: "updateindexdef"
                    });
    var disabled = $data.data.AsocIndex != "" ? "" : 'disabled';

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<input type="hidden" name="Id" value="' + $data.data.Id + '" class="form-control" id="Id" placeholder="">' +
        '<input type="hidden" name="DocumentTypeVersionId" value="' + $data.documentTypeId + '" class="form-control" id="Id" placeholder="">' +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // display name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDisplayName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="DisplayName" value="' + $data.data.DisplayName + '" class="form-control" id="DisplayName" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // External Name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelExternalName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="ExternalName" value="' + $data.data.ExternalName + '" class="form-control" id="ExternalName" placeholder="">' +
        "</div>" +
        "</div>" +
        // Type
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelType +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select name="Type" id="Type">';
    $.each($data.types, function (key, value) {
        var selected = $data.types[key].Id == $data.data.Type ? "selected" : "";
        fieldset += '<option value="' + $data.types[key].Id + '" ' + selected + '>' + $data.types[key].Name + '</option>';
    });
    fieldset += '</select>' +
    "</div>" +
    "</div>" +
    // Size
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelSize +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="Size" value="' + $data.data.Size + '" class="form-control" id="Size" placeholder="">' +
    '<span class="mandatory_field">*</span>' +
    "</div>" +
    "</div>" +
    // Position
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelPosition +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="Position" value="' + $data.data.Position + '" class="form-control" id="Position" placeholder="">' +
    "</div>" +
    "</div>" +
    // GridRow
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelGridRow +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="GridRow" value="' + $data.data.GridRow + '" class="form-control" id="GridRow" placeholder="">' +
    "</div>" +
    "</div>" +
    // GridColumn
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelGridColumn +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="GridColumn" value="' + $data.data.GridColumn + '" class="form-control" id="GridColumn" placeholder="">' +
    "</div>" +
    "</div>" +
    // GroupName
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelGroupName +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="GroupName" value="' + $data.data.GroupName + '" class="form-control" id="GroupName" placeholder="">' +
    "</div>" +
    "</div>" +
    // checkboxes
    '<div class="form-group checkbox_group">' +
        '<div class="col-lg-4">' +
        '<label>' +
        $data.label.LabelIsVisible +
        "</label>" +
        '<input type="checkbox" name="IsVisible" value="' + $data.data.IsVisible + '">' +
        '</div>' +
        // IsReadonly
        '<div class="col-lg-4">' +
        '<label>' +
        $data.label.LabelIsReadonly +
        "</label>" +
        '<input type="checkbox" name="IsReadonly" value="' + $data.data.IsReadonly + '">' +
        "</div>" +
        // Required
        '<div class="col-lg-4">' +
        '<label>' +
        $data.label.LabelRequired +
        "</label>" +
        '<input type="checkbox" name="Required" value="' + $data.data.Required + '">' +
        "</div>" +
    "</div>" +
    // DefaultValue
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelDefaultValue +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="text" name="DefaultValue" value="' + $data.data.DefaultValue + '" class="form-control" id="DefaultValue" placeholder="">' +
    "</div>" +
    "</div>" +
    // ValidationScript
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelValidationScript +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="checkbox" name="CheckValidationScript" value="' + $data.data.ValidationScript + '">' +
    '<textarea name="ValidationScript" id="validationScriptValue" style="display:' + $scriptShowValue.ValidationScript + '">' + $data.data.ValidationScript + '</textarea>' +
    "</div>" +
    "</div>" +
    // LoadScript
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelLoadScript +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="checkbox" name="CheckLoadScript" value="' + $data.data.LoadScript + '">' +
    '<textarea name="LoadScript" id="loadScriptValue" style="display:' + $scriptShowValue.LoadScript + '">' + $data.data.LoadScript + '</textarea>' +
    "</div>" +
    "</div>" +
    // VisibleScript
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelVisibleScript +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="checkbox" name="CheckVisibleScript" value="' + $data.data.VisibleScript + '">' +
    '<textarea name="VisibleScript" id="visibleScriptValue" style="display:' + $scriptShowValue.VisibleScript + '">' + $data.data.VisibleScript + '</textarea>' +
    "</div>" +
    "</div>" +
    // ReadonlyScript
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelReadonlyScript +
    "</label>" +
    '<div class="col-sm-9">' +
    '<input type="checkbox" name="CheckReadonlyScript" value="' + $data.data.ReadonlyScript + '">' +
    '<textarea name="ReadonlyScript" id="readonlyScriptValue" style="display:' + $scriptShowValue.ReadonlyScript + '">' + $data.data.ReadonlyScript + '</textarea>' +
    "</div>" +
    "</div>" +
    // DocumentTypeVersionId
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelDocumentTypeVersion +
    "</label>" +
    '<div class="col-sm-7">' +
    '<select id="dt">' +
    '<option></option>';
    $.each($data.docmentTypeList, function (key, value) {
        //var selected = $data.data.DocumentTypeVersionId == $data.docmentTypeList[key].Id ? "selected" : "";
        fieldset += '<option value="' + $data.docmentTypeList[key].Id + '">' + $data.docmentTypeList[key].DocumentType.Name + '</option>';
    });
    fieldset += '</select>' +
    "</div>" +
    "</div>" +
     // AsocIndex
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    $data.label.LabelAsocIndex +
    "</label>" +
    '<div class="col-sm-9">' +
    '<select name="AsocIndex" id="AsocIndex" ' + disabled + '>' +
    '<option></option>' +
    '</select>' +
    "</div>" +
    "</div>" +
    // OnchangeCallws
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelOnchangeCallws +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="OnchangeCallws" value="' + $data.data.OnchangeCallws + '">' +
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
                    if ($('#updateindexdef').valid()) {
                        var dataserialize = $("#updateindexdef").serializeObject();

                        if (!$("[name='CheckValidationScript']").is(':checked')) {
                            dataserialize.ValidationScript = null;
                        }
                        if (!$("[name='CheckLoadScript']").is(':checked')) {
                            dataserialize.LoadScript = null;
                        }
                        if (!$("[name='CheckVisibleScript']").is(':checked')) {
                            dataserialize.VisibleScript = null;
                        }
                        if (!$("[name='CheckReadonlyScript']").is(':checked')) {
                            dataserialize.ReadonlyScript = null;
                        }

                        $.ajax({
                            url: $data.postAction,
                            type: 'post',
                            dataType: 'json',
                            data: JSON.stringify(dataserialize),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                var success = data.status;
                                var record = data.data;
                                if (success === 'OK') {
                                    $data.row.data(record);
                                }
                            }
                        });
                        $(this).dialog('close');
                    }
                }
            }
        },
        "update_index_def_dialog"
    );

    $("#dt").change(function () {
        var $this = $(this);
        var documentTypeId = $this.find(":selected").val();
        if (documentTypeId === "") {
            return;
        }

        $.ajax({
            url: $data.postIndexByDocumentTypeAction + "/" + documentTypeId,
            type: "GET",
            beforeSend: function () {
                $this.after('<i class="fa fa-cog fa-spin fa-2x fa-fw" id="mini_loader"></i>');
            },
            complete: function () {
                $('#mini_loader').remove();
            },
            success: function (data) {
                if (data.Success === "OK") {
                    if (data.Records.length > 0) {
                        $("#AsocIndex option").remove();
                        $('#AsocIndex').prop('disabled', false);
                        $("#AsocIndex").append($("<option></option>"));

                        $.each(data.Records, function (index, item) {
                            $("#AsocIndex").append(
                                $("<option></option>")
                                .text(item.Name)
                                .val(item.Id)
                            );
                        });
                    } else {
                        $('#AsocIndex').prop('disabled', true);
                        $("#AsocIndex option").remove();
                    }
                }
            }
        });
    });

    $("#update_index_def")
        .validate({
            rules: {
                Name: {
                    required: true
                },
                DisplayName: {
                    required: true
                },
                Size: {
                    required: true
                }
            },
            messages: {
                Name: {
                    required: $data.validateMessage.Name
                },
                DisplayName: {
                    required: $data.validateMessage.DisplayName
                },
                Size: {
                    required: $data.validateMessage.Size
                }
            }
        });


    $('input[type=checkbox]').each(function (i) {
        $(this).attr('checked', true);
    });
    // IsVisible, IsReadonly, Required
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
    $("[name='IsReadonly']").bootstrapSwitch({
        state: $data.data.IsReadonly,
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
    $("[name='Required']").bootstrapSwitch({
        state: $data.data.Required,
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
    $("[name='CheckValidationScript']").bootstrapSwitch({
        state: $data.data.ValidationScript,
        size: 'mini',
        onColor: 'success',
        onText: $data.checkboxOnOff.on,
        offText: $data.checkboxOnOff.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                $("#validationScriptValue").show();
                return;
            }
            $("#validationScriptValue").hide();
            $(this).attr("value", 'false');
        }
    });
    $("[name='CheckLoadScript']").bootstrapSwitch({
        state: $data.data.LoadScript,
        size: 'mini',
        onColor: 'success',
        onText: $data.checkboxOnOff.on,
        offText: $data.checkboxOnOff.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                $("#loadScriptValue").show();
                return;
            }
            $("#loadScriptValue").hide();
            $(this).attr("value", 'false');
        }
    });
    $("[name='CheckVisibleScript']").bootstrapSwitch({
        state: $data.data.VisibleScript,
        size: 'mini',
        onColor: 'success',
        onText: $data.checkboxOnOff.on,
        offText: $data.checkboxOnOff.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                $("#visibleScriptValue").show();
                return;
            }
            $("#visibleScriptValue").hide();
            $(this).attr("value", 'false');
        }
    });
    $("[name='CheckReadonlyScript']").bootstrapSwitch({
        state: $data.data.ReadonlyScript,
        size: 'mini',
        onColor: 'success',
        onText: $data.checkboxOnOff.on,
        offText: $data.checkboxOnOff.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                $("#readonlyScriptValue").show();
                return;
            }
            $("#readonlyScriptValue").hide();
            $(this).attr("value", 'false');
        }
    });
    $("[name='OnchangeCallws']").bootstrapSwitch({
        state: $data.data.OnchangeCallws,
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

function UpdateIndexDefDialog($data) {
    $data.data = nullToString($data.data);

    var $scriptShowValue = {
        ValidationScript: !isEmpty($data.data.ValidationScript) ? 'block' : 'none',
        ValidationScriptStatus: !isEmpty($data.data.ValidationScript) ? true : false,
        LoadScript: !isEmpty($data.data.LoadScript) ? 'block' : 'none',
        LoadScriptStatus: !isEmpty($data.data.LoadScript) ? true : false,
        VisibleScript: !isEmpty($data.data.VisibleScript) ? 'block' : 'none',
        VisibleScriptStatus: !isEmpty($data.data.VisibleScript) ? true : false,
        ReadonlyScript: !isEmpty($data.data.ReadonlyScript) ? 'block' : 'none',
        ReadonlyScriptStatus: !isEmpty($data.data.ReadonlyScript) ? true : false
    };

    var $assocIndexArray = $data.data.AsocIndex.split('+');
    var $AsocIndex = {
        UseAssocIndex: $assocIndexArray.length > 1 ? true : false,
        AsocIndex: $assocIndexArray.length > 1 ? 'block' : 'none'
    };

    var $IsVisibleChecked = $data.data.IsVisible ? 'checked' : '';
    var $IsReadonlyChecked = $data.data.IsReadonly ? 'checked' : '';
    var $IsRequiredchecked = $data.data.Required ? 'checked' : '';
    var $IsOnchangeCallws = $data.data.OnchangeCallws ? 'checked' : '';

    var disabled = $data.data.AsocIndex != "" ? "" : 'disabled';

    // $currentCulture is set in _Layout header
    var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    var displayOnPendingPackageIndexName = [
        {
            'value': 'last_name',
            'display': {
                'ro': 'Nume',
                'en': 'Last name'
            }
        },
        {
            'value': 'first_name',
            'display': {
                'ro': 'Prenume',
                'en': 'First name'
            }
        },
        {
            'value': 'ssn',
            'display': {
                'ro': 'CNP',
                'en': 'SSN'
            }
        },
        {
            'value': 'number',
            'display': {
                'ro': 'Numar',
                'en': 'Number'
            }
        },
        {
            'value': 'series',
            'display': {
                'ro': 'Serie',
                'en': 'Series'
            }
        },
        {
            'value': 'address',
            'display': {
                'ro': 'Adresa',
                'en': 'Address'
            }
        }
    ];

    var sealIndexDisabled = $.isEmpty($data.arhId) && $.isEmpty($data.docTypeId) ? 'disabled' : '';
    var IsSelectedADocumentType = false;
    var form = $("<form/>",
        {
            id: "updateindexdef"
        });
    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<div class="col-sm-4">' +
        '<input type="hidden" name="DocumentTypeId" value="' + $data.documentTypeId + '" class="form-control" id="Id" placeholder="">' +
        '<input type="hidden" name="Id" class="form-control" id="Id" value="' + $data.data.Id + '" placeholder="">' +
        "</div>" +
        "</div>" +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" class="form-control" id="Name" placeholder="" value="' + $data.data.Name + '">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // Display name language resource ro
        '<div class="form-group" id="input_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDisplayName +
        "</label>" +
        '<div class="col-sm-9">';
    for (var i = 0; i < lang.length; i++) {
        var culture = lang[i].capitalize();
        var label = $data.label.LabelDisplayNameEn;
        var value = $data.data.NameLanguageResource.En;
        if (culture === 'Ro') {
            label = $data.label.LabelDisplayNameRo;
            value = $data.data.NameLanguageResource.Ro;
        }

        fieldset += '<input type="text" name="DisplayName' + culture + '" class="form-control" id="DisplayName' + culture + '" value="' + $.nullToEmptyString(value) + '" placeholder="' + label + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
        fieldset += i == 1 ? '<span class="mandatory_field">*</span>' : '';
    }
    fieldset += '</div>' +
        "</div>" +
        // External Name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelExternalName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="ExternalName" class="form-control" id="ExternalName" placeholder="" value="' + $data.data.ExternalName + '">' +
        "</div>" +
        "</div>" +

        // Display On Pending Package
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDisplayOnPendingPackage +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select name="DisplayOnPendingPackage" id="DisplayOnPendingPackage">'+
    '<option></option>';
    $.each(displayOnPendingPackageIndexName, function (key, value) {
        var display = '';
        var culture = lang[0].capitalize();
        if (culture === 'Ro') {
            display = displayOnPendingPackageIndexName[key]['display']['ro'];
        } else {
            display = displayOnPendingPackageIndexName[key]['display']['en'];
        }

        var selected = $data.data.DisplayOnPendingPackage === displayOnPendingPackageIndexName[key]['value'] ? 'selected' : '';
        fieldset += '<option value="' + displayOnPendingPackageIndexName[key]['value'] + '" ' + selected + '>' + display + '</option>';
    });
    fieldset += '</select>' +
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
        var selected = $data.data.Type == $data.types[key].Id ? 'selected' : '';
        fieldset += '<option value="' + $data.types[key].Id + '" ' + selected + '>' + $data.types[key].Name + '</option>';
    });
    fieldset += '</select>' +
        "</div>" +
        "</div>" +
        // Size
        '<div class="form-group" id="SizeGroup">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelSize +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Size" class="form-control" id="Size" placeholder="" value="' + $data.data.Size + '">' +
        "</div>" +
        "</div>" +
        // Position
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelPosition +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Position" class="form-control" id="Position" value="' + $data.data.Position + '" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +
        // GridRow
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelGridRow +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="GridRow" class="form-control" id="GridRow" placeholder="" value="' + $data.data.GridRow + '">' +
        "</div>" +
        "</div>" +
        // GridColumn
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelGridColumn +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="GridColumn" class="form-control" id="GridColumn" placeholder="" value="' + $data.data.GridColumn + '">' +
        "</div>" +
        "</div>" +
        // GridColumnSpan
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelGridColumnSpan +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" value="' + $data.data.GridColumnSpan + '" name="GridColumnSpan" class="form-control" id="GridColumnSpan" placeholder="">' +
        "</div>" +
        "</div>" +
        // Group
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelGroup +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select id="groupListSelect" name="GroupId"><option></option></select>' +
        "</div>" +
        "</div>" +
        // Tabels
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelTabels +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select id="tabelListSelect" name="TabelsId"><option></option></select>' +
        "</div>" +
        "</div>" +

        // checkboxes
        '<div class="form-group checkbox_group">' +
        '<div class="col-lg-4">' +
        '<label>' +
        $data.label.LabelIsVisible +
        "</label>" +
        '<input type="checkbox" name="IsVisible" value="' + $data.data.IsVisible + '" ' + $IsVisibleChecked + ' />' +
        '</div>' +
        // IsReadonly
        '<div class="col-lg-4">' +
        '<label>' +
        $data.label.LabelIsReadonly +
        "</label>" +
        '<input type="checkbox" name="IsReadonly" value="' + $data.data.IsReadonly + '" ' + $IsReadonlyChecked + ' />' +
        "</div>" +
        // Required
        '<div class="col-lg-4">' +
        '<label>' +
        $data.label.LabelRequired +
        "</label>" +
        '<input type="checkbox" name="Required" value="' + $data.data.Required + '" ' + $IsRequiredchecked + ' />' +
        "</div>" +
        "</div>" +
        // DefaultValue
        '<div class="default_value_group">' +
        '<div id="typeSelectedChange"></div>' +
        '<div class="form-group" id="value_list_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDefaultValue +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="DefaultValue" class="form-control DefaultValue" placeholder="" value="' + $data.data.DefaultValue + '">' +
        "</div>" +
        "</div>" +
        "</div>" +
        // ValidationScript
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelValidationScript +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="CheckValidationScript" value="false">' +
        '<textarea name="ValidationScript" id="validationScriptValue" placeholder="JS function..." style="display:' + $scriptShowValue.ValidationScript + '">' + $data.data.ValidationScript + '</textarea>' +
        '<i class="fa fa-info-circle info" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Info"></i>' +
        "</div>" +
        "</div>" +
        // LoadScript
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelLoadScript +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="CheckLoadScript" value="false">' +
        '<textarea name="LoadScript" id="loadScriptValue" placeholder="JS function..." style="display:' + $scriptShowValue.LoadScript + '">' + $data.data.LoadScript + '</textarea>' +
        '<i class="fa fa-info-circle info" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Info"></i>' +
        "</div>" +
        "</div>" +
        // VisibleScript
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelVisibleScript +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="CheckVisibleScript" value="false">' +
        '<textarea name="VisibleScript" id="visibleScriptValue" placeholder="JS function..." style="display:' + $scriptShowValue.VisibleScript + '">' + $data.data.VisibleScript + '</textarea>' +
        '<i class="fa fa-info-circle info" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Info"></i>' +
        "</div>" +
        "</div>" +
        // ReadonlyScript
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelReadonlyScript +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="CheckReadonlyScript" value="false">' +
        '<textarea name="ReadonlyScript" id="readonlyScriptValue" placeholder="JS function..." style="display:' + $scriptShowValue.ReadonlyScript + '">' + $data.data.ReadonlyScript + '</textarea>' +
        '<i class="fa fa-info-circle info" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Info"></i>' +
        "</div>" +
        "</div>" +
        // RequireValidation
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelRequireValidation +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="RequireValidation" value="false">' +
        '<i class="fa fa-info-circle info" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Info"></i>' +
        "</div>" +
        "</div>" +
        // Document Type
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelDocumentTypeVersion +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select id="docmentTypeListSelect"><option></option></select>' +
        "</div>" +
        "</div>" +
        // Asoc Index select
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelAsocIndex +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select name="AsocIndexSelect" id="AsocIndexSelect" disabled>' +
        '<option></option>' +
        '</select>' +
        '<span class="fa fa-plus" id="add_to_assoc_index"></span>' +
        "</div>" +
        "</div>" +
        // Seal Index select
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelSealAsocIndex +
        "</label>" +
        '<div class="col-sm-9">' +
        '<select name="SealIndex" id="sealMetadataListSelect" ' + sealIndexDisabled + '>' +
        '<option></option>' +
        '</select>' +
        '<span class="fa fa-plus" id="add_to_assoc_index"></span>' +
        "</div>" +
        "</div>" +
        // AsocIndex checkbox
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelAdvancedUsesIndexesAssociation +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="AsocIndexCheckbox"  value="' + $scriptShowValue.UseAssocIndex + '">' +
        "</div>" +
        "</div>" +
        // Asoc Index
        '<div class="form-group" id="AsocIndexGroup" Style="display: ' + $AsocIndex.AsocIndex + '">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelAssociationIndexFormula +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="AsocIndex" id="AsocIndex" placeholder="" value="' + $data.data.AsocIndex + '" class="form-control" />' +
        "</div>" +
        "</div>" +
        // OnchangeCallws
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelOnchangeCallws +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="OnchangeCallws" value="' + $data.data.OnchangeCallws + '" ' + $IsOnchangeCallws + ' />' +
        "</div>" +
        "</div>" +

        // IsRadioGroup 
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelIsRadioGroup +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="IsRadioGroup" value="' + $data.data.OnchangeCallws + '" ' + $IsOnchangeCallws + ' />' +
        "</div>" +
        "</div>" +


 "</div>";

    form.append(fieldset);

    $.showPageDialog($data.dialodTitle, form, {
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
                    var $this = $(this);
                    var DisplayNameRo, GroupNameRo, GroupRestId, GroupName;

                    var dataserialize = $("#updateindexdef").serializeObject();

                    DisplayName = $currentCulture === 'ro' ? dataserialize.DisplayNameRo : dataserialize.DisplayNameEn;
                    GroupRestId = $("#GroupsName").find('option:selected').data('groupresid');

                    //var name = dataserialize.Name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                    //    return letter.toUpperCase();
                    //});


                    dataserialize['Name'] = dataserialize.Name.replace(/ /g, '');
                    dataserialize['NameLanguageResource'] = {
                        Id: $data.data.NameResId,
                        Ro: dataserialize.DisplayNameRo,
                        En: dataserialize.DisplayNameEn
                    };
                    dataserialize['DisplayName'] = DisplayName;


                    if (!$.isEmpty(dataserialize.GroupNameRo) || !$.isEmpty(dataserialize.GroupNameEn)) {
                        dataserialize['GroupNameLanguageResource'] = {
                            Ro: dataserialize.GroupNameRo,
                            En: dataserialize.GroupNameEn
                        }
                        dataserialize['GroupName'] = $currentCulture === 'ro' ? dataserialize.GroupNameRo : dataserialize.GroupNameEn;
                    } // update group
                    else if (!$.isEmpty($data.data.GroupResId) && (!$.isEmpty(dataserialize.UpdateGroupNameRo) || (!$.isEmpty(dataserialize.UpdateGroupNameEn)))) {
                        dataserialize['GroupNameLanguageResource'] = {
                            Id: GroupRestId,
                            Ro: dataserialize.UpdateGroupNameRo,
                            En: dataserialize.UpdateGroupNameEn
                        }
                        dataserialize['GroupName'] = $currentCulture === 'ro' ? dataserialize.UpdateGroupNameRo : dataserialize.UpdateGroupNameEn;
                    } else {
                        dataserialize['GroupResId'] = GroupRestId;
                    }

                    dataserialize['NameResId'] = $data.data.NameResId;
                    dataserialize['DocumentTypeVersion'] = $data.data.DocumentTypeVersion;

                    if (!IsSelectedADocumentType) {
                        dataserialize['AsocIndex'] = null;
                    }

                    $.ajax({
                        url: $data.postAction,
                        type: 'post',
                        dataType: 'json',
                        beforeSend: function () {
                            $.SavingPopup();
                        },
                        complete: function () {
                            //$('.dialog-loading-overlay').hide();
                            //$('#mini_loader').hide();
                        },
                        data: JSON.stringify(dataserialize),
                        contentType: "application/json; charset=utf-8",
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
                                console.log("Index def was updated");
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
        "update_index_def_dialog"
    );

    // index def type
    additionalFieldByType($data, $data.data.Type);

    // type value change
    $("#Type").change(function () {
        var type = $(this).find(":selected").val();
        if (type === "") {
            return;
        }
        additionalFieldByType($data, type);
    });

    // GET document type list
    $.ajax({
        url: $data.getDocumentTypeList,
        type: "GET",
        beforeSend: function () {
            $("#docmentTypeListSelect").after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_doctype_loader"></i>');
        },
        complete: function () {
            $('#mini_doctype_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    // get docyment type id if AsocIndex dif null;
                    var documentTypeId = null;
                    if ($assocIndexArray.length == 1) {
                        var $AsocComplexIndex = $data.data.AsocIndex.split('|');
                        documentTypeId = $AsocComplexIndex[0];
                    }
                    $selected = !isEmpty(documentTypeId) && documentTypeId == item.Id ? 'selected' : '';
                    $("#docmentTypeListSelect").append(
                        "<option value='" + item.Id + "' " + $selected + ">" + item.Name + "</option>"
                    );
                });
            }
        }
    });


    // GET groups list
    $.ajax({
        url: $data.getAllGroupsList,
        type: "GET",
        beforeSend: function () {
            $('#groupListSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
        },
        complete: function () {
            $('#mini_group_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    var selected = !$.isEmpty($data.data.GroupId) && item.Id === $data.data.GroupId ? 'selected' : '';
                    var groupName = !$.isEmpty(item.NameLanguageResource) && $currentCulture === 'ro' ? item.NameLanguageResource.Ro : item.NameLanguageResource.En;
                    $("#groupListSelect").append('<option value="' + item.Id + '" ' + selected + '>' + groupName + '</option>');
                });
            }
        }
    });



    // GET tabels list
    $.ajax({
        url: $data.getAllTabels,
        type: "GET",
        beforeSend: function () {
            $('#tabelListSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
        },
        complete: function () {
            $('#mini_group_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    var selected = !$.isEmpty($data.data.IdTable) && item.Id === $data.data.IdTable ? 'selected' : '';
                    var tableName = !$.isEmpty(item.Name) ? item.Name : '';
                    $("#tabelListSelect").append('<option value="' + item.Id + '" ' + selected + '>' + tableName + '</option>');
                });
            }
        }
    });


    // GET seal index metadata
    if (!$.isEmpty($data.arhId) && !$.isEmpty($data.docTypeId)) {
        $.ajax({
            url: $data.getAllSealMetadata + '/' + $data.arhPk + '/' + $data.arhId + '/' + $data.docTypeId + '',
            type: "GET",
            beforeSend: function () {
                $('#sealMetadataListSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
            },
            complete: function () {
                $('#mini_group_loader').remove();
            },
            success: function (data) {
                if (data.status === "OK") {
                    $.each(data.data, function (index, item) {
                        $selected = !$.isEmpty($data.data.SealIndex) && $data.data.SealIndex === item.systemName ? 'selected' : '';
                        var option = '<option Value="' + item.systemName + '" ' + $selected + '>' + item.businessName + '</option>';
                        $("#sealMetadataListSelect").append(option);
                    });
                }
            }
        });
    }

    // if document tyle changed, GET asoc index def
    $("#docmentTypeListSelect").change(function () {
        var $this = $(this);
        var documentTypeId = $this.find(":selected").val();
        if (documentTypeId != "") {
            IsSelectedADocumentType = true;
        }
        if (documentTypeId === "") {
            IsSelectedADocumentType = false;
            $("#AsocIndexSelect option").each(function () {
                $(this).remove();
            });
            return;
        }
        getAsocIndexDef($data, documentTypeId);
    });

    // get document type id if AsocIndex dif null;
    if ($assocIndexArray.length == 1) {
        var complexAsocIndexArray = $data.data.AsocIndex.split('|');
        getAsocIndexDef($data, complexAsocIndexArray);
    }

    $AsocIndex.UseAssocIndex ? $('#add_to_assoc_index').show() : false;
    $("#AsocIndexSelect").change(function () {
        var $this = $(this);
        var asocIndexValue = $this.find(":selected").val();
        if (asocIndexValue === "") {
            return;
        }

        var $docmentTypeListSelect = $("#docmentTypeListSelect option:selected");
        var $asocIndexValue = $("#AsocIndex");

        if ($asocIndexValue.val().length === 0 || $assocIndexArray.length == 1 && !$("[name='AsocIndexCheckbox']").is(':checked')) {
            $asocIndexValue.val(asocIndexValue);
        }
    });

    // assoc index
    $("#add_to_assoc_index").click(function () {
        var $docmentTypeListSelect = $("#docmentTypeListSelect option:selected");
        var $asocIndexSelect = $("#AsocIndexSelect option:selected");
        var $asocIndexValue = $("#AsocIndex");
        //var $asocIndexHidden = $("#AsocIndex");

        if ($asocIndexSelect.val().length !== 0) {
            var $assocIndex = $asocIndexSelect.val();
            if ($asocIndexValue.val().length !== 0) {
                $assocIndex = "+" + $assocIndex;
            }
            var $assocIndexArray = $asocIndexValue.val().split('+');
            if ($.inArray($assocIndex.replace(/[+-]/, ""), $assocIndexArray) == -1) {
                var value = $asocIndexValue.val() + $assocIndex;
                $asocIndexValue.val(value);
                //$asocIndexHidden.val(value);
            }
        }
    });

    // form validate
    $.validator.addMethod('end_greater_start', function (value, element, param) {
        if ($(param).val().length > 0 && parseInt($(param).val()) >= parseInt(value)) {
            return false;
        }
        return true;
    }, null);
    $.validator.addMethod('default_value_between_end_and_start', function (value, element, param) {
        if (
            ($(param[0]).length > 0 &&
                $(param[1]).length > 0) &&
            $(param[0]).val().length > 0 &&
            $(param[1]).val().length > 0 &&
            parseInt(value) < parseInt($(param[0]).val()) ||
            parseInt(value) > parseInt($(param[1]).val())
        ) {
            return false;
        }
        return true;
    }, null);
    $.validator.addMethod("noSpace", function (value, element) {
        return value.indexOf(" ") < 0 && value != "";
    });
    $.validator.addMethod("empty", function (value, element) {
        // remove success icon
        $('.checked').remove();
        return value !== "" ? true : false;
    });
    $.validator.addMethod("checkNameExists", function (value, element) {
        var exists = true;

        $.each($data.datas, function (index, obj) {
            if (value !== $data.data.Name && value === obj.Name) {
                exists = false;
                return;
            }
        });
        return exists;
    });
    $.validator.addMethod("checkNameRoExists", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (value !== $data.data.Name && value === obj.Name) {
                exists = false;
                return;
            }
        });
        return exists;
    });
    $.validator.addMethod("checkNameEnExists", function (value, element) {
        var exists = true;
        $.each($data.data, function (index, obj) {
            if (!$.isEmpty(obj.NameLanguageResource) && value !== $data.data.NameLanguageResource.En && value === obj.NameLanguageResource.En) {
                exists = false;
                return;
            }
        });
        return exists;
    });
    $.validator.addMethod("checkColExists", function (value, element) {
        var exists = true;
        $.each($data.data, function (index, obj) {
            if (!$.isEmpty(GridRow) && !$.isEmpty(GridColumn) && value === obj.GridColumn) {
                exists = false;
                return;
            }
        });
        return exists;
    });
    $.validator.addMethod("uniqueGroupName", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (value === obj.GroupName) {
                exists = false;
                return;
            }
        });

        return exists;
    });
    $.validator.addMethod("uniqueGroupNameRo", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (!$.isEmpty(obj.GroupNameLanguageResource)) {
                if (value === obj.GroupNameLanguageResource.Ro) {
                    exists = false;
                    return;
                }
            }
        });

        return exists;
    });
    $.validator.addMethod("uniqueGroupNameEn", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if (!$.isEmpty(obj.GroupNameLanguageResource)) {
                if (value === obj.GroupNameLanguageResource.En) {
                    exists = false;
                    return;
                }
            }
        });

        return exists;
    });
    $.validator.addMethod("uniquePosition", function (value, element) {
        var exists = true;
        $.each($data.datas, function (index, obj) {
            if ($data.data.Position != value && value == obj.Position) {
                exists = false;
                return;
            }
        });

        return exists;
    });
    $.validator.addMethod("checkColRowExist", function (value, element, param) {
        var exists = true,
            gridRow = $(param).val(),
            gridCol = value;
        $.each($data.datas, function (index, obj) {
            if (obj.Name !== $data.data.Name && (!$.isEmpty(obj.GridRow) && gridRow == obj.GridRow) && (!$.isEmpty(obj.GridRow) && gridCol == obj.GridColumn)) {
                exists = false;
                return;
            }
        });

        return exists;
    });
    $.validator.addMethod("noOnlySpace", function (value, element) {
        return !$.isEmpty(value) && $.trim(value).length != 0;
    });

    // validate
    if ($currentCulture === 'ro') {
        $("#updateindexdef")
            .validate({
                rules: {
                    Name: {
                        required: true,
                        checkNameExists: true,
                        noOnlySpace: true,
                        maxlength: 50
                    },
                    DisplayNameRo: {
                        required: true,
                        checkNameRoExists: true,
                        maxlength: 250
                    },
                    DisplayNameEn: {
                        checkNameEnExists: true,
                        maxlength: 250
                    },
                    GroupId: {
                        required: true
                    },
                    RegexValidation:
                    {
                        maxlength: 200
                    },
                    //Position: {
                    //    required: true,
                    //    number: true,
                    //    uniquePosition: true
                    //},
                    GridRow: {
                        number: true,
                    },
                    GridColumn: {
                        number: true,
                    },
                    LowerLimit: {
                        end_greater_start: '#UpperLimit'
                    },
                    DefaultValue: {
                        default_value_between_end_and_start: ['#UpperLimit', '#LowerLimit']
                    }
                },
                messages: {
                    Name: {
                        required: $data.validateMessage.Name,
                        checkNameExists: $data.validateMessage.ExistName,
                        noOnlySpace: $data.validateMessage.NameNoSpace,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    DisplayNameRo: {
                        required: $data.validateMessage.DisplayName,
                        checkNameRoExists: $data.validateMessage.ExistName,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    DisplayNameEn: {
                        checkNameEnExists: $data.validateMessage.ExistName,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    GroupId: {
                        required: $data.validateMessage.Group,
                    },
                    RegexValidation: {
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    //Position: {
                    //    required: $data.validateMessage.Position,
                    //    number: $data.validateMessage.ValidateNumber,
                    //    uniquePosition: $data.validateMessage.PositionExists
                    //},
                    GridRow: {
                        number: $data.validateMessage.ValidateNumber,
                    },
                    GridColumn: {
                        number: $data.validateMessage.ValidateNumber,
                    },
                    LowerLimit: {
                        end_greater_start: $data.validateMessage.ValidateEndGreaterStart
                    },
                    DefaultValue: {
                        default_value_between_end_and_start: $data.validateMessage.ValidateDefaultValueBetweenEndAndStart,
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
    }
    else {
        $("#updateindexdef")
            .validate({
                rules: {
                    Name: {
                        required: true,
                        checkNameExists: true,
                        noOnlySpace: true,
                        maxlength: 50
                    },
                    DisplayNameEn: {
                        required: true,
                        checkNameEnExists: true,
                        maxlength: 50
                    },
                    DisplayNameRo: {
                        checkNameRoExists: true,
                        maxlength: 50
                    },
                    GroupId: {
                        required: true,
                    },
                    RegexValidation:
                    {
                        maxlength: 200
                    },
                    //Position: {
                    //    required: true,
                    //    number: true,
                    //    uniquePosition: true
                    //},
                    GridRow: {
                        number: true,
                    },
                    GridColumn: {
                        number: true,
                    },
                    LowerLimit: {
                        end_greater_start: '#UpperLimit'
                    },
                    DefaultValue: {
                        default_value_between_end_and_start: ['#UpperLimit', '#LowerLimit']
                    }
                },
                messages: {
                    Name: {
                        required: $data.validateMessage.Name,
                        checkNameExists: $data.validateMessage.ExistName,
                        noOnlySpace: $data.validateMessage.NameNoSpace,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    DisplayNameEn: {
                        required: $data.validateMessage.DisplayName,
                        checkNameEnExists: $data.validateMessage.ExistName,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    DisplayNameRo: {
                        checkNameRoExists: $data.validateMessage.ExistName,
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    GroupId: {
                        required: $data.validateMessage.Group,
                    },
                    RegexValidation: {
                        maxlength: $data.validateMessage.ValidateMaxLength
                    },
                    //Position: {
                    //    required: $data.validateMessage.Position,
                    //    number: $data.validateMessage.ValidateNumber,
                    //    uniquePosition: $data.validateMessage.PositionExists
                    //},
                    GridRow: {
                        number: $data.validateMessage.ValidateNumber,
                    },
                    GridColumn: {
                        number: $data.validateMessage.ValidateNumber,
                    },
                    LowerLimit: {
                        end_greater_start: $data.validateMessage.ValidateEndGreaterStart
                    },
                    DefaultValue: {
                        default_value_between_end_and_start: $data.validateMessage.ValidateDefaultValueBetweenEndAndStart,
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
    }

    // show additional field by type
    function additionalFieldByType($data, type) {
        var $defaultValueGroup = $(".default_value_group");
        var $defaultValueElement = $(".DefaultValue");

        var $typeSelectedChange = $("#typeSelectedChange");
        var $defaultValueList = $("#value_list_group");
        var $size = $("#SizeGroup");
        var $defaultValueInputValue = $data.data.Type === type ? $data.data.DefaultValue : '';

        // default value imput
        var $defaultValueInputGroup = '<div class="form-group">' +
            '<label class="col-sm-3 control-label">' + $data.label.LabelDefaultValue + "</label>" +
            '<div class="col-sm-9">' +
            '<input type="text" name="DefaultValue" value="' + $defaultValueInputValue + '" class="form-control DefaultValue">' +
            '</div>' +
            '</div>';

        var $defaultValueInput = '<input type="text" name="DefaultValue" value="' + $defaultValueInputValue + '" class="form-control DefaultValue">';

        // default value textarea
        var $defaultValueTextarea = '<textarea name="DefaultValue" class="form-control DefaultValue">' + $defaultValueInputValue + '</textarea>';

        // default value checkbox
        var $checked = $data.data.DefaultValue === 'true' ? 'checked' : '';
        var $defaultValueCheckbox = '<input type="checkbox" name="DefaultValue" value="' + $data.data.DefaultValue + ' " ' + $checked + ' />';

        var $regexValidationInput = '<div class="form-group" id="regularExpressionValidation">' +
            '<label class="col-sm-3 control-label">' + $data.label.LabelRegularExpressionValidation + "</label>" +
            '<div class="col-sm-9">' +
            '<input type="text" name="RegexValidation" id="RegexValidation" value="' + $data.data.RegexValidation + '" class="form-control">' +
            '</div>' +
            '</div>';

        var $minMaxInput = '<div class="form-group">' +
            '<label class="col-sm-3 control-label">' + $data.label.LabelLimitFrom + "</label>" +
            '<div class="col-sm-3">' +
            '<div class="input-group"><input type="text" name="UpperLimit" id="UpperLimit" value="' + $data.data.UpperLimit + '" class="form-control"></div>' +
            '</div>' +
            '<label class="col-sm-2 control-label">' + $data.label.LabelLimitUpTo + "</label>" +
            '<div class="col-sm-3">' +
            '<div class="input-group"><input type="text" name="LowerLimit" id="LowerLimit" value="' + $data.data.LowerLimit + '" class="form-control"></div>' +
            '</div>' +
            '</div>';

        // reset input's
        $defaultValueGroup.empty();
        $size.show();
        $defaultValueList.empty();
        $("#datepicker").datepicker("destroy");
        $(".DefaultValue").removeAttr("id");
        $("#datepicker").removeClass("hasDatepicker");

        // default input
        $($defaultValueGroup).append($defaultValueInputGroup);

        // String = 1, Text = 2, Integer = 3, Float = 4, DateTime = 5, Boolean = 6, File = 7, Info = 8, SelectieMultipla = 9
        switch (type.toString()) {
            case '1':
                // String
                // combobox: ValueList
                comboboxValueList($data, $defaultValueInput);
                // text: regular expresion
                $($defaultValueGroup).append($regexValidationInput);
                break;
            case '2':
                // Text
                // fields: Lista de valori(combobox), Validare expresie regulata(text)
                comboboxValueList($data, $defaultValueTextarea);

                // replace input text with textarea
                $(".DefaultValue").replaceWith($defaultValueTextarea);

                // text: regular expresion
                $($defaultValueGroup).append($regexValidationInput);
                break;
            case '5':
                // DateTime
                // controlu Valoare implicita sa fie de tip datePicker
                $('.DefaultValue').attr('id', 'datepicker');
                break;
            case '6':
                // Boolean
                // Valoare implicita - true or false
                // replace input text with textarea
                $(".DefaultValue").replaceWith($defaultValueCheckbox);
                $("[name='DefaultValue']").bootstrapSwitch({
                    state: $data.data.DefaultValue,
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
                break;
            case '7':
                // File
                // not use
                break;
            case '8':
                // Info

                break;
            case '9':
                // SelectieMultipla
                // Lista de valori(combobox)
                // cand se alege o valoare din combobox, controlul Valoare implicita devine combobox
                comboboxValueList($data, $defaultValueInput);
                break;
            default:
                // 3 - Integer
                // horizontal - Limita de la(text), pana la(text)
                // 4 - Float
                // horizontal - Limita de la(text), pana la(text)
                $defaultValueGroup.prepend($minMaxInput);
                break;
        }

        // init ui datepiker
        $("#datepicker").datepicker();
    }
    function comboboxValueList($data, $defaultValueImput) {
        var $defaultValueGroup = $(".default_value_group");
        var $size = $("#SizeGroup");
        $.ajax({
            url: $data.postGetAllValueList,
            type: "GET",
            success: function (data) {
                if (data.status === "OK") {
                    var $valueList = '<div class="form-group value_list_group">' +
                        '<label class="col-sm-3 control-label">' + $data.label.LabelValuesList + "</label>" +
                        '<div class="col-sm-9">' +
                        '<select id="valueList" name="ValueListId">' +
                        '<option></option>';
                    $.each(data.data, function (index, item) {
                        var $selected = !isEmpty($data.data.ValueListId) && item.Id == $data.data.ValueListId ? 'selected' : '';
                        $valueList += "<option value='" + item.Id + "' " + $selected + ">" + item.Name + "</option>";
                    });
                    $valueList += "</select>" +
                        "</div>" +
                        "</div>";

                    $defaultValueGroup.prepend($valueList);

                    $("#valueList").change(function () {
                        getValueListItem($data, $defaultValueImput, false);
                    });

                    if (!isEmpty($data.data.ValueListId)) {
                        getValueListItem($data, $defaultValueImput, true);
                    }
                }
            }
        });
    }
    function getValueListItem($data, $defaultValueImput, isValueList) {
        var $this = $("#valueList");
        var item_value = $this.find(":selected").val();
        var $size = $("#SizeGroup");

        if (item_value === "") {
            // show element
            $size.show();
            $this.replaceWith($defaultValueImput);
            return;
        }
        item_value = typeof item_value !== "undefined" && !isValueList ? item_value : $data.data.ValueListId;

        $size.hide();

        $.ajax({
            url: $data.getValueListItem + '/' + item_value,
            type: "GET",
            beforeSend: function () {
                $this.after('<i class="fa fa-cog fa-spin fa-2x fa-fw" id="select_mini_loader"></i>');
            },
            complete: function () {
                $('#select_mini_loader').remove();
            },
            success: function (data) {
                if (data.status === "OK") {
                    var $valueListItem = $('#value_list_item');

                    // reset value list item
                    $valueListItem.empty();

                    if ($valueListItem.length > 0) {
                        $.each(data.data, function (index, item) {
                            var $selected = item.ValueId === $data.data.DefaultValue ? 'selected' : '';
                            $valueListItem.append("<option value='" + item.ValueId + "' " + $selected + ">" + item.ValueText + "</option>");
                        });
                    } else {
                        var $selectValueList = '<select id="value_list_item" name="DefaultValue">';
                        $.each(data.data, function (index, item) {
                            var $selected = item.ValueId == $data.data.DefaultValue ? 'selected' : '';
                            $selectValueList += "<option value='" + item.ValueId + "' " + $selected + ">" + item.ValueText + "</option>";
                        });
                        $selectValueList += "</select>";

                        $(".DefaultValue").replaceWith($selectValueList);
                    }
                }
            }
        });
    }
    function getAsocIndexDef($data, documentType) {
        var documentTypeId = null;
        var indexDefName = null;

        if ($.isArray(documentType)) {
            documentTypeId = documentType[0];
            indexDefName = documentType[1];
        } else {
            documentTypeId = documentType;
        }

        if ($.isEmpty(documentTypeId)) {
            return;
        }

        $.ajax({
            url: $data.postIndexByDocumentTypeAction + "/" + documentTypeId,
            type: "GET",
            beforeSend: function () {
                $("#docmentTypeListSelect").after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_doctype_loader"></i>');
            },
            complete: function () {
                $('#mini_doctype_loader').remove();
            },
            success: function (data) {
                if (data.status === "OK") {
                    if (data.data.length > 0) {
                        $("#AsocIndexSelect option").remove();
                        $('#AsocIndexSelect').prop('disabled', false);
                        $("#AsocIndexSelect").append($("<option></option>"));

                        $.each(data.data, function (index, item) {
                            var $selected = !isEmpty(indexDefName) && indexDefName === item.Name ? 'selected' : '';
                            $("#AsocIndexSelect").append(
                                '<option value="' + item.IndexGroup.DocumentTypeId + '|' + item.Name + '" ' + $selected + '>' + item.Name + ' [' + item.DisplayName + ']' + '</option>'
                            );
                        });

                    } else {
                        $('#AsocIndexSelect').prop('disabled', true);
                        $("#AsocIndexSelect option").remove();
                    }
                }
            }
        });
    }
    // check is empty
    function isEmpty(value) {
        return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
    }

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
        state: $scriptShowValue.ValidationScriptStatus,
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
            $("#validationScriptValue").val("").hide();
            $(this).attr("value", 'false');
        }
    });
    $("[name='CheckLoadScript']").bootstrapSwitch({
        state: $scriptShowValue.LoadScriptStatus,
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
            $("#loadScriptValue").val("").hide();
            $(this).attr("value", 'false');
        }
    });
    $("[name='CheckVisibleScript']").bootstrapSwitch({
        state: $scriptShowValue.VisibleScriptStatus,
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
            $("#visibleScriptValue").val("").hide();
            $(this).attr("value", 'false');
        }
    });
    $("[name='CheckReadonlyScript']").bootstrapSwitch({
        state: $scriptShowValue.ReadonlyScriptStatus,
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
            $("#readonlyScriptValue").val("").hide();
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

    $("[name='IsRadioGroup']").bootstrapSwitch({
        state: $data.data.IsRadioGroup,
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
    $("[name='RequireValidation']").bootstrapSwitch({
        state: $data.data.RequireValidation,
        size: 'mini',
        onColor: 'success',
        onText: $data.checkboxOnOff.on,
        offText: $data.checkboxOnOff.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                $("#RequireValidation").show();

                return;
            }
            $("#RequireValidation").val("").hide();
            $(this).attr("value", 'false');
        }
    });

    $("[name='AsocIndexCheckbox']").bootstrapSwitch({
        state: $AsocIndex.UseAssocIndex,
        size: 'mini',
        onColor: 'success',
        onText: $data.checkboxOnOff.on,
        offText: $data.checkboxOnOff.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                $('#add_to_assoc_index').show();
                $("#AsocIndexGroup").show();
                return;
            }
            $("#AsocIndexGroup").hide();
            $('#add_to_assoc_index').hide();
            $('#AsocIndexValue').val("");
            //var $docmentTypeListSelect = $("#docmentTypeListSelect option:selected");
            //var $asocIndexSelect = $("#AsocIndexSelect option:selected");
            //var $assocIndex = $docmentTypeListSelect.val() + "|" + $asocIndexSelect.val();
            //$("#AsocIndex").val($assocIndex);

            $(this).attr("value", 'false');
        }
    });
    // tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}
function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
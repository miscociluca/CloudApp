function UpdateTableDialog($data) {

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
   
    var form = $("<form/>",
                    {
                        id: "update_table"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        // name
        '<div class="form-group" id="input_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">';
        var label = $data.label.LabelName;
        var value = $data.data.Name;
        fieldset += '<input type="text" name="Name" class="form-control" id="Name" value="' + $.nullToEmptyString(value) + '" placeholder="' + label + '" />';
        fieldset +='<span class="mandatory_field">*</span>';
        
        fieldset += '</div>' +
            "</div>";
    var value2 = $data.data.Row;
    var value3 = $data.data.Id_Index_group;

        // Row
        fieldset +='<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
            $data.label.LabelRow +
        "</label>" +
        '<div class="col-sm-9">' +
            '<input type="text" name="Row" class="form-control" id="Row" value="' + $.nullToEmptyString(value2) + '" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
            "</div>" +


         // Index Groups
         '<div class="form-group">' +
         '<label class="col-sm-3 control-label">' +
         $data.label.LabelGroup +
         "</label>" +
         '<div class="col-sm-9">' +
         '<select id="groupListSelect" name="GroupId"><option></option></select>' +
         "</div>" +
         "</div>" +

   "</div>";
    form.append(fieldset);

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
                    var selected = !$.isEmpty($data.data.Id_Index_group) && item.Id === $data.data.Id_Index_group ? 'selected' : '';
                    var tableName = !$.isEmpty(item.Name)  ? item.Name :'';
                    $("#groupListSelect").append('<option value="' + item.Id + '" ' + selected + '>' + tableName + '</option>');
                });
            }
        }
    });
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
                    if ($('#update_table').valid()) {
                        var dataserialize = $("#update_table").serializeObject(),
                        $this = $(this);

                        dataserialize['LastUpdated'] = new Date().toLocaleString();
                        dataserialize['DocumentTypeId'] = $data.documentTypeId;
                        var idGroup;
                        if ($("#groupListSelect").val().length > 0) {
                            idGroup = $("#groupListSelect").val();
                        }
                        dataserialize['Id_Index_group'] = idGroup;
                        dataserialize['Id'] = $data.data.Id;
                        $.ajax({
                            url: $data.postAction,
                            type: 'post',
                            dataType: 'json',
                            beforeSend: function () { },
                            complete: function () { },
                            data: JSON.stringify(dataserialize),
                            contentType: "application/json; charset=utf-8",
                            beforeSend: function () {
                                $.SavingPopup();
                            },
                            success: function (data) {
                                var success = data.status;
                                var record = data.data;
                                if (success === 'OK') {
                                    $data.row.data(record);

                                    $($this).dialog('close');
                                    // success system notify
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                    console.log("New index table was added");
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
        "update_table_dialog"
    );


    $.validator.addMethod("noOnlySpace", function (value, element) {
        return value !== "" && ($.trim(value)).length != 0;
    });

    $("#update_table")
        .validate({
            rules: {
                Name: {
                    required: true,
                    noOnlySpace: true,
                    maxlength: 50,
                },
                Row: {
                    required: true,
                    noOnlySpace: true,
                    maxlength: 10,
                },
                GroupId: {
                    required: true,
                },
            },
            messages: {
                Name: {
                    required: $data.validateMessage.Name,
                    noOnlySpace: $data.validateMessage.Name,
                    maxlength: $data.validateMessage.ValidateMaxLength,
                },
                Row: {
                    required: $data.validateMessage.ValidateRow,
                    noOnlySpace: $data.validateMessage.ValidateRow,
                    maxlength: $data.validateMessage.ValidateMaxLength,
                },
                GroupId: {
                    required: $data.validateMessage.Group,
                }
            }
        });

}

function AddTabelDialog($data) {

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    var form = $("<form/>",
                    {
                        id: "add_new_table"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        // Name 
        '<div class="form-group" id="input_group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">';
        var label = $data.label.LabelName;
        fieldset += '<input type="text" name="Name" class="form-control" id="DisplayName" placeholder="' + label + '" />';
        fieldset += '<span class="mandatory_field">*</span>';
        fieldset += '</div>' +
        "</div>" +
        // Row
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
            $data.label.LabelRow +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Row" class="form-control" id="Row" value="" placeholder="">' +
        '<span class="mandatory_field">*</span>' +
        "</div>" +
        "</div>" +

     // Index Groups
            '<div class="form-group">' +
            '<label class="col-sm-3 control-label">' +
            $data.label.LabelGroup +
            "</label>" +
            '<div class="col-sm-9">' +
            '<select id="Groups" name="GroupId"><option></option></select>' +
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
                    if ($('#add_new_table').valid()) {

                        var dataserialize = $("#add_new_table").serializeObject(),
                        $this = $(this);
                        dataserialize['LastUpdated'] = new Date().toLocaleString();
                        dataserialize['DocumentTypeId'] = $data.documentTypeId;
                        var idGroup;
                        if ($("#Groups").val().length>0) {
                            idGroup = $("#Groups").val();
                        }
                        dataserialize['Id_Index_group'] = idGroup;

                        $.ajax({
                            url: $data.postAction,
                            type: 'post',
                            dataType: 'json',
                            beforeSend: function () {},
                            complete: function () {},
                            data: JSON.stringify(dataserialize),
                            contentType: "application/json; charset=utf-8",
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
        "add_table_dialog"
    );

    // GET index groups list
    $.ajax({
        url: $data.getIndexGroupUrl,
        type: "GET",
        beforeSend: function () {
            $('#Groups').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_doctype_loader"></i>');
        },
        complete: function () {
            $('#mini_doctype_loader').remove();
        },
        success: function (data) {
            if (data.status === "OK") {
                $.each(data.data, function (index, item) {
                    $("#Groups").append(
                        $("<option></option>")
                            .text(item.Name)
                            .val(item.Id)
                    );
                });
            }
        }
    });

    $.validator.addMethod("noOnlySpace", function (value, element) {
        return value !== "" && ($.trim(value)).length != 0;
    });

    $("#add_new_table")
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
                } ,
                GroupId: {
                    required: $data.validateMessage.Group,
                }
			}
        });
}

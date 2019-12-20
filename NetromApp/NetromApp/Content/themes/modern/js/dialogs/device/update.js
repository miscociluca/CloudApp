function UpdateDeviceDialog($data) {

    var $datetime = $data.data.LastAccessed !== null ? new Date(parseInt($data.data.LastAccessed.replace("/Date(", "").replace(")/", ""), 10)) : 'Empty';
	var $lastAccessed = !$.isEmpty($data.data.LastAccessed) ? $.dateTimeFormat($datetime) : '';
	var $lastIp = !$.isEmpty($data.data.LastIp) ? $data.data.LastIp : '';

    var form = $("<form/>",
                    {
                        id: "update_device"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        // Name
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelName +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Name" value="' + $data.data.Name + '" class="form-control" id="Name" placeholder="">' +
        "</div>" +
        "</div>" +
        // GUID
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelGuid +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Guid" value="' + $data.data.Guid + '" class="form-control" id="Guid" placeholder="">' +
        "</div>" +
        "</div>" +
        // Mac
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelMac +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Mac" value="' + $data.data.Mac + '" class="form-control" id="Mac" placeholder="">' +
        "</div>" +
        "</div>" +
        // Last Ip
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelLastIp +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="LastIp" value="' + $lastIp + '" class="form-control" id="LastIp" placeholder="">' +
        "</div>" +
        "</div>" +
        // Last access
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelLastAccess +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="LastAccess" value="' + $lastAccessed + '" class="form-control" id="LastAccess" placeholder="" disabled>' +
        "</div>" +
        "</div>" +
        //// Debug log
        //'<div class="form-group">' +
        //'<label class="col-sm-3 control-label">' +
        //$data.label.LabelEnableDebugLog +
        //"</label>" +
        //'<div class="col-sm-9">' +
        //'<input type="checkbox" name="EnableDebugLog">' +
        //"</div>" +
        //"</div>" +
         // Blocked
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelBlocked +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="checkbox" name="IsBlocked">' +
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
                    if ($('#update_device').valid()) {
                        var dataserialize = $("#update_device").serializeObject();
                        dataserialize['IdLastUser'] = $data.data.IdLastUser;
                        dataserialize['Id'] = $data.data.Id;

                        $.ajax({
                            url: $data.postAction,
                            type: 'post',
                            dataType: 'json',
                            beforeSend: function () {
                                $.SavingPopup();
                            },
                            data: JSON.stringify(dataserialize),
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                var result = data.data;
                                var success = data.status;
                                if (success === 'OK') {
                                    $data.row.data(result);
                                    $($this).dialog('close');
                                } else {
                                    $($this).dialog('close');
                                }
                            }
                        });
                    }
                }
            }
        },
        "update_form_dialog"
    );


    $("#update_device")
        .validate({
            rules: {
                Name: {
                    required: true,
                }
            },
            messages: {
                Name: {
                    required: $data.validateMessage.Name,
                }
            }
        });

    $("[name='EnableDebugLog']").bootstrapSwitch({
        state: $data.data.EnableDebugLog,
        size: 'mini',
        onColor: 'success',
        onText: $data.active.on,
        offText: $data.active.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                return;
            }
            $(this).attr("value", 'false');
        }
    });

    $("[name='IsBlocked']").bootstrapSwitch({
        state: $data.data.IsBlocked,
        size: 'mini',
        onColor: 'success',
        onText: $data.active.on,
        offText: $data.active.off,
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                return;
            }
            $(this).attr("value", 'false');
        }
    });
}

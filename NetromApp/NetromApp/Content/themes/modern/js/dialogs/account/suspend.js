function SuspendAccountDialog($data) {
    var form = $("<form/>",
                    {
                        id: "suspend_account_dialog"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelSuspendExpirationDate +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="SuspendExpirationDate" class="form-control" id="suspendExpirationDate" />' +
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
                    if ($('#suspend_account_dialog').valid()) {

                        var dataserialize = $("#suspend_account_dialog").serializeObject();
                        var $this = this;
                        $data.datas.Status = 2;
                        $data.datas.Avatar = null;
                        $data.datas.SuspendExpirationDate = dataserialize.SuspendExpirationDate;

                        $.post($data.postAction, $data.datas, function (data) {
                            var success = data.status;
                            if (success === 'OK') {
                                $data.row.data(data.data);
                                // notify system
                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.contentSuccess,
                                    type: 'success'
                                });
                                console.log('Group successfull delete');
                                $($this).dialog('close');
                            } else {
                                // error system notify
                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.contentError,
                                    type: 'alert'
                                });
                                $($this).dialog('close');
                            }
                        });
                    }
                }
            }
        },
        "suspend_account_dialog"
    );

    $("#suspendExpirationDate").datepicker($.datepicker.regional[$currentCulture]);

    $("#suspend_account_dialog")
        .validate({
            rules: {
                SuspendExpirationDate: {
                    required: true,
                }
            },
            messages: {
                SuspendExpirationDate: {
                    required: $data.validateMessage.ExpirationDate,
                }
            }
        });

}

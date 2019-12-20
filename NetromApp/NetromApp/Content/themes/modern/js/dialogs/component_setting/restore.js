function RestoreDialog($data) {
    var message = $("<p/>",
                    {
                        text: $data.message + '?'
                    });
    $.showPageDialog($data.dialodTitle,
        message,
        {
            "close": {
                text: $data.dialogButtons.cancel,
                'class': 'btn btn_cancel',
                click: function () {
                    $(this).dialog("close");
                }
            },
            "ok": {
                text: $data.dialogButtons.ok,
                type: "submit",
                'class': 'btn btn_save',
                click: function () {
                    var $this = $(this);
                    var dataSend = {
                        componentId: $data.data
                    };
                    $.post($data.postAction, dataSend, function (data) {
                        var success = data.status;
                        if (success === 'OK') {
                            $data.table.ajax.reload(null, false);

                            // notify system
                            $.Notify({
                                caption: $data.notify.title,
                                content: $data.notify.contentSuccess,
                                type: 'success'
                            });
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
        },
        "reset_default_setting_dialog"
    );
}
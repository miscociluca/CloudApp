function DeleteValueListVersionDialog($data) {

    var message = $("<p/>",
                    {
                        text: $data.message + ' "' + $data.datas.VersionNumber + '"?'
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
                    $.post($data.postAction, $data.datas, function (data) {
                        var success = data.status;
                        if (success === 'OK') {
                            $data.row.remove().draw();
                            $($this).dialog('close');
                            // notify system
                            $.Notify({
                                caption: $data.notify.title,
                                content: $data.notify.contentSuccess,
                                type: 'success'
                            });
                            console.log('Document Type verion successfull delete');
                        } else {
                            $($this).dialog('close');
                            // error system notify
                            $.Notify({
                                caption: $data.notify.title,
                                content: $data.notify.contentError,
                                type: 'alert'
                            });
                        }
                    });
                }
            }
        },
        "delete_document_type_dialog"
    );
}

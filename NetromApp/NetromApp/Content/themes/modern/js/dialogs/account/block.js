function BlockAccountDialog($data) {

    var message = $("<p/>",
                    {
                        text: $data.message + ' "' + $data.datas.Email + '"?'
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
                    var $this = this;
                    $data.datas.Status = 3;
                    $data.datas.Avatar = null;

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
        },
        "block_account_dialog"
    );
}

function DeleteValueListDialog($data) {

    var message = $("<p/>",
                    {
                        text: $data.message + ' "' + $data.datas.Name + '?'
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
                    var data = $data.datas;
                    data.IsDeleted = true;

                    $.ajax({
                        url: $data.postAction,
                        type: 'post',
                        dataType: 'json',
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function () {
                            $.SavingPopup();
                        },
                        success: function (data) {
                            if (data.status === 'OK') {
                                $data.row.remove().draw(false);
                                $($this).dialog('close');

                                // success system notify
                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.contentSuccess,
                                    type: 'success'
                                });
                                console.log('Component settings successfull delete');
                            } else if (data.status === 'NOT_DELETE') {
                                $($this).dialog('close');
                                // error system notify
                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.errorDeleted,
                                    type: 'alert'
                                });
                            }
                            else {
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
        },
        "delete_setting_dialog"
    );
}

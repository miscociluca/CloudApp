function DeletePostDialog($data) {
	var $name = $data.datas.Titlu;

    var message = $("<p/>",
                    {
                        text: $data.message + ' "' + $name + '?'
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
                    $data.datas.IsDeleted = true;
                    $.ajax({
                        url: $data.postAction,
                        type: 'post',
                        dataType: 'json',
                        data: $data.datas,
                        beforeSend: function () {
                            $.SavingPopup();
                        },
                        success: function (data) {
                            var success = data.status;
                            if (success === 'OK') {
                                $data.row.remove().draw(false);
                                $data.table.ajax.reload(null, false);
                                $($this).dialog('close');
                                // success system notify
                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.contentSuccess,
                                    type: 'success'
                                });
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
        },
        "delete_post_dialog"
    );
}

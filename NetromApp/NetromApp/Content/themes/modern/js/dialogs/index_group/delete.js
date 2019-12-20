function DeleteIndexGroupDialog($data) {

    var message = $("<p/>",
                    {
                        text: $data.message + ' "' + $data.datas.Name + '"?'
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
                    $.post($data.postAction, $data.datas, function (data) {
                        var success = data.status;
                        if (success === 'OK') {
                            $data.row.remove().draw(false);

                            $data.indexDefTable.ajax.reload(null, false);

                            $($this).dialog('close');
                            // notify system
                            $.Notify({
                                caption: $data.notify.title,
                                content: $data.notify.contentSuccess,
                                type: 'success'
                            });
                            console.log('Group successfull delete');
                        } else if (data.status === 'NOT_DELETE') {
                            $($this).dialog('close');
                            // error system notify
                            $.Notify({
                                caption: $data.notify.title,
                                content: $data.notify.errorDeleted,
                                type: 'alert'
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
                    });
                }
            }
        },
        "delete_group_dialog"
    );
}

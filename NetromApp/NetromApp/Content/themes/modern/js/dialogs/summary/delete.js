function DeleteSummaryDialog($data) {
    var $name = $currentCulture === 'ro' ? $data.datas.NameLanguageResource.Ro : $data.datas.NameLanguageResource.En;

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
                    //$data.datas.TileRenderDetail.Image = [];
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
        "delete_indexDef_dialog"
    );
}

function WarningDialog($data) {
    var message = $("<p/>",
                    {
                        text: $data.message
                    });
    $.showPageDialog($data.dialodTitle,
        message,
        {
            "ok": {
                text: $data.dialogButtons.ok,
                type: "submit",
                'class': 'btn btn_save',
                click: function () {
                    $(this).dialog('close');
                }
            }
        },
        "worning_dialog"
    );
}

function UpdateUsername($data) {
    var form = $("<form/>",
                    {
                        id: "update_username"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelUsername +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="UserName" value="' + $data.data.UserName + '" class="form-control" id="UserName" placeholder="">' +
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
                    var $this = $(this);
                    if ($('#update_username').valid()) {
                        var dataserialize = $("#update_username").serializeObject();

                        $data.data.Avatar = null;
                        $data.data.UserName = dataserialize.UserName;

                        $.post($data.postAction, $data.data, function (data) {
                            var result = data.data;
                            var success = data.status;

                            if (success === 'OK') {
                                $data.elementId.text(result.UserName);

                                $.Notify({
                                    caption: $data.notify.title,
                                    content: $data.notify.contentSuccess,
                                    type: 'success'
                                });
                                $($this).dialog('close');
                            }
                        });

                    }
                }
            }
        },
        "update_dialog"
    );

    $("#update_username")
        .validate({
            rules: {
                UserName: {
                    required: true,
                }
            },
            messages: {
                UserName: {
                    required: $data.validateMessage.RequireUsername,

                }
            }
        });
}

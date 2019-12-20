function UpdateEmail($data) {
    var form = $("<form/>",
                    {
                        id: "update_account_email"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelEmail +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="text" name="Email" value="' + $data.data.Email + '" class="form-control" id="Email" placeholder="">' +
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
                    if ($('#update_account_email').valid()) {
                        var dataserialize = $("#update_account_email").serializeObject();

                        $data.data.Avatar = null;
                        $data.data.Email = dataserialize.Email;

                        $.post($data.postAction, $data.data, function (data) {
                            var result = data.data;
                            var success = data.status;

                            if (success === 'OK') {
                                $data.emailId.text(result.Email);

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

    $.validator.addMethod("emailExist", function (value, element) {
        var urlPost = $data.postEmailExist,
            exist = true;

        if (value !== $data.data.Email) {
            $.ajax({
                url: urlPost,
                type: 'POST',
                async: false,
                data: { email: value },
                success: function (response) {
                    if (response.status === "EXIST") {
                        exist = false;
                        return;
                    }
                }
            });
        }

        return exist;
    });

    $("#update_account_email")
        .validate({
            rules: {
                Email: {
                    required: true,
                    email: true,
                    emailExist: true
                }
            },
            messages: {
                Email: {
                    required: $data.validateMessage.RequireEmail,
                    email: $data.validateMessage.ValidateEmail,

                }
            }
        });
}

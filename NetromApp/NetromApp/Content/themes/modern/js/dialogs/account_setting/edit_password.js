function UpdatePassword($data) {
    var form = $("<form/>",
                    {
                        id: "update_account_password"
                    });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +
        // current password
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelCurrentPassword +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="password" name="CurrentPassword" class="form-control" id="CurrentPassword" placeholder="">' +
        "</div>" +
        "</div>" +
        // new password
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelNewPassword +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="password" name="NewPassword" class="form-control" id="NewPassword" placeholder="">' +
        "</div>" +
        "</div>" +
        // repeat password
        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.LabelRepeatPassword +
        "</label>" +
        '<div class="col-sm-9">' +
        '<input type="password" name="RepeatPassword" class="form-control" id="RepeatPassword" placeholder="">' +
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
                    if ($('#update_account_password').valid()) {
                        var dataserialize = $("#update_account_password").serializeObject(),
                            data = {
                                userId: $data.data.Id,
                                newPassword: dataserialize.NewPassword
                            };

                        $.post($data.postAction, data, function (data) {
                            var result = data.data;
                            var success = data.status;

                            if (success === 'OK') {

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


    $.validator.addMethod("passwordValidate", function (value, element) {
        var urlPost = $data.postPasswordCompare,
            isValidate = false;

        $.ajax({
            url: urlPost,
            type: 'POST',
            async: false,
            data: { password: value },
            success: function (response) {
                if (response.status === "SUCCESS") {
                    isValidate = true;
                    return;
                }
            }
        });
        return isValidate;
    });

    $("#update_account_password")
        .validate({
            rules: {
                CurrentPassword: {
                    required: true,
                    passwordValidate: true
                },
                NewPassword: {
                    required: true,
                    minlength: 6
                },
                RepeatPassword: {
                    equalTo: "#NewPassword"
                },
            },
            messages: {
                CurrentPassword: {
                    required: $data.validateMessage.RequireCurrentPassword,
                    passwordValidate: $data.validateMessage.ValidationPasswordMatch
                },
                NewPassword: {
                    required: $data.validateMessage.RequireNewPassword,
                    minlength: $data.validateMessage.LengthPassword
                },
                RepeatPassword: {
                    equalTo: $data.validateMessage.RepeatPassword
                },
            }
        });
}

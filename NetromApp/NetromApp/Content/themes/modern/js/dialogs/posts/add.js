function AddPostDialog($data) {
	var datas = $data.datas;
    var form = $("<form/>",
                    {
						id: "add_post_form"
                    });
    var fieldset = "" +
        '<div class="form_block form-horizontal">' +


		// Titlu
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		"Titlu"+
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="Titlu" class="form-control" value="" id="Titlu" placeholder="">' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
		"</div>" +
    // Image
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    "Imagine"+
    "</label>" +
    '<div class="col-sm-9" id="img_preview">' +
    '<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="Image" id="Image" data-error="#errorExtension" /></span>' +
    '<div id="errorExtension"></div>' +
    "</div>" +
    "</div>" +

  //   //Like
  //  '<div class="form-group">' +
  //  '<label class="col-sm-3 control-label">' +
  //  "Like " +
  //  "</label>" +
  //  '<div class="col-sm-9">' +
  //  '<input type="checkbox" name="Like" id="Like" value="true">' +
  //  "</div>" +
		//"</div>" +

    "</div>";
    form.append(fieldset);

    $.showPageDialog(
        $data.dialodTitle,
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
					if ($('#add_post_form').valid()) {

                            var $this = $(this),
								inputs = $("#add_post_form"),
                                file = document.getElementById('Image'),
                                dataserialize = inputs.serializeObject(),
								titlu,
								user,
							model = new FormData();
						titlu = $("#Titlu").val();
						model.append('Titlu', titlu);
						model.append('Image', file.files[0]); 

                            $.ajax({
                                url: $data.postAction,
                                type: 'POST',
                                data: model,
                                processData: false,
                                contentType: false,
                                beforeSend: function () {
                                    $.SavingPopup();
                                },
                                success: function (data) {
                                    var success = data.status;
                                    var record = data.data;
                                    if (success === 'OK') {
                                        $data.table.ajax.reload(null, false);

                                        var row = $data.table.rows().nodes();
                                        $(row).addClass("col-lg-2 col-md-4 col-sm-6 col-xs-12");
                                        $(row).hover(function () {
                                            $('.action_block', this).slideDown("fast");
                                        }, function () {
                                            $('.action_block', this).slideUp("fast");
                                        });
                                        $($this).dialog('close');
                                        // success system notify
                                        $.Notify({
                                            caption: $data.notify.title,
                                            content: $data.notify.contentSuccess,
                                            type: 'success'
                                        });
                                        console.log("New post was added");
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
            }
        },
        "add_post_form"
    );


    // preview image after upload
    if (window.File && window.FileList && window.FileReader) {
        $("#Image").on("change", function (e) {
            var files = e.target.files,
              filesLength = files.length;
            $(".pip").remove();
            $("#img_preview").append('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    var file = e.target;
                    var fileExt = f.name.match(/\.(.+)$/)[1];
                    var acceptedExtension = ['jpg', 'jpeg', 'png'];
                    if ($.inArray(fileExt, acceptedExtension) !== -1) {
                        $("#img_preview").append('<div class="pip">' +
                      '<img class="imageThumb" src="' + e.target.result + '" title="' + f.name + '" />' +
                      '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                      '</div>');
                        $(".remove").click(function () {
                            $(this).parent(".pip").remove();
                            $("#Image").val("");
                        });
                        if ($('.pip').length > 0) {
                            $('.loading_img').hide();
                        };
                        return;
                    }
                    $('.loading_img').hide();
                });
                fileReader.readAsDataURL(f);
            }
        });
    }
    else {
		console.log("Your browser doesn't support to File API");
    }

    // Like
	$("[name='Like']").bootstrapSwitch({
        state: true,
        size: 'mini',
        onColor: 'success',
        onText: 'Like',
        offText: 'Dislike',
        onSwitchChange: function (event, state) {
            if (state) {
                $(this).attr("value", 'true');
                return;
            }
            $(this).attr("value", 'false');
        }
    });


}

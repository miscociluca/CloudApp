function UpdatePostDialog($data) {
	var form,
		titlu,
		comentariu,
		like;
	comentariu = $data.datas.Comments.length > 0 ? $data.datas.Comments[0].Comentariu : '';
	like = $data.datas.HasLike === true ? true : false;
	var checked = like === true ? 'checked' : '';
	titlu = $data.datas.Titlu;
    form = $("<form/>",
                    {
                        id: "update_post_type"
                    });

    var fieldset = "" +
		'<div class="form_block form-horizontal">' +

        // Titlu
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		'Titlu' +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="Title" value="' + titlu + '" class="form-control" id="Title" placeholder="">' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
		"</div>" +

    // Image
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    'Imagine' +
    "</label>" +
    '<div class="col-sm-9" id="img_preview">' +
    '<span class="btn btn-default btn-file"><i class="fa fa-cloud-upload" aria-hidden="true"></i><input type="file" name="Image" id="Image" data-error="#errorExtension" /></span>';
	console.log($data.datas.Imagine);
   fieldset += '<div class="pip">' +
                      '<img class="imageThumb" src="' + $data.getImageRender + '" />' +
                      '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                      '</div>'+ 
   '<div id="errorExtension"></div>' +
    "</div>" +
		"</div>" +

    // Comentarii
    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    'Comentariu' +
    "</label>" +
    '<div class="col-sm-9">' +
		'<input type="text" name="Comm" value="' + comentariu + '" class="form-control" id="Comm" placeholder="">' +
    "</div>" +
    "</div>" +
    // Like

    '<div class="form-group">' +
    '<label class="col-sm-3 control-label">' +
    'Like' +
    "</label>" +
    '<div class="col-sm-9" style="margin-top:7px;">' +
	'<input type="checkbox" name="heart" id="heart" class="css-checkbox" '+ checked+' /><label for="heart" class="css-label"/>'+
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
					if ($('#update_post_type').valid()) {
                        var $this = $(this);

						var inputs = $("#update_post_type");
                        var file = document.getElementById('Image');
                        var dataserialize = inputs.serializeObject();
                        var likes, titlu,comment,IdPost;

						var model = new FormData();
						titlu = $("#Title").val();
						comment = $("#Comm").val();
						likes = $("#heart").val() === 'on' ? true:false;
						IdPost = $data.datas.Id;
                        model.append('Titlu', titlu);
						model.append('Comments[0][Comentariu]', comment);
						model.append('Comments[0][Id_Postare]', IdPost);
						if ($data.datas.Comments.length > 0) {
							model.append('Comments[0][Id]', $data.datas.Comments[0].Id);
						}
						model.append('Likes[0][Id_Postare]', IdPost);
						if ($data.datas.Likes.length>0) {
							model.append('Likes[0][Id]', $data.datas.Likes[0] !== null ? $data.datas.Likes[0].Id : null);
						}
						model.append('HasLike', likes);
						model.append('Id', IdPost);

                        if (file.files.length !== 0) {
                            model.append('Image', file.files[0]);
                        }

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
                                    $data.row.data(record);

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
                        else {
                            $.Notify({
                                caption: $data.notify.title,
                                content: $data.notify.ValidatePosition + " " + position,
                                type: 'alert'
                            });
                        }
                    }
                }
            },
        "update_post_type_dialog"
    );

    // preview image after upload
    if (window.File && window.FileList && window.FileReader) {
        $("#Image").on("change", function (e) {
            var files = e.target.files,
              filesLength = files.length;
            $(".pip").remove();
            $("#img_preview").append('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
            for (var i = 0; i < filesLength; i++) {
				var f = files[i];
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
                        }
                        return;
                    }
                    $('.loading_img').hide();
                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
		console.log("Your browser doesn't support to File API");
    }
    $(".remove").click(function () {
        $(this).parent(".pip").remove();
        $("#Image").val("");
    });

    // validate
		$("#update_post_type")
            .validate({
                rules: {
                    Titlu: {
                        required: true,
                        maxlength: 250
                    },
                    Image: {
                        extension: "jpg|JPG|jpeg|JPEG|png|PNG"
                    }
                },
                messages: {
					Titlu: {
                        required: 'Campul Titlu este obligatoriu',
                        maxlength: 'Lungimea maxima a campului este de 250 carcatere'
                    },
                    Image: {
                        extension: 'Extensie neacceptata'
                    }
                },
                errorPlacement: function (error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
						$(placement).append(error);
                    } else {
                        error.insertAfter(element);
                    }
                }
            });
   

    // IsVisible, IsReadonly, Required
	$("[name='Like']").bootstrapSwitch({
		state: like,
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
function isEmpty(value) {
    return typeof value === 'string' && !value.trim() || typeof value === 'undefined' || value === null;
}
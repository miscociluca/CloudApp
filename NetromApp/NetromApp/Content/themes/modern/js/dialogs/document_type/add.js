function AddDocumentTypeDialog($data) {

	var form = $("<form/>",
		{
			id: "add_document_type"
		});

	// $currentCulture is set in _Layout header
	var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	var fieldset = "" +
		'<div class="form_block form-horizontal">' +
		'<div class="form-group">' +
		'<div class="col-sm-4">' +
		'<input type="hidden" name="Id" class="form-control" id="Id">' +
		'<input type="hidden" name="SealArchivePk" class="form-control" id="SealArchivePk" />' +
		'<input type="hidden" name="SealArchiveId" class="form-control" id="SealArchiveId" />' +
		'<input type="hidden" name="SealDocTypeId" class="form-control" id="SealDocTypeId" />' +
		'<input type="hidden" name="SealDocTypeName" class="form-control" id="SealDocTypeName" />' +
		"</div>" +
		"</div>" +
		'<div class="form-group" id="input_group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelName +
		"</label>" +
		'<div class="col-sm-9">';
	for (var i = 0; i < lang.length; i++) {
		var culture = lang[i].capitalize();
		var first_field_id = i === 0 ? 'firstFieldName' : '';
		var placeholder = culture === 'Ro' ? $data.label.LabelNameRo : $data.label.LabelNameEn;
		// Name language resource ro
		fieldset += '<input type="text" name="Name' + culture + '" class="form-control" id="' + first_field_id + '" placeholder="' + placeholder + '" /><span class="flag-icon flag-icon-' + lang[i] + '"></span>';
		fieldset += i === 0 ? '<span class="mandatory_field">*</span>' : '';
	}
	fieldset += '</div></div>' +
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelSealArchive +
		"</label>" +
		'<div class="col-sm-9">' +
		'<select id="sealArchiveListSelect" name="SealArchiveId"><option></option></select>' +
		"</div>" +
		"</div>" +
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelSealDocumentType +
		"</label>" +
		'<div class="col-sm-9">' +
		'<select id="sealSealSchemaListSelect" name="SealDocTypeId"><option></option></select>' +
		"</div>" +
		"</div>" +
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelIsSystemDocument +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="checkbox" name="IsSystemDocument" value="false">' +
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
					if ($('#add_document_type').valid()) {
						var $this = $(this);
						var dataserialize = $("#add_document_type").serializeObject();
						dataserialize.Name = $currentCulture === 'ro' ? dataserialize.NameRo : dataserialize.NameEn;

						var newObj = {
							IsSystemDocument: dataserialize.IsSystemDocument,
							Name: dataserialize.Name,
							SealArhivePk: dataserialize.SealArchivePk,
							SealArchiveId: $('#SealArchiveId').val(),
							SealDocTypeId: $('#SealDocTypeId').val(),
							SealDocTypeName: dataserialize.SealDocTypeName,
							NameLanguageResource: {
								Ro: dataserialize.NameRo,
								En: dataserialize.NameEn,
								LastUpdated: null
							}
						};

						$.ajax({
							url: $data.postAction,
							type: 'post',
							dataType: 'json',
							data: JSON.stringify(newObj),
							contentType: "application/json; charset=utf-8",
							beforeSend: function () {
								$.SavingPopup();
							},
							success: function (data) {
								var status = data.status;
								var record = data.data;
								if (status === 'OK') {
									$data.table.row.addFirst($data.table, record, 1);
									$($this).dialog('close');
									// success system notify
									$.Notify({
										caption: $data.notify.title,
										content: $data.notify.contentSuccess,
										type: 'success'
									});
									console.log("New document type was added");
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
		"add_document_type_dialog"
	);


	// GET seal archive
	$.ajax({
		url: $data.getAllSealArchive,
		type: "GET",
		beforeSend: function () {
			$('#sealArchiveListSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
		},
		complete: function () {
			$('#mini_group_loader').remove();
		},
		success: function (data) {
			if (data.status === "OK") {
				$.each(data.data, function (index, item) {
					var option = '<option Value="' + item.Id + '">' + item.DisplayName + '</option>';
					$("#sealArchiveListSelect").append(option);
				});
			}
		}
	});

	$("#sealArchiveListSelect").on("change", function (e) {
		var archiveId = $(this).find(":selected").val();
		$('#sealSealSchemaListSelect').find('option:not(:first)').remove();


		// GET seal doc type
		$.ajax({
			url: $data.getAllSealDocTypeList + '/' + archiveId,
			type: "GET",
			beforeSend: function () {
				$('#sealSealSchemaListSelect').after('<i class="fa fa-cog fa-spin fa-1x fa-fw" id="mini_group_loader"></i>');
			},
			complete: function () {
				$('#mini_group_loader').remove();
			},
			success: function (data) {
				if (data.status === "OK") {
					$.each(data.data.docType.list, function (index, item) {
						var option = '<option data-archive-pk="' + archiveId + '" data-archive-id="' + data.data.arhId + '" data-doc-type-name="' + item.name + '" Value="' + item.id + '">' + item.name + '</option>';
						$("#sealSealSchemaListSelect").append(option);
					});
				}
			}
		});
	});
	$("#sealSealSchemaListSelect").on("change", function (e) {
		var element = $("option:selected", this);
		var arhDocTypeId = $(this).find(":selected").val();

		var sealArchivePkValue = element.data('archive-pk');
		var sealArchiveIdValue = element.data('archive-id');
		var sealDocTypeNameValue = element.data('doc-type-name');
		
		$("#SealArchivePk").val(sealArchivePkValue);
		$("#SealArchiveId").val(sealArchiveIdValue);
		$("#SealDocTypeId").val(arhDocTypeId);
		$("#SealDocTypeName").val(sealDocTypeNameValue);
	});

	$.validator.addMethod("uniqueNameRo", function (value, element) {
		var exists = true;
		$.each($data.datas, function (index, obj) {
			if (value === obj.NameLanguageResource.Ro) {
				$('.checked').remove();
				exists = false;
				return;
			}
		});

		return exists;
	});

	$.validator.addMethod("uniqueNameEn", function (value, element) {
		var exists = true;
		$.each($data.datas, function (index, obj) {
			if (value === obj.NameLanguageResource.En) {
				$('.checked').remove();
				exists = false;
				return;
			}
		});

		return exists;
	});

	$.validator.addMethod("noSpace", function (value, element) {
		return $.trim(value).length !== 0;
	});

	// validate
	if ($currentCulture === 'ro') {
		$("#add_document_type")
			.validate({
				rules: {
					NameRo: {
						required: true,
						uniqueNameRo: true,
						noSpace: true,
						maxlength: 50
					}
				},
				messages: {
					NameRo: {
						required: $data.validateMessage.Name,
						noSpace: $data.validateMessage.Name,
						uniqueNameRo: $data.validateMessage.UniqueName,
						maxlength: $data.validateMessage.ValidateMaxLength
					}
				}
			});
	}
	else {
		$("#add_document_type")
			.validate({
				rules: {
					NameEn: {
						required: true,
						uniqueNameEn: true,
						maxlength: 50
					}
				},
				messages: {
					NameEn: {
						required: $data.validateMessage.Name,
						uniqueNameEn: $data.validateMessage.UniqueName,
						maxlength: $data.validateMessage.ValidateMaxLength
					}
				}
			});
	}

	//
	$("[name='IsSystemDocument']").bootstrapSwitch({
		state: false,
		size: 'small',
		onColor: 'success',
		onText: $data.isSystemDocument.on,
		offText: $data.isSystemDocument.off,
		onSwitchChange: function (event, state) {
			if (state) {
				$(this).attr("value", 'true');
				return;
			}
			$(this).attr("value", 'false');
		}
	});
}
function AddDefaultValueForIndexDialog($data)
{

    var form = $("<form/>",
        {
            id: "add_new_defaultValue_from_file"
        });

    var fieldset = "" +
        '<div class="form_block form-horizontal">' +

        '<div class="form-group">' +
        '<label class="col-sm-3 control-label">' +
        $data.label.ValidateFile +
        "</label>" +
        '<div class="col-sm-9" id="img_preview">' +
        '<span class="btn btn-default btn-file">' +
        '<i class="fa fa-cloud-upload" aria-hidden="true"></i>' +
        '<input type="file" name="IndexDefaultVal" id="IndexDefaultVal" data-error="#errorExtension" />' +
        '</span>' +
        '<div id="errorExtension"></div>' +
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
                    if ($('#add_new_defaultValue_from_file').valid()) {

                        var dataserialize = $("#add_new_defaultValue_from_file").serialize(),
                            $this = $(this);
                        var model = new FormData();
                        var file = document.getElementById('IndexDefaultVal');
                        model.append('fisier', file.files[0]);
                        model.append('Id', $data.datas.Id);
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
                                if (data.status === 'OK') {

                                    $($this).dialog('close');
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.contentSuccess,
                                        type: 'success'
                                    });
                                }
                                else if (data.status==='NOTALL') {
                                    ($this).dialog('close');
                                    $.Notify({
                                        caption: $data.notify.title,
                                        content: $data.notify.notAllContent,
                                        type: 'success'
                                    });
                                }
                                else {
                                    $($this).dialog('close');
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
        "add_defaultValue_from_file_dialog"
    );

    // preview image after upload
    if (window.File && window.FileList && window.FileReader) {
        $("#IndexDefaultVal").on("change", function (e) {
            var files = e.target.files,
                filesLength = files.length;
            $(".pip").remove();
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    $("#img_preview").append('<div class="loading_img"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

                    var file = e.target;
                    var fileExt = f.name.match(/\.(.+)$/)[1];
                    var acceptedExtension = ['csv', 'xls', 'xlsx'];//

                    if ($.inArray(fileExt, acceptedExtension) != -1) {
                        $("#img_preview").append('<div class="pip">' +
                            '<img class="imageThumb" src="../Content/DataTables/images/agent_upload.png" title="' + f.name + '" />' +
                            '<span class="remove"><i class="fa fa-times" aria-hidden="true"></i></span>' +
                            '</div>');
                        $(".remove").click(function () {
                            $(this).parent(".pip").remove();
                            $("#IndexDefaultVal").val("");
                        });
                        if ($('.pip').length > 0) {
                            $('.loading_img').remove();
                        };
                        return;
                    }
                    $('.loading_img').remove();
                });
                fileReader.readAsDataURL(f);
            }
        });
    }
}
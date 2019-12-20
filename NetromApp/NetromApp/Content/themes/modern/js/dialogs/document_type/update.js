function UpdateDocumentTypeDialog($data) {

	var $status = $data.data.IsSystemDocument;
	var form = $("<form/>",
		{
			id: "update_document_type"
		});
	// $currentCulture is set in _Layout header
	var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	var fieldset = "" +
		'<div class="form_block form-horizontal">' +
		'<div class="form-group">' +
		'<div class="col-sm-4">' +
		'<input type="hidden" name="Id" class="form-control" id="Id">' +
		'<input type="hidden" name="SealArchivePk" class="form-control" id="SealArchivePk" value="' + $data.data.SealArchivePk + '" />' +
		'<input type="hidden" name="SealArchiveId" class="form-control" id="SealArchiveId" value="' + $data.data.SealArchiveId + '" />' +
		'<input type="hidden" name="SealDocTypeId" class="form-control" id="SealDocTypeId" value="' + $data.data.SealDocTypeId + '" />' +
		'<input type="hidden" name="SealDocTypeName" class="form-control" id="SealDocTypeName" value="' + $data.data.SealDocTypeName + '" />' +
		"</div>" +
		"</div>";
	for (var i = 0; i < lang.length; i++) {
		var culture = lang[i].capitalize();
		var label = $data.label.LabelNameEn;
		var value = $data.data.NameLanguageResource.En;
		var first_field_id = i === 0 ? 'firstFieldName' : '';
		if (culture === 'Ro') {
			label = $data.label.LabelNameRo;
			value = $data.data.NameLanguageResource.Ro;
		}
		// Name language resource ro
		fieldset += '<div class="form-group" id="NameField">' +
			'<label class="col-sm-3 control-label">' +
			label +
			"</label>" +
			'<div class="col-sm-9">' +
			'<input type="text" name="Name' + culture + '" value="' + $.nullToEmptyString(value) + '" class="form-control" id="' + first_field_id + '" placeholder="' + label + '">';
		fieldset += i === 0 ? '<span class="mandatory_field">*</span>' : '';
		fieldset += "</div>" +
			"</div>";
	}
	// Seal Doc Type
	fieldset += '<div class="form-group">' +
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
		'<input type="checkbox" name="IsSystemDocument" value="' + $status + '">' +
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
					if ($('#update_document_type').valid()) {
						var $this = $(this);
						var dataserialize = $("#update_document_type").serializeObject();
						var d = $data.data;

						dataserialize.Name = $currentCulture === 'ro' ? dataserialize.NameRo : dataserialize.NameEn;

						var newObj = {
							Id: d.Id,
							IsSystemDocument: dataserialize.IsSystemDocument,
							Name: dataserialize.Name,
							NameResId: d.NameResId,
							SealArhivePk: dataserialize.SealArchivePk,
							SealArchiveId: $('#SealArchiveId').val(),
							SealDocTypeId: $('#SealDocTypeId').val(),
							SealDocTypeName: dataserialize.SealDocTypeName,
							NameLanguageResource: {
								Id: d.NameLanguageResource.Id,
								Ro: dataserialize.NameRo,
								En: dataserialize.NameEn,
							},
							DocumentTypeVersion: d.DocumentTypeVersion
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
								var result = data.data;
								var success = data.status;

								if (data.status === 'OK') {
									$data.row.data(data.data);

									$($this).dialog('close');
									// success system notify
									$.Notify({
										caption: $data.notify.title,
										content: $data.notify.contentSuccess,
										type: 'success'
									});
									console.log("Document type was update");
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
		"update_dialog"
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
					$selected = !$.isEmpty($data.data.SealArhivePk) && $data.data.SealArhivePk === item.Id ? 'selected' : '';
					var option = '<option Value="' + item.Id + '" ' + $selected + '>' + item.DisplayName + '</option>';
					$("#sealArchiveListSelect").append(option);

					if (!$.isEmpty($data.data.SealArhivePk) && $data.data.SealArhivePk === item.Id) {
						var archiveId = $data.data.SealArhivePk;
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
										$selected = !$.isEmpty($data.data.SealDocTypeId) && $data.data.SealDocTypeId === item.id ? 'selected' : '';
										var option = '<option data-archive-pk="' + archiveId + '" data-archive-id="' + data.data.arhId + '" data-doc-type-name="' + item.name + '" Value="' + item.id + '" ' + $selected + '>' + item.name + '</option>';
										$("#sealSealSchemaListSelect").append(option);
									});
								}
							}
						});
					}
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
			if (value !== $data.data.NameLanguageResource.Ro && value === obj.NameLanguageResource.Ro) {
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
			if (value !== $data.data.NameLanguageResource.En && value === obj.NameLanguageResource.En) {
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
		$("#update_document_type")
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
						uniqueNameRo: $data.validateMessage.UniqueName,
						noSpace: $data.validateMessage.Name,
						maxlength: $data.validateMessage.ValidateMaxLength
					}
				}
			});
	}
	else {
		$("#update_document_type")
			.validate({
				rules: {
					NameEn: {
						required: true,
						uniqueNameEn: true,
						noSpace: true,
						maxlength: 50
					}
				},
				messages: {
					NameEn: {
						required: $data.validateMessage.Name,
						uniqueNameEn: $data.validateMessage.UniqueName,
						noSpace: $data.validateMessage.Name,
						maxlength: $data.validateMessage.ValidateMaxLength
					}
				}
			});
	}


	//
	$("[name='IsSystemDocument']").bootstrapSwitch({
		state: $status,
		size: 'small',
		onColor: 'success',
		onText: $data.isSystemDocument.on,
		offText: $data.isSystemDocument.off,
		onSwitchChange: function (event, state) {
			console.log(state);
			if (state) {
				$(this).attr("value", 'true');
				return;
			}
			$(this).attr("value", 'false');
		}
	});
}

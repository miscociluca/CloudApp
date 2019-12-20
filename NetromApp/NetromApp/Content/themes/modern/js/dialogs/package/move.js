function MovePackageDialog($data) {

	var form = $("<form/>",
		{
			id: "move_package_form"
		});

	var fieldset = "" +
		'<div class="form_block form-horizontal">' +
		// Package Type Combobox
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelPackageType +
		"</label>" +
		'<div class="col-sm-9">' +
		'<select id="packageTypeSelect" name="PackageTypeId"><option></option></select>' +
		'<span class="mandatory_field">*</span>' +
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
					if ($('#move_package_form').valid()) {
						var $this = $(this);
						var dataserialize = $("#move_package_form").serializeObject();
						$.ajax({
							url: $data.getAction + '/' + $data.datas.Id + '/' + dataserialize.PackageTypeId,
							type: 'GET',
							dataType: 'json',
							beforeSend: function () {
								$dialog = $.SavingPopup();
							},
							success: function (data) {
								var status = data.status;
								if (status === 'OK') {
									$data.table.ajax.reload(null, false);
									$($dialog).dialog('close');
								} else {

								}
							}
						});
					}
				}
			}
		},
		"move_package_form"
	);

	// get all packageType
	$.ajax({
		url: $data.getActionPackageType,
		type: 'get',
		success: function (data) {
			if (data.status === 'OK') {
				var datas = data.data;
				var element = $('#packageTypeSelect');
				if (datas.length > 0) {
					var lang = $currentCulture === 'ro' ? ['ro', 'en'] : ['en', 'ro'];
					$.each(datas, function (key, value) {
						$name = datas[key].NameLanguageResource.En;
						if ($currentCulture === 'ro') {
							$name = datas[key].NameLanguageResource.Ro
						}
						element.append('<option value="' + datas[key].Id + '">' + $name + '</option>');
					});
				} else {
					element.append('<i class="empty_block">' + $data.label.EmptyMsgNoUserGroup + '</i>');
				}
				listbox();
			}
		}
	});

	// validate
	$("#move_package_form")
		.validate({
			rules: {
				PackageTypeId: {
					required: true
				},
			}
		});
}

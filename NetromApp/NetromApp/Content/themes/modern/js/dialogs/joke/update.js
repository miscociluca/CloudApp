function UpdateJokeDialog($data) {

	var $id = $data.data.Id;
	var $titlu = $data.data.Titlu;
	var $joke = $data.data.Gluma;
	var $votes = $data.data.Voturi;
	var $lastUpdated = $.dateTimeFormat($data.data.LastUpdate);
	var form = $("<form/>",
		{
			id: "update_joke"
		});
	var fieldset = "" +
		'<div class="form_block form-horizontal">' +

		'<div class="form-group">' +
		'<div class="col-sm-4">' +
		'<input type="hidden" name="Id" class="form-control" id="Id" value="' + $id + '" placeholder="">' +
		"</div>" +
		"</div>" +

		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelTitlu +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" name="Titlu" value="' + $titlu + '" class="form-control" id="Titlu" placeholder="">' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
		"</div>" +

		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelJoke +
		"</label>" +
		'<div class="col-sm-9">' +
		'<textarea type="text" name="Gluma"class="form-control" autocomplete="off" id="Gluma" placeholder="" rows = "4">' + $joke + '</textarea>' +
		'<span class="mandatory_field">*</span>' +
		"</div>" +
		"</div>" +

		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
		$data.label.LabelVotes +
		"</label>" +
		'<div class="col-sm-6">' +
		'<input type="text" name="Voturi" value="' + $votes + '" class="form-control" id="Voturi" autocomplete="off" placeholder="">' +
		"</div>" +
		"</div>" +
		
		'<div class="form-group">' +
		'<label class="col-sm-3 control-label">' +
			$data.label.LabelUpdated +
		"</label>" +
		'<div class="col-sm-9">' +
		'<input type="text" readonly name="LastUpdated" value="' + $lastUpdated + '" class="form-control" id="LastUpdated" placeholder="">' +
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
					if ($('#update_joke').valid()) {
						var $this = $(this);

						var dataserialize = $("#update_joke").serializeObject(),
							model = new FormData();

						var Titlu = $("#Titlu").val();
						var Gluma = $("#Gluma").val();
						var Voturi = $("#Voturi").val();
						model.append('Id', $id);
						model.append('Titlu', Titlu);
						model.append('Gluma', Gluma);
						model.append('Voturi', Voturi);

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
									$data.row.data(data.data);
									$($this).dialog('close');
									// success system notify
									$.Notify({
										caption: $data.notify.title,
										content: $data.notify.contentSuccess,
										type: 'success'
									});
									console.log("Joke was updated");
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
		"update_joke_dialog"
	);


	// form validate
	$.validator.addMethod("noSpace", function (value, element) {
		return value.indexOf(" ") < 0 && value !== "";
	});
	$.validator.addMethod("noOnlySpace", function (value, element) {
		return value !== "" &&($.trim(value)).length !== 0;
	});

	$.validator.addMethod("minVal", function (value, element) {
		return value === 0 || value>= 0 && value<=10;
	});
	$("#update_joke")
		.validate({
			rules: {
				Titlu: {
					required: true,
					maxlength: 150
				},
				Voturi: {
					required: true,
					minVal:true
				},
				Gluma: {
					required: true,
					maxlength: 150
				}
			},
			messages: {
				Titlu: {
					required: 'Campul Titlul este obligatoriu',
					maxlength: 'S-a depasit lungimea maxima admisa a campului Titlu'
				},
				Voturi: {
					minVal:'Campul Voturi trebuie sa contina o valoare intre 1 si 10!'
				},
				Gluma: {
					required: 'Campul Gluma este obligatoriu',
					maxlength: 'S-a depasit lungimea maxima admisa a campului Gluma'
				}
			}
		});

}

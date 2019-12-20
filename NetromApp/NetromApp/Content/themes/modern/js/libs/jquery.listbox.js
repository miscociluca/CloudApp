// listbox
function listbox() {
	var btnRight = $('#btnRight'),
		btnLeft = $('#btnLeft');

	btnRight.prop('disabled', true);
	btnLeft.prop('disabled', true);

	$('#move_from').each(function (e) {
		$(this).on('click', function () {
			btnRight.prop('disabled', false);
			btnLeft.prop('disabled', true);
		});
	});

	$('#move_to').each(function (e) {
		$(this).on('click', function () {
			btnLeft.prop('disabled', false);
			btnRight.prop('disabled', true);
		});
	});

	$('#btnRight').click(function (e) {
		var selectedOpts = $('#move_from option:selected');
		if (selectedOpts.length == 0) {
			e.preventDefault();
		}
		$('#move_to').append($(selectedOpts).clone());
		btnRight.prop('disabled', true);
		$('#move_to option').prop('selected', true);
		$(selectedOpts).remove();
		e.preventDefault();
	});
	$('#btnAllRight').click(function (e) {
		var selectedOpts = $('#move_from option');
		btnLeft.prop('disabled', true);
		btnRight.prop('disabled', true);
		if (selectedOpts.length == 0) {
			e.preventDefault();
		}
		$('#move_to').append($(selectedOpts).clone());
		$('#move_to option').prop('selected', true);

		$(selectedOpts).remove();

		e.preventDefault();
	});
	$('#btnLeft').click(function (e) {
		var selectedOpts = $('#move_to option:selected');
		if (selectedOpts.length == 0) {
			e.preventDefault();
		}
		btnLeft.prop('disabled', true);
		$('#move_from').append($(selectedOpts).clone());
		$(selectedOpts).remove();
		e.preventDefault();
	});
	$('#btnAllLeft').click(function (e) {
		var selectedOpts = $('#move_to option');
		btnLeft.prop('disabled', true);
		btnRight.prop('disabled', true);
		if (selectedOpts.length == 0) {
			e.preventDefault();
		}
		$('#move_from').append($(selectedOpts).clone());
		$(selectedOpts).remove();
		e.preventDefault();
	});
}
function listbox2() {

    var btnRight = $('#btnRight2'),
        btnLeft = $('#btnLeft2');

    btnRight.prop('disabled', true);
    btnLeft.prop('disabled', true);

    $('#move_from2').each(function (e) {
        $(this).on('click', function () {
            btnRight.prop('disabled', false);
            btnLeft.prop('disabled', true);
        });
    });

    $('#move_to2').each(function (e) {
        $(this).on('click', function () {
            btnLeft.prop('disabled', false);
            btnRight.prop('disabled', true);
        });
    });

    $('#btnRight2').click(function (e) {
        var selectedOpts = $('#move_from2 option:selected');
        if (selectedOpts.length == 0) {
            e.preventDefault();
        }
        $('#move_to2').append($(selectedOpts).clone());
        btnRight.prop('disabled', true);
        $('#move_to2 option').prop('selected', true);
        $(selectedOpts).remove();
        e.preventDefault();
    });
    $('#btnAllRight2').click(function (e) {
        var selectedOpts = $('#move_from2 option');
        btnLeft.prop('disabled', true);
        btnRight.prop('disabled', true);
        if (selectedOpts.length == 0) {
            e.preventDefault();
        }
        $('#move_to2').append($(selectedOpts).clone());
        $('#move_to2 option').prop('selected', true);

        $(selectedOpts).remove();

        e.preventDefault();
    });
    $('#btnLeft2').click(function (e) {
        var selectedOpts = $('#move_to2 option:selected');
        if (selectedOpts.length == 0) {
            e.preventDefault();
        }
        btnLeft.prop('disabled', true);
        $('#move_from2').append($(selectedOpts).clone());
        $(selectedOpts).remove();
        e.preventDefault();
    });
    $('#btnAllLeft2').click(function (e) {
        var selectedOpts = $('#move_to2 option');
        btnLeft.prop('disabled', true);
        btnRight.prop('disabled', true);
        if (selectedOpts.length == 0) {
            e.preventDefault();
        }
        $('#move_from2').append($(selectedOpts).clone());
        $(selectedOpts).remove();
        e.preventDefault();
    });
}
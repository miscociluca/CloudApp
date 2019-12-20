$(document).ready(function () {
    /**
     * Page loader
     */
    $("#page-loader div").delay(0).fadeOut();
    $("#page-loader").delay(250).fadeOut("slow");

    // sidebar collapse
    $("#collapse > a")
        .on('click',
            function () {
                if (!$('#collapsed').length) {
                    // add collapse class
                    $('.sidebar').attr('id', 'collapsed');
                    $.cookie('collapsed', "on");
                    collapsed();
                    return true;
                }
                $.cookie('collapsed', "off");
                $(".sidebar").removeAttr("id");
                uncollapsed();
            });
    if ($.cookie('collapsed') === 'on') {
        $('.sidebar').attr('id', 'collapsed');
        collapsed();
    }

    function collapsed() {
        if ($(".sidebar").hasClass('col-lg-2')) {
            $(".sidebar").removeClass('col-lg-2').addClass('col-lg-1');
        } else if ($(".sidebar").hasClass('col-md-2')) {
            $(".sidebar").removeClass('col-md-2').addClass('col-md-1');
        } else if ($(".sidebar").hasClass('col-sm-4')) {
            $(".sidebar").removeClass('col-sm-4').addClass('col-sm-1');
        }

        if ($("#main").hasClass('col-lg-10')) {
            $("#main").removeClass('col-lg-10').addClass('col-lg-11');
        } else if ($("#main").hasClass('col-md-10')) {
            $("#main").removeClass('col-md-10').addClass('col-md-11');
        } else if ($("#main").hasClass('col-sm-8')) {
            $("#main").removeClass('col-sm-8').addClass('col-sm-9');
        }
    }
    function uncollapsed() {
        if ($(".sidebar").hasClass('col-lg-1')) {
            $(".sidebar").removeClass('col-lg-1').addClass('col-lg-2');
        } else if ($(".sidebar").hasClass('col-md-1')) {
            $(".sidebar").removeClass('col-md-1').addClass('col-md-2');
        } else if ($(".sidebar").hasClass('col-sm-1')) {
            $(".sidebar").removeClass('col-sm-1').addClass('col-sm-4');
        }

        if ($("#main").hasClass('col-lg-11')) {
            $("#main").removeClass('col-lg-11').addClass('col-lg-10');
        } else if ($("#main").hasClass('col-md-11')) {
            $("#main").removeClass('col-md-11').addClass('col-md-10');
        } else if ($("#main").hasClass('col-sm-9')) {
            $("#main").removeClass('col-sm-9').addClass('col-sm-8');
        }
    }

    $(".nav-sidebar a").on("click", function () {
        $(".nav-sidebar").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    // for bootstrap 3 use 'shown.bs.tab', for bootstrap 2 use 'shown' in the next line
    //$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    //    // save the latest tab; use cookies if you like 'em better:
    //    localStorage.setItem('lastTab', $(this).attr('href'));
    //});
    //// go to the latest tab, if it exists:
    //var lastTab = localStorage.getItem('lastTab');
    //if (lastTab) {
    //    $('[href="' + lastTab + '"]').tab('show');
    //}
    var url = window.location;
    // Will only work if string in href matches with location
    $('ul.nav a[href="' + url + '"]').parent().addClass('active');

    // Will also work for relative and absolute hrefs
    $('ul.nav a').filter(function () {
        return this.href === url;
    }).parent().addClass('active');

    // tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    // selectable dropdown
    $('.languageFlags li.active').click(function (e) {
        $('#languageCurrentFlags').html(this.innerHTML);
    });

    //
    $('#accountTab a')
        .click(function (e) {
        });

    $(document).on('change', ':file', function () {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

 

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

	$.extend({
		htmlEncode: function (html) {
			return document.createElement('a').appendChild(
				document.createTextNode(html)).parentNode.innerHTML;
		}
	});

	$.extend({
		htmlDecode: function (html) {
			var a = document.createElement('a'); a.innerHTML = html;
			return a.textContent;
		}
	});

	$.extend({
		StringLimit: function (str, limit) {
			if ($.isEmpty(str)) {
				return '';
			}
			var displayText = "";
			if (str.length > limit) {
				displayText = str.substring(0, limit) + "...";
			} else {
				displayText = str
			}
			return escape(displayText);
		}
	});

    $.extend({
        SavingPopup: function () {
            var displayText = "";
            
                displayText = "Saving...";
            
            var message = '<i class="fa fa-cog fa-spin fa-3x fa-fw"></i> ' + displayText;
            return $.showPageDialog(null,
                message, {} , "loading_dialog"
            );
        }
    });

    $.extend({
        LoadingPopup: function () {
            var displayText = "";
            
                displayText = "Saving...";
            
            var message = '<i class="fa fa-cog fa-spin fa-3x fa-fw"></i> ' + displayText;

            return $.showPopupDialog(null,
                message, {} , "loading_dialog"
            );
        }
    });

    $.extend({
        getValues: function (url) {
            var result = null;
            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                success: function (response) {
                    result = response;
                }
            });
            return result;
        }
    });
    $.extend({
        isEmpty: function (value) {
            return typeof value === 'string' && !value.trim() || typeof value == 'undefined' || value === null || value === 'null';
        }
    });

    $.extend({
        limitString: function (value, size) {
            if (!$.isEmpty(value)) {
                return value.length > size ? value.substr(0, size) + '...' : value;
            }
        }
    });
    $.extend({
        nullToEmptyString: function (value) {
            if ($.isEmpty(value)) {
                return '';
            }
            return value;
        }
    });
    $.extend({
        lookup: function (array, prop, value) {
            var obj = {};
            $.each(array, function (k, v) {
                if (array[k][prop] === value) {
                    obj = array[k];
                }
            });
            return obj;
        }
    });

    $.extend({
        dateTimeFormat: function (dateTime, fotmatTemplate = "DD/MM/YYYY HH:mm:ss") {
            var date = moment(dateTime);
                fotmatTemplate = "MM/DD/YYYY HH:mm:ss";
            

            return date.format(fotmatTemplate);
        }});

    $.extend({
        dateFormat: function (dateTime, fotmatTemplate = "MM/DD/YYYY") {
            var date = moment(dateTime);
                fotmatTemplate = "MM/DD/YYYY";
            

            return date.format(fotmatTemplate);
        }});
})
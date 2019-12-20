$(document).ready(function () {
    // jquery ui function
    // ui form dialog
    (function ($) {
        $.extend({
            showPageDialog: function (title, content, buttons, dialogClass, options) {
                if (!buttons)
                    buttons = {
                        "ok": function () {
                            $(this).dialog("close");
                        }
                    };
                var defOptions = {
                    autoOpen: false,
                    modal: true,
                    dialogClass: dialogClass,
                    title: title,
                    buttons: buttons,
                    open: function (event, ui) {
                        console.log('dialog opened')
                        $.ajaxSetup({
                            beforeSend: function () {
                                var elem = $("#additional_loader");
                                if (elem.length == 0) {
                                    $(".ui-dialog").append('<div id="additional_loader"><span class="spinner"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i>Se încarcă</span></div>');
                                }
                            },
                            complete: function () {
                                console.log('additional field completed loading')
                            }
                        });

                        $(document).ajaxStop(function () {
                            $(".ui-dialog #additional_loader").remove();
                        });

                        $(event.target).dialog('widget')
                            .css({ position: "fixed" })
                            .position({ my: "center", at: "center", of: window });

                        var dialog = this;
                        //$(".ui-widget-overlay")
                        //    .bind("click",
                        //        function() {
                        //            $(dialog).dialog("close");
                        //        });
                    },
                    draggable: false,
                    position: { my: "center", at: "center" },
                    width: "500px",
                    minHeight: "30px",
                    maxWidth: "90%",
                    //hide: "fade",
                    //show: "fade"
                };
                if (options)
                    defOptions = $.extend(defOptions, options);
                var pd = $("#pageDialog");
                if (pd.length < 1)
                    pd = $("<div/>").attr("id", "pageDialog")
                    .appendTo("body");
                else
                    pd.dialog('destroy');
                pd.html(content)
                .dialog(defOptions)
                .dialog("open");

                return pd;
            }
        }
        );

    })(jQuery);
})
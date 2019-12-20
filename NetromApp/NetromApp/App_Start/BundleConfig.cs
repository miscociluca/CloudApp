using System.Web;
using System.Web.Optimization;

namespace NetromApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            // image fill js
            bundles.Add(new ScriptBundle("~/Content/imagefill").Include(
                        "~/Content/themes/modern/js/libs/jquery-imagefill.js"));

            // imagesloaded js
            bundles.Add(new ScriptBundle("~/Content/imagesloaded").Include(
                        "~/Content/themes/modern/js/libs/jquery.imagesloaded.min.js"));
            bundles.Add(new ScriptBundle("~/vendor").Include(
            "~/vendor/jquery/jquery.min.js",
            "~/vendor/bootstrap/js/bootstrap.bundle.min.js",
            "~/vendor/jquery-easing/jquery.easing.min.js",
            "~/Scripts/sb-admin-2.min.js"
            ));
            // posts confirm dialog js
            bundles.Add(new ScriptBundle("~/Content/dialog/posts").Include(
                        "~/Content/themes/modern/js/dialogs/posts/*.js"));
            // jokes confirm dialog js
            bundles.Add(new ScriptBundle("~/Content/dialog/joke").Include(
                        "~/Content/themes/modern/js/dialogs/joke/*.js"));
            // bootstrap color picker js
            bundles.Add(new ScriptBundle("~/bundles/bootstrapcolorpickerjs").Include(
                        "~/Scripts/bootstrap-colorpicker.js"));
            // jQuery
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-1.11.2.js"));
            // jquery UI
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-1.11.4.js"));
            // jquery UI datepicker en
            bundles.Add(new ScriptBundle("~/Content/datapicker_en").Include(
                        "~/Content/themes/modern/js/jquery-ui-internationalization/datepicker-en-GB.js"));
            // jquery UI datepicker ro
            bundles.Add(new ScriptBundle("~/Content/datapicker_ro").Include(
                        "~/Content/themes/modern/js/jquery-ui-internationalization/datepicker-ro.js"));
            // jquery cookie
            bundles.Add(new ScriptBundle("~/bundles/jquerycookie").Include(
                        "~/Scripts/jquery.cookie.js"));
            // jquery validate
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // jquery validate additional
            bundles.Add(new ScriptBundle("~/bundles/jqueryvaladditional").Include(
                        "~/Scripts/jquery.val.additional-methods.js"));

            // main js
            bundles.Add(new ScriptBundle("~/bundles/shahash").Include(
                        "~/Content/themes/modern/js/libs/jquery.sha1.js"));

            // bootstrapcss js
            bundles.Add(new ScriptBundle("~/bundles/bootstrapcssjs").Include(
                        "~/Scripts/bootstrap.js"));

            // bootstrap switch js
            bundles.Add(new ScriptBundle("~/Content/bootstrapswitch").Include(
                        "~/Content/themes/modern/js/bootstrap_switch/bootstrap-switch.js"));
            // moment js
            bundles.Add(new ScriptBundle("~/bundles/momentjs").Include(
                        "~/Scripts/moment.js",
                        "~/Scripts/moment-with-locales.js"));

            // main js
            bundles.Add(new ScriptBundle("~/bundles/mainjs").Include(
                        "~/Content/themes/modern/js/main.js"));
            // package lazyloading
            bundles.Add(new ScriptBundle("~/bundels/lazyload").Include(
                        "~/Scripts/jquery.lazyload.js"));

            // bootstrap color picker js
            bundles.Add(new ScriptBundle("~/bundles/listbox").Include(
                        "~/Content/themes/modern/js/libs/jquery.listbox.js"));
            // notify css
            bundles.Add(new StyleBundle("~/Content/notifycss").Include(
                        "~/Content/themes/modern/css/notification-popup.css"));
            // chart js
            bundles.Add(new ScriptBundle("~/bundles/chart").Include(
                        "~/Scripts/chart.js"));
            // form template js
            bundles.Add(new ScriptBundle("~/bundles/formsjs").Include(
                        "~/Content/themes/modern/js/formTemplate.js"));
            // Font awesome css
            bundles.Add(new StyleBundle("~/Content/fontAwesome").Include(
                        "~/Content/font-awesome.css"));

            // data tables js
            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                        "~/Scripts/DataTables/jquery.dataTables.js"));

            // bootstrap color picker css
            bundles.Add(new StyleBundle("~/Content/bootstrapcolorpickercss").Include(
                        "~/Content/bootstrap-colorpicker/css/bootstrap-colorpicker.css"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            "~/Scripts/modernizr-*"));
            bundles.Add(new StyleBundle("~/Content/themescss").Include(
                        "~/Content/Site.css"));
            // addtabledata js
            bundles.Add(new ScriptBundle("~/bundles/addtabledata").Include(
                        "~/Content/themes/modern/js/libs/add-datatable.js"));
            // Bootstrap css
            bundles.Add(new StyleBundle("~/Content/bootstrapCss").Include(
                        "~/Content/bootstrap.css"));
            // serializeobject js
            bundles.Add(new ScriptBundle("~/Content/serializeobject").Include(
                        "~/Content/themes/modern/js/serialize_object/jquery.serialize-object.min.js"));
            // notify js
            bundles.Add(new ScriptBundle("~/Content/notifyjs").Include(
                        "~/Content/themes/modern/js/libs/notification-popup.js"));
            // bootstrap switch css
            bundles.Add(new StyleBundle("~/Content/bootstrapswitchcss").Include(
                        "~/Content/themes/modern/css/bootstrap_switch/bootstrap-switch.css"));
            // Flag icon css
            bundles.Add(new StyleBundle("~/Content/flagIcon").Include(
                        "~/Content/flag-icon.css"));
            // utils js
            bundles.Add(new ScriptBundle("~/bundles/utilsjs").Include(
                        "~/Content/themes/modern/js/utils.js"));
            // Segoe font icon css
            bundles.Add(new StyleBundle("~/Content/mdl2").Include(
                        "~/Content/mdl2.css"));
            // collapse js
            bundles.Add(new ScriptBundle("~/bundles/sidebarcollapse").Include(
                        "~/Content/themes/modern/js/libs/sidebar-collapse.js"));
            // Animate css
            bundles.Add(new StyleBundle("~/Content/animate").Include(
                        "~/Content/animate.css"));
            // Data Tables css
            bundles.Add(new ScriptBundle("~/bundles/datatablescss").Include(
                        "~/Content/DataTables/css/dataTables.bootstrap.css"));
            // Data Tables select css
            bundles.Add(new ScriptBundle("~/bundles/datatableselectcss").Include(
                        "~/Content/DataTables/css/select.dataTables.css"));
            // Data Tables reorder css
            bundles.Add(new ScriptBundle("~/bundles/datatablereordercss").Include(
                        "~/Content/DataTables/css/rowReorder.dataTables.css"));
            // collapse active menu js
            bundles.Add(new ScriptBundle("~/bundles/sidebaractivemenu").Include(
                        "~/Content/themes/modern/js/libs/sidebar-active-menu.js"));

        }
    }
}

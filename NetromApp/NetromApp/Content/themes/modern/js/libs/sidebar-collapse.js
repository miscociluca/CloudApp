$(document).ready(function () {
    // $baseUrl is initialized on _Layout.cshtml top
    var $yetVisited = localStorage['sidebar_collapsed'],
        $left = 100 + 'px',
        $right = 100 + '%',
        $img_full = $baseUrl + '/img/logo2.png',
		$img_small = $baseUrl + '/img/logo2.png';

    if ($yetVisited && $yetVisited === 'true') {
        collapseSidebar();
    }
    $('#sidebar_toggle').on('click', function () {
        if ($('.sidebar_toggle').length === 0) {
            localStorage['sidebar_collapsed'] = true;
            collapseSidebar();
            return;
        }

        localStorage['sidebar_collapsed'] = false;
        removeCollapseSidebar();
    });

    $('#sidebar_toggle_mobile').on('click', function () {
        if ($('.sidebar_toggle_mobile').length === 0) {
            showSidebar();
            return;
        }
        hideSidebar();
    });

    $('#sidebar_toggle_close').on('click', function () {
        hideSidebar();
    });

    function collapseSidebar() {
        $('.logo_block img').attr("src", $img_small);
        $('.sidebar').addClass('sidebar_toggle');
        $('.left_header').css({ width: $left });
        $('#main').css({ width: $right, paddingLeft: $left });
        $('.right_header_block').css({ width: $right, paddingLeft: $left });
        $('#footer').css({ width: $right, paddingLeft: $left });
    }

    function removeCollapseSidebar() {
        $('.logo_block img').attr("src", $img_full);
        $('.sidebar').removeClass('sidebar_toggle');
        $('.sidebar').removeAttr('style');
        $('.left_header').removeAttr('style');
        $('#main').removeAttr('style');
        $('.right_header_block').removeAttr('style');
        $('#footer').removeAttr('style');
    }

    function showSidebar() {
        $('.sidebar').removeClass('col-lg-2 col-md-2 col-sm-4 col-xs-12 sidebar_toggle');
        $('.sidebar').addClass('sidebar_toggle_mobile');
    }
    function hideSidebar() {
        $('.sidebar').addClass('col-lg-2 col-md-2 col-sm-4 col-xs-12 sidebar_toggle');
        $('.sidebar').removeClass('sidebar_toggle_mobile');
    }
});
$(document).ready(function () {
    var pathArray = [
        {
            'path': 'index',
            'value': [
                '/',
                'index'
            ],
            'inTree': false
        },
        {
            'path': 'user',
            'value': [
                   'usersandgroups'
            ],
            'inTree': false
        },
        {
            'path': 'document',
            'value': [
                 'DocumentsType',
                 'DocumentTypeVersion',
                 'IndexDef'
            ],
            'inTree': false
        },
        {
            'path': 'package',
            'value': [
                    'PackagesType',
                    'packages',
                    'components',
                    'componentsetting'
            ],
            'inTree': false
        },
        {
            'path': 'summary',
            'value': [
            ],
            'inTree': false
        },
        {
            'path': 'valueList',
            'value': [
                 'ValueLists',
                 'ValueListVersion',
                 'ValueListItems'
            ],
            'inTree': false
        },
        {
            'path': 'plugin',
            'value': [
                 'Plugin',
                 'PluginSetting'
            ],
            'inTree': false
        },
        {
            'path': 'icon',
            'value': [
                'Icon'
            ],
            'inTree': false
        },
        {
            'path': 'administrator',
            'value': [
                 'Administrators'
            ],
            'inTree': false
        },
        {
            'path': 'setting',
            'value': [
                 'Settings',

            ],
            'inTree': false
        },
        {
            'path': 'record',
            'value': [
                        'Records'
            ],
            'inTree': true
        },
        {
            'path': 'report',
            'value': [
                        'Reports'
            ],
            'inTree': true
        },
        {
            'path': 'device',
            'value': [
                        'Devices'
            ],
            'inTree': true
        },
        {
            'path': 'audit',
            'value': [
                        'Audit'
            ],
            'inTree': true
        }
    ],
    localeStorage = localStorage['sidebar_collapsed'],
    baseUrl = $baseUrl;


    var urlPaths = location.pathname.split("/");

    for (var i = 0; i < urlPaths.length; i++) {
        for (var j = 0; j < pathArray.length; j++) {
            if ($.inArray(urlPaths[i], pathArray[j].value) != -1) {
                $.each($('.nav-sidebar li'), function (k, v) {
                    var anchorParent = $(this).children("[data-path='" + pathArray[j].path + "']").parent('li');
                    if (pathArray[j].inTree) {
                        anchorParent.parent('ul').addClass('in');
                    }
                    anchorParent.addClass('active');
                });
                break;
            }
        }
    }
});
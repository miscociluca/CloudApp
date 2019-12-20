function PreviewDocumentDialog($data) {
    var groups = [],
        groupRowColumn = [],
        datas = $data.datas,
        table, row, col, content, label;

    // sort by position
    datas.sort(SortByPosition);

    var groupsObject = {}, groups = [];
    for (var i = 0; i < datas.length; i++) {
        var indexGroup = datas[i].IndexGroup,
            groupName;
        if (!$.isEmpty(indexGroup)) {
            groupName = $currentCulture === 'ro' ? indexGroup.NameLanguageResource.Ro : indexGroup.NameLanguageResource.En;
        } else {
            groupName = $currentCulture === 'ro' ? 'Altele' : 'Another';
        }
        if (!groupsObject[groupName]) {
            groupsObject[groupName] = [];
        }
        var displayName = $currentCulture === 'ro' ? datas[i].NameLanguageResource.Ro : datas[i].NameLanguageResource.En;
        groupsObject[groupName].push({
            DisplayName: displayName,
            GridRow: datas[i].GridRow,
            GridColumn: datas[i].GridColumn,
        });
    }

    for (var group in groupsObject) {
        groups.push({ GroupName: group, IndexDef: groupsObject[group] });
    }

    table = '<table>';

    for (i = 0; i < groups.length; i++) {
        row += '<tr><td colspan="2"><h2>' + groups[i].GroupName + '</h2></td></tr>';

        for (j = 0; j < groups[i].IndexDef.length ; j++) {
            var indexDef = groups[i].IndexDef[j],
                label = indexDef.DisplayName,
                gridRow = indexDef.GridRow,
                gridColumn = indexDef.GridColumn;

            var columns = $.grep(groups[i].IndexDef, function (e) { return e.GridRow == gridRow && e.GridColumn != gridColumn; });
            row += '<tr>';
            if (columns.length > 0) {
                for (k = 0; k < columns.length ; k++) {
                    col = '<td>' +
                    '<label>' + label + '</label>' +
                    '<input name="" />' +
                    '</td>';
                    col += '<td>' +
                    '<label>' + columns[k].DisplayName + '</label>' +
                    '<input name="" />' +
                    '</td>';
                }
            } else {
                col = '<td colspan="2">' +
                '<label>' + label + '</label>' +
                '<input name="" />' +
                '</td>';
            }
            row += '</tr>';

            row += col;
        }
    }

    table += row;
    table += '</table>';

    content += table;

    $.showPageDialog($data.dialodTitle,
        content,
        {
            "close": {
                text: $data.dialogButtons.cancel,
                'class': 'btn btn_cancel',
                click: function () {
                    $(this).dialog("close");
                }
            }
        },
        "preview_document_dialog",
        {
            width: $(window).width(),
            height: $(window).height(),
            minHeight: $(window).height(),
        }
    );
}

function SortByPosition(a, b) {
    var aPos = a.Position;
    var bPos = b.Position;
    return ((aPos < bPos) ? -1 : ((aPos > bPos) ? 1 : 0));
}
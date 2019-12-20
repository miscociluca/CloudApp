function PreviewSummaryDialog($data) {
    var firstRow = [],
        secondRow = [],
        datas = $data.datas,
        img_url,
        size = datas.length,
        half = Math.round(size / 2),
        table, row, col, item,
        name,
        content;

    // sort by position
    $data.datas.sort(SortByPosition);

    content =
        '<div class="preview_package_block">' +
        '<div class="packages_container">' +
        '<div class="title">' + $data.containerTitle + '</div>' +
        '<div class="content">';

    table = '<table>';
    row = '<tr>';
    for (i = 0; i < half; i++) {
        img_url = $data.imageUrl + datas[i].TileRenderDetailId;
        name = $currentCulture === 'ro' ? datas[i].NameLanguageResource.Ro : datas[i].NameLanguageResource.En;

        item = '<div class="item ' + GetItemClass(datas[i]) + '" style="background: #' + datas[i].TileRenderDetail.BgRgb + ';">' +
             '<img data-original="' + img_url + '" src="' + img_url + '" class="lazy" />' +
             '<div class="title" style="background: #' + datas[i].TileRenderDetail.TitleBgArgb + ';">' +
             name +
             '</div>' +
             '</div>';

        col = '<td ' + SetItemColRowSpan(datas[i]) + '>' +
            item +
            '</td>';
        row += col;
    }
    row += '</tr>';

    row += '<tr>';
    for (i = half; i < size; i++) {
        img_url = $data.imageUrl + datas[i].TileRenderDetailId;
        name = $currentCulture === 'ro' ? datas[i].NameLanguageResource.Ro : datas[i].NameLanguageResource.En;

        item = '<div class="item ' + GetItemClass(datas[i]) + '" style="background: #' + datas[i].TileRenderDetail.BgRgb + ';">' +
             '<img data-original="' + img_url + '" src="' + img_url + '" class="lazy" />' +
             '<div class="title" style="background: #' + datas[i].TileRenderDetail.TitleBgArgb + ';">' +
             name +
             '</div>' +
             '</div>';
        col = '<td ' + SetItemColRowSpan(datas[i]) + '>' +
            item +
            '</td>';
        row += col;
    }
    row += '</tr>';
    table += row;
    table += '</table>';

    content += table;
    content += '</div>' +
        '</div>'
    '</div>';

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
        "preview_packagetype_dialog",
        {
            width: $(window).width(),
            height: $(window).height(),
            minHeight: $(window).height(),
        }
    );
}

function SortByPosition(a, b) {
    var aPos = a.TileRenderDetail.Position;
    var bPos = b.TileRenderDetail.Position;
    return ((aPos < bPos) ? -1 : ((aPos > bPos) ? 1 : 0));
}
function GetItemClass(data) {
    var class_name;

    if (data.TileRenderDetail.ColSpan <= 1 && data.TileRenderDetail.RowSpan <= 1) {
        class_name = 'small_size';
    }
    if (data.TileRenderDetail.ColSpan == 2 && data.TileRenderDetail.RowSpan) {
        class_name = 'large_size';
    }
    if (data.TileRenderDetail.ColSpan == 2 && data.TileRenderDetail.RowSpan <= 1) {
        class_name = 'width_size';
    }
    if (data.TileRenderDetail.ColSpan <= 1 && data.TileRenderDetail.RowSpan == 2) {
        class_name = 'height_size';
    }
    return class_name;
}
function SetItemColRowSpan(data) {
    var colSpan,
        rowSpan;

    if (data.TileRenderDetail.ColSpan <= 1 && data.TileRenderDetail.RowSpan <= 1) {
        colSpan = 1, rowSpan = 1;
    }
    if (data.TileRenderDetail.ColSpan == 2 && data.TileRenderDetail.RowSpan) {
        colSpan = 2, rowSpan = 2;
    }
    if (data.TileRenderDetail.ColSpan == 2 && data.TileRenderDetail.RowSpan <= 1) {
        colSpan = 2, rowSpan = 1;
    }
    if (data.TileRenderDetail.ColSpan <= 1 && data.TileRenderDetail.RowSpan == 2) {
        colSpan = 1, rowSpan = 2;
    }
    return 'rowspan="' + rowSpan + '" colspan="' + colSpan + '"';
}
function PreviewPackageComponentDialog($data) {
    var firstRow = [],
        secondRow = [],
        datas = $data.datas,
        img_url,
        size = datas.length,
        table, row, col, item,
        name,
        img,
        content;

    // sort by position
    $data.datas.sort(SortByPosition);

    content =
        '<div class="preview_package_block">' +
        '<div class="packages_container">' +
        '<div class="title"></div>' +
        '<div class="content">';

    table = '<table>';
    row = '<tr>';
    for (i = 0; i < size; i++) {
        img_url = $data.imageUrl + datas[i].TileRenderDetailId;
        name = $currentCulture === 'ro' ? datas[i].NameLanguageResource.Ro : datas[i].NameLanguageResource.En;
        name = datas[i].TileRenderDetail.ShowTitle ? name : '';

        if (datas[i].TileRenderDetail.HasImage) {
            img = '<img data-original="' + img_url + '" src="' + img_url + '" class="lazy" />';
        } else {
            img = '<img src="/img/no_image.png" class="empty" />'
        }

        item = '<div class="item height_size" style="background: #fff">' +
             img +
             '<div class="title" style="background: ' + datas[i].TileRenderDetail.BgRgb + '; color: ' + datas[i].TileRenderDetail.TitleBgArgb + ';">' +
             name +
             '</div>' +
             '</div>';

        col = '<td>' +
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

    $(".preview_packagetype_dialog").find("img").load(function () {
        var imgClass = (this.width / this.height > 1) ? 'wide' : 'tall';
        $(this).addClass(imgClass);
    });
}

function SortByPosition(a, b) {
    var aPos = a.TileRenderDetail.Position;
    var bPos = b.TileRenderDetail.Position;
    return ((aPos < bPos) ? -1 : ((aPos > bPos) ? 1 : 0));
}
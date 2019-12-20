function PreviewPackageTypeDialog($data) {
    var firstRow = [],
        secondRow = [],
        datas = $data.datas,
        grid = ['', {}],
        img_url,
        img,
        size = datas.length,
        half = Math.round(size / 2),
        table, row, col, item,
        name,
        content,
        classImage;

    // sort by position
    datas.sort(SortByPosition);

    content =
        '<div class="preview_package_block">' +
        '<div class="packages_container">' +
        '<div class="title">' + $data.containerTitle + '</div>' +
        '<div class="content">';
	table = '<div class="tiles">';

	for (i = 0; i < half; i++) {
		row = '<div class="tile">';

		img_url = $data.imageUrl + datas[i].TileRenderDetailId;
		name = $currentCulture === 'ro' ? datas[i].NameLanguageResource.Ro : datas[i].NameLanguageResource.En;
		name = datas[i].TileRenderDetail.ShowTitle ? name : '';

		if (datas[i].TileRenderDetail.HasImage) {
			img = '<img data-original="' + img_url + '" src="' + img_url + '" class="lazy" />';
		} else {
			img = '<img src="/img/no_image.png" class="empty" />'
		}

		item = '<div class="item ' + GetItemClass(datas[i]) + '" style="background: #fff;">' +
			img +
			'<div class="title" style="background: ' + datas[i].TileRenderDetail.BgRgb + '; color: ' + datas[i].TileRenderDetail.TitleBgArgb + ';">' +
			name +
			'</div>' +
			'</div>';

		col = '<div ' + SetItemColRowSpan(datas[i]) + '>' +
			item +
			'</div>';
		row += col;
	}




    //table = '<table>';

    //row = '<tr>';
    //for (i = 0; i < half; i++) {
    //    img_url = $data.imageUrl + datas[i].TileRenderDetailId;
    //    name = $currentCulture === 'ro' ? datas[i].NameLanguageResource.Ro : datas[i].NameLanguageResource.En;
    //    name = datas[i].TileRenderDetail.ShowTitle ? name : '';

    //    if (datas[i].TileRenderDetail.HasImage) {
    //        img = '<img data-original="' + img_url + '" src="' + img_url + '" class="lazy" />';
    //    } else {
    //        img = '<img src="/img/no_image.png" class="empty" />'
    //    }

    //    item = '<div class="item ' + GetItemClass(datas[i]) + '" style="background: #fff;">' +
    //         img +
    //         '<div class="title" style="background: ' + datas[i].TileRenderDetail.BgRgb + '; color: ' + datas[i].TileRenderDetail.TitleBgArgb + ';">' +
    //         name +
    //         '</div>' +
    //         '</div>';

    //    col = '<td ' + SetItemColRowSpan(datas[i]) + '>' +
    //        item +
    //        '</td>';
    //    row += col;
    //}
    //row += '</tr>';

    for (i = half; i < size; i++) {
        img_url = $data.imageUrl + datas[i].TileRenderDetailId;
        name = $currentCulture === 'ro' ? datas[i].NameLanguageResource.Ro : datas[i].NameLanguageResource.En;
        name = datas[i].TileRenderDetail.ShowTitle ? name : '';

        if (datas[i].TileRenderDetail.HasImage) {
            img = '<img data-original="' + img_url + '" src="' + img_url + '" class="lazy" />';
        } else {
            img = '<img src="/img/no_image.png" class="empty" />'
        }

        item = '<div class="item ' + GetItemClass(datas[i]) + '" style="background: #fff;">' +
             img +
             '<div class="title" style="background: ' + datas[i].TileRenderDetail.BgRgb + '; color: ' + datas[i].TileRenderDetail.TitleBgArgb + ';">' +
             name +
             '</div>' +
             '</div>';
        col = '<div ' + SetItemColRowSpan(datas[i]) + '>' +
            item +
            '</div>';
        row += col;
	}

	row += '</div>';
    table += row;

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
function GetItemClass(data) {
    var class_name;

    if (data.TileRenderDetail.ColSpan <= 2 && data.TileRenderDetail.RowSpan <= 2) {
        class_name = 'small_size';
    }
    if (data.TileRenderDetail.ColSpan <= 2 && data.TileRenderDetail.RowSpan == 4) {
        class_name = 'height_size';
    }
    if (data.TileRenderDetail.ColSpan == 4 && data.TileRenderDetail.RowSpan <= 2) {
        class_name = 'width_size';
    }
    if (data.TileRenderDetail.ColSpan == 4 && data.TileRenderDetail.RowSpan == 4) {
        class_name = 'large_size';
    }

    return class_name;
}
function SetItemColRowSpan(data) {
    var colSpan,
        rowSpan;

    if (data.TileRenderDetail.ColSpan <= 2 && data.TileRenderDetail.RowSpan <= 2) {
        colSpan = 1, rowSpan = 1;
    }
    if (data.TileRenderDetail.ColSpan <= 2 && data.TileRenderDetail.RowSpan == 4) {
        colSpan = 1, rowSpan = 2;
    }
    if (data.TileRenderDetail.ColSpan == 4 && data.TileRenderDetail.RowSpan <= 2) {
        colSpan = 2, rowSpan = 1;
    }
    if (data.TileRenderDetail.ColSpan == 4 && data.TileRenderDetail.RowSpan == 4) {
        colSpan = 2, rowSpan = 2;
    }
    return 'rowspan="' + rowSpan + '" colspan="' + colSpan + '"';
}
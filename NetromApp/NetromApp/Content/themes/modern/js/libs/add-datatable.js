jQuery.fn.dataTable.Api.register('row.addFirst()', function (table, data, index) {
    var currentPage = this.page();

    //insert the row
    this.row.add(data);

    //move added row to desired index
    var rowCount = this.data().length - 1,
        insertedRow = this.row(rowCount).data(),
        tempRow;

    for (var i = rowCount; i >= index; i--) {
        tempRow = table.row(i - 1).data();
        this.row(i).data(tempRow);
        this.row(i - 1).data(insertedRow);
    }

    //refresh the current page
    this.page(currentPage).draw(false);
});
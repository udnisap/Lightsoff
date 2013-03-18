var game = function(level, finished) {
    var totalMoves = 0;
    var time = -1;
    var data = level.data;
    var leters = ['a', 'b', 'c', 'd', 'e'];
    var totrow = data.length;
    var totcol = data[0].length;
    var html = '<div class="ui-grid-' + leters[totcol - 2] + '">';
    $.each(data, function(i) {
        var self = this;
        $.each(self, function(j) {
            html += '<div class="ui-block-' + leters[j % 5 ] + ' light">';
            if (data[i][j] === 1) {
                html += '<div class="ui-bar ui-bar-c"></div>';
            } else {
                html += '<div class="ui-bar ui-bar-e"></div>';
            }
            html += '</div>';
        });
    });
    html += '</div>';
    $("#grid").html(html);
    $("#grid  div.light").on("click", function() {
        var index = $(this).index();
        var col = index % totcol;
        var row = (index - col) / totcol;
        toggle(index);
        toggle(rowcol2index(col + 1, row));
        toggle(rowcol2index(col - 1, row));
        toggle(rowcol2index(col, row + 1));
        toggle(rowcol2index(col, row - 1));
        totalMoves++;
        if (isFinish()) {
            finished(totalMoves, time);
        }
    });
    timeoutFn();
    setInterval(timeoutFn, 1000);
    function timeoutFn() {
        time++;        
        $("#time").html('<span class="ui-btn-inner"><span class="ui-btn-text">Time spent : '+ time+' seconds</span></span>');
    }
    function rowcol2index(col, row) {
        if (col < 0 || row < 0 || col >= totcol || row >= totrow)
            return -1;
        else
            return row * totcol + col;
    }
    function toggle(index) {
        if (index < 0 || index >= totrow * totcol)
            return;
        $($("#grid div.light")[index]).children().toggleClass("ui-bar-e").toggleClass("ui-bar-c");
    }
    function isFinish() {
        for (var i = 0; i < totrow * totcol; i++) {
            if ($($("#grid div.light")[i]).children().hasClass('ui-bar-c'))
                return false;
        }
        return true;
    }
};



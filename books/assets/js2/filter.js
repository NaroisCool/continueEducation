$(document).ready(function() {
    $('[time="year"]').focus(function() {
        WdatePicker({dateFmt: 'yyyy'});
    });

    $('[time="year-month"]').focus(function() {
        WdatePicker({dateFmt: 'yyyyMM'});
    });

    $('[time="time"]').focus(function() {
        WdatePicker({isShowWeek: true, dateFmt: 'yyyy-MM-dd'});
    });

    $('[time="datetime"]').focus(function() {
        WdatePicker({isShowWeek: true, dateFmt: 'yyyy-MM-dd HH:mm:ss'});
    });

    $('#reset').click(function() {
        $('#filter [type="reset"]').click();
    });

    $('#more').click(function() {
        var $m = $(this);
        if ($m.html() === '<i class="icon-more"></i> 更多') {
            $m.html('<i class="icon-more"></i> 隐藏');
            $('.moreq :text').val('');
            $('.moreq').fadeIn();
        } else {
            $m.html('<i class="icon-more"></i> 更多');
            $('.moreq').fadeOut();
        }
    });

    $('#query').click(function() {
        var $table = $('#result table'), pageData = {}, data, $ipt, name;
        $('#filter :text[name],#filter select[name]').each(function() {
            $ipt = $(this);
            name = $ipt.attr('name');
            data = $ipt.val();
            pageData[name] = data;
        });
        $.tableRefresh({pageData: pageData, table: $table});
    });
});
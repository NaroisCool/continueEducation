$(document).ready(function() {
    
    var sltId;

    $('[view="print"]').live('click', function() {
        var pKey = $(this).attr('val');
        $('#printframe').attr('src', 'admin-prints-reg?id=' + pKey);
    });

    $('[name="print"]', '#result').live('click', function() {
        if ($(this).hasClass('removeClass')) {
            return;
        }
        winBox('admin-prints-reg?other=now&id=' + sltId, '培训记录', 650, 600);
//        $('#printframe').attr('src', 'admin-printiframe?other=now&id=' + val);
    });

    $('#result').table({url: 'action-admin-studyrecs-page',
        page: true,
        toolbarView: false,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
        firstTimeRefresh: true,
        toolbarOther: '<a class="btn btn-small disabled" name="print"><i class="icon-printer" style="margin-top: 1px;"></i> 打印</a>',
        field: [
            {name: 'name', head: '姓名', convert: function(val, item) {
                    return '<a view="user" href="javascript:void(0);" val="' + item.id + '">' + val + '</a>';
                }},
            {name: 'idCard', head: '身份证号'},
            {name: 'ton', head: '资格证号'},
            {name: 'tel', head: '联系电话'},
            {name: 'code', head: '激活码', convert: function(val) {
                    return '<a view="code" href="javascript:void(0);" val="' + val + '">' + val + '</a>';
                }},
            {name: 'studyDate', head: '培训日期'},
            {name: 'studyUseTime', head: '培训时长'},
            {name: 'userId', head: '打印预览', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="print" href="javascript:void(0);" val="' + val + '">预览</a>';
                }}
        ],
        getPrimaryKeyVal: function(item) {
            return item.userId;
        }, onRefreshToolbarBtn: function(ids, $toolBar, opts) {
            var printBtn = $('[name="print"]', $toolBar);
            if (ids.lenght === 1) {                
                sltId = ids[0];
                printBtn.removeClass('disabled');
            } else {
                printBtn.addClass('disabled');
            }
        }
    });
});
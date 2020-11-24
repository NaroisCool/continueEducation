$(document).ready(function() {

    var sltId;

    $('#printHelper').click(function() {
        $('#printHelp').slideToggle();
    });

    $('[name="filter.agencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});

    $('[view="print"]').live('click', function() {
        var pKey = $(this).attr('val');
        $('#printframe').attr('src', 'admin-prints-ret?id=' + pKey);
    });

    $('[name="print"]', '#result').live('click', function() {
        if ($(this).hasClass('removeClass')) {
            return;
        }
        winBox('admin-prints-ret?other=now&id=' + sltId, '合格证打印', 650, 600);
//        $('#printframe').attr('src', 'admin-printiframe?other=now&id=' + val);
    });

    $('#result').table({url: 'action-admin-user-page?filter.isCompleted=1',
        page: true,
        toolbarView: false,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
        toolbarOther: '<a class="btn btn-small disabled" name="print"><i class="icon-printer" style="margin-top: 1px;"></i> 打印</a>',
        firstTimeRefresh: true,
        field: [
            {name: 'name', head: '姓名', convert: function(val, item) {
                    return '<a view="user" href="javascript:void(0);" val="' + item.id + '">' + val + '</a>';
                }},
            {name: 'gender', head: '性别', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return gender[val];
                    } else {
                        return '-';
                    }
                }},
            {name: 'idCard', head: '身份证号'},
            {name: 'ton', head: '资格证号'},
            {name: 'signupTime', head: '报名时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'completedTime', head: '完成时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }},
//            {name: 'studyType', head: '教育类别', convert: studyType},
            {name: 'agencyId', head: '驾校信息', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="agency" href="javascript:void(0);" val="' + val + '">' + agencys[val] + '</a>';
                }},
            {name: 'status', head: '打印', convert: isPrinted},
            {name: 'id', head: '打印预览', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="print" href="javascript:void(0);" val="' + val + '">预览</a>';
                }}
        ], onRefreshToolbarBtn: function(ids, $toolBar, opts) {
            var printBtn = $('[name="print"]', $toolBar);
            if (ids.length === 1) {
                sltId = ids[0];
                printBtn.removeClass('disabled');
            } else {
                printBtn.addClass('disabled');
            }
        }
    });
});
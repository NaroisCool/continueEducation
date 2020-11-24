$(document).ready(function() {

    var vals;

    $('[name="filter.isCompleted"]').dropdown({options: isCompleted});

    $('[name="sign"]').live('click', function() {
        if ($(this).hasClass('disabled')) {
            return;
        }
        var signBeginTime = $('#signBeginTime').val();
        var studyTime = $('#studyTime').val();
        if (signBeginTime == '') {
            alert('时间未选择');
        } else if (studyTime == '') {
            alert('培训学时');
        } else {
            $.post('action-admin-studyrec-net', {id: vals, signBeginTime: signBeginTime, studyTime: studyTime}, function(ret) {
                var $msg = $('#result [name="toolBar"] [name="msg"]');
                if (ret.resultCode === '0' || ret.resultCode === 0) {
                    $msg.text('考核成功').fadeIn().delay(2000).fadeOut();
                } else {
                    $msg.text(retcode[ret.resultCode]).fadeIn().delay(2000).fadeOut();
                }
                var $table = $('#result table');
                $.tableRefresh({table: $table});
            });
        }
    });

    $('#result').table({url: 'action-admin-users-page?filter.studyTypes=1',
        page: true,
        toolbarView: false,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
        firstTimeRefresh: true,
        toolbarOther: '<a class="btn btn-small disabled" name="sign"><i class="icon-btnexp" style="margin-top: 1px;"></i> 考核</a>',
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
            {name: 'code', head: '激活码', convert: function(val) {
                    return '<a view="code" href="javascript:void(0);" val="' + val + '">' + val + '</a>';
                }},
            {name: 'studyUseTime', head: '培训学时'},
            {name: 'studyLeftTime', head: '剩余学时'}
        ], onRefreshToolbarBtn: function(ids, $toolBar, opts) {
            var printBtn = $('[name="sign"]', $toolBar);
            vals = ids.join(',');
            if (ids.length == 1) {
                printBtn.removeClass('disabled');
            } else {
                printBtn.addClass('disabled');
            }
        }
    });
});
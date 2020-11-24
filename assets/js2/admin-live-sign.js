$(document).ready(function() {

    $('[view="sign"]').live('click', function() {
        val = $(this).attr('val');
        t = $(this).attr('t');
        sign = $(this).attr('sign');
        Biokey.InitEngine();
        $('#result [name="toolBar"] [name="msg"]').text('请按手指').fadeIn(1000);
    });

    $('#result').table({url: 'action-admin-users-page?filter.studyTypes=0',
        page: true,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
        checkbox: false,
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
            {name: 'code', head: '激活码', convert: function(val) {
                    return '<a view="code" href="javascript:void(0);" val="' + val + '">' + val + '</a>';
                }},
            {name: 'studyUseTime', head: '培训学时'},
            {name: 'studyLeftTime', head: '剩余学时'},
            {name: 'liveStudyTimeBeginSigned', head: '上课签', convert: function(val, item) {
                    return '<a view="sign" href="javascript:void(0);" t="1" sign ="' + item.finger + '" val="' + item.code + '">签到</a>';
                }},
            {name: 'liveStudyTimeEndSigned', head: '下课签', convert: function(val, item) {
                    return '<a view="sign" href="javascript:void(0);" t="2" sign ="' + item.finger + '" val="' + item.code + '">签到</a>';
                }}
        ]
    });
});
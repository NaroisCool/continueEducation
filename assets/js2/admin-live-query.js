$(document).ready(function() {

    $('#result').table({url: 'action-admin-studyrecs-page?filter.studyTypes=0',
        page: true,
        checkbox: false,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
        firstTimeRefresh: true,
        field: [
            {name: 'name', head: '姓名', convert: function(val, item) {
                    return '<a view="user" href="javascript:void(0);" val="' + item.id + '">' + val + '</a>';
                }},
            {name: 'idCard', head: '身份证号'},
//            {name: 'studyDate', head: '签到日期'},
            {name: 'liveStudyTimeBegin', head: '上课时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 16) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'liveStudyTimeBeginSign', head: '上课签到时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 16) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'liveStudyTimeBeginSigned', head: '上课签', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return val ? '成功' : '异常';
                    } else {
                        return '-';
                    }
                }},
            {name: 'liveStudyTimeEnd', head: '下课时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 16) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'liveStudyTimeEndSign', head: '下课签到时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 16) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'liveStudyTimeEndSigned', head: '下课签', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return val ? '成功' : '异常';
                    } else {
                        return '-';
                    }
                }},
            {name: 'liveStudySigned', head: '签到', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return val ? '成功' : '异常';
                    } else {
                        return '-';
                    }
                }},
            {name: 'id', head: '详情', convert: function(val) {
                    return '<a view="studyRec" href="javascript:void(0);" val="' + val + '">详情</a>';
                }}
        ]
    });
});
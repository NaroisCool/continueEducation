$(document).ready(function() {

    var boxs = $.editboxInit({title: '激活码',
        urlView: 'action-admin-code-get',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'code', label: '激活码：'},
            {type: 'text', name: 'createTime', label: '添加时间：'},
            {type: 'text', name: 'agencyAddTime', label: '驾校添加时间：'},
            {type: 'text', name: 'addAgencyId', label: '添加驾校：'},
            {type: 'text', name: 'activeTime', label: '激活时间：'},
            {type: 'text', name: 'expiresTime', label: '过期时间：'},
            {type: 'text', name: 'studyUseTime', label: '培训累计时间(分钟)：'},
            {type: 'text', name: 'studyLeftTime', label: '培训剩余时间(分钟)：'},
            {type: 'text', name: 'studyIsCompleted', label: '是否完成培训：'},
            {type: 'text', name: 'lastStudyTime', label: '最后培训时间：'},
            {type: 'text', name: 'exportTime', label: '导出时间：'}
        ],
        getReturnData: function(ret) {
            if (ret.obj.studyIsCompleted !== void 0 || ret.obj.studyIsCompleted !== null) {
                ret.obj.studyIsCompleted = ret.obj.studyIsCompleted ? '完成' : '未完成';
            }
            if (ret.obj.addAgencyId !== void 0 || ret.obj.addAgencyId !== null) {
                ret.obj.addAgencyId = agencys[ret.obj.addAgencyId];
            }
            return ret.obj;
        }
    });

    $('[name="filter.isExported"]').dropdown({options: isExported});

    $('#result').table({url: 'action-admin-code-page',
        page: true,
        editbox: boxs,
        toolbarAdd: false,
        toolbarDel: false,
        toolbarEdit: false,
        bodyToolbarEdit: false,
        bodyToolbarDel: false,
        firstTimeRefresh: true,
        field: [
            {name: 'code', head: '激活码', convert: function(val) {
                    return '<a view="code" href="javascript:void(0);" val="' + val + '">' + val + '</a>';
                }},
            {name: 'createTime', head: '添加时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'agencyAddTime', head: '驾校添加时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'activeTime', head: '激活时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'expiresTime', head: '过期时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'exportTime', head: '导出时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }}

        ]
    });
});
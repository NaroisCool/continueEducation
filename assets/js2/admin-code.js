$(document).ready(function() {

    var boxs = $.editboxInit({title: '激活码',
        urlAdd: 'action-admin-code-add',
        urlView: 'action-admin-code-get',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'code', label: '激活码*：', validate: 'required', validateMsg: '激活码不能为空'},
            {type: 'text', name: 'createTime', label: '添加时间：', disabled: true},
            {type: 'text', name: 'agencyAddTime', label: '驾校添加时间：', disabled: true},
            {type: 'text', name: 'addAgencyId', label: '添加驾校：', disabled: true},
            {type: 'text', name: 'activeTime', label: '激活时间：', disabled: true},
            {type: 'text', name: 'expiresTime', label: '过期时间：', disabled: true},
            {type: 'text', name: 'studyUseTime', label: '培训累计时间(分钟)：', disabled: true},
            {type: 'text', name: 'studyLeftTime', label: '培训剩余时间(分钟)：', disabled: true},
            {type: 'text', name: 'studyIsCompleted', label: '是否完成培训：', disabled: true},
            {type: 'text', name: 'lastStudyTime', label: '最后培训时间：', disabled: true},
            {type: 'text', name: 'exportTime', label: '导出时间：', disabled: true}
        ],
        getReturnData: function(ret) {
            if (ret.obj.studyIsCompleted !== void 0 || ret.obj.studyIsCompleted !== null) {
                ret.obj.studyIsCompleted = ret.obj.studyIsCompleted ? '完成' : '未完成';
            }
            if (ret.obj.addAgencyId !== void 0 || ret.obj.addAgencyId !== null) {
                ret.obj.addAgencyId = agencys[ret.obj.addAgencyId];
            }
            return ret.obj;
        },
        onSubmited: function() {
            var $table = $('#result table');
            $.tableRefresh({table: $table});
        }
    });

    $('[name="filter.isExported"]').dropdown({options: isExported});
    $('[name="filter.studyIsCompleted"]').dropdown({options: isCompleted});
    $('[name="filter.addAgencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});

    $('#result').table({url: 'action-admin-code-page',
        page: true,
        editbox: boxs,
        toolbarExp: true,
        toolbarDel: false,
        toolbarEdit: false,
        bodyToolbarEdit: false,
        bodyToolbarDel: false,
        firstTimeRefresh: true,
        field: [{name: 'code', head: '激活码'},
            {name: 'createTime', head: '添加时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'agencyAddTime', head: '驾校添加', convert: function(val) {
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
            {name: 'studyUseTime', head: '培训学时'},
            {name: 'studyLeftTime', head: '剩余学时'},
            {name: 'studyIsCompleted', head: '完成培训', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return val ? '完成' : '未完成';
                }},
            {name: 'addUserId', head: '用户', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="user" href="javascript:void(0);" val="' + val + '">查看</a>';
                }},
            {name: 'addAgencyId', head: '驾校', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="agency" href="javascript:void(0);" val="' + val + '">' + agencys[val] + '</a>';
                }}
        ]
    });
});
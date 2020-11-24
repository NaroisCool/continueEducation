$(document).ready(function() {

    var boxs = $.editboxInit({title: '驾校账户',
        urlAdd: 'action-admin-admin-add?type=2',
        urlEdit: 'action-admin-admin-edit?type=2',
        urlView: 'action-admin-admin-get',
        urlDel: 'action-admin-admin-del',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'username', label: '用户名*：', validate: 'required', validateMsg: '用户名不能为空'},
            {type: 'password', name: 'password', label: '密码*：', validate: 'required', validateMsg: '密码不能为空'},
            {type: 'select', name: 'agencyId', label: '所属驾校*：', validate: 'required', validateMsg: '所属驾校不能为空',
                dynamic: {url: 'action-admin-agency-all', key: 'id', value: 'name'}},
            {type: 'text', name: 'createTime', label: '添加时间：', disabled: true},
            {type: 'text', name: 'lastLoginTime', label: '最后登录时间：', disabled: true}
        ],
        onSubmited: function() {
            var $table = $('#result table');
            $.tableRefresh({table: $table});
        }
    });

    $('#result').table({url: 'action-admin-admin-page?type=2',
        page: true,
        editbox: boxs,
        firstTimeRefresh: true,
        field: [{name: 'username', head: '用户名'},
            {name: 'createTime', head: '添加时间'},
            {name: 'lastLoginTime', head: '最后登录时间'},
            {name: 'agencyId', head: '驾校信息', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="agency" href="javascript:void(0);" val="' + val + '">' + agencys[val] + '</a>';
                }}]
    });
});
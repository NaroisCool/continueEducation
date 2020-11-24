$(document).ready(function() {

    $('#result').table({url: 'action-admin-code-page?filter.isExported=0',
        page: true,
        pageSize:15,
        toolbarExp: true,
        checkbox:false,
        toolbarView: false,
        toolbarAdd: false,
        toolbarDel: false,
        toolbarEdit: false,
        firstTimeRefresh: true,
        field: [{name: 'code', head: '激活码'},
            {name: 'createTime', head: '添加时间'}
        ]
    });
});
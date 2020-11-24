$(document).ready(function() {

    var boxs = $.editboxInit({title: '驾校信息',
        urlAdd: 'action-admin-agency-add',
        urlEdit: 'action-admin-agency-edit',
        urlView: 'action-admin-agency-get',
        urlDel: 'action-admin-agency-del',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'name', label: '名称*：', validate: 'required', validateMsg: '名称不能为空'},
            {type: 'text', name: 'tel', label: '联系电话：'},
            {type: 'text', name: 'website', label: '网站：'},
            {type: 'textarea', name: 'info', label: '简介：'}
        ],
        onSubmited: function() {
            var $table = $('#result table');
            $.tableRefresh({table: $table});
        }
    });

    $('#result').table({url: 'action-admin-agency-page',
        page: true,
        editbox: boxs,
        firstTimeRefresh: true,
        field: [{name: 'name', head: '名称'},
            {name: 'tel', head: '联系电话'},
            {name: 'website', head: '网站'}]
    });
});
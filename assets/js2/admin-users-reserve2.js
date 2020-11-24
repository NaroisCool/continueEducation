$(document).ready(function() {

    $('[name="filter.agencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});
    $('[name="filter.studyType"]').dropdown({options: studyTypes2});

    var boxs = $.editboxInit({title: '授课信息',
        urlAdd: 'action-admin-reserve-add',
        urlEdit: 'action-admin-reserve-edit',
        urlView: 'action-admin-reserve-get',
        urlDel: 'action-admin-reserve-del',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'time', label: '授课时间*：', validate: 'required', validateMsg: '授课时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd', isShowWeek: true});
                }},
            {type: 'select', name: 'studyType', label: '教学类型*：', options: studyTypes2, validate: 'required', validateMsg: '教学类型不能为空'},
            {type: 'text', name: 'num', label: '人数*：', validate: 'required', validateMsg: '人数不能为空'},
            {type: 'text', name: 'name', label: '名称*：', validate: 'required', validateMsg: '名称不能为空', click: function() {
                    if ($(this).val() == '') {
                        var time = $(this).editboxGetField('time').val(),
                                num = $(this).editboxGetField('num').val(),
                                st = $(this).editboxGetField('studyType').val();
                        $(this).val(time + '(' + studyTypes2[st] + '，总' + num + ')');
                    }
                }},
            {type: 'text', name: 'numAdded', label: '已预约人数：', disabled: true},
            {type: 'select', name: 'agencyId', label: '所属驾校*：', validate: 'required', validateMsg: '所属驾校不能为空',
                dynamic: {url: 'action-admin-agency-all', key: 'id', value: 'name'}},
            {type: 'text', name: 'createTime', label: '添加时间：', disabled: true},
            {type: 'text', name: 'lastModifyTime', label: '最后修改时间：', disabled: true}
        ],
        onSubmited: function() {
            var $table = $('#result table');
            $.tableRefresh({table: $table});
        }
    });

    $('#result').table({url: 'action-admin-reserve-page',
        page: true,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
        editbox: boxs,
        firstTimeRefresh: true,
        field: [{name: 'name', head: '名称'},
            {name: 'time', head: '授课时间'},
            {name: 'num', head: '人数'},
            {name: 'numAdded', head: '已预约人数'},
            {name: 'studyType', head: '教学类型', convert: studyTypes2},
            {name: 'agencyId', head: '驾校信息', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="agency" href="javascript:void(0);" val="' + val + '">' + agencys[val] + '</a>';
                }}]
    });
});
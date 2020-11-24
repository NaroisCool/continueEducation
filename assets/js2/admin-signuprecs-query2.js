$(document).ready(function() {

    $('[name="filter.isCompleted"]').dropdown({options: isCompleted});
    $('[name="filter.agencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});
    $('[name="filter.studyTypes"]').dropdown({options: studyTypes});
    $('[name="filter.studyType"]').dropdown({options: studyType});

    var boxs = $.editboxInit({title: '签到信息',
        urlAdd: 'action-admin-signuprec-add',
        urlView: 'action-admin-signuprec-get',
        urlEdit: 'action-admin-signuprec-edit',
        urlDel: 'action-admin-signuprec-del',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'idCard', label: '身份证*：', validate: 'required', validateMsg: '身份证不能为空', editDisabled: true, change: function() {
                    var $name = $(this).editboxGetField('name'),
                            pid = $(this).val();
                    $.post('action-admin-user-getByIdCard', {idCard: pid}, function(ret) {
                        if (ret.resultCode === '0' || ret.resultCode === 0) {
                            if (ret.obj !== void 0 && ret.obj !== null && ret.obj.name !== void 0 && ret.obj.name !== null) {
                                $name.val(ret.obj.name);
                            }
                        }
                    });
                }},
            {type: 'text', name: 'signupRecTime', label: '签到时间*：', validate: 'required', validateMsg: '签到时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss', isShowWeek: true});
                }},
            {type: 'text', name: 'signupRecTimeVal', label: '中午签到时间*：', validate: 'required', validateMsg: '签到时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss', isShowWeek: true});
                }},
            {type: 'text', name: 'signupRecTimeb', label: '签退时间*：', validate: 'required', validateMsg: '签退时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss', isShowWeek: true});
                }},
            {type: 'text', name: 'name', label: '姓名：', editDisabled: true}

        ],
        onSubmited: function() {
            var $table = $('#result table');
            $.tableRefresh({table: $table});
        }
    });


    var vals, rData;
    $('[name="class"]').live('click', function() {
        if ($(this).hasClass('disabled')) {
            return;
        }
        var cname = $('#cname').val();
        $.post('action-admin-user-cname', {ids: vals, className: cname}, function(ret) {
            var $msg = $('#result [name="toolBar"] [name="msg"]');
            if (ret.resultCode === '0' || ret.resultCode === 0) {
                $msg.text('设置成功').fadeIn().delay(2000).fadeOut();
            } else {
                $msg.text(retcode[ret.resultCode]).fadeIn().delay(2000).fadeOut();
            }
            var $table = $('#result table');
            $.tableRefresh({table: $table});
        });
    });

    $('#result').table({url: 'action-admin-signuprecs-page',
        page: true,
        editbox: boxs,
        toolbarView: true,
        toolbarAdd: true,
        toolbarEdit: true,
        toolbarDel: true,
        firstTimeRefresh: true,
        toolbarOther: '<span style="float:left;padding:2px 1px 0 3px">班级：<input type="text" class="input-small" id="cname"></span><a class="btn btn-small disabled" name="class"> 设置班级</a>',
        field: [
            {name: 'name', head: '姓名', convert: function(val, item) {
                    return '<a view="user" href="javascript:void(0);" val="' + item.userId + '">' + val + '</a>';
                }},
            {name: 'idCard', head: '身份证号'},
            {name: 'className', head: '班级'},
            {name: 'completedTime', head: '网络', convert: function(val, item) {
                    return isCompleted[val == null ? 0 : 1];
                }},
            {name: 'studyType', head: '培训类型', convert: studyType},
            {name: 'studyTypes', head: '教学类型', convert: studyTypes},
            {name: 'signupRecDay', head: '签到日期'},
            {name: 'sbegin', head: '上课', convert: function(val, item) {
                    return '9:00';
                }},
            {name: 'signupRecTime', head: '签到'},
            {name: 'signupRecTimeVal', head: '中签'},
            {name: 'send', head: '下课', convert: function(val, item) {
                    return '16:00';
                }},
            {name: 'signupRecTimeb', head: '签退'}
        ],
        onDataRendered: function(retData) {
            rData = retData;
        }, onRefreshToolbarBtn: function(ids, $toolBar, opts) {
            var btns = $('[name="class"]', $toolBar);
            var uids = [];
            if (ids.length >= 1) {
                for (var sid in ids) {
                    for (var d in rData) {
                        if (rData[d].id == ids[sid]) {
                            uids.push(rData[d].userId);
                        }
                    }
                }
                vals = uids.join(',');
                btns.removeClass('disabled');
            } else {
                btns.addClass('disabled');
            }
        }
    });
});
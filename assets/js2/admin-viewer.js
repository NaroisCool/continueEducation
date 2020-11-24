$(document).ready(function() {

    var boxsUser = $.editboxInit({title: '学员信息',
        urlView: 'action-admin-users-get',
        field: [{type: 'text', name: 'name', label: '姓名：'},
            {type: 'text', name: 'idCard', label: '身份证：'},
            {type: 'hidden', name: 'avatar', label: '照片：'},
            {type: 'image', name: 'avatar_', label: '照片：'},
            {type: 'text', name: 'ton', label: '从业资格证：'},
            {type: 'text', name: 'birthday', label: '出身年月：'},
            {type: 'select', name: 'gender', label: '性别：', options: gender},
            {type: 'text', name: 'signupTime', label: '报名时间：'},
            {type: 'text', name: 'code', label: '<b>激活码</b>：'},
            {type: 'select', name: 'agencyId', label: '所属驾校：', dynamic: {url: 'action-admin-agency-all', key: 'id', value: 'name'}},
            {type: 'select', name: 'studyType', label: '培训类型：', options: studyType},
            {type: 'select', name: 'studyTypes', label: '教学类型：', options: studyTypes},
            {type: 'text', name: 'firstLicenseTime', label: '初次申领时间：'},
//            {type: 'checkboxList', name: 'licenseType', label: '已有证类型：', size: 6, options: licenseType},
            {type: 'text', name: 'address', label: '联系地址：'},
            {type: 'text', name: 'tel', label: '联系电话：'},
            {type: 'text', name: 'expiresTime', label: '激活码过期时间：'},
            {type: 'select', name: 'status', label: '合格证打印：', options: isPrinted},
            {type: 'text', name: 'className', label: '班级名称：'},
            {type: 'text', name: 'addTime', label: '添加信息时间：'},
            {type: 'text', name: 'lastLoginTime', label: '最后登陆时间：'},
            {type: 'text', name: 'lastStudyTime', label: '最后退出时间：'}
        ],
        onBoxShowed: function($box) {
            var img = $box.editboxGetField('avatar').val();
            if (img !== '') {
                $box.editboxGetField('avatar_').attr('src', 'data:image/jpeg;base64,' + img);
            } else {
                $box.editboxGetField('avatar_').removeAttr('src');
            }
        }
    });

    $('[view="user"]').live('click', function() {
        var pKey = $(this).attr('val');
        boxsUser.view.editboxShow({subData: {id: pKey}});
    });

    var boxsAgency = $.editboxInit({title: '驾校信息',
        urlView: 'action-admin-agency-get',
        field: [{type: 'text', name: 'name', label: '名称：'},
            {type: 'text', name: 'tel', label: '联系电话：'},
            {type: 'text', name: 'website', label: '网站：'},
            {type: 'textarea', name: 'info', label: '简介：'}
        ]
    });

    $('[view="agency"]').live('click', function() {
        var pKey = $(this).attr('val');
        boxsAgency.view.editboxShow({subData: {id: pKey}});
    });

    var boxsCode = $.editboxInit({title: '激活码',
        urlView: 'action-admin-code-getByCode',
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

    $('[view="code"]').live('click', function() {
        var pKey = $(this).attr('val');
        boxsCode.view.editboxShow({subData: {code: pKey}});
    });

    var boxsStudyRec = $.editboxInit({title: '学员培训记录',
        urlView: 'action-admin-studyrec-get',
        field: [
            {type: 'text', name: 'studyUseTime', label: '学时(分钟):'},
            {type: 'text', name: 'studyDate', label: '培训日期：'},
            {type: 'select', name: 'studyTypes', label: '教学类型：', options: studyTypes},
            {type: 'text', name: 'liveStudyTimeBegin', label: '上课时间：'},
            {type: 'text', name: 'liveStudyTimeBeginSign', label: '上课签到时间：'},
            {type: 'text', name: 'liveStudyTimeEnd', label: '下课时间：'},
            {type: 'text', name: 'liveStudyTimeEndSign', label: '下课签到时间：'}
        ]
    });


    $('[view="studyRec"]').live('click', function() {
        var pKey = $(this).attr('val');
        boxsStudyRec.view.editboxShow({subData: {id: pKey}});
    });
});
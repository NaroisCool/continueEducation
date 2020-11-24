$(document).ready(function() {

    var boxs = $.editboxInit({title: '学员信息', fade: false, display: true, modal: false, renderTo: '#result',
        urlView: 'action-user-user-get',
        urlEdit: 'action-user-user-edit',
        field: [{type: 'text', name: 'name', label: '姓名：', editDisabled: true},
            {type: 'text', name: 'idCard', label: '身份证：', editDisabled: true},
            {type: 'hidden', name: 'avatar', label: '照片：'},
            {type: 'image', name: 'avatar_', label: '照片：'},
            {type: 'text', name: 'ton', label: '从业资格证：', editDisabled: true},
            {type: 'text', name: 'birthday', label: '出身年月：', editDisabled: true},
            {type: 'select', name: 'gender', label: '性别：', options: gender, editDisabled: true},
            {type: 'text', name: 'signupTime', label: '报名时间：', editDisabled: true},
            {type: 'text', name: 'code', label: '<b>激活码</b>：', editDisabled: true},
            {type: 'select', name: 'agencyId', label: '所属驾校：', editDisabled: true, dynamic: {url: 'action-user-agency-all', key: 'id', value: 'name'}},
            {type: 'select', name: 'studyType', label: '培训类型：', editDisabled: true, options: studyType},
            {type: 'select', name: 'studyTypes', label: '教学类型：', editDisabled: true, options: studyTypes},
            {type: 'text', name: 'firstLicenseTime', label: '初次申领时间：', editDisabled: true},
//            {type: 'text', name: 'licenseType', label: '已有证类型：', editDisabled: true},
            {type: 'text', name: 'address', label: '联系地址：'},
            {type: 'text', name: 'tel', label: '联系电话：'},
            {type: 'text', name: 'expiresTime', label: '激活码过期时间：', editDisabled: true},
//            {type: 'text', name: 'status', label: '状态：', editDisabled: true},
            {type: 'text', name: 'addTime', label: '添加信息时间：', editDisabled: true},
            {type: 'text', name: 'lastLoginTime', label: '最后登陆时间：', editDisabled: true}
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

    boxs.edit.css('margin', '0').css('margin-left','120px');
    boxs.edit.editboxShow({backdrop: false, keyboard: false});
});
$(document).ready(function() {

    var boxs = $.editboxInit({title: '学员信息',
        urlView: 'action-admin-users-get',
        field: [
            {type: 'text', name: 'name', label: '姓名：'},
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
            {type: 'select', name: 'studyTypes', label: '教学类型*：', options: studyTypes},
            {type: 'text', name: 'firstLicenseTime', label: '初次申领时间：'},
//            {type: 'checkboxList', name: 'licenseType', label: '已有证类型：', size: 6, options: licenseType},
            {type: 'text', name: 'address', label: '联系地址：'},
            {type: 'text', name: 'tel', label: '联系电话：'},
            {type: 'text', name: 'expiresTime', label: '激活码过期时间：'},
            {type: 'select', name: 'status', label: '合格证打印：', options: isPrinted},
            {type: 'text', name: 'addTime', label: '添加信息时间：'},
            {type: 'text', name: 'lastLoginTime', label: '最后登陆时间：'},
            {type: 'text', name: 'createTime', label: '激活码添加时间：'},
            {type: 'text', name: 'agencyAddTime', label: '驾校添加时间：'},
            {type: 'text', name: 'activeTime', label: '激活时间：'},
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
        },
        onBoxShowed: function($box) {
            var img = $box.editboxGetField('avatar').val();
            if (img !== '') {
                $box.editboxGetField('avatar_').attr('src', 'data:image/jpeg;base64,' + img);
            } else {
                $box.editboxGetField('avatar_').removeAttr('src');
            }
        }
    });

    var boxsFace = $.editboxInit({title: '人脸抓拍信息',
        urlView: 'action-admin-face-last',
        field: [{type: 'image2', name: 'face', label: '照片：'},
            {type: 'text', name: 'addTime', label: '拍照时间：'}
        ],
        getReturnData: function (ret) {
            if (ret.obj == null) {
                boxsFace.view.editboxHide();
                alert("该学员暂未抓拍，请耐心等待！");
            }
            return ret.obj;
        },
        onBoxShowed: function($box) {
            var img = $box.editboxGetField('face').val();
            if (img !== '') {
                $box.editboxGetField('face').attr('src', 'data:image/jpeg;base64,' + img);
            } else {
                $box.editboxGetField('face').removeAttr('src');
            }
        }
    });

    $('[view="face"]').live('click', function() {
        var pKey = $(this).attr('val');
        boxsFace.view.editboxShow({subData: {id: pKey}});
    });

    $('[name="filter.studyIsCompleted"]').dropdown({options: isCompleted});
    $('[name="filter.studyType"]').dropdown({options: studyType});
    $('[name="filter.studyTypes"]').dropdown({options: studyTypes});
    $('[name="filter.isCompleted"]').dropdown({options: isCompleted});
    $('[name="filter.isCompleted2"]').dropdown({options: isCompleted});
    $('[name="filter.isGraduation"]').dropdown({options: isCompleted});
    $('[name="filter.agencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});

    $('#result').table({url: 'action-admin-users-page',
        page: true,
        editbox: boxs,
        toolbarAdd: false,
        toolbarDel: false,
        toolbarEdit: false,
        bodyToolbarEdit: false,
        bodyToolbarDel: false,
        firstTimeRefresh: true,
        field: [
            {name: 'name', head: '姓名', convert: function(val, item) {
                    return '<a view="user" href="javascript:void(0);" val="' + item.id + '">' + val + '</a>';
                }},
            {name: 'gender', head: '性别', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return gender[val];
                    } else {
                        return '-';
                    }
                }},
            {name: 'idCard', head: '身份证号'},
            {name: 'ton', head: '资格证号'},
            {name: 'signupTime', head: '报名时间', convert: function(val) {
                    if (val !== void 0 && val !== null) {
                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
                    } else {
                        return '-';
                    }
                }},
            {name: 'code', head: '激活码', convert: function(val) {
                    return '<a view="code" href="javascript:void(0);" val="' + val + '">' + val + '</a>';
                }},
            {name: 'id', head: '事中照片', convert: function(val) {
                    return '<a view="face" href="javascript:void(0);" val="' + val + '">查看</a>';
                }},
		    {name: 'totalTime', head: '总学时(分)', convert: function(val, item) {
		        if(item.studyTypes == 2){
                    return val +'(网络)';
                }else if(item.studyTypes == 0){
		            return val +'(现场)';
		        }
                    return val +'(网络)+360(现场)';
                }},
            {name: 'studyUseTime', head: '已学', convert: function(val, item) {
                    return val + '(' + studyTypes[item.studyTypes] + ')';
                }},
            {name: 'studyLeftTime', head: '剩余'},
            {name: 'graduationTime', head: '现场', convert: function(val, item) {
                    if(item.studyTypes == 2){
                        return '无';
                    }
                    return isCompleted[val != null ? 1 : 0];
                }},
            {name: 'userStatus', head: '状态', convert: function(val) {
                    var lab = {'0': '网络学时未满', '1': '网络学时已满', '2': '完成总学时并已打印合格证'};
                    return '<img src="assets/images/s' + val + '.png" title="' + lab[val] + '">';
                }}
        ]
    });
});
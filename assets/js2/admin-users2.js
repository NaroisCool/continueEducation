$(document).ready(function() {

    Date.prototype.format = function format(day) {
        var y = this.getFullYear(),
                m = this.getMonth() + 1,
                d = day === undefined ? this.getDate() : day;
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    };

    var boxs = $.editboxInit({title: '学员信息',
        titleAdd: '添加新',
        urlAdd: 'action-admin-user-add',
        urlEdit: 'action-admin-user-edit',
        urlView: 'action-admin-user-get',
        urlDel: 'action-admin-user-del',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'idCard', label: '身份证*：', validate: 'required', validateMsg: '身份证不能为空', change: function() {
                    var $birthday = $(this).editboxGetField('birthday'),
                            $gender = $(this).editboxGetField('gender'),
                            pid = $(this).val(), g;
                    $.post('action-admin-user-getByIdCard', {idCard: pid}, function(ret) {
                        if (ret.resultCode === '0' || ret.resultCode === 0) {
                            if (ret.obj !== void 0 && ret.obj !== null && ret.obj.id !== void 0 && ret.obj.id !== null) {
                                boxs.add.editboxHide();
                                boxs.edit.editboxShow({subData: {id: ret.obj.id}});
                                return;
                            }
                        }
                        if (pid.length === 18) {
                            $birthday.val(pid.substr(6, 6));
                            g = parseInt(pid.substr(16, 1)) % 2;
                            $gender.val(g === 1 ? 0 : 1);
                        }
                    });
                }},
            {type: 'text', name: 'name', label: '姓名*：', validate: 'required', validateMsg: '姓名不能为空'},
            {type: 'hidden', name: 'avatar', label: '照片：'},
            {type: 'image', name: 'avatar_', label: '照片：'},
            {type: 'text', name: 'ton', label: '从业资格证*：', validate: 'required', validateMsg: '从业资格证不能为空'},
            {type: 'text', name: 'birthday', label: '出身年月：', click: function() {
                    WdatePicker({dateFmt: 'yyyyMM', isShowWeek: true});
                }},
            {type: 'select', name: 'gender', label: '性别：', options: gender},
            {type: 'text', name: 'signupTime', label: '报名时间*：', validate: 'required', validateMsg: '报名时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd', isShowWeek: true});
                }},
            {type: 'text', name: 'code', label: '<b>激活码*</b>：', validate: 'required', validateMsg: '激活码不能为空', change: function() {
                    var $code = $(this), code = $(this).val(), $ok = $('.modal-footer [name="ok"]', $(this).parents('[id][box]')),
                            $msg = $code.next('span');
                    $code.attr('validated', false);
                    $ok.addClass('disabled');
                    $msg.text('正在校验激活码...');
                    $.post('action-admin-code-validate', {code: code}, function(ret) {
                        var isValidated = false;
                        if (ret.resultCode === '0' || ret.resultCode === 0) {
                            isValidated = true;
                        }
                        $ok.toggleClass('disabled', !isValidated);
                        $code.attr('validated', isValidated).parents('.control-group').toggleClass('error', !isValidated).toggleClass('success', isValidated);
                        $msg.text(!isValidated ? '激活码校验不通过' : '激活码校验通过');
                    });
                }},
            {type: 'select', name: 'agencyId', label: '所属驾校*：', validate: 'required', validateMsg: '所属驾校不能为空',
                dynamic: {url: 'action-admin-agency-all', key: 'id', value: 'name'}},
            {type: 'select', name: 'studyType', label: '培训类型*：', options: studyType, validate: 'required', validateMsg: '培训类型不能为空'},
            {type: 'select', name: 'studyTypes', label: '教学类型*：', options: studyTypes, validate: 'required', validateMsg: '教学类型不能为空'},
            {type: 'text', name: 'firstLicenseTime', label: '初次申领时间*：', validate: 'required', validateMsg: '申领时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd', isShowWeek: true});
                }},
//            {type: 'checkboxList', name: 'licenseType', label: '已有证类型*：', validate: 'required', validateMsg: '已有证类型不能为空', size: 6, options: licenseType},
            {type: 'text', name: 'address', label: '联系地址：'},
            {type: 'text', name: 'tel', label: '联系电话：'},
            {type: 'text', name: 'expiresTime', label: '激活码过期时间：', disabled: true},
            {type: 'select', name: 'status', label: '合格证打印：', options: isPrinted, disabled: true},
            {type: 'text', name: 'addTime', label: '添加信息时间：', disabled: true},
            {type: 'text', name: 'lastLoginTime', label: '最后登陆时间：', disabled: true}
        ],
//        getReturnData: function(ret) {
//            ret.obj.licenseType = ret.obj.licenseType.split(',');
//            return ret.obj;
//        },
//        onSubmit: function($box, subData) {
//            if (subData.licenseType !== void 0) {
//                subData.licenseType = subData.licenseType.join(',');
//            }
//            return subData;
//        },
        onSubmited: function() {
            var $table = $('#result table');
            $.tableRefresh({table: $table});
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

    var vals;
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
//    $('[name="complete"]').live('click', function() {
//        if ($(this).hasClass('disabled')) {
//            return;
//        }
//        $.post('action-admin-user-grad', {ids: vals}, function(ret) {
//            var $msg = $('#result [name="toolBar"] [name="msg"]');
//            if (ret.resultCode === '0' || ret.resultCode === 0) {
//                $msg.text('结业成功').fadeIn().delay(2000).fadeOut();
//            } else {
//                $msg.text(retcode[ret.resultCode]).fadeIn().delay(2000).fadeOut();
//            }
//            var $table = $('#result table');
//            $.tableRefresh({table: $table});
//        });
//    });
    $('[name="order"],[name="order2"]').live('click', function() {
        if ($(this).hasClass('disabled')) {
            return;
        }
        var resId = $('[name="reserve"]').val();
        if (resId == 'NULL') {
            alert('未选择');
            return;
        }
        var sn = '';
        if ($(this).attr('name') == 'order2') {
            sn = 'b';
        }
        $.post('action-admin-reserve-order', {id: resId, userId: vals, sn: sn}, function(ret) {
            var $msg = $('#result [name="toolBar"] [name="msg"]');
            if (ret.resultCode === '0' || ret.resultCode === 0) {
                $msg.text('预约成功').fadeIn().delay(2000).fadeOut();
            } else {
                $msg.text(retcode[ret.resultCode]).fadeIn().delay(2000).fadeOut();
            }
            var $table = $('#result table');
            $.tableRefresh({table: $table});
        });
    });

    $('[name="filter.isReserve1"]').dropdown({options: isReserve});
    $('[name="filter.isReserve2"]').dropdown({options: isReserve});
    $('[name="filter.gender"]').dropdown({options: gender});
    $('[name="filter.studyType"]').dropdown({options: studyType});
    $('[name="filter.studyTypes"]').dropdown({options: studyTypes});
    $('[name="filter.isCompleted2"]').dropdown({options: isCompleted});
    $('[name="filter.isGraduation"]').dropdown({options: isCompleted});
    $('[name="filter.agencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});
    $('[name="filter.reserveId"]').dropdown({url: 'action-admin-reserve-all', key: 'id', value: 'name'});

    $('#result').table({url: 'action-admin-users-page',
        page: true,
        editbox: boxs,
        toolbarExp: true,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
        firstTimeRefresh: true,
        toolbarOther: '<span style="float:left;padding:2px 1px 0 3px">班级：<input type="text" class="input-small" id="cname"></span><a class="btn btn-small disabled" name="class"> 设置班级</a><span style="float:left;padding:2px 1px 0 3px">预约：<input type="text" class="input-medium" name="reserve"></span><a class="btn btn-small disabled" name="order"> 预约</a><a class="btn btn-small disabled" name="order2"> 预约2</a>',
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
            {name: 'tel', head: '联系电话'},
            {name: 'studyType', head: '教育类别', convert: studyType},
            {name: 'totalTime', head: '网络学时'},
            {name: 'className', head: '班级'},
            {name: 'reserveTime', head: '预约1'},
            {name: 'reserveTimeb', head: '预约2', convert: function(val, item) {
                    if (item.reserveNeedNum == 2) {
                        if (val !== void 0 && val !== null) {
                            return val;
                        } else {
                            return '-';
                        }
                    } else {
                        return '无需';
                    }
                }}
//            {name: 'code', head: '激活码', convert: function(val) {
//                    return '<a view="code" href="javascript:void(0);" val="' + val + '">' + val + '</a>';
//                }},
//            {name: 'expiresTime', head: '过期时间', convert: function(val) {
//                    if (val !== void 0 && val !== null) {
//                        return '<span title="' + val + '">' + val.substr(0, 10) + '</span>';
//                    } else {
//                        return '-';
//                    }
//                }},
//            {name: 'agencyId', head: '驾校信息', convert: function(val) {
//                    if (val === void 0 || val === null) {
//                        return '-';
//                    }
//                    return '<a view="agency" href="javascript:void(0);" val="' + val + '">' + agencys[val] + '</a>';
//                }}
        ],
        onAddClick: function($btn, opts) {
            if (opts.editbox !== void 0) {
                var today = (new Date()).format();
                opts.editbox.add.editboxShow({initData: {signupTime: today, firstLicenseTime: today}});
            }
        }, onRefreshToolbarBtn: function(ids, $toolBar, opts) {
            var btns = $('[name="class"],[name="complete"]', $toolBar);
            var oBtn = $('[name="order"],[name="order2"]', $toolBar);
            if (ids.length >= 1) {
                vals = ids.join(',');
                btns.removeClass('disabled');
                if (ids.length == 1) {
                    oBtn.removeClass('disabled');
                } else {
                    oBtn.addClass('disabled');
                }
            } else {
                oBtn.addClass('disabled');
                btns.addClass('disabled');
            }
        },
        onToolBarRendered: function() {
            $('[name="reserve"]').dropdown({url: 'action-admin-reserve-allByDateNotFull', key: 'id', value: 'name', defaultText: '请选择'});
        }
    });
});
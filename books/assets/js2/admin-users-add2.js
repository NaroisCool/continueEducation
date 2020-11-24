$(document).ready(function() {

    $('[name="filter.agencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});

    Date.prototype.format = function format(day) {
        var y = this.getFullYear(),
                m = this.getMonth() + 1,
                d = day === undefined ? this.getDate() : day;
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    };

    var today = (new Date()).format();

    $('[name="imgBtn"]').live('click', function() {
        box = $(this).parents('div[box]');
        $('#meitu').modal('show');
    });

    $('[name="fingerBtn"]').live('click', function() {
        box = $(this).parents('div[box]');
        fingNum = 0;
        Biokey.InitEngine();
        Biokey.BeginEnroll();
        $('[name="fingerImg"]', box).hide().attr("src", '');
        $(this).text('请按手指(' + fingNum + '/4)');
    });

    $('#fingerHelper').click(function() {
        $('#fingerHelp').slideToggle();
    });

    var boxs = $.editboxInit({title: '学员信息',
        titleAdd: '添加新',
        urlAdd: 'action-admin-user-add',
        urlEdit: 'action-admin-user-edit',
        urlView: 'action-admin-user-get',
        urlDel: 'action-admin-user-del',
        field: [{type: 'hidden', name: 'id'},
            {type: 'hidden', name: 'totalTime', value: '24'},
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
            {type: 'finger', name: 'finger', label: '指纹：'},
            {type: 'text', name: 'ton', label: '从业资格证*：', validate: 'length', validateParam: '19', validateMsg: '从业资格证格式有误'},
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
            {type: 'select', name: 'studyType', label: '培训类型*：', options: studyType, validate: 'required', validateMsg: '培训类型不能为空', change: function() {
                    var sType = $(this).editboxGetField('studyType').val(),
                            sTypes = $(this).editboxGetField('studyTypes').val(),
                            $totalTime = $(this).editboxGetField('totalTime');
                    if (sTypes == 1) {
                        $totalTime.val(totalTime[sType]);
                    } else {
                         $totalTime.val('24');
                    }
                }},
            {type: 'select', name: 'studyTypes', label: '<b>教学类型*</b>：', options: studyTypes, validate: 'required', validateMsg: '教学类型不能为空', change: function() {
                    var sType = $(this).editboxGetField('studyType').val(),
                            sTypes = $(this).editboxGetField('studyTypes').val(),
                            $totalTime = $(this).editboxGetField('totalTime');
                    if (sTypes == 1) {
                        $totalTime.val(totalTime[sType]);
                    } else {
                         $totalTime.val('24');
                    }
                }},
            {type: 'text', name: 'firstLicenseTime', label: '初次申领时间*：', validate: 'required', validateMsg: '申领时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd', isShowWeek: true});
                }},
            {type: 'text', name: 'licenseExpires', label: '有效期*：', validate: 'required', validateMsg: '有效期不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd', isShowWeek: true});
                }},
//            {type: 'checkboxList', name: 'licenseType', label: '已有证类型*：', validate: 'required', validateMsg: '已有证类型不能为空', size: 6, options: licenseType},
            {type: 'text', name: 'address', label: '联系地址：'},
            {type: 'text', name: 'tel', label: '联系电话：'},
            {type: 'text', name: 'expiresTime', label: '激活码过期时间：', disabled: true},
//            {type: 'text', name: 'status', label: '状态：', disabled: true},
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
        onAddShow: function($box) {
            $box.editboxGetField('studyTypes').val(1);
        },
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

    $('#fromCVR').live('click', function() {
        var $msg = $('#result [name="toolBar"] [name="msg"]');
        $msg.text('请放身份证').fadeIn(1000, function() {
            var ret = CVR_IDCard.ReadCard();
            if (ret == 0) {
                var initData = {
                    idCard: CVR_IDCard.CardNo,
                    name: CVR_IDCard.Name,
                    birthday: CVR_IDCard.Born,
                    gender: CVR_IDCard.Sex,
                    address: CVR_IDCard.Address,
                    avatar: CVR_IDCard.Picture,
                    avatar_: CVR_IDCard.Picture,
                    signupTime: today,
                    firstLicenseTime: today
                };
                initData.birthday = initData.birthday.replace('年', '').substring(0, 6);
                initData.gender = initData.gender === '男' ? 0 : 1;
                boxs.add.editboxShow({initData: initData});
                boxs.add.editboxGetField('avatar_').attr('src', 'data:image/jpeg;base64,' + initData.avatar_);
            } else {
                $msg.text(ret);
            }
        });
    });

    $('#result').table({url: 'action-admin-user-page',
        page: true,
        pageSize: 16,
        editbox: boxs,
        toolbarOther: '<a class="btn btn-small" href="admin-users"><i class="icon-btnequery" style="margin-top: 1px;"></i> 综合查询</a><a id="fromCVR" class="btn btn-small"><i class="icon-btnadd" style="margin-top: 1px;"></i> 报名登记</a>',
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
            {name: 'tel', head: '联系电话'},
            {name: 'studyType', head: '教育类别', convert: studyType},
            {name: 'studyTypes', head: '培训方式', convert: studyTypes},
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
            {name: 'agencyId', head: '驾校信息', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="agency" href="javascript:void(0);" val="' + val + '">' + agencys[val] + '</a>';
                }}
        ],
        onAddClick: function($btn, opts) {
            if (opts.editbox !== void 0) {
                opts.editbox.add.editboxShow({initData: {signupTime: today, firstLicenseTime: today}});
            }
        }
    });
});
$(document).ready(function() {

    $('[name="filter.agencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});

    $('#result').table({url: 'action-admin-user-page',
        page: true,
        checkbox: false,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
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
            {name: 'code', head: '激活码', convert: function(val) {
                    return '<a view="code" href="javascript:void(0);" val="' + val + '">' + val + '</a>';
                }},
            {name: 'agencyId', head: '驾校信息', convert: function(val) {
                    if (val === void 0 || val === null) {
                        return '-';
                    }
                    return '<a view="agency" href="javascript:void(0);" val="' + val + '">' + agencys[val] + '</a>';
                }}
        ],
        getPageTotal: function(ret) {
            $('#total').text(ret.page.total);
            return ret.page.total;
        }
    });
});
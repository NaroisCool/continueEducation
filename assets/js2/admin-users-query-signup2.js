$(document).ready(function() {

    $('[name="filter.agencyId"]').dropdown({url: 'action-admin-agency-all', key: 'id', value: 'name'});
    $('[name="filter.studyTypes"]').dropdown({options: studyTypes});
    $('[name="filter.isCompleted"]').dropdown({options: isCompleted});

    $('#result').table({url: 'action-admin-user-signRep',
        page: true,
        checkbox: false,
        toolbarExp: true,
        toolbarView: false,
        toolbarAdd: false,
        toolbarEdit: false,
        toolbarDel: false,
        firstTimeRefresh: true,
        field: [
            {name: 'stime', head: '报名'},
            {name: 'p1', head: '所属驾校', convert: function(val) {
                    return $('[name="filter.agencyId"]').find("option:selected").text();
                }},
            {name: 'p2', head: '是否结业', convert: function(val) {
                    return $('[name="filter.isCompleted"]').find("option:selected").text();
                }},
            {name: 'p3', head: '教学类型', convert: function(val) {
                    return $('[name="filter.studyTypes"]').find("option:selected").text();
                }},
            {name: 'num', head: '人数'}

        ],
        getReturnData: function(ret) {
            return ret.signList;
        }
    });
});
$(document).ready(function() {

    $('#result').table({url: 'action-admin-studyrecs-all?filter.code=' + code,
        toolbar: false,
        firstTimeRefresh: true,
        field: [
            {name: 'studyDate', head: '培训日期'},
            {name: 'studyUseTime', head: '培训时长(分钟)'}
        ],
        getReturnData: function(ret) {
            if (ret.list.length > 0) {
                $('#name').text(ret.list[0].name);
                $('#pid').text(ret.list[0].idCard);
                $('#ton').text(ret.list[0].ton);
            }
            return ret.list;
        },
        onDataRendered: function(retData) {
            if (now == 'now') {
                window.print();
            }
        }
    });
});
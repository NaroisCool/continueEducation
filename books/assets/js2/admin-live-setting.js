$(document).ready(function() {

    var boxs = $.editboxInit({title: '考勤设置', fade: false, display: true, modal: false, renderTo: '#result',
        urlEdit: 'action-admin-agency-editLive',
        urlView: 'action-admin-agency-get',
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'liveStudyTimeBegin', label: '开始时间*：', validate: 'required', validateMsg: '开始时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss', isShowWeek: true});
                }},
            {type: 'text', name: 'liveStudyTimeEnd', label: '结束时间*：', validate: 'required', validateMsg: '结束时间不能为空', click: function() {
                    WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss', isShowWeek: true});
                }}
        ]
    });

    boxs.edit.css('margin', '0').css('margin-left', '140px');
//    $('.modal-footer', boxs.view).addClass('hidden');
    boxs.edit.editboxShow({backdrop: false, keyboard: false});
});
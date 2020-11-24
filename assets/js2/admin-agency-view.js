$(document).ready(function() {

    var boxs = $.editboxInit({title: '驾校信息', fade: false, display: true, modal: false, renderTo: '#result',
        urlEdit: 'action-admin-agency-edit',
        urlView: 'action-admin-agency-get?id=' + getid,
        field: [{type: 'hidden', name: 'id'},
            {type: 'text', name: 'name', label: '名称*：', validate: 'required', validateMsg: '名称不能为空'},
            {type: 'text', name: 'tel', label: '联系电话：'},
            {type: 'text', name: 'website', label: '网站：'},
            {type: 'textarea', name: 'info', label: '简介：'}
        ]
    });

    boxs.edit.css('margin', '0').css('margin-left','140px');
//    $('.modal-footer', boxs.view).addClass('hidden');
    boxs.edit.editboxShow({backdrop: false, keyboard: false});
});
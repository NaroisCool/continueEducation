$(document).ready(function() {
    $('[password="edit"]').live('click', function() {
        boxsPassword.edit.editboxShow();
    });

    var boxsPassword = $.editboxInit({title: '密码',
        urlEdit: 'action-admin-admin-editPassowrd',
        field: [{type: 'password', name: 'oldPassword', label: '原密码：'},
            {type: 'password', name: 'password', label: '新密码：'}]
    });
});
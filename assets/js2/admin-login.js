$(document).ready(function() {

    $('#login_button').click(function() {
        var $username = $('#txtUserName'),
                $password = $('#txtUserPwd'),
                $login = $('#login'),
                $msg = $('#msg'),
                username = $username.val(),
                password = $password.val(),
                loginType = $('#HiddenOptionValue').val();
        $.post('dologin-admin', {username: username, password: password, loginType: loginType},
        function(ret) {
            if (ret.resultCode === 0 || ret.resultCode === '0') {
                window.location.href = ret.retUrl;
            } else {
                alert('登录失败 ' + retcode[ret.resultCode]);
            }
        });
    }
    );
});
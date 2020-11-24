Ext.QuickTips.init();
LoginWindow = Ext.extend(Ext.Window, {
    bodyStyle: 'background:url(assets/images/jxloginbg.jpg) no-repeat 0;',
    width: 946,
    height: 620,
    resizable: false,
    draggable: false,
    closable: false,
    defaults: {
        border: false
    },
    buttonAlign: 'center',
    createFormPanel: function() {

        // 表单重置函数
        function reset() {
            loginform.form.reset();
        }
        ;

        // 表单提交函数
        function surely() {
            if (loginform.getForm().isValid()) {

                setCookie('school.username', loginform.getForm()
                        .findField('username').getValue(), 240);
                var path = window.location.pathname;
                path = path.substring(0, path.lastIndexOf('/') + 1);
                path += "user-study";
                loginform.form.submit({
                    waitMsg: '正在登录......',
                    url: 'dologin-user',
                    timeout: 3000,
                    success: function(form, action) {
                    },
                    failure: function(form, action) {
                        var ret = action.result;
                        if (ret.resultCode === 0 || ret.resultCode === '0') {
                            window.location.href = ret.retUrl;
                        } else {
                            alert('登录失败 ' + retcode[ret.resultCode]);
                        }
                    }
                });
            }
        }
        ;

        var loginform = new Ext.form.FormPanel({
            id: 'loginForm',
            bodyStyle: 'padding-top:6px',
            defaultType: 'textfield',
            labelAlign: 'right',
            labelWidth: 55,
            labelPad: 2,
            frame: true,
            method: 'POST',
            // 增加表单键盘事件
            keys: [{
                    key: [10, 13],
                    fn: surely
                }],
            defaults: {
                allowBlank: false,
                width: 158
            },
            items: [{
                    cls: 'user',
                    name: 'username',
                    fieldLabel: '帐 号',
                    style: 'font-size:14px;font-weight:bold;letter-spacing: 1px;border: solid 1px #c0c0c2;',
//                    blankText: '帐号不能为空'
                }, {
                    cls: 'key',
                    name: 'password',
                    fieldLabel: '密 码',
//                    blankText: '密码不能为空',
                    style: 'font-size:14px;font-weight:bold;letter-spacing: 1px;border: solid 1px #c0c0c2;',
                    inputType: 'password'
                }],
            buttons: [{
                    text: '',
                    id: 'sure',
                    style: 'width:96px;height:29px;margin-top:30px;background: url(assets/images/loginbtn.gif) no-repeat 0 0;',
                    handler: surely
                }, {
                    text: '',
                    id: 'clear',
                    style: 'width:96px;height:29px;margin:30px 0 0 20px;background: url(assets/images/reset.gif) no-repeat 0 0;',
                    handler: reset
                }]
        });
        return loginform;
    },
    initComponent: function() {

        LoginWindow.superclass.initComponent.call(this);
        this.fp = this.createFormPanel();
        this.add(this.fp);

    }
});

Ext.onReady(function() {
    var win = new LoginWindow();
    win.on('show', function() {
        setTimeout(function() {
            var username = getCookie('school.username');
            if (username != null && username != "") {
                Ext.getCmp('loginForm').getForm()
                        .findField('username')
                        .setValue(username);
            }
        }, 200);
    }, this);
    win.show();

});

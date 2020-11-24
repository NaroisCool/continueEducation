$(document).ready(function() {

    $('[name="reserve"]').dropdown({url: 'action-user-reserve-all', key: 'id', value: 'name', defaultText: '请点击选择预约时间'});

    $('#order').click(function() {
        var resId = $('[name="reserve"]').val();
        if (resId == 'NULL') {
            alert('未选择');
            return;
        }
        $.post('action-user-reserve-order', {id: resId}, function(ret) {
            if (ret.resultCode === '0' || ret.resultCode === 0) {
                alert('预约成功');
            } else {
                alert(retcode[ret.resultCode]);
            }
        });
    });
});
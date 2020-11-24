var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var isAlert = false,num = 0,sid,std,
    autoPlay = false,timered = false;

tnumc = $.cookie("tnumc");
var tnum = tnumc == null? 0:parseInt(tnumc);

function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

function is_errorwb(){
    if(u.indexOf('UCBrowser') > -1) {
        return true;
    }else if(u.indexOf('minibrowser') > -1){
        return true;
    }
    else {
        return false;
    }
}

function clock() {
    tnum++;
    var tnumcNext = $.cookie("tnumcNext");
    tnumcNext = tnumcNext == null? 2*60:parseInt(tnumcNext);
    if(tnumcNext < tnum){
        $.cookie("tnumcNext",2*60);
        tnum = 0;
    }
    console.log('tnum,tnumcNext:'+tnum +' '+ tnumcNext);
    $.cookie("tnumc",tnum);
    if (tnum == 2*60 || tnum  == tnumcNext){
        $.cookie("tnumcNext",tnum + 30*60 + randomNum(-50,50));
        $.cookie("studyId",sid);
        console.log('seek:'+$.cookie('playTime'));
        if(CKobject.getObjectById('splayer_a1') !=null){
            CKobject.getObjectById('splayer_a1').videoPause();
            console.log('videoPause');
        }
        refresh(false);
    }
}

function randomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function loadedHandler() {
    if(std.studyStatus != 1){
        return;
    }
    addPlayListener();
    addEndListener();
}
function timeHandler(t) {
    if (t > -1) {
        $.cookie('playTime',parseInt(t*1000)/1000);
        num++;
        if(num >= 90){
            refresh(false);
            num = 0;
        }

        // console.log('playTime,num:'+$.cookie('playTime') + '  '+ num);
    }
}
function addPlayListener() {//增加播放监听
    if(CKobject.getObjectById('splayer_a1').getType()) {
        CKobject.getObjectById('splayer_a1').addListener('play', playHandler);
    }else{
        CKobject.getObjectById('splayer_a1').addListener('play', 'playHandler');
    }
}
function playHandler() {
    removePlayListener();
    var seek = $.cookie('playTime');
    if (seek >0){
        console.log('seek:'+seek);
        CKobject.getObjectById('splayer_a1').videoSeek(seek);
    }
    addTimeListener();
}
function removePlayListener() {//删除播放监听事件
    if(CKobject.getObjectById('splayer_a1').getType()) {
        CKobject.getObjectById('splayer_a1').removeListener('play', playHandler);
    }else{
        CKobject.getObjectById('splayer_a1').removeListener('play', 'playHandler');

    }
}
function addTimeListener() {//增加时间监听
    if(CKobject.getObjectById('splayer_a1').getType()){
        CKobject.getObjectById('splayer_a1').addListener('time',timeHandler);
    }
    else{
        CKobject.getObjectById('splayer_a1').addListener('time','timeHandler');
    }
}

function endedHandler() {
    removeEndistener();
    refresh(false);
}
function addEndListener() {
    if(CKobject.getObjectById('splayer_a1').getType()) {
        CKobject.getObjectById('splayer_a1').addListener('ended', endedHandler);
    }
    else {
        CKobject.getObjectById('splayer_a1').addListener('ended', 'endedHandler');
    }
}

function removeEndistener() {
    if(CKobject.getObjectById('splayer_a1').getType()) {
        CKobject.getObjectById('splayer_a1').removeListener('ended', endedHandler);
    }
    else {
        CKobject.getObjectById('splayer_a1').removeListener('ended', 'endedHandler');
    }
}

function refresh(isS){
    if(std != void 0 && std.studyStatus != 1){
        return;
    }
    $.ajax({
        type: "post",
        url: 'action-user-studynewrec-refresh',
        data: isS?{}:{studyId:sid},
        async: false,
        success: function(ret) {
            if (ret.resultCode == 0) {
            } else if (!isAlert) {
                if (ret.resultCode == 200) {
                    alert('您已完成全部培训');
                } else if (ret.resultCode == 202) {
                    alert('您的培训类型为“课堂集中授课”，在线学习不计时');
                } else if (ret.resultCode == 201) {
                    alert('您今日培训学时已经完成，今日继续学习不再计时');
                } else if (ret.resultCode == 101) {
                    if(!isiOS && !isAndroid){alert('您已在别处登录,请重新登录');}
                    window.location.href="user-login";
                } else {
                    alert(retcode[ret.resultCode]);
                }
                isAlert = true;
            }
        }
    });
}


$(document).ready(function() {
    if(is_weixn()){
        window.location.href="weixin.html";
    }

    if(is_errorwb()){
        window.location.href="errorwb.html";
    }

    autoPlay = window.location.hash == '#play';

        $('button[name="study"]').live('click', function() {
            if(!timered){
                setInterval("clock()",1*1000);//1秒
                timered = true;
            }
            sid = $(this).attr('studyId');
            std = studyData[sid];
            $.cookie("tnum",'9');
            $.cookie("studyId",sid);
            refresh(true);
                var flashvars={
                    f:'http://202.101.231.15'+std.contents,
                    c:0,
                    h:3,
                    p:1,
                    b:0,
                    loaded:'loadedHandler'
                };
                var video=[flashvars.f+'->video/mp4'];
                var params={bgcolor:'#FFF',allowScriptAccess:'always',wmode:'transparent'};
                CKobject.embed('assets/splayer/splayer/splayer.swf','a1','splayer_a1','960','540',false,flashvars,video,params);
                $('#playBox .modal-header h3').text(std.name)
                $('#playBox').modal({
                    backdrop:'static',
                    keyboard:false,
                    show: true
                });
        });

    $('#playBox').on('hidden', function () {
        $('#a1').html('');
        if(std.studyStatus != 1){
            return;
        }
        refresh(false);
        $.tableRefresh({table: $('#result table')});
    });

    var studyData = {};

        $('#result').table({url: 'action-user-studys-all',
        toolbar: false,
        firstTimeRefresh: true,
        field: [{name: 'name', head: '课程名称'},
            {name: 'length', head: '课程时长', convert: function(val,item) {
                return parseInt(val/60)+' ('+parseInt(item.studyUseTime/item.length*100)+'%)';
            }},
            {name: 'studyStatus', head: '状态', convert: function(val,item){
                if(val == 1 && item.studyUseTime == 0){
                        return '未学习';
                }else {
                    return studyStatus[val];
                }
            }},
            {name: 'studyBeginTime', head: '开始时间'},
            {name: 'studyCompletedTime', head: '结束时间'},
            {name: 'id', head: '点击学习', convert: function(val,item) {
                var bn;
                if(item.studyStatus == 0){
                    return '';
                }else if(item.studyStatus == 1){
                    if(item.studyUseTime == 0){
                        bn = '开始学习';
                    }else{
                        bn = '继续学习';
                    }
                    $.cookie('playTime',item.studyUseTime);
                }else if(item.studyStatus == 2){
                    bn = '重新学习';
                }
                return '<button name="study" studyId="'+item.studyId+'" class="btn-danger btn-mini" onclick="">'+bn+'</button>'
            }}
        ],
            getReturnData: function(ret) {
                studyData = {};
                var total = ret.page.result.length,has = 0,tper = 0;
                for (var i= 0;i< ret.page.result.length;i++ ){
                    var val = ret.page.result[i];
                    if(val.studyStatus == 1 || val.studyStatus == 2){
                        if(val.studyStatus == 1){
                            sid = val.studyId
                        }else {
                            has++;
                        }
                        tper += val.studyUseTime;
                    }
                    studyData[val.studyId] = val;
                }
                tper = parseInt(tper/60/1440*100)
                if(tper > 100){
                    tper = 100;
                }
                $('#tp').text(tper + '%');
                $('#th').text(has);
                $('#tl').text(total - has);
                return ret.page.result;
            },
            onDataRendered: function(retData) {
                if(autoPlay){
                    autoPlay=false;
                    console.log('sid:'+sid);
                    $('button[studyId="'+sid+'"]').click();
                }
            }
    });

});
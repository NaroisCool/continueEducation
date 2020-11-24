<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:set name="atype" value="login.loginTypeName" /> 
<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="http://open.web.meitu.com/sources/xiuxiu.js" type="text/javascript"></script>
        <%@include file="../jspf/head.jspf" %>
        <s:if test="#atype == '系统管理员' || #atype == '运管账户'">  
            <script src="assets/js2/${action}2.js" type="text/javascript"></script>  
        </s:if>
        <s:else>
            <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        </s:else>
        <script src="assets/js2/filter.js" type="text/javascript"></script>  
        <title>${title}</title>
        <style type="text/css">
            .help{
                padding: 10px;
            }
        </style>
        <script type="text/javascript">
            var box, fingNum = 0;
        </script>  
        <script language="javascript" for="Biokey" event="OnEnroll(ActionResult,ATemplate)" type="text/javascript">
            $('[name="fingerBtn"]', box).text('采集');
            $('[name="finger"]', box).val(Biokey.EncodeTemplate1(ATemplate));
            $('[name="fingerImg"]', box).attr("src", 'finger/f (' + parseInt(Math.random() * 100) + ').png').fadeIn();
            Biokey.EndEngine();
        </script>  
        <script language="javascript" for="Biokey" event="OnFeatureInfo(AQuality)" type="text/javascript">
            fingNum++;
            $('[name="fingerBtn"]', box).text('继续按手指(' + fingNum + '/4)');
        </script>
        <script type="text/javascript">
            window.onload = function() {
                xiuxiu.embedSWF("meituContent", 5, "660", "440");
                xiuxiu.onInit = function() {
                    xiuxiu.setUploadType(3);
                };
                xiuxiu.onSaveBase64Image = function(data, fileName, fileType, id) {
                    $('[name="avatar"]', box).val(data);
                    $('[name="avatar_"]', box).attr("src", 'data:image/jpeg;base64,' + data);
                    $('#meitu').modal('hide');
                };
            };
        </script>
    </head>
    <body>
        <%@include file="../jspf/toolbar.jspf" %>
        <div class="container-fluid">
            <div class="row-fluid">                
                <%@include file="../jspf/leftMenu-admin.jspf" %>
                <div id="content" class="span10">  
                    <%@include file="../jspf/site.jspf" %>                      
                    <div class="row-fluid">
                        <div class="box span12">
                            <div class="box-header well">
                                <img src="assets/images/s.gif" class="x-panel-inline-icon users"><span class="x-panel-header-text">${title}</span>
                            </div>
                            <div class="box-content">  
                                <div class="help">
                                    <a href="javascript:void(0);" id="fingerHelper" >查看指纹仪注意事项</a>
                                    <div id="fingerHelp" style="display: none;">                                        
                                        <img src="assets/images/finger.png">
                                    </div>
                                </div>
                                <div id="filter" class="row-fluid">
                                    <form id="export" action="action-admin-user-export">                           
                                        <div class="filter op">
                                            <a id="query" class="btn btn-small"><i class="icon-search"></i> 查询</a> 
                                            <input type="reset" class="btn btn-small" style="display:none;" value="重置">
                                            <a id="reset" class="btn btn-small"><i class="icon-reset"></i> 重置</a>
                                            <a id="more" class="btn btn-small"><i class="icon-more"></i> 更多</a>
                                        </div>
                                        <div class="filter"><span>身份证号:</span><input type="text" class="input-medium" name="filter.idCard"></div>
                                        <div class="filter"><span>从业证号:</span><input type="text" class="input-medium" name="filter.ton"></div>
                                        <div class="filter"><span>学员姓名:</span><input type="text" class="input-medium" name="filter.name"></div>
                                        <div class="filter"><span>联系电话:</span><input type="text" class="input-medium" name="filter.tel"></div>
                                        <div class="filter"><span>培训类型:</span><input type="text" class="input-medium" name="filter.studyType"></div>
                                        <div class="filter"><span>教学类型:</span><input type="text" class="input-medium" name="filter.studyTypes"></div>
                                        <div class="filter"><span title="报名时间(起始)">报名起始:</span><input time="time" type="text" class="input-medium" name="filter.signupTimeBegin"></div>
                                        <div class="filter"><span title="报名时间(结束)">报名结束:</span><input time="time" type="text" class="input-medium" name="filter.signupTimeEnd"></div>
                                        <div class="filter"><span>所属驾校:</span><input type="text" class="input-medium" name="filter.agencyId"></div>
                                        <div class="filter moreq"><span>激活码:</span><input type="text" class="input-medium" name="filter.code"></div>
                                        <div class="filter moreq"><span>出生年月:</span><input time="year-month" type="text" class="input-medium" name="filter.birthday"></div>
                                        <div class="filter moreq"><span>学员性别:</span><input type="text" class="input-medium" name="filter.gender"></div>
                                        <div class="filter moreq"><span title="培训完成时间(起始)">完成起始:</span><input time="time" type="text" class="input-medium" name="filter.completedTimeBegin"></div>
                                        <div class="filter moreq"><span title="培训完成时间(结束)">完成结束:</span><input time="time" type="text" class="input-medium" name="filter.completedTimeEnd"></div>
                                        <div class="filter moreq"><span title="初次申领时间(起始)">申领起始:</span><input time="time" type="text" class="input-medium" name="filter.firstLicenseTimeBegin"></div>
                                        <div class="filter moreq"><span title="初次申领时间(结束)">申领结束:</span><input time="time" type="text" class="input-medium" name="filter.firstLicenseTimeEnd"></div>
                                        <div class="filter moreq"><span title="过期时间(起始)">过期起始:</span><input time="time" type="text" class="input-medium" name="filter.expiresTimeBegin"></div>
                                        <div class="filter moreq"><span title="过期时间(结束)">过期结束:</span><input time="time" type="text" class="input-medium" name="filter.expiresTimeEnd"></div>
                                        <div class="filter moreq"><span title="最近登陆时间(起始)">登陆起始:</span><input time="time" type="text" class="input-medium" name="filter.lastLoginTimeBegin"></div>
                                        <div class="filter moreq"><span title="最近登陆时间(结束)">登陆结束:</span><input time="time" type="text" class="input-medium" name="filter.lastLoginTimeEnd"></div>
                                    </form>
                                </div>  
                                <div id="result"></div>
                                <object classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7" id="CVR_IDCard" name="CVR_IDCard" width="0" height="0"></object>
                                <object classid="clsid:CA69969C-2F27-41D3-954D-A48B941C3BA7" id="Biokey" width="0" height="0"></object>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div id="meitu" class="modal fade" style="z-index: 10000;width: 665px;display: none;"> 
            <div id="meituContent">
            </div>
        </div>
    </div>
    <%@include file="../jspf/foot.jspf" %>
</body>
</html>

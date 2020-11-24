$(document).ready(function() {

    var dt = getname.split('-');
    $('#title').text(dt[1]);

    $('#result').FlexPaperViewer(
            {config: {
                    jsDirectory: 'assets/flexpaper/js/',
                    SWFFile: 'books/' + dt[0] + '.swf',
                    Scale: 0.6,
                    ZoomTransition: 'easeOut',
                    ZoomTime: 0.5,
                    ZoomInterval: 0.2,
                    FitPageOnLoad: true,
                    FitWidthOnLoad: true,
                    FullScreenAsMaxWindow: false,
                    ProgressiveLoading: false,
                    MinZoomSize: 0.2,
                    MaxZoomSize: 5,
                    SearchMatchAll: false,
                    InitViewMode: 'Portrait',
                    RenderingOrder: 'flash',
                    StartAtPage: '',
                    ViewModeToolsVisible: true,
                    ZoomToolsVisible: true,
                    NavToolsVisible: true,
                    CursorToolsVisible: true,
                    SearchToolsVisible: true,
                    WMode: 'window',
                    localeChain: 'zh_CN'
                }}
    );
});
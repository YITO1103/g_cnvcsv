// -------------------------------------------------------------------
//  fileapi.js
//
//                  Jun/30/2017
// -------------------------------------------------------------------

var  oConvertRule;

$(window).on('load',function()
{
    // 変換ルールjsonを取得
    url = `./json/ConvertRule.json`;
    console.log("--json:" + url);
    $.getJSON(url, function(data) {
        oConvertRule=data;
        //console.log(JSON.stringify(oConvertRule, null , "\t"));
        //var sRet = DotNet.invokeMethod("ex01", "G3_setRule",JSON.stringify(oConvertRule, null , "\t"));
        //console.log("call G3_setRule:"+ sRet);
        
        //$('#g3_pre').text(JSON.stringify(oConvertRule, null , "\t"));



    });

}); // end of $(window).on('load'

$(function() 
{

    // File APIが使えるか調べる
    if (!window.File){
        alert("FileAPI利用不可-------------")
    }
    else {
        console.log("FileAPIOK-------------")

        //inputFile = $('#getfile');
        //inputFile = document.getElementById('getfile');
        //console.log(inputFile);


        $("#title_001").css({"color" : "#0366d6"});

    }
    //#0366d6;


    $('#getfile').change(function(){
        alert();
        console.log("##############"+this.files);
    });

}); // end of $(function() 

// 変換ルールを返す。
function get_rule_str(bFlag){ 

    if(oConvertRule){
        if(bFlag){
            return JSON.stringify(oConvertRule,null,'\t');
        }
        else{
            return JSON.stringify(oConvertRule);
        }
    }
    
    return "ルール情報取得失敗";
}   // end of get_rule_str
function set_cnv_info_msg(sMsg) {
    console.log(sMsg);
    $("#cnv_info_msg").text("変換中");
}


///
/// 画面の設定
///
function setUI(jNo, iStat) {

    console.log("setUI:"+jNo + "," + iStat);
    
    
    switch (jNo) {
        case 1:
            switch (iStat) {

                case 2:
                    $('#title_001').css({'color':'#0366d6'});
                    $('#getfile').prop("disabled", false);
                    $('#g2_pre_indata').text('');

                    $('#getfile').val("");
                    break;


                case 3:
                    $('#title_001').css({'color':'#aaa4a4'});
                    $('#getfile').prop("disabled", true);
                    break;
                default:
                    break;
            }
            break;

        case 2:
            switch (iStat) {

                case 1:
                    $('#title_002').css({'color':'#aaa4a4'});                    
                    $('#id_002_label_select_type').css({'color':'#aaa4a4'})
                    $('#id_002_select_type').prop("disabled", true);
                    $('#id_002_button_cnv').prop("disabled", true);


                    $('#id_002_select_type option').remove();
                    $('.cnv_info_msg').text("");

                    $("#cnv_info_msg").text("");
                    $(".cnv_info_area").hide();    

                    break;                    
                case 2:
                    $('#title_002').css({'color':'#0366d6'});                    
                    $('#id_002_label_select_type').css({'color':'#222222'});                    
                    $('#id_002_select_type').prop("disabled", false);
                    //$('#id_002_button_cnv').prop("disabled", false);
                    break;

                case 3:
                    $('#title_002').css({'color':'#aaa4a4'});                    
                    $('#id_002_label_select_type').css({'color':'#aaa4a4'})
                    $('#id_002_select_type').prop("disabled", true);
                    //$('#id_002_button_cnv').prop("disabled", true);
                    $(".cnv_info_area").hide(1000);
                    break;                    

                case 4:
                    $('#id_002_button_cnv').prop("disabled", true);
                    $('.cnv_info_area').show(); // .css({"visibility": "visible"});    
                    break;
                case 201:
                        $('#id_002_button_cnv').prop("disabled", true);
                        break;
    
                case 202:
                    $('#id_002_button_cnv').prop("disabled", false);
                    break;
                default:
                    break;
            }
            break;
        case 3:
            switch (iStat) {
                case 1:
                    $('#title_003').css({'color':'#aaa4a4'})
                    //$('#id_002_select_type').prop("disabled", false);
                    //$('#id_002_button_cnv').prop("disabled", false);
                    $('#div_result').hide();
                    break;
                case 2:
                    // DLの準備
                    $('#title_003').css({'color':'#0366d6'})
                    //$('#id_002_select_type').prop("disabled", false);
                    ///$('#id_002_button_cnv').prop("disabled", false);



                    $('#div_result').show();

                   

                    break;
                case 3:
                    //$('#id_002_label_select_type').css({'color':'#0366d6'})
                    //$('#id_002_select_type').prop("disabled", true);
                    //$('#id_002_button_cnv').prop("disabled", true);

                    break;                    
                default:
                    break;
            }
            break;
        default:
            break;
            
    }

    return "";
}   // end of setUI



var arCSV;
/*
const str = "星宮いちご, 霧矢あおい, 紫吹蘭\n大空あかり, 氷上すみれ, 新条ひなき\n";
*/
function readBlobAsBinaryInfile(oBlob,iSize) {

    console.log("JS  readBlobAsBinaryInfile---------------");
    arCSV = new ArrayBuffer() ;
        var reader = new FileReader();

    // Promiseオブジェクトを返却する.処理成功時にはresolveが呼ばれる
    return new Promise(function (resolve, reject) {
        //console.log("    >>>>0001 readBlobAsBinaryInfile");

        reader.onload = function(evt) {

            //console.log("    >>>>0004 readBlobAsBinaryInfile");
            arCSV = new Uint8Array(evt.target.result); 
            //console.log("    >>>>0005 readBlobAsBinaryInfile" + arCSV.byteLength);
            resolve( arCSV.byteLength);
            //console.log("    >>>>0006 readBlobAsBinaryInfile");
            //console.log("onload =" + evt.target.result);
        };
        //console.log("    >>>>0002 readBlobAsBinaryInfile");
        var oSlice = oBlob.slice(0, iSize, oBlob.type);
        reader.readAsArrayBuffer(oSlice);
        //console.log("    >>>>0003 readBlobAsBinaryInfile");

    });

}  // end of readBlobAsBinaryTop

///////////////////////////////////////////////////////
// C#からの呼び出し用
//////////////////////////////////////////////////////
function setDlFile(
    out_enc,
    _csvData, 
    _errData
                            ) {

    if(arrOutCsv && arrOutCsv.length>0){


        var csvData = arrOutCsv.join("");
        const unicodeList = [];
        for (let i = 0; i < csvData.length; i += 1) {
            unicodeList.push(csvData.charCodeAt(i));
        }
        // 変換処理の実施
        //const shiftJisCodeList = Encoding.convert(unicodeList, 'sjis', 'unicode');
        const shiftJisCodeList = Encoding.convert(unicodeList, out_enc, 'unicode');
        const uInt8List = new Uint8Array(shiftJisCodeList);

        // csv書き込みの実装
        const writeData = new Blob([uInt8List], { type: 'text/csv' });

        $('#a_dl_csv').attr({
                "download":`csv-${(new Date()).getTime()}.csv`,
                "href":URL.createObjectURL(writeData)
            });
    }

    if(arrOutErr && arrOutErr.length>0){

        var errData = arrOutErr.join("\n");
        const unicodeList = [];
        for (let i = 0; i < errData.length; i += 1) {
            unicodeList.push(errData.charCodeAt(i));
        }
        // 変換処理の実施
        //const shiftJisCodeList = Encoding.convert(unicodeList, 'sjis', 'unicode');
        const shiftJisCodeList = Encoding.convert(unicodeList, out_enc, 'unicode');
        const uInt8List = new Uint8Array(shiftJisCodeList);

        // csv書き込みの実装
        const writeData = new Blob([uInt8List], { type: 'text/plane' });

        $('#a_dl_err').attr({
                "download":`err-${(new Date()).getTime()}.txt`,
                "href":URL.createObjectURL(writeData)
            });
    }

}
///
///最初からやり直し
///
function job000_reset_job(bFlag) {
    //param_id_input_file, param_id_select_mall
    var iRet=0;
    console.log("JS  job000_reset_job" );

    if(bFlag){
        if(!confirm('最初からやり直しますか？')){
            /* キャンセルの時の処理 */
            //return false;
            console.log("  nop" );
        }else{
            /*　OKの時の処理 */

            setUI( 1, 2);
            setUI( 2, 1);
            setUI( 3, 1);
        }
    }

    return iRet;
    
}   // end of job000_reset_job


var LIMIT_INDATA_SIZE = 1000000000; // byte

/// InCSVの検査
///　return：モールId
function job001_chk_indata(param_id_input_file, param_id_select_mall) {

    console.log("JS job001_chk_indata" );

    //alert('read_indata関数が呼び出されました:' + sId);
    var file = jQuery('#'+param_id_input_file);
    //alert(file)
    const fileList = file.files
    //console.log("fileList:"+ fileList)
    
    var file_inCSV = document.getElementById(param_id_input_file).files[0];
    // 選択されたファイル情報
    console.log("  ファイル名:" +file_inCSV.name);
    console.log("  ファイルサイズ：:" +file_inCSV.size);
    console.log("  MIME Type:" +file_inCSV.type);

    var bStatus = true;
    var errMsg = "";

    console.log(" -- job001_chk_indata --A001-----------");
    // MIMEタイプの判定    
    if ( file_inCSV.type !== 'text/csv' ) {
        errMsg ="選択したファイルはCSV形式ではありません";
        console.log(errMsg);
        //bStatus=false;
    }
    console.log(" -- job001_chk_indata --A002-----------");
    // サイズの判定
    if ( LIMIT_INDATA_SIZE < file_inCSV.size ) {
        errMsg = LIMIT_INDATA_SIZE +'Bを超えています。';
        console.log(errMsg);
        bStatus=false;
    }
    console.log(" -- job001_chk_indata --A003-----------");


    var iRet_Mallid = -1;
    var f_name = file_inCSV.name;
    var f_size = file_inCSV.size;
    var f_type = file_inCSV.type;
    var sCR = "\n";

    errMsg = "ファイル　：" + f_name + sCR + "サイズ　　：" + f_size + sCR + "タイプ　　：" + f_type;

    if(bStatus){
        console.log(" -- job001_chk_indata --0001-----------");
        try {
            readBlobAsBinaryInfile(file_inCSV,1024*2).then(value => {
                //console.log(value);
/*
// お手製のmimitype 検査
                console.log(" -- readBlobAsBinaryInfile()のthen{} ------------");
                // https://qiita.com/Toshino3/items/4fec70fae9e85f693563。
                var arr = arCSV.subarray(0, 150);

                var header = '';
                for (var i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                var ret_getMimeType =  getMimeType(header)
                console.log(" ret_getMimeType＝" + ret_getMimeType);
*/                
                //console.log(  JSON.stringify(value));
                //var sArr = new TextDecoder().decode(value)
                if(!arCSV || arCSV.byteLength==0){
                    //読み込みエラー
                    console.log("(async job001_chk_indata)---読み込みエラー");
                    return "読み込みエラー";
                }

                console.log("(async job001_chk_indata)読み込みサイズ："+value);
                var sBase64 = Base64_From_ArrayBuffer(arCSV);
                //console.log("(async job001_chk_indata) 読み込み" +sBase64);
    
                console.log(" -- job001_chk_indata --0002-----------");
                var sCodeNameAndMallNane = DotNet.invokeMethod(
                                                "ex01", 
                                                "chkInCsv",
                                                sBase64                                          
                                            );    
                console.log(" -- job001_chk_indata --0003-----------");
    
                console.log("JS info_indata から呼び出し C# chkBlobの戻り："+ sCodeNameAndMallNane );
    
                if(sCodeNameAndMallNane.length>1){
                    var arrCodeNameAndMallNane = sCodeNameAndMallNane.split(';');
                    var sText = "ファイル　：" + f_name + sCR + "サイズ　　：" + f_size + sCR + "タイプ　　：" + f_type + sCR + "文字コード：" +  arrCodeNameAndMallNane[0] + sCR + "モール　　：" + arrCodeNameAndMallNane[2];
                    $('#g2_pre_indata').css({"color":"blue"}).text(sText);    
                    console.log("info_indata 001::" +parseInt(arrCodeNameAndMallNane[1],10));
                    iRet_Mallid = parseInt(arrCodeNameAndMallNane[1],10);

                    var listConv = DotNet.invokeMethod(
                        "ex01", 
                        "get_select_data",
                        iRet_Mallid                                          
                    );
                    console.log("info_indata 002::" +JSON.stringify (listConv));
                    var oSelect = $('#'+param_id_select_mall);
                    // 変換する形式の選択プルダウンを設定
                    $('#' + param_id_select_mall + ' option').remove();
                    $('#' + param_id_select_mall).append($("<option>").val("").text(""));
                    $.each(listConv, function (plistnum1) {
                        var oConv = listConv[plistnum1];
                        $('#' + param_id_select_mall).append($("<option>").val(""+oConv.id).text(oConv.caption));
                        console.log("info_indata 003::" + oConv.id +"," +oConv.caption) ;
                    });

                    // 1.入力CSVファイルを指定:InCsvの検査OK 
                    setUI( 1, 3);
                    setUI( 2, 2);
                    errMsg = sText; 
                }
                else{
                    var sText = "ファイル　：" + f_name + sCR + sCR + "データを解析できませんでした。" + sCR + "形式・文字コードを確認してください。" ;
                    $('#g2_pre_indata').css({"color":"red"}).text(sText); 
                    errMsg = sText; 
                }
    
            })
            .catch(reason => {
                console.log("readBlobAsBinaryTop----NG:" + reason);
            });
            //console.log("info_indata End001:::"  + iRet_Mallid);
        }
        catch( e ) {
            //例外エラー
            console.log( ">>>>>" + e.message );
        }        
        return errMsg;
    }
    else{
        console.log( "検査NGーーーーーーーーーーーーー");
        var sText = "ファイル　：" + f_name + sCR +errMsg;
        $('#g2_pre_indata').css({"color":"red"}).text(sText);    
        return errMsg;
    }

    
}   // end of job001_chk_indata

/// 
/// C#側処理用のbass64に変換した入力CSV(sBase64Csv)を指定スライス取得
var arrOutCsv;
var arrOutErr;
function job_outCsv(iCmd, oData) {


    switch (iCmd) {
        case 0: // init
            //console.log("JS  job_outCsv   -- init" );
            arrOutCsv=[];
            arrOutErr=[];
            break;
        case 1: // data
            //console.log("JS  job_outCsv   -- data push" );
            arrOutCsv.push(oData);
            break;
        //case 2: // set anc
        //    console.log("JS  job_outCsv   -- set anc" );
        //    break;
        case 11: // err
            //console.log("JS  job_outCsv   -- err push" );
            arrOutErr.push(oData);
            break;
        default:
            break;
    }
}
var sBase64Csv="";
/// 
/// C#側処理用のbass64に変換した入力CSV(sBase64Csv)を指定スライス取得
function get_sBase64Csv(iSize,iChunk) {
    console.log( "get_sBase64Csv>>>>>" + iSize + ":" +  iChunk  +"    "+ iSize*(iChunk) +" - "+ iSize*(iChunk+1) );
    return sBase64Csv.substring( iSize*(iChunk), iSize*(iChunk+1) );
}
var sBase64Csv="";
///
///
function job001_exec_convert(param_id_input_file, sConvertType) {

    console.log("JS job001_exec_convert  param_id_input_file=" +param_id_input_file +  " sConvertType=" + sConvertType );

    //alert('read_indata関数が呼び出されました:' + sId);
    var file = jQuery('#'+param_id_input_file);
    //alert(file)
    const fileList = file.files
    //console.log("fileList:"+ fileList)
    
    var file_inCSV = document.getElementById(param_id_input_file).files[0];
    // 選択されたファイル情報
    console.log("  ###-ファイル名:" +file_inCSV.name);
    console.log("  ###-ファイルサイズ：:" +file_inCSV.size);
    console.log("  ###-MIME Type:" +file_inCSV.type);

    // Promiseオブジェクトを返却する.処理成功時にはresolveが呼ばれる
    return new Promise(function (resolve, reject) {
        readBlobAsBinaryInfile(file_inCSV,LIMIT_INDATA_SIZE).then(value => {
            //console.log("readBlobAsBinaryTop*****************************");
            //console.log(  JSON.stringify(value));
            //var sArr = new TextDecoder().decode(value)

            if(!arCSV || arCSV.byteLength==0){
                //読み込みエラー
                console.log("---読み込みエラー");
                return "読み込みエラー";
            }
            
            console.log("--読み込みサイズ："+value);            
            //var sBase64 = Base64_From_ArrayBuffer(arCSV);
sBase64Csv=Base64_From_ArrayBuffer(arCSV);
console.log("--sBase64Csvサイズ："+sBase64Csv.length);  
            //console.log(sBase64);
            resolve(sBase64Csv.length);
            //resolve("job001_exec_convert End");
        })
        .catch(reason => {
            console.log("readBlobAsBinaryTop333----NG:"+reason.message);
            resolve(null);
        });

    });
}   // end of job001_exec_convert

// ------------------------------------------------------------
// ArrayBuffer から Base64 文字列に変換する関数 (同期実行)
// ------------------------------------------------------------
function Base64_From_ArrayBuffer(ary_buffer){
	var dic = [
		'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
		'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
		'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
		'w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'
	];
	var base64 = [];
	var ary_u8 = new Uint8Array( ary_buffer );
	var num = ary_u8.length;
	var n = 0;
	var b = 0;

	var i = 0;
	while(i < num){
		b = ary_u8[i];
		base64.push(dic[(b >> 2)]);
		n = (b & 0x03) << 4;
		i ++;
		if(i >= num) break;

		b = ary_u8[i];
		base64.push(dic[n | (b >> 4)]);
		n = (b & 0x0f) << 2;
		i ++;
		if(i >= num) break;

		b = ary_u8[i];
		base64.push(dic[n | (b >> 6)]);
		base64.push(dic[(b & 0x3f)]);
		i ++;
	}

	var m = num % 3;
	if(m){
		base64.push(dic[n]);
	}
	if(m == 1){
		base64.push("==");
	}else if(m == 2){
		base64.push("=");
	}
	return base64.join("");
}

// 実際のヘッダを見てMIMEタイプをチェックする。
function getMimeType(header) {
    'use strict';

    var retv = '';
    switch (true) {
        case header.startsWith('89504e47'):
            retv = 'image/png';
            break;
        case header.startsWith('424d'):
            retv = 'image/bmp';
            break;
        case header.startsWith('47494638'):
            retv = 'image/gif';
            break;
        case header.startsWith('ffd8ff'):
            retv = 'image/jpeg';
            break;
        case header.startsWith('25504446'):
            // こんな風に画像以外にも応用可能ですよ。
            retv = 'application/pdf';
            break;
        case header.startsWith('0'.repeat(128) + '4449434d'):
            // DICOMは先頭128byteのNULL文字のあと、DICMが来る。
            // …まあ、DICOMヘッダが無い
            // いわゆる規約違反のDICOMファイルもたまにあるんですけどね…
            retv = 'application/dicom';
            break;
        default:
            retv = 'unknown';
            break;
            // 他にもシグネチャに応じた対応は可能かと思いますので、
            // Wikipediaなど参考にされるのもよいのではないでしょか。
    }
    return retv;
}
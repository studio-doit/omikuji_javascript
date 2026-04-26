let sound = new Audio('taiko.mp3');
 
let box = document.getElementById('omikuji-box');
 
let daikichi = document.getElementById('daikichi');
let kichi = document.getElementById('kichi');
let chukichi = document.getElementById('chukichi');
let shoukichi = document.getElementById('shoukichi');
let suekichi = document.getElementById('suekichi');
let kyou = document.getElementById('kyou');
let daikyou = document.getElementById('daikyou');
 
let rets = [daikichi, kichi, chukichi, shoukichi, suekichi, kyou, daikyou];
 
let retPosY = 50;
let isUp = true;
let ret = null;
let timerId = 0;
 
function Run(){
    retPosY = 50;
    isUp = true;
 
    // 2回目以降の処理
    // すでに表示されているおみくじを初期の状態に戻す
    // また立て続けにボタンが押された場合は現在動作しているタイマーを止める
    if(ret != null){
        clearInterval(timerId);
        ret.style.zIndex = 1;
        ret.style.top = `${retPosY}px`;
    }
 
    let r = Math.floor(Math.random() * rets.length); // 0～4の整数の乱数を生成
    ret = rets[r];
 
    // タイマーでおみくじのY座標を変化させる
    // 箱からとびだしたおみくじの座標が120より大きくなったらタイマー停止してこれ以上動かないようにするとともに
    // 効果音を鳴らす
    timerId = setInterval(() => {
        if(retPosY > 120){
            clearInterval(timerId);
            sound.currentTime = 0;
            sound.play();
            return;
        }
 
        // 最初はおみくじを上へ移動するがY座標が-200以下になったら下へ移動させる
        // このときz-indexを変更して箱よりも手前に見えるようにする
        if(isUp && retPosY < -200) {
            ret.style.zIndex = 20;
            isUp = false;
        }
 
        if(isUp)
            retPosY -= 16;
        else
            retPosY += 16;
        ret.style.top = `${retPosY}px`;
    }, 30);
}
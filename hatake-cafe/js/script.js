
// sp hamburger
function toggleMenu(){ 
    document.getElementById("nav").classList.toggle("active");
    document.getElementById("hamburger").classList.toggle("active");
}
// scroll-down
function scrollToConcept(){
    document.getElementById("concept").scrollIntoView({ behavior: "smooth"});
}

// new切り替わり
function imgChange(imgName) {
    var imgPath = "img/" + imgName;
    document.getElementById("mainImg").setAttribute("src", imgPath);
}

// menuタブ切り替え
function switchTab(event) {
    var target = event.target.dataset.target;
    // ① すべてのタブボタンから active を外す
    var tabs = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < tabs.length; i++){
        tabs[i].classList.remove("active");
    }
    // ② クリックされたボタンにだけ active をつける
    event.target.classList.add("active");
    // ③ すべてのメニュー内容から active を外す
    var contents = document.getElementsByClassName("menu-content");
    for (var i = 0; i < contents. length; i++){
        contents[i].classList.remove("active");
    }
    // ④ クリックされたボタンに対応するメニューにだけ active をつける
    document.getElementsByClassName(target)[0].classList.add("active");
}

// FAQアコーディオン
function toggleFaq(question){
    question.classList.toggle("active");
    question.nextElementSibling.classList.toggle("active");
}



// new PCとSPで要素の順を変更する
// 要素を取得
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');
const item4 = document.getElementById('item4');
const subBox = document.getElementById('subBox');

// 画面幅に応じてHTML構造を切り替える関数
function replaceElements() {
const isSP = window.matchMedia('(max-width: 768px)').matches;

if (isSP) {
    // 【SP時の処理】1, 3, 2, 4 の順になるように入れ替える
    // item2 を subBox の中で item3 の後に移動させる
    item3.after(item2); 
} else {
    // 【PC時の処理】元の構造に戻す (1, [2, 3, 4])
    // item2 を subBox の先頭に戻す
    subBox.prepend(item2);
}
}

// ページ読み込み時と画面リサイズ時に実行
window.addEventListener('load', replaceElements);
window.addEventListener('resize', replaceElements);

// スムーズスクロール
function smoothScroll(){
    // 「#」で始まるリンクを全部取得
    var links = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < links.length; i++){
        links[i].onclick = function(event){
            event.preventDefault(); 

            var targetId = this.getAttribute("href");
            var targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({ behavior: "smooth" });

            // SP メニューを閉じる
            document.getElementById("nav").classList.remove("active");
            document.getElementById("hamburger").classList.remove("active");

            
        };
    }
}
smoothScroll();

// header不透明度100%
window.addEventListener("scroll", function() {
    var header = document.getElementById("header");

    if(window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// フェードイン
var targets = document.querySelectorAll(".fade-in");

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });
});

for (var i = 0; i < targets.length; i++) {
    observer.observe(targets[i]);
}


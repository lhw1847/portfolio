/*------------------------------
SupahScroll
------------------------------*/
class SupahScroll {
  constructor(options) {
    this.opt = options || {};
    this.el = this.opt.el ? this.opt.el : ".supah-scroll";
    this.speed = this.opt.speed ? this.opt.speed : 0.1;
    this.init();
  }

  init() {
    this.scrollY = 0;
    this.supahScroll = document.querySelectorAll(this.el)[0];
    this.supahScroll.classList.add("supah-scroll");
    this.events();
    this.update();
    this.animate();
  }

  update() {
    if (this.supahScroll === null) return;
    document.body.style.height = parallaxWidth + "px";
  }

  pause() {
    document.body.style.overflow = "hidden";
    cancelAnimationFrame(this.raf);
  }

  play() {
    document.body.style.overflow = "inherit";
    this.raf = requestAnimationFrame(this.animate.bind(this));
  }

  destroy() {
    this.supahScroll.classList.remove("supah-scroll");
    this.supahScroll.style.transform = "none";
    document.body.style.overflow = "inherit";
    window.removeEventListener("resize", this.update);
    cancelAnimationFrame(this.raf);
    delete this.supahScroll;
  }

  animate() {
    this.scrollY += (window.scrollY - this.scrollY) * this.speed;
    this.supahScroll.style.transform = `translate3d(${-this.scrollY}px,0,0)`;
    // if (screenX >= 1000) {
    //   this.supahScroll.style.transform = `translate3d(0,${-this.scrollY}px,0)`;
    // }
    this.raf = requestAnimationFrame(this.animate.bind(this));
  }

  scrollTo(y) {
    window.scrollTo(y, 0);
  }

  staticScrollTo(y) {
    cancelAnimationFrame(this.raf);
    this.scrollY = y;
    window.scrollTo(y, 0);
    this.supahScroll.style.transform = `translate3d(${-y}px,0,0)`;
    this.play();
  }

  events() {
    window.addEventListener("load", this.update.bind(this));
    window.addEventListener("resize", this.update.bind(this));
  }
}

function scroll(event) {
  var section3Left = document
    .querySelector("#section3")
    .getBoundingClientRect().left;
  let scrollTop =
    window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  parallaxWidth = wrap.getBoundingClientRect().width;

  // document.body.style.height = parallaxWidth + "px";

  let viewWidth = parallaxWidth - window.innerWidth;
  let viewHeigth = parallaxWidth - window.innerHeight;
  // let goLeft = scrollTop * (viewWidth / viewHeigth);

  // gsap.to(wrap, {
  //   left: -goLeft,
  // });

  // gsap.to(bgt, {
  //   left: -goLeft / 10,
  // });
  // console.log(img01.getBoundingClientRect().left)
  // console.log(document.querySelector("#section2 .text").getBoundingClientRect().left)
  // if(img01.getBoundingClientRect().left <= 0){
  //     console.log("first")
  //     gsap.to(img01, {
  //         left: 0,
  //     })
  // }
  // if(document.querySelector("#section3").getBoundingClientRect().left >= 0 && img01.getBoundingClientRect().left >= 0) {
  //     gsap.to(img01, {
  //         left: goLeft,
  //     })
  // }
  // gsap.to(img01, {
  //         left: -goLeft + window.innerWidth / (100 / 60),
  //     })

  // if(img01.getBoundingClientRect().left >= 0 || 0 <= section3Left){
  //     // console.log("first")
  //     gsap.to(img01, {
  //         left: -goLeft + window.innerWidth / (100 / 60),
  //     })
  // }

  // var beforePosition = document.documentElement.scrollTop
  // var afterPosition = document.documentElement.scrollTop;

  // if (afterPosition > 1) {

  // if(beforePosition < afterPosition ){
  //     // 스크롤 위로
  //     img01.querySelector(".img").style.transform = "translate(-100px , 0)";
  // } else {
  //     // 스크롤 아래로
  //     img01.querySelector(".img").style.transform = "translate(100px , 0)";
  // }

  // } else {
  //     // 평상 시
  //     img01.querySelector(".img").style.transform = "translate(0 , 0)";
  // }
  requestAnimationFrame(scroll);
}
scroll();
window.addEventListener("resize", scroll);
/*------------------------------
     Initialize
     ------------------------------*/
const supahscroll = new SupahScroll({
  el: "main",
  speed: 0.1,
});

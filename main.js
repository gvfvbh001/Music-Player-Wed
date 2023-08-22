
const headerImg = document.querySelector(".header_img");
const containerImg = document.querySelector(".container_img");
const songTitle = document.querySelector("#song_title");
const author = document.querySelector("#author");
const musicFrame = document.querySelector(".container_music-frame");
const musicFrameAlign = document.querySelector(".container_music-frame-align");
const musicFrameTime = document.querySelector(".container_music-frame-time");
const timeStart= document.querySelector(".container_time-start");
const timeEnd = document.querySelector(".container_time-end");
const back = document.querySelector(".back");
const play = document.querySelector(".play");
const forward = document.querySelector(".forward");

 const music = new Audio();

//  lấy dữ liệu 

const songs = [
    {
        nameSong: " Vạn Sự Tùy Duyên ",
        nameAuthor: " Thanh Hưng ",
        imgTitle: "img/anh2.jpg",
        path: "audio/audio2.mp3",
    },
    {
        nameSong: " Một Bước Yêu Vạn Dăm Đau ",
        nameAuthor: " MR. Siro ",
        imgTitle: "img/anh3.jpg",
        path: "audio/audio3.mp3",
    },
    {
        nameSong: " Đom Đóm ",
        nameAuthor: " J97",
        imgTitle: "img/1661135584_397_Top-100-hinh-nen-dep-cho-dien-thoai-full-HD.png",
        path: "audio/Đom Đóm.mp3",
    },
    {
        nameSong: " Chắc Vì Mình Chưa Tốt  ",
        nameAuthor: "Thanh Hưng",
        imgTitle: "img/anh4.jpg",
        path: "audio/audio4.mp3",
    },
    {
        nameSong: " Tệ Thật, Anh Nhớ Em ",
        nameAuthor: "Thanh Hưng",
        imgTitle: "img/anh5.jpg",
        path: "audio/audio5.mp3",
    },
];
let musicIndex = 0;
let isMusic = false;

function getMusic (){
    if(isMusic) {
        pauseMusic();
    } else {
        playMusic();
    }
}

//  thay đổi khi chạy 
function playMusic(){
    isMusic = true;
    play.setAttribute("name", "pause-outline");
    play.setAttribute('title','Pause');
    music.play();
}
//  thay đổi khi dừng 
function pauseMusic(){
    isMusic = false;
    play.setAttribute('name', 'play-outline');
    play.setAttribute('title','PLay');
    music.pause();
}

//  lấy dữ kiệu từ oject
function loadMusic(song){
    music.src = song.path;
    containerImg.src = song.imgTitle;
    headerImg.src = song.imgTitle;
    songTitle.textContent = song.nameSong;
    author.textContent = song.nameAuthor;
}
// cập nhật và cho thay đổi bài hát tiếp theo
function changeMusic(a){
    musicIndex = (musicIndex + a + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}
// cho thanh chạy theo thơi gian nhạc phát 
function updateMusic(){
    // thời gian bắt đầu và hiện tại
    const { duration , currentTime } = music;
    const content = (currentTime/duration) * 100;
    musicFrameAlign.style.width = `${content}%`; // 2 dòng cho phép nó tăng lên theo phần trăm

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0"); // chuyển đổi số thành phút giây 
    timeEnd.textContent = `${formatTime(duration/60)} : ${formatTime(duration%60)}`;// tính số phút còn lại để kết thúc bài hát 
    timeEnd.innerHTML = `${formatTime(duration/60)} : ${formatTime(duration%60)}`;// tính số phút còn lại để kết thúc bài hát 
    timeStart.textContent = `${formatTime(currentTime/60)} : ${formatTime(currentTime%60)}`;// tính số phút hiện tại 
    timeStart.innerHTML = `${formatTime(currentTime/60)} : ${formatTime(currentTime%60)}`;// tính số phút hiện tại 
}

// 
function setMusic(e){
    const width = musicFrame.clientWidth; // lấy chiều rộng 
    const clickX = e.offsetX; // lấy giá trị nằm ngang 
    music.currentTime = (clickX / width) * music.duration; // lấy vị trí nằm ngang hiện tại 
}

play.addEventListener("click", getMusic);
back.addEventListener("click", () => changeMusic(-1));
forward.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateMusic);
musicFrameAlign.addEventListener("click", setMusic);
loadMusic(songs[musicIndex]);
// Like Button Feature
let likeBtn = document.getElementById("likeBtn");
let likeCount = document.getElementById("likeCount");
let count = 0;


likeBtn.addEventListener("click", () => {
    count++;
    likeCount.textContent = count + " Likes";
});

// Reading Progress Bar
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = (scrollTop / scrollHeight) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
};

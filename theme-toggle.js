document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            const currentTheme = document.body.getAttribute("data-theme");
            if (currentTheme === "dark") {
                document.body.removeAttribute("data-theme");
            }
            else {
                document.body.setAttribute("data-theme", "dark");
            }
        });
    }
    const toggle2 = document.getElementById("theme-toggle1");
    if(toggle2) {
        toggle2.addEventListener("click", () => {
            const currentTheme1 = document.body.getAttribute("data-theme");
            if(currentTheme1 === "dark"){
                document.body.removeAttribute("data-theme");
            }
            else{
                document.body.setAttribute("data-theme", "dark");
            }
        })
    }
    /*
    localStorage.setItem('data-theme','dark');

    const savedTheme = localStorage.getItem('data-theme');
    if(savedTheme){
        document.body.className = savedTheme;
    }
    */
});
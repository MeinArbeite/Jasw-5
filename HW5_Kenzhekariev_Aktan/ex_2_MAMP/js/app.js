const tabs = document.querySelectorAll(".tabheader__item");
const tabsParent = document.querySelector(".tabheader__items");
const tabContent = document.querySelectorAll(".tabcontent");

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = "none";
    });
    tabs.forEach((item) =>{
        item.classList.remove("tabheader__item_active");
    });
};

hideTabContent();

const showTabContent = (i = 0) => {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
};

hideTabContent();
showTabContent();

// 1)сделать слайдер автоматическим
let slideIndex = 0;
const slider = () => {
    slideIndex++;
    if (slideIndex > 3) {
        slideIndex = 0;
    }
    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
    
        if (target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent(i);
                    showTabContent(i);
            }
        });
      }
    });
    hideTabContent();
    showTabContent(slideIndex);
}

setInterval(slider, 5000);


const modal = document.querySelector(".modal");
const modalTrigger = document.querySelector(".btn_white");
const closeModalBtn = document.querySelector(".modal__close");

const openModal = () => {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
};

modalTrigger.addEventListener("click", openModal);

const closeModal = () => {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = ""; // overflow this is scroll bar
};

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if(event.target === modal) {
        closeModal();
    }
})

const page = document.documentElement;

// 2)вызывать модалку по скролу до конца страницы
const scrollOpen = () => {
    if (page.scrollTop + page.clientHeight >= page.scrollHeight) {
        openModal();
        window.removeEventListener("scroll", scrollOpen);
    }
}

window.addEventListener("scroll", scrollOpen);


// POST запрос
const forms = document.querySelectorAll("form");
console.log(forms);

const postData = (form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-type", "application/json");

        const formData = new FormData (form);

        const obj = {};

        formData.forEach((item, i) => {
            obj[i] = item;
        })

        const json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
            } else {
                console.log("error");
            }
        })
    })
}

forms.forEach((item) => {
    postData(item);
})
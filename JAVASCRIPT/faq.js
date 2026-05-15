//FAQ QUESTIONS
const faqs = document.querySelectorAll(".faq");
faqs.forEach(faq => {
    faq.querySelector(".question").addEventListener("click", () => {
        faq.classList.toggle("active");
    });
});


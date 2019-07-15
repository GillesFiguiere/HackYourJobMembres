document.addEventListener("DOMContentLoaded", event => {
    document.querySelectorAll(".navbar-toggler").forEach(navbarToggler => {
        navbarToggler.addEventListener("click", event => {
            document.querySelectorAll("#search-menu").forEach(searchMenu => {
                searchMenu.classList.toggle("search-menu-hidden")
            })
            navbarToggler.querySelectorAll("span").forEach(button => {
                button.classList.toggle("fa")
                button.classList.toggle("fa-search")

                button.classList.toggle("fas")
                button.classList.toggle("fa-times")
            })
        })
    })
})

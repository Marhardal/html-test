function toggleMenu() {
    const menu = document.getElementById("primary-navigation");
    const button = document.querySelector(".menu-toggle");

    if (!menu || !button) {
        return;
    }

    const isOpen = menu.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
}

function filterProjects(category) {
    const projects = document.querySelectorAll(".project");
    const filterButtons = document.querySelectorAll("[data-category][aria-pressed]");

    projects.forEach(function (project) {
        const matches = category === "all" || project.dataset.category === category;
        project.hidden = !matches;
    });

    filterButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.category === category));
    });
}

function validateForm(form) {
    const fields = [
        {
            element: form.elements.name,
            errorId: "name-error",
            emptyMessage: "Please enter your name.",
            invalidMessage: ""
        },
        {
            element: form.elements.email,
            errorId: "email-error",
            emptyMessage: "Please enter your email address.",
            invalidMessage: "Please enter a valid email address."
        },
        {
            element: form.elements.message,
            errorId: "message-error",
            emptyMessage: "Please enter a message.",
            invalidMessage: ""
        }
    ];

    let isValid = true;
    let firstInvalidField = null;

    fields.forEach(function (field) {
        const error = document.getElementById(field.errorId);
        let message = "";

        if (!field.element.value.trim()) {
            message = field.emptyMessage;
        } else if (field.element.type === "email" &&
                   !field.element.checkValidity()) {
            message = field.invalidMessage;
        }

        field.element.setAttribute("aria-invalid", String(Boolean(message)));
        field.element.setAttribute("aria-describedby", field.errorId);
        error.textContent = message;

        if (message) {
            isValid = false;
            if (!firstInvalidField) {
                firstInvalidField = field.element;
            }
        }
    });

    if (!isValid && firstInvalidField) {
        firstInvalidField.focus();
    }

    return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-toggle");
    if (menuButton) {
        menuButton.addEventListener("click", toggleMenu);
    }

    document.querySelectorAll(".project-filters button").forEach(function (button) {
        button.addEventListener("click", function () {
            filterProjects(button.dataset.category);
        });
    });

    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const status = form.querySelector(".form-status");

            if (validateForm(form)) {
                status.textContent = "Thank you. Your message has been validated.";
                form.reset();
                ["name", "email", "message"].forEach(function (fieldName) {
                    form.elements[fieldName].setAttribute("aria-invalid", "false");
                });
            } else {
                status.textContent = "";
            }
        });
    }
});

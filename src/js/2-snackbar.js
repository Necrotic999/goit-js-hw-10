import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import success from "../img/success-icon.svg";
import error from "../img/error-icon.svg";

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", onBtnSubmit);

function onBtnSubmit(e) { 
    e.preventDefault();
    const inputDelayValue = e.target.elements.delay.value;
    const inputStateValue = e.target.elements.state.value;
    createPromise(inputDelayValue, inputStateValue)
        .then(() => { 
            return iziToast.show({
                title: "OK",
                titleColor: "#fff",
                color: "#59a10d",
                message: ` Fulfilled promise in ${inputDelayValue}ms`,
                messageColor: "#fff",
                position: "topRight",
                iconUrl: success,
            });
        })
        .catch(() => { 
            return iziToast.show({
                title: "Error",
                titleColor: "#fff",
                color: "#ef4040",
                message: ` Rejected promise in ${inputDelayValue}ms`,
                messageColor: "#fff",
                position: "topRight",
                iconUrl: error,
            });
        });
    e.target.reset();
}

function createPromise(delay, inputFulfilled) { 
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (inputFulfilled === "fulfilled") {
                resolve();
            } else { 
                reject();
            }
        }, delay)
    });
    return promise;
}
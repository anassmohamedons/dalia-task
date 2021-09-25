(function (global) {
    const API_ENDPOINT = 'http://localhost:3000/emails/'

    let config = {
        right: 20,
        bottom: 20,
        btnWidth: 60,
        btnHeight: 60,
        bodyWidth: 450,
        closeTimeout: 5,
        content: {
            title: "Don't miss our latest news",
            subtitle: "Subscribe to our newsletter to receive exclusive offers, latest news and updates.",
            inputPlaceholder: "Enter your email here",
            submitBtn: "Subscribe",
            doneTitle: "Thanks for subscribing",
            doneSubtitle: "You will receive your first email shortly.",
            doneWillClose: "This popup will close itself in ",
            doneSeconds: "second(s)",
            errorTitle: "Something wen't wrong",
            errorSubtitle: "Please try again",
            errorBtn: "Try again",
        }
    }

    let theme = {
        primary: "#5C00F5",
        primaryDark: "#4b00c7",
        accent: "#49BAA7",
        textLight: "white",
        textDark: "#333",
    }

    const template = document.createElement('template')
    global._buildTemplate = () => {
        template.innerHTML = `
            <style>
                .popup-btn {
                    position: fixed;
                    right: ${config.right}px;
                    bottom: ${config.bottom}px;
                    width: ${config.btnWidth}px;
                    height: ${config.btnHeight}px;
                    background: ${theme.primary};
                    color: ${theme.textLight};
                    border-radius: 50%;
                    box-shadow: 6px 6px 25px -10px rgba(0, 0, 0, .75);
                    cursor: pointer;
                    transition: background .2s ease-in-out;
                    animation: fade-in 1s ease-in-out both;
                    overflow: hidden;
                    z-index: 9999;
                }
                .popup-btn:hover {
                    background: ${theme.primaryDark};
                }
                .popup-btn:active {
                    box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2), 6px 6px 25px -10px rgba(0, 0, 0, .75);
                }
                .popup-btn.open {
                    background: ${theme.primaryDark};
                }

                .popup-btn svg {
                    position: absolute;
                    left: calc(50% - 12px);
                    transition: top .2s ease-in-out, opacity .2s ease-in-out;
                }
                .popup-btn .closed { top: calc(50% - 12px); opacity: 1; }
                .popup-btn .opened { top: calc(100% + 30px); opacity: 0; }
                .popup-btn.open .closed { top: -30px; opacity: 0; }
                .popup-btn.open .opened { top: calc(50% - 12px); opacity: 1; }

                .popup-body {
                    position: absolute;
                    right: ${config.right}px;
                    bottom: ${config.btnHeight}px;
                    width: calc(100% - ${config.right * 2}px);
                    max-width: ${config.bodyWidth}px;
                    padding: 35px 40px;
                    background: white;
                    border: solid thin rgba(0, 0, 0, .1);
                    border-radius: 5px;
                    text-align: center;
                    color: ${theme.textDark};
                    box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, .4);
                    opacity: 0;
                    transition: bottom .2s ease-in-out, opacity .2s ease-in-out;
                    pointer-events: none;
                    z-index: 9998;
                }
                .popup-body.open {
                    bottom: ${config.btnHeight + config.bottom + 10}px;
                    opacity: 1;
                    pointer-events: all;
                }

                .popup-body h3, p {
                    margin: 10px 0;
                }

                .popup-body .input-container {
                    display: flex;
                    margin-top: 20px;
                }

                .popup-body input {
                    width: 100%;
                    padding: 10px 15px;
                    border: solid thin #DEDEDE;
                    background: #F8F8F8;
                    border-radius: 5px 0 0 5px;
                    outline: none;
                    font-family: inherit;
                }
                .popup-body input:focus {
                    border: solid thin #C4C4C4;
                }
                .popup-body input:valid {
                    border-color: #34C636;
                }
                .popup-body input:not(:placeholder-shown):not(:valid) {
                    border-color: red;
                }

                .popup-body button {
                    padding: 10px 20px;
                    background: ${theme.primary};
                    color: ${theme.textLight};
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: inherit;
                }
                .popup-body button:hover {
                    background: ${theme.primaryDark};
                }
                .popup-body button:active {
                    box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
                }

                .main-container button {
                    border-radius: 0 5px 5px 0;
                }

                .main-container {
                    display: block;
                }
                
                .completed-container, .loading-container, .error-container {
                    display: none;
                }

                .popup-body.completed .main-container,
                .popup-body.completed .loading-container,
                .popup-body.completed .error-container {
                    display: none;
                }
                .popup-body.completed .completed-container { display: block; }

                .popup-body.loading .main-container,
                .popup-body.loading .completed-container,
                .popup-body.loading .error-container {
                    display: none;
                }
                .popup-body.loading .loading-container { display: block; }

                .popup-body.failed .main-container,
                .popup-body.failed .completed-container,
                .popup-body.failed .loading-container {
                    display: none;
                }
                .popup-body.failed .error-container { display: block; }

                .timeout-text {
                    margin-top: 15px;
                    font-size: 12px;
                    opacity: .7;
                }

                #retry-btn {
                    margin-top: 15px;
                }
                
                * {
                    box-sizing: border-box;
                    user-select: none;
                }

                @-webkit-keyframes fade-in {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
                @keyframes fade-in {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                .lds-ring {
                    display: inline-block;
                    position: relative;
                    width: 80px;
                    height: 80px;
                }
                .lds-ring div {
                    box-sizing: border-box;
                    display: block;
                    position: absolute;
                    width: 64px;
                    height: 64px;
                    margin: 8px;
                    border: 4px solid ${theme.primary};
                    border-radius: 50%;
                    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                    border-color: ${theme.primary} transparent transparent transparent;
                }
                .lds-ring div:nth-child(1) {
                    animation-delay: -0.45s;
                }
                .lds-ring div:nth-child(2) {
                    animation-delay: -0.3s;
                }
                .lds-ring div:nth-child(3) {
                    animation-delay: -0.15s;
                }

                @keyframes lds-ring {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            </style>

            <a class="popup-btn">
                <svg class="closed" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <svg class="opened" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </a>

            <div class="popup-body">
                <div class="main-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 512 512"><g><path d="M499.76,216.94,448,189.33V16a8,8,0,0,0-8-8H72a8,8,0,0,0-8,8V189.33L12.24,216.94A8.005,8.005,0,0,0,8,224V496a8,8,0,0,0,8,8H496a8,8,0,0,0,8-8V224A8.005,8.005,0,0,0,499.76,216.94ZM448,207.46,479,224l-31,16.54ZM80,24H432V249.07L256,342.93,80,249.07ZM64,207.46v33.08L33,224ZM24,488V237.33l141.47,75.46L35.96,488Zm31.86,0L179.74,320.4l72.5,38.66a7.99,7.99,0,0,0,7.52,0l72.5-38.66L456.14,488ZM488,488H476.04L346.53,312.79,488,237.33Z"/><path d="M152,160A104.118,104.118,0,0,0,256,264a8,8,0,0,0,0-16,88,88,0,1,1,88-88v16c0,3.146-4.474,24-24,24-12.035,0-15.977-26.954-16-40.007v-.006C303.994,129.115,282.463,104,256,104s-48,25.122-48,56,21.533,56,48,56c15.372,0,29.069-8.484,37.86-21.638C300.614,212.007,311.519,216,320,216c27.921,0,40-26.488,40-40V160a104,104,0,0,0-208,0Zm104,40c-17.645,0-32-17.944-32-40s14.355-40,32-40,32,17.944,32,40S273.645,200,256,200Z"/><path d="M96,48h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Z"/><path d="M184,48h8a8,8,0,0,0,0-16h-8a8,8,0,0,0,0,16Z"/></g></svg>
                    <h3>${config.content.title}</h3>
                    <p>${config.content.subtitle}</p>
                    
                    <form class="input-container">
                        <input type="email" placeholder="${config.content.inputPlaceholder}" required>
                        <button>${config.content.submitBtn}</button>
                    </form>
                </div>

                <div class="loading-container">
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>

                <div class="completed-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#34C636" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <h3>${config.content.doneTitle}</h3>
                    <p>${config.content.doneSubtitle}</p>
                    <p class="timeout-text"></p>
                </div>

                <div class="error-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <h3>${config.content.errorTitle}</h3>
                    <p>${config.content.errorSubtitle}</p>
                    <button id="retry-btn">${config.content.errorBtn}</button>
                </div>
            </div>
        `
    }

    this._buildTemplate()

    global.EmailSubscription = class EmailSubscription {
        constructor(_config) {
            if (document.querySelector('email-subscription'))
                return console.error('Email subscription widget already added.')

            if (_config) {
                if (_config.config) {
                    if (_config.config.content)
                        _config.config.content = { ...config.content, ..._config.config.content }
                    config = { ...config, ..._config.config }
                }
                if (_config.theme) theme = { ...theme, ..._config.theme }

                global._buildTemplate(config, theme)
            }

            document.body.appendChild(document.createElement('email-subscription'))
        }
    }

    class EmailSubscriptionComponent extends HTMLElement {
        constructor() {
            super()

            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))

            this.popupBtn = this.shadowRoot.querySelector('.popup-btn')
            this.popupBody = this.shadowRoot.querySelector('.popup-body')
            this.emailForm = this.shadowRoot.querySelector('form')
            this.emailInput = this.shadowRoot.querySelector('input')
            this.timeoutText = this.shadowRoot.querySelector('.timeout-text')
            this.retryBtn = this.shadowRoot.querySelector('#retry-btn')
        }

        connectedCallback() {
            this.popupBtn.addEventListener('click', this.onPopupClick)
            this.retryBtn.addEventListener('click', this.onRetryClick)
            this.emailForm.addEventListener('submit', this.onFormSubmitted)
        }

        disconnectedCallback() {
            this.popupBtn.removeEventListener('click', this.onPopupClick)
            this.retryBtn.removeEventListener('click', this.onRetryClick)
            this.emailForm.removeEventListener('submit', this.onFormSubmitted)
        }

        onPopupClick = () => {
            this.popupBtn.classList.toggle('open')
            this.popupBody.classList.toggle('open')
        }

        onRetryClick = () => {
            this.popupBody.className = 'popup-body open'
        }

        onFormSubmitted = (e) => {
            e.preventDefault()

            this.popupBody.className = 'popup-body open loading'

            const opts = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.emailInput.value,
                })
            }

            fetch(API_ENDPOINT, opts)
                .then(res => res.json())
                .then(this.onSuccess)
                .catch(this.onFailed)
        }

        onSuccess = () => {
            this.popupBody.className = 'popup-body open completed'

            let timeout = config.closeTimeout
            this.timeoutText.textContent = `${config.content.doneWillClose} ${timeout} ${config.content.doneSeconds}`
            let timeoutInterval = setInterval(() => {
                timeout--
                this.timeoutText.textContent = `${config.content.doneWillClose} ${timeout} ${config.content.doneSeconds}`

                if (timeout == 0) {
                    clearInterval(timeoutInterval)
                    this.remove()
                }
            }, 1000)
        }

        onFailed = () => {
            this.popupBody.className = 'popup-body open failed'
        }
    }

    window.customElements.define("email-subscription", EmailSubscriptionComponent)

})(window)
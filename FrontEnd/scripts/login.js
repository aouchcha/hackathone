import { showError } from "./config.js"
import { Logout } from './Logout.js'
export function login() {
    const loginButton = document.getElementById("login")
    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            
            const email = document.getElementById("loginEmail").value
            const password = document.getElementById("loginPassword").value
            console.log(email,password);
            const Res = await fetch("api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            })

            if (Res.status != 200) {
                const Data = await Res.json()
                showError(Data.Error)
                return
            }
            Logout()
        })
    }
}

login()
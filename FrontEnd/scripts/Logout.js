

export async function Logout() {
    const Res = await fetch("api/isloged");
    const Data = await Res.json();
    if (Res.status == 200) {
        if (Data.role == "volanteaire"){
            window.location.href = "/volanteaire"
        } else if (Data.role == "Association"){
            window.location.href = "/Association"
        }
    } else {
        window.location.href = "/login"
    }
    const LogoutButton = document.getElementsByClassName("logout-btn")[0];
    if (LogoutButton) {
        LogoutButton.addEventListener("click", async () => {
            await fetch("api/logout", { method: "GET" });
            window.location.href = "/login"
        });
    }        
}
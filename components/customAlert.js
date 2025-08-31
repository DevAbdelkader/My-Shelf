export default function customAlert(msg) {
	const myAlert = document.createElement("div");
	myAlert.innerText = msg;
	myAlert.className = "alert";

	document.body.prepend(myAlert);

	setTimeout(() => myAlert.remove(), 5000)
}

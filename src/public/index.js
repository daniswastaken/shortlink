const form = document.querySelector("form");
const paragraph = document.querySelector(".brand > p");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const data = new FormData(event.currentTarget);
	const route = await fetch("/", {
		method: "POST",
		body: data.get("the_link"),
	});

	paragraph.innerText = route.ok
		? `Your shortened URL: ${window.location.origin}/${await route.text()}`
		: `Error: ${await route.text()}`;
});
